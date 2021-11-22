import React, { useEffect, useState } from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { Box, Grid } from "@material-ui/core";
import { dropdownOptions } from "../../utils/invoiceList";
import { makeStyles } from "@material-ui/core/styles";
import { InventoryService } from "../../services/InventoryService";
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CButton,
  CContainer,
  CCol,
  CRow,
  CFormGroup,
  CLabel,
  CInput,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react";

import firebase from "firebase/app";
import "firebase/auth";

import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
    root: {
    width: "100%",
    paddingTop: 50,
    },
    container: {
        maxHeight: "80vh",
        marginTop: 10,
      },
      table: {
        "& thead th": {
          fontWeight: "600",
          fontSize: 20,
          backgroundColor: "grey",
        },
        "& tbody td": {
          fontWeight: "300",
        },
        "& tbody tr:hover": {
          backgroundColor: "#fffbf2",
          cursor: "pointer",
        },
      },
});

const HandwrittenInvoice = () => {
    const dispatch = useDispatch();
    const numOfCollections = dropdownOptions.length;
    const dropdownLabel = "Select Invoice("+   numOfCollections   + ")";
    const [invoice, setInvoice] = useState("");
    const classes = useStyles();
    const inventoryService = new InventoryService();
    const [options, setOptions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalLabel, setModalLabel] = useState("");

    const [todayDate, setTodayDate] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const [itemName, setItemName] = useState("");
    const [unitsInCase, setUnitsInCase] = useState("");
    const [caseCost, setCaseCost] = useState("");

    const [newUnitCost, setNewUnitCost] = useState("");
    const [newUnitPrice, setNewUnitPrice] = useState("");
    
    const [posProduct, setPosProduct] = useState({
      isReviewed: "",
      Item: "",
      Quantity: "",
      Description: "",
      Price: "",
      POS: "",
      Barcode: "",
      PosSKU: "",
      Size: "",
      Department: "",
      SellerCost: "",
      SellingPrice: "",
    });

    const apiLoader = useSelector(state => state.loaders.apiLoader);
    const loader = useSelector(state => state.loaders.loader);

    let posProducts = []
    let wooComProducts = [];
    let singleItemData = [];
    let updateSku = "";
    let itemNo = "";

//*********************************************************************POS UPDATE STARTS******************************************* */    

  //Function to fetch wooCom Prpducts.
  async function getProducts() {
    console.log("IN WOOCOM PRODUCTS");
    const items = await Promise.all(
      singleItemData.map(async (row) => {
        console.log(row.barcode);
        try {
          const res = await inventoryService.GetProductDetails(row.barcode);
          console.log(res);
          const {
            id,
            name,
            regular_price,
            price,
            sku,
            slug,
            stock_quantity,
            sale_price,
          } = res[0];
          return {
            id,
            name,
            regular_price,
            price,
            sku,
            slug,
            stock_quantity,
            sale_price,
            itemNo: row.itemNo,
          };
        } catch (error) {
          // tempNotFoundProducts.push(row);
          console.log("Couldn't fetch product from woodpress.", row.itemNo);
          return null;
        }
      })
    );
    // setLoader(false);
    // dispatch({type: "LOADER"});
    console.log(items);
    wooComProducts = items;
    // setWooComProducts(items.filter((ele) => ele !== null));
    // setNotFoundProducts(tempNotFoundProducts);
  }    
      
  //function to fetch POS products.
  async function getPosProducts() {
    console.log("IN POS PRODUCTS");
    // setLoader(true);
    // dispatch({type: "LOADER"});
    let hasErrorOccured = false;
    const items = await Promise.all(
      singleItemData
        .map(async (row) => {
          console.log(row.barcode);
          try {
            const res = await inventoryService.GetPOSProductDetails(
              row.barcode
            );
            console.log(res);
            if(!Array.isArray(res)){
              alert("API not working");
              return;
            }
            console.log("fetched pos data", res);
            const { SKU, UPC, ITEMNAME, TOTALQTY, DEPNAME } = res[0];
            console.log(SKU);
            console.log(updateSku);
            if(SKU == updateSku){
              console.log(SKU);
              console.log(updateSku);
              return {
                ...row,
                COST: row.newUnitCost,
                PRICE: row.newUnitPrice,
                SKU,
                UPC,
                ITEMNAME,
                // TOTALQTY:
                //   parseInt(row.qty) * parseInt(row.pieces) + parseInt(TOTALQTY),
                itemNo: row.itemNo,
                isNew: false,
                BUYASCASE: 1,
                // CASEUNITS: row.pieces.toString(),
                // CASECOST: row.unitPrice.toString(),
                DEPNAME,
              };
            } else {
              alert("SKU mismatch!!");
            }

            
            
          } catch (error) {
            hasErrorOccured = true;
            return {
              ...row,
              COST: row.cp,
              PRICE: row.sp,
              SKU: row.posSku,
              UPC: row.barcode,
              ITEMNAME: row.description,
              TOTALQTY: parseInt(row.qty) * parseInt(row.pieces),
              itemNo: row.itemNo,
              isNew: true,
              BUYASCASE: 1,
              CASEUNITS: row.pieces.toString(),
              CASECOST: row.unitPrice.toString(),
              DEPNAME: "",
            };
          }
        })
    );
    if (hasErrorOccured) {
      alert("Couldn't fetch some data from POS");
    }
    // setLoader(false);
    // dispatch({type: "LOADER"});
    console.log(items);
    posProducts = items;
    console.log(posProducts);
    // setPosProducts(items.filter((ele) => ele !== null));
  }

  //PUSH TO WOOCOM.
  const pushToWoocom = async (products) => {
    // setLoader(true);
    // dispatch({type: "LOADER"});
    const responses = await Promise.all(
      products.map(async (product) => {
        try {
          const res = await inventoryService.UpdateProductDetails(product.id, {
            regular_price: product.regular_price,
            stock_quantity: product.stock_quantity,
          });
          const { id, name, regular_price, stock_quantity } = res;
          return {
            id,
            name,
            regular_price,
            stock_quantity,
            itemNo: product.itemNo,
          };
        } catch (error) {
          console.log(error);
          alert("Couldn't update product on website.");
          return null;
        }
      })
    );
    // setLoader(false);
    // dispatch({type: "LOADER"});
  };

  //PUSH TO POS.
  const pushToPOS = async (products) => {
    // setLoader(true);
    // dispatch({type: "LOADER"});
    console.log(products);
    const responses = await Promise.all(
      products.map(async (product) => {
        try {
          const {
            COST,
            PRICE,
            UPC,
            TOTALQTY,
            isNew,
            ITEMNAME,
            BUYASCASE,
            CASEUNITS,
            CASECOST,
            SKU,
            DEPNAME,
            itemNo
          } = product;
          const res = await inventoryService.UpdatePOSProducts(
            JSON.stringify({
              UPC,
              ITEMNAME,
              DESCRIPTION: "",
              PRICE,
              COST,
              QTY: TOTALQTY,
              SIZE: "",
              PACK: "",
              REPLACEQTY: 1,
              DEPARTMENT: DEPNAME,
              CATEGORY: "",
              SUBCATEGORY: "",
              ISFOODSTAMP: 1,
              ISWEIGHTED: 0,
              ISTAXABLE: 1,
              // VENDORNAME: invoice.slug,
              // VENDORCODE: itemNo,
              // VENDORCOST: "",
              ISNEWITEM: isNew ? 1 : 0,
              BUYASCASE,
              CASEUNITS,
              CASECOST,
              COMPANYNAME: invoice.slug,
              PRODUCTCODE: itemNo,
            })
          );
          console.log("updated pos data", res);
          const data = {
            UPC,
            SKU,
            Cost: COST,
            ItemName: ITEMNAME,
            Price: PRICE,
            TotalQty: TOTALQTY,
          };
          //not needed as of now, parikshit.
          // if (isNew) {
          //   const response = await inventoryService.CreateDBProduct(data);
          //   console.log("Created new product", response);
          // } else {
          //   const response = await inventoryService.UpdateDBProduct({
          //     count: parseInt(product.qty) * parseInt(product.pieces),
          //     UPC,
          //   });
          //   console.log("updated existing product", response);
          // }

          console.log("res from POS", res);
          return true;
        } catch (error) {
          console.log(error);
          return null;
        }
      })
    );
    // setLoader(false);
    // dispatch({type: "LOADER"});
  };

  const pushInventoryDetails2 = async () => {
    console.log(posProducts);
    // setLoader(true);
    // let data = singleItemData.map((element) => {
    //   return {
    //     item: element.itemNo,
    //     qty: parseInt(element.qty) * parseInt(element.pieces),
    //     cp: element.unitPrice,
    //     markup: element.markup,
    //     sp: element.sp,
    //     description: element.description,
    //   };
    // });

    // var duplicates = {};
    // for (var i = 0; i < data.length; i++) {
    //   if (duplicates.hasOwnProperty(data[i].item)) {
    //     duplicates[data[i].item].push(i);
    //   } else if (data.lastIndexOf(data[i].item) !== i) {
    //     duplicates[data[i].item] = [i];
    //   }
    // }

    // let tempData = Object.values(duplicates).filter((ele) => ele.length > 1);
    // if (tempData.length > 0) {
    //   tempData.forEach((index) => {
    //     let temp = 0;
    //     index.forEach((val) => {
    //       if (data[val]) {
    //         // console.log("data[val]", data[val]);
    //         temp += data[val].qty;
    //         if (temp - data[val].qty !== 0) {
    //           data[val] = null;
    //         }
    //       }
    //     });
    //     data[index[0]].qty = temp;
    //   });
    // }
    // data = data.filter((ele) => ele !== null);

    /**
     * add the fileds of  data from the woocom & ocr
    */
    console.log(wooComProducts.length);
    // if(wooComProducts[0] != null){
    //   let updatedWoocomProducts = data
    //     .map((product, index) => {
    //       /**find index of the item in fetched woocom product list */
    //       const wooIndex = wooComProducts.findIndex(
    //         (wooProduct) => product.item === wooProduct.itemNo
    //       );
    //       if (wooIndex !== -1) {
    //         /**get the qty & other fileds of the woocom product */
    //         let { id, stock_quantity } = wooComProducts[wooIndex];
    //         stock_quantity += product.qty;
    //         const regular_price = product.sp;
    //         return { id, regular_price, stock_quantity, itemNo: product.item };
    //       }
    //       return null;
    //     })
    //     .filter((item) => item !== null);

    //   console.log(updatedWoocomProducts); 
    //   await pushToWoocom(updatedWoocomProducts);
    //   }
    await pushToPOS(posProducts);

    // setLoader(false);
    // dispatch({type: "LOADER"});
    // if (itemsNotPushed.length === 0) {
    window.alert("Inventory updated successfully");
    // setRedirect(true);
    // } else {
    //   window.alert("Inventory not updated");
    // }
  };

  function toConsoleState() {
    console.log(wooComProducts);
    console.log(posProducts);
    console.log(singleItemData);
  }

  const pushSingleItemToInventory = async (index) =>{
    // setApiLoader(true);
    // dispatch({type: "API_LOADER"});
    const product = [];
    
    const tempTable = [];
    product.push(posProduct);
    console.log(product);
    product.isUpdated = "true";
    itemNo = product.itemNo;
    

    // setLoader(false);
    // dispatch({type: "LOADER"});
    // console.log(tempTable);
    singleItemData = [posProduct];
    singleItemData[0].isUpdated = "true";
    // setPushToInventory(true);
    console.log(singleItemData);
    
    updateSku = singleItemData[0].posSku;


    await getProducts();
    await getPosProducts();
    console.log(posProducts);
    if(posProducts[0] != undefined ){
      await pushInventoryDetails2();
      toConsoleState();
      console.log(singleItemData);
      console.log(singleItemData.itemNo);
      // await inventoryService.UpdateInvoiceData(inv, num, day, singleItemData[0].itemNo); 

      //Update unit cost n price in db, after update POS.
      let data1 = {
        cost: singleItemData[0].newUnitCost,
        price: singleItemData[0].newUnitPrice,
        item: singleItemData[0].itemNo,
        invoice: invoice.slug
      }
      console.log(data1)
      await inventoryService.UpdateDBafterPosUpdate(data1);

      //Log Generate.
      console.log("PRODUCTT");
      console.log(singleItemData);
      const log = {
        InvoiceName: invoice.slug,
        InvoiceDate: "",
        ItemNo: singleItemData[0].itemNo,
        InvoiceDescription: singleItemData[0].description,
        PosDescription: singleItemData[0].pos,
        OldUnitCost: singleItemData[0].unitCost,
        OldUnitPrice: singleItemData[0].unitPrice,
        //OldMargin: singleItemData[0].margin.toFixed(2).toString(),
        OldMargin: (((singleItemData[0].unitPrice - singleItemData[0].unitCost)/singleItemData[0].unitCost)*100).toFixed(2).toString(),
        NewUnitCost: singleItemData[0].newUnitCost,
        NewUnitPrice: singleItemData[0].newUnitPrice,
        //NewMargin:( ((singleItemData[0].sp- singleItemData[0].cp)/ singleItemData[0].cp)*100).toFixed(2).toString(),
        NewMargin: (((singleItemData[0].newUnitPrice - singleItemData[0].newUnitCost)/singleItemData[0].newUnitCost)*100).toFixed(2).toString(),
        UpdateDate: todayDate,
        Person: userEmail,
        TimeStamp: new Date().toTimeString().split(" ")[0], 
        HandWritten: "YES"
      }
      console.log(log);

      const logUpdate = await inventoryService.posLogs(log);
      console.log(logUpdate)

    } else {
      alert("POS not updated!!");
    }
    // setApiLoader(false);
    // dispatch({type: "API_LOADER"});

    
    
  }
//*********************************************************************POS UPDATE ENDS******************************************* */


  const updateItem = async () => {
    const data = {
      invoiceName: invoice.slug,
      itemName: itemName,
      value: {
        isReviewed: "true",
        Item: itemName,
        Quantity: unitsInCase,
        Description: posProduct.Description,
        Price: caseCost,
        POS: posProduct.POS,
        Barcode: posProduct.Barcode,
        PosSKU: posProduct.PosSKU,
        Size: posProduct.Size,
        Department: posProduct.Department,
        SellerCost: newUnitCost,
        SellingPrice: newUnitPrice,
      }
    }
    console.log(data)

    const result = await inventoryService.UpdateProductFields(data);
    console.log(result);


  }


  const toggleModal = () => {
    console.log(posProduct);
    setShowModal(!showModal);
  };

  const handleChange = (key, val) => {
    setPosProduct({
      ...posProduct,
      [key]: val,
    });
  };

  const addProduct = () => {
    setShowModal(!showModal);
    console.log(posProduct);
    const data = {
      InvoiceName: invoice.slug,
      ItemName: posProduct.itemName,
      POS: posProduct.pos, 
      Barcode: posProduct.barcode, 
      PosSKU: posProduct.posSku, 
      Size: posProduct.size, 
      Department: posProduct.department,
      SellerCost: posProduct.unitCost,
      SellingPrice: posProduct.unitPrice,
      NewUnitCost: posProduct.newUnitCost,
      NewUnitPrice: posProduct.newUnitPrice
    };
    
    inventoryService
      .handwrittenLogs(data)
      .then((res) => {
        if (!res) {
          throw new Error("Product not created")
        }
        console.log(res);
        alert("Successfully updated fields");
      })
      .then()
      .catch((err) => {
        console.log(err);
        alert("Some error occuured in creating product");
      })
      .finally();
  };

  const hicksvilleDropdownNew = async (event, value, index) => {
    console.log(event);
    console.log(value);
    console.log(value.length);
    setOptions([]);

    if(!isNaN(value) && value.length>0 ){
      console.log("number");
      const res = await inventoryService.getHicksvilleData(value.toUpperCase());
      const data = res;
      console.log(data);


      let productsString = "";
      for(let i=0;i<data.length;i++){
        productsString = productsString + data[i].name + '$$$';
      } 
      let result = productsString.split("$$$");
    
      let newData = [];
      for (let i = 0; i < result.length; i++) {
        let s = result[i].split("@@@");
        let obj =
          {
            sku: s[1] === "nan" ? null : s[1],
            upc: s[0] === "nan" ? null : s[0],
            altupc1: s[14] === "nan" ? null : s[14],
            altupc2: s[15] === "nan" ? null : s[15],
            name: s[2] === "nan" ? null : s[2],
            vintage: s[8] === "nan" ? null : s[8],
            totalQty: s[13] === "nan" ? null : s[13],
            cost: s[4] === "nan" ? null : s[4],
            pricea: s[10] === "nan" ? null : s[10],
            priceb: s[11] === "nan" ? null : s[11],
            pricec: s[12] === "nan" ? null : s[12],
            department: s[9] === "nan" ? null : s[9],
            salePrice: s[5] === "nan" ? null : s[5],
            size: s[6] === "nan" ? null : s[6],
            pack: s[7] === "nan" ? null : s[7],
            price: s[3] === "nan" ? null : s[3],
          }
        newData.push(obj);
      }
      const filter = newData.map((element) => {
        let obj = { ...element };
        obj.label = `${element.name}--${element.price}--${element.upc}--${element.size}--${element.cost}--${element.sku}`;
        //console.log(obj);
        return obj; 
      });
      setOptions(filter);

    }

    if(isNaN(value) && value != null && value.length>=4){
      console.log("string");
      // setDropdownLoader(true);
      // setFetchingOptions(true);
      const res = await inventoryService.getHicksvilleData(value.toUpperCase());
      const data = res;
      console.log(data);


      let productsString = "";
      for(let i=0;i<data.length;i++){
        productsString = productsString + data[i].name + '$$$';
      } 
      let result = productsString.split("$$$");
    
      let newData = [];
      for (let i = 0; i < result.length; i++) {
        let s = result[i].split("@@@");
        let obj =
          {
            sku: s[1] === "nan" ? null : s[1],
            upc: s[0] === "nan" ? null : s[0],
            altupc1: s[14] === "nan" ? null : s[14],
            altupc2: s[15] === "nan" ? null : s[15],
            name: s[2] === "nan" ? null : s[2],
            vintage: s[8] === "nan" ? null : s[8],
            totalQty: s[13] === "nan" ? null : s[13],
            cost: s[4] === "nan" ? null : s[4],
            pricea: s[10] === "nan" ? null : s[10],
            priceb: s[11] === "nan" ? null : s[11],
            pricec: s[12] === "nan" ? null : s[12],
            department: s[9] === "nan" ? null : s[9],
            salePrice: s[5] === "nan" ? null : s[5],
            size: s[6] === "nan" ? null : s[6],
            pack: s[7] === "nan" ? null : s[7],
            price: s[3] === "nan" ? null : s[3],
          }
        newData.push(obj);
      }
      const filter = newData.map((element) => {
        let obj = { ...element };
        if(element.itemNo != "undefined"){
        obj.label = `${element.name}--${element.price}--${element.upc}--${element.size}--${element.cost}--${element.sku}`;
        }
        //console.log(obj);
        return obj; 
      });
      setOptions(filter);
    }
  }

  useEffect(() => {

    const curDate = new Date();
    console.log(curDate);
    let date = curDate.getFullYear()+ "-" + (curDate.getMonth()+1) +"-"+ curDate.getDate();
    console.log(date);
    setTodayDate(date);

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // setUserEmail(user.email);
        setUserEmail(user.email);
        console.log('This is the user: ', user)
        console.log('This is the user: ', user.email);
      } else {
        // No user is signed in.
        console.log('There is no logged in user');
      }
    });

  },[]);
    
  return (

      <div className="container-fluid">
          <Paper className={classes.root}>
              <Grid style={{ display: "flex" }}>
                  <ul>
                  <li>
                  <Autocomplete
                      value={invoice}
                      onChange={(event, newValue) => {
                          console.log("new value", newValue)
                          if (newValue) {
                          setInvoice(newValue);
                          }
                          // getInvoices(newValue);
                      }}
                      id="combo-box"
                      options={dropdownOptions}
                      getOptionLabel={(option) => option.value}
                      style={{ width: 250 }}
                      autoHighlight
                      renderInput={(params) => (
                          <TextField {...params} label={dropdownLabel} variant="outlined" />
                      )}
                  />
                </li>
                <br />

                <li>
                <TextField
                      label="Item Name"
                      variant="outlined"
                      value={posProduct.Item}
                      onChange={(event) => {
                        handleChange("Item", event.target.value);
                        setItemName(event.target.value);
                        }
                      }
                  />
                </li>
                <br />
              <li>
              <Autocomplete
                  value={posProduct.POS}
                  loading={true}
                  onInputChange={(event, value) => {
                    console.log("ON INPUT CHANGE");
                    // event.toLowerCase();
                    // value.toLowerCase();
                    // console.log(event.target.value);
                    // console.log(value);
                    // searchDropdown(event, value);
                    // setOptions([]);
                    if(event != null){
                      setTimeout(()=> {
                        hicksvilleDropdownNew(event, value);

                      }, 1500);
                    }
                    // hicksvilleDropdownNew(event, value, index);
                  }}
                  onChange={(event, newValue) => {
                    // console.log(event.target.value);
                    // console.log(newValue);
                    if (newValue) {
                      let newState = { ...posProduct };
                      console.log(newValue);
                      newState.Item = itemName;
                      newState.isReviewed = "true";
                      // newState.item = element.itemNo
                      newState.Description = newValue.name;
                      newState.Barcode = newValue.upc;
                      newState.POS = newValue.name;
                      newState.PosSKU = newValue.sku;
                      newState.Size = newValue.size;
                      newState.Department = newValue.department;
                      newState.SellerCost = newValue.cost;
                      newState.SellingPrice = newValue.price;
                      // setShowPosState(newState);
                      // setShowPosIndex(index);
                      // setUnitCost(newValue.cost);
                      // setStateUpdated("");
                      setPosProduct(newState);
                      singleItemData = []
                      
                      //setDisabled(false);
                      //updateOnHoverDetails(index);
                      //setShowPosIndex(index);
                      // console.log(newValue);
                      console.log(newState);
                      //console.log(showPosState);
                      toggleModal();
                      
                    }
                  }}
                  id="combo-box"
                  // options={element.fuzzSuggestion}
                  options={options}
                  // getOptionLabel={option => option.label}
                  getOptionLabel={(option) => option.label ?? posProduct.item}
                  // getOptionLabel={(option) => dropdownLoader ? <Spinner /> : option.label}
                  style={{ width: 400 }}
                  renderInput={(params) => (
                    <TextField {...params} label="POS Product" variant="outlined" />
                  )}
                />
                </li >
                </ul>
                  </Grid>
          </Paper>

          <CModal show={showModal} onClose={toggleModal}>
      <CModalHeader closeButton>{modalLabel}</CModalHeader>
      <CModalBody>
        <CContainer fluid>
          <CRow>
            <CCol sm="12">
              <CRow>
                <CCol sm="6">
                  <CFormGroup>
                    <CLabel htmlFor="type">Barcode</CLabel>
                    <CInput 
                      disabled
                      type="text"
                      name="type"
                      value={posProduct.Barcode}
                      onChange={(event) =>
                        handleChange("Barcode", event.target.value)
                      }
                    />
                  </CFormGroup>
                </CCol>
                <CCol sm="6">
                  <CFormGroup>
                    <CLabel htmlFor="short_description">POS SKU</CLabel>
                    <CInput
                      disabled
                      type="text"
                      name="short_description"
                      value={posProduct.PosSKU}
                      onChange={(event) =>
                        handleChange("PosSKU", event.target.value)
                      }
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CFormGroup>
                <CLabel htmlFor="regular_price">POS Name</CLabel>
                <CInput
                  disabled
                  type="text"
                  name="regular_price"
                  value={posProduct.POS}
                  onChange={(event) =>
                    handleChange("POS", event.target.value)
                  }
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="size">POS Size</CLabel>
                <CInput
                  disabled
                  type="text"
                  name="size"
                  value={posProduct.Size}
                  onChange={(event) =>
                    handleChange("Size", event.target.value)
                  }
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="department">Department</CLabel>
                <CInput
                  disabled
                  type="text"
                  name="department"
                  value={posProduct.Department}
                  onChange={(event) =>
                    handleChange("Department", event.target.value)
                  }
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="unitsInCase">Units In Case</CLabel>
                <CInput
                  type="text"
                  name="unitsInCase"
                  value={unitsInCase}
                  onChange={(event) =>
                    setUnitsInCase(event.target.value)
                  }
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="caseCost">Case Cost</CLabel>
                <CInput
                  type="text"
                  name="caseCost"
                  value={caseCost}
                  onChange={(event) =>
                    setCaseCost(event.target.value)
                  }
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="unitPrice">POS Unit Price</CLabel>
                <CInput
                  disabled
                  type="text"
                  name="unitPrice"
                  value={posProduct.SellingPrice}
                  onChange={(event) =>
                    handleChange("SellingPrice", event.target.value)
                  }
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="unitCost">POS Unit Cost</CLabel>
                <CInput
                  disabled
                  type="text"
                  name="unitCost"
                  value={posProduct.SellerCost}
                  onChange={(event) =>
                    handleChange("SellerCost", event.target.value)
                  }
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="newUnitCost">New POS Unit Cost</CLabel>
                <CInput
                  type="text"
                  name="newUnitCost"
                  value={newUnitCost}
                  onChange={(event) =>
                    setNewUnitCost(event.target.value)
                  }
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="newUnitPrice">New POS Unit Price</CLabel>
                <CInput
                  type="text"
                  name="newUnitPrice"
                  value={newUnitPrice}
                  onChange={(event) =>
                    setNewUnitPrice(event.target.value)
                  }
                />
              </CFormGroup>
            </CCol>
          </CRow>
        </CContainer>
      </CModalBody>
      <CModalFooter>
        {/* <CButton color="primary" onClick={() => addProduct()}> */}
        <CButton color="primary" onClick={() => updateItem()}>
          Add
        </CButton>{" "}
        <CButton color="secondary" onClick={toggleModal}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
      </div>    
  )
}

export default HandwrittenInvoice;