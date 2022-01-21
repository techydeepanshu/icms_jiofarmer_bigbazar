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
import { TesseractService } from "../../services/TesseractService";
import Button from "../../UI/Button";
import styles from "../DisplayData/DisplayData.module.css";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Cancel from "@material-ui/icons/Cancel";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

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
    // const [loader, setLoader] = useState();
    const tesseractService = new TesseractService();
    const [tableData, setTableData] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    const [itemNoDropdown, setItemNoDropdown] = useState([]);

    const dispatch = useDispatch();
    const numOfCollections = dropdownOptions.length;
    const dropdownLabel = "Select Invoice("+   numOfCollections   + ")";
    // const [invoice, setInvoice] = useState("");
    let invoice = "";
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

    const [showPosIndex, setShowPosIndex] = useState(-1);
    const showPosState = useSelector(state => state.showPosState);
    const notFounds = useSelector(state => state.redItems.notFounds);

    const [detailsModal, setDetailsModal] = useState(false);
    const [details, setDetails] = useState("");
    const [detailsIndex, setDetailsIndex] = useState(-1);
    const [unitCost, setUnitCost] = useState("");
    const [redState, setRedState] = useState("true");

    // ************** Added by Deepanshu *****************
    // const [inv, setInv] = useState("");
    const inv = useSelector(state => state.openInvoice.inv);
    // const [ num, setNum] = useState("");
    const num = useSelector(state => state.openInvoice.num);
    // const [day, setDay] = useState("");
    const day = useSelector(state => state.openInvoice.day);

    const [invoiceNo, setInvoiceNo] = useState("");
    const [date, setDate] = useState("");
    const [selectedDropdown, setSelectedDropdown] = useState(dropdownOptions[0]);
    // ************** Added by Deepanshu *****************
    
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

    const header = [
      "Serial No.",
      "Barcode",
      "POS SKU",
      "Qty Shipped",,
      "Unit Cost",
      "ITEM NO",
      "Link Product",
      
      "DESCRIPTION",
      "Units in  Case",
      "Case cost",
      "Extended Price",
     
      "Unit Price",
      "Mark up (%)",
      "Add Details",
      // "Tick to Delete",
      "Update POS",
      // "Reverse POS Update",
      "NO LINKING",
      "Serial No.(2)"
  ];

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
  const reverseUpdate = async(index) => {
  console.log(index);
  console.log(tableData);
  console.log(tableData[index]);
  let item = tableData[index];
  let data = {
    invoice: invoice.slug,
    itemNo: item.itemNo,
  }
  const result = await inventoryService.reverseUpdate(data);
  console.log(result);
  if(result.ok == 1){
    setProductsInTable();
  }else {
    alert("Some error occured in updation");
  }
    }

  const linkManually = async(index) => {
  console.log(index);
  console.log(tableData);
  console.log(tableData[index]);
  let item = tableData[index];
  console.log(item)
  let data = {
    invoice: invoice.slug,
    itemNo: item.itemNo,
  }
  const result = await inventoryService.linkManually(data);
  console.log(result);

  //Update unit cost from excel.
  // const skuData = {sku: item.posSku};
  // const res = await inventoryService.fetchProductFromPosList(skuData);
  // console.log(res); 



  //Log Generate.
  const costChange = item.cp - item.cost;
  const invError = item.cp >= 3*item.cost ? "YES" : "";
  console.log(invError);
  let logState = {
    InvoiceDescription: item.description,
    PosDescription: item.posName,
    SKU: item.posSku,
    Barcode: item.barcode,
    InvoiceName: invoice.slug,
    ItemCode: item.itemNo,
    LinkingDate: todayDate,
    PersonName: userEmail,
    Size: item.size,
    PosUnitCost: item.cost,
    PosUnitPrice: item.sellingPrice,
    // InvoiceNo: num,
    // InvoiceDate: day,
    Department: item.department,
    InvUnitCost: item.cp,
    CostIncrease: invError == "YES" ? "" : costChange > 0 ? "YES" : "",
    CostDecrease: invError == "YES" ? "" : costChange < 0 ? "YES" : "",
    CostSame: invError == "YES" ? "" : costChange == 0 ? "YES" : "",
    InvError: invError
  }
  console.log(logState);
  const logResult = await inventoryService.linkManuallyLog(logState);
  console.log(logResult);
  
  
  
  
  if(result.statusText == "OK"){
    setProductsInTable();
    // setProductsInTableNew(inv, num, day);
  }else {
    alert("Some error occured in updation");
    setProductsInTable();
    // setProductsInTableNew(inv, num, day);
  }

    }

  const updateUnits = async (index) => {
    const item = tableData[index];
    console.log(item);
    const data = {
      invoiceName: invoice.slug,
      itemName: item.itemNo,
      value: {
        Quantity: item.pieces
      }
    }
    inventoryService
    .UpdateProductFields(data)
    .then((res) => {
      if (!res) {
        throw new Error("Product not updated")
      }
      console.log(res);
      alert("Successfully updated fields");
      // setStateUpdated(true);
    })
    .catch((err) => {
      console.log(err);
      alert("Some error occuured in creating product");
    })
    .finally(setProductsInTable());
    // console.log(res);
    }

  const linkingCorrect = async (index) => {
      console.log(index);
      console.log(tableData);
      console.log(tableData[index]);
      let item = tableData[index];
      console.log(item)
      let data = {
        invoice: invoice.slug,
        itemNo: item.itemNo,
      }
      console.log(data);
      const res = await inventoryService.linkingCorrect(data);
      console.log(res);
      if(res.statusText == "OK") {
        
        const costChange = item.cp - item.cost;
        const invError = item.cp >= 3*item.cost ? "YES" : "";
        
        let logState = {
          InvoiceDescription: item.description,
          PosDescription: item.posName,
          SKU: item.posSku,
          Barcode: item.barcode,
          InvoiceName: invoice.slug,
          ItemCode: item.itemNo,
          LinkingDate: todayDate,
          PersonName: userEmail,
          Size: item.size,
          PosUnitCost: item.cost,
          PosUnitPrice: item.sellingPrice,
          // InvoiceNo: num,
          // InvoiceDate: day,
          Department: item.department,
          InvUnitCost: item.cp,
          CostIncrease: "",
          CostDecrease: "",
          CostSame:  "",
          Unidentified: "YES",
          InvError: invError  
        }
        const res = await inventoryService.UnidentifiedLog(logState);
        console.log(res);
        alert("SUCCESS");
        setProductsInTable();
      }else {
        alert("Some error occured");
        setProductsInTable();
      }
    }

  // const reversePOSUpdate = async(index) => {
  //   console.log(index);
  //   console.log(tableData);
  //   console.log(tableData[index]);
  //   let item = tableData[index];
  //   const result = await inventoryService.reversePOSUpdate(inv, num, day, item.itemNo);
  //   if(result.ok == 1){
  //     setProductsInTable();
  //   }else {
  //     alert("Some error occured in updation");
  //   }

  // }

  
 

  const renderTableHeader = () => {
  return header.map((key, index) => {
    return (
      <th
        key={index}
        style={{
          position: "sticky",
          top: "70px",
          background: "grey",
        }}
      >
        {key.toUpperCase()}
      </th>
    );
  });
    };

    const renderTableData = () => {
      // hicksvilleDropdown(HicksData);
  
      if (tableData) {
        console.log(tableData);
  
        // console.log(showPosIndex);
        // console.log(tableData[0]);
        
        let rows = tableData.map((element, index) => {
          //fuzzwuzzSuggestion = getFuzzwuzzSuggestion(element.description);
          // let isEmpty =
          //   element.qty === "" ||
          //   element.itemNo === "" ||
          //   !element.pieces ||
          //   isNaN(element.unitPrice) ||
          //   element.unitPrice === "" ||
          //   isNaN(element.extendedPrice);
          let isEmpty = false;
          // if (isEmpty && element.show) {
          //   let emptyColumn = [...emptyColumnList, index];
          //   emptyColumnList = [...new Set(emptyColumn)];
          // }
          // let isFree = element.qty != 0 && element.extendedPrice === "0.00";
          // console.log(element.isUpdated);
          console.log(element);
          let margin = ((element.sellingPrice - element.cost)/ element.cost)*100;
          
  
          return (
            <tr
              key={index}
              className={isEmpty ? styles.red : null}
              // style={element.show ? { opacity: "1" } : { opacity: "0.4" }}
              style={element.linkingCorrect == "false" ? {backgroundColor: "pink"} : element.isUpdated === "true"  ? {backgroundColor: "lightGreen"}
                : element.show ? { opacity: "1" } : { opacity: "0.4" }}
            >
              <td>{index + 1}</td>
             
              {/* <td>
                <TextField
                  type="tel"
                  value={element.details}
                  id="outlined-secondary"
                  variant="outlined"
                  onChange={(e) => {
                    handleChange(index, "details", e.target.value);
                  }}
                  style={{ width: 100 }}
                />
              </td> */}
              <td className={styles.element}>
                <TextField
                  type="tel"
                  value={showPosIndex === index ? showPosState.barcode : element.barcode}
                  id="outlined-secondary"
                  variant="outlined"
                  onChange={(e) => {
                    handleChange(index, "barcode", e.target.value);
                  }}
                  style={{ width: 150 }}
                />
                <IconButton
                  color="primary"
                  aria-label="add to review"
                  // onClick={() => addForReview(element, index)}
                >
                  <InfoOutlinedIcon
                    style={element.isReviewed  === "true" ? {fill: "red"} : null}
                  /> 
                  {/* <AddShoppingCartIcon
                    style={
                      reviewItems.includes(index)
                        ? { backgroundColor: "green" }
                        : null
                    }
                  /> */}
                </IconButton>
                <div className={element.isReviewed  === "true" ? styles.tooltipIsReviewed: styles.tooltip} >
                  <p>POS Product- {showPosIndex === index ? showPosState.pos : element.posName }</p>
                  {/* <p>UPC- {showPosIndex === index ? showPosState.barcode : element.barcode}</p> */}
                  <p>Size- {showPosIndex === index ? showPosState.size : element.size}</p>
                  <p>Department - {showPosIndex === index ? showPosState.department : element.department}</p>
                  <p>Margin(%) - {margin.toFixed(2)}</p>
                  <p>Unit Cost- {showPosIndex === index ? showPosState.unitCost : element.cost}</p> 
                  <p>Unit Price- {showPosIndex === index ? showPosState.unitPrice : element.sellingPrice}</p>
                  {/* <p>Price- {showPosIndex === index ? showPosState.price : element.price}</p> */}
                  <div >
                  <button onClick={() => {
                          if(notFounds === "true"){
                            toggleModal("notfounds");
                          }else{
                            updateItem(invoice.slug, (parseFloat(element.unitPrice) / parseInt(element.pieces)).toFixed(2))
                          }
                        } } 
                    disabled={showPosIndex === index ? false : true}
                    style={{backgroundColor: "green",
                    border: "none",
                    color: "white",
                    padding: "4px 8px",
                    textAlign: "center",
                    textDecoration: "none",
                    display: "inline-block",
                    fontSize: "14px",
                    align: "left"}} >
                    Update Item
                  </button>
                  </div> 
                  <br />
                  <div>
                  <button onClick={()=> linkManually(index)} 
                    // disabled={showPosIndex === index ? false : true}
                    style={{backgroundColor: "blue",
                    border: "none",
                    color: "white",
                    padding: "4px 8px",
                    textAlign: "center",
                    textDecoration: "none",
                    display: "inline-block",
                    fontSize: "14px",
                    align: "left"}} >
                    Link Manually
                  </button>
                  </div>
                  <br />
                  <div>
                  <button onClick={()=> reverseUpdate(index)} 
                    // disabled={showPosIndex === index ? false : true}
                    style={{backgroundColor: "red",
                    border: "none",
                    color: "white",
                    padding: "4px 8px",
                    textAlign: "center",
                    textDecoration: "none",
                    display: "inline-block",
                    fontSize: "14px",
                    align: "left"}} >
                    Reverse Update
                  </button>
                  </div>
                </div>
              </td>
              <td>{showPosIndex === index ? showPosState.posSku : element.posSku}</td>
              <td>
                <TextField
                  type="tel"
                  value={element.qty}
                  id="outlined-secondary"
                  variant="outlined"
                  onChange={(e) => {
                    handleChange(index, "qty", e.target.value);
                  }}
                  style={{ width: 100 }}
                />
              </td>
              <td>{element.cp}</td>
              <td>
                <Autocomplete
                  value={element.itemNo}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      handleChange(index, "itemNo", newValue);
                    }
                  }}
                  id="combo-box"
                  options={itemNoDropdown}
                  getOptionLabel={(option) => option}
                  style={{ width: 200 }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </td>
              <td>
              {/* {dropdownIndex == index ? fetchingOptions ? <Loading type="ThreeDots" height={40} width={40} /> : null : null} */}
                <Autocomplete
                  value={showPosIndex  === index ? showPosState.item : element.itemNo }
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
                        hicksvilleDropdownNew(event, value, index);

                      }, 1500);
                    }
                    // hicksvilleDropdownNew(event, value, index);
                  }}
                  onChange={(event, newValue) => {
                    // console.log(event.target.value);
                    // console.log(newValue);
                    if (newValue) {
                      let newState = { ...showPosState };
                      console.log(newValue);
                      // newState.item = newValue.name;
                      newState.item = element.itemNo
                      newState.description = newValue.name;
                      newState.barcode = newValue.upc;
                      newState.pos = newValue.name;
                      newState.posSku = newValue.sku;
                      newState.size = newValue.size;
                      newState.department = newValue.department;
                      newState.unitCost = newValue.cost;
                      newState.unitPrice = newValue.price;
                      // setShowPosState(newState);
                      dispatch({type: "SET_POS_STATE", data: newState})
                      setShowPosIndex(index);
                      setUnitCost(newValue.cost);
                      // setStateUpdated("");
                      if(isEmpty){
                        // setNotFounds("true");
                        dispatch({type: "NOT_FOUNDS", data: "true"})

                        setRedState("false");
                      }
                      //setDisabled(false);
                      //updateOnHoverDetails(index);
                      //setShowPosIndex(index);
                      // console.log(newValue);
                      console.log(newState);
                      //console.log(showPosState);
                      
                    }
                  }}
                  id="combo-box"
                  // options={element.fuzzSuggestion}
                  options={options}
                  // getOptionLabel={option => option.label}
                  getOptionLabel={(option) => option.label ?? element.itemNo}
                  // getOptionLabel={(option) => dropdownLoader ? <Spinner /> : option.label}
                  style={{ width: 400 }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </td>
              
              <td>{element.description}</td>
              {/* <td>{element.pieces}</td> */}
              <td>
                <TextField
                  type="tel"
                  value={element.pieces}
                  variant="outlined"
                  onChange={(e) => {
                    handleChange(index, "pieces", e.target.value);
                  }}
                  style={{ width: 100 }}
                />
                <button onClick={() => {updateUnits(index)}} style={{
                  backgroundColor: "#008CBA",
                  border: "none",
                  color: "white",
                  padding: "5px 16px",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "inline-block",
                  fontSize: "10px",
                  margin: "4px 2px",
                  cursor: "pointer",
                }}>Update Units</button> 
              </td>
              <td>
                <TextField
                  type="tel"
                  value={element.unitPrice}
                  variant="outlined"
                  onChange={(e) => {
                    handleChange(index, "unitPrice", e.target.value);
                  }}
                  style={
                    element.priceIncrease === 1
                      ? { backgroundColor: "#1a8cff", width: 100 }
                      : element.priceIncrease === -1
                      ? { backgroundColor: "#ffb31a", width: 100 }
                      : { width: 100 }
                    // showPosIndex === index ? costInc==="true" ? { backgroundColor: "#1a8cff", width: 100 } : costDec==="true" ? { backgroundColor: "#ffb31a", width: 100 } : {width: 100}
                    //   : element.priceIncrease === 1 
                    //       ? { backgroundColor: "#1a8cff", width: 100 }
                    //       : element.priceIncrease === -1 
                    //       ? { backgroundColor: "#ffb31a", width: 100 }
                    //       : { width: 100 }
                  }
                />
              </td>
              <td>{element.extendedPrice}</td>
              
              <td>
                <TextField
                  type="tel"
                  value={element.sp}
                  variant="outlined"
                  onChange={(e) => {
                    handleChange(index, "sp", e.target.value);
                  }}
                  style={{ width: 100 }}
                />
              </td>
              <td>{element.markup}</td>
              {/* <td>
                <Checkbox
                  checked={!element.show}
                  onChange={(e) => handleChange(index, "show", e.target.value)}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </td> */}

                <td className={styles.element}>
                <IconButton onClick={() => {
                  toggleModal("details");
                  setDetailsIndex(index);
                  }}>
                    <AddCircleIcon />
                  </IconButton>
                  <div className={styles.tooltip}>
                    <p>Details- {element.details}</p>
                  </div>
                  
              </td>


              <td>
            {/* <Button
              text={element.show ? "Delete" : "Undo"}
              color="btn btn-info"
              type="submit"
              onClick={() => deleteRow(index)}
            /> */}
          </td>
              <td>
              <Button 
                  text="Update POS"
                  color="btn btn-info"
                  type="submit"
                  onClick={() => pushSingleItemToInventory(index)}
                  style={{ width: 120 }}
                />
                    
              </td>
              {/* <td>
              <Button 
                  text="Reverse POS"
                  type="submit"
                  onClick={() => reversePOSUpdate(index)}
                  style={{ width: 120, backgroundColor: "red", color: "white" }}
                />
                    
              </td> */}
              <td className={styles.element}>
                <IconButton onClick={() => linkingCorrect(index)}>
                  <Cancel/>
                </IconButton>
              </td>
              <td>{index + 1}</td>
              {/* <td>
                <Button
                  text={element.show ? "Delete" : "Undo"}
                  color="btn btn-info"
                  type="submit"
                  onClick={() => deleteRow(index)}
                />
              </td> */}
            </tr>
          );
        });
        return (
          <div style={{ marginTop: "35px" }}>
            <table className="table table-hover table-responsive-sm">
              <tbody>
                <tr>{renderTableHeader()}</tr>
                {rows}
                <tr>
                  <td>
                    {/* <Button
                      text="Add cell"
                      color="btn btn-info"
                      onClick={addRow}
                    /> */}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={styles.divRow}>
              {/* <Button
                text="Update Inventory"
                color="btn btn-info"
                type="submit"
                onClick={pushInventoryDetails}
              /> */}
              {/* <Button
                text="Save Invoice Data"
                color="btn btn-info"
                type="submit"
                onClick={toggleModal}
              /> */}
              {/* <Button
                text="Re upload"
                color="btn btn-info"
                type="submit"
                onClick={() => window.location.reload()}
              /> */}
            </div>
          </div>
        );
      }
  };

  const updateItem = async () => {
    console.log("updateItem_selectedDropdown : ",selectedDropdown);
    console.log("updateItem_InvoiceNo : ",invoiceNo);
    console.log("updateItem_date : ",date);
    console.log("updateItem_itemName : ",itemName);
    const data = {
  
      invoiceName: selectedDropdown.slug,
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

    // const result = await inventoryService.UpdateProductFields(data);
    // console.log(result);


  }

  const getItems = async () => {
    // const data = {
    //   invoice: invoice.slug,
    // }
    const data = invoice;
    console.log(data);
    const res = await inventoryService.getItemForHandwrittenInvoice(data);
    console.log(res);
    return res;
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

  const setProductsInTable = () => {
    // setLoader(true);
    dispatch({type: "LOADER"});
    async function invoiceData() {
      const products = await tesseractService.GetProductDetails(
        invoice.slug
        // inv
      );
      console.log(products);
      //console.log(props.selectedInvoice);
      return products;
    }
      // invoiceData()
      getItems()  
      .then((products) => {
          /**post processing the table data after returning from filter */
          // function convertToUpperCase(obj) {
          //   let newObj = {};
          //   for (let key in obj) {
          //     newObj[key.toUpperCase()] = obj[key];
          //   }
          //   return newObj;
          // }
          // products = convertToUpperCase(products);
          console.log(products);
          // scanInvoiceData.InvoiceData = ocrData;
        //   setOcrProducts(ocrData);
          
        //   console.log(scanInvoiceData);
          // scanInvoiceData.InvoiceData = ocrData;
          //console.log(resScnInvDta);
          //console.log("OCERDATa", ocrData);
          //console.log(products);
          //console.log(scanInvoiceData);
          let table = products.map((row) => {
            /**For invoices which dont have item no, set description as item no */
            if (row.itemNo === undefined) {
              // row.itemNo = row.description.trim().toUpperCase();
              // row.itemNo = row.Description.trim().toUpperCase();
              row.itemNo = row.Description.trim();
            }
            // row.itemNo = row.itemNo.toString().toUpperCase();
            // row.itemNo = row.Item.toString().toUpperCase();
            row.itemNo = row.Item.toString();

            row.description = row.Description;
              // products[row.itemNo] !== undefined
              //   ? products[row.itemNo].Description
              //   : row.description;
            row.pieces = row.Quantity; 
              // products[row.Item] !== undefined
              //   ? products[row.Item].Quantity
              //   : 0;
            row.sku = row.sku
              // products[row.Item] !== undefined
              //   ? products[row.Item].sku
              //   : "";
            row.barcode = row.Barcode;
              // products[row.Item] !== undefined
              //   ? products[row.Item].Barcode
              //   : "";
            row.posName = row.POS
              // products[row.Item] !== undefined
              //   ? products[row.Item].POS
              //   : "";
            row.markup = 0;
            row.show = true;
            row.posSku = row.PosSKU
              // products[row.Item] !== undefined
              //   ? products[row.Item].PosSKU
              //   : "";
            row.isReviewed = row.isReviewed 
              // products[row.Item] !== undefined ? products[row.Item].isReviewed : "" ;
            row.size = row.Size
              // products[row.Item] !== undefined ? products[row.Item].Size : "";
            row.department = row.Department 
              // products[row.Item] !== undefined ? products[row.Item].Department : "";
            row.cost = row.SellerCost 
              // products[row.Item] !== undefined ? products[row.Item].SellerCost : "";
            row.sellingPrice = row.SellingPrice 
              // products[row.Item] !== undefined ? products[row.Item].SellingPrice : "";
            row.price = row.Price 
              // products[row.Item] !== undefined ? products[row.Item].Price : "";
            row.details = row.Details 
              // products[row.Item] !== undefined ? products[row.Item].Details : "";
            row.linkingCorrect = row.linkingCorrect; 
              // products[row.Item] !== undefined ? products[row.Item].LinkingCorrect : "";
            // row.margin = products[row.Item] !== undefined ? ((products[row.Item].SellingPrice - products[row.Item].SellerCost)/ products[row.Item].SellerCost)*100 : "";
            row.margin = row.Item !== undefined ? ((row.SellingPrice - row.SellerCost)/ row.SellerCost)*100 : "";
            //console.log("department-" + row.department + "  cost-" + row.cost + "  price" + row.sellingPrice);
            let sp = 0;
            let cp = 0;
            // const barcode = products.Barcode
            // if (parseInt(row.pieces)) {
            //   sp = (parseFloat(row.unitPrice) / parseInt(row.pieces)).toFixed(
            //     2
            //   );
            //   cp = sp;
            // }
            row.cp = "";
            row.sp = "";
            if (row.Item !== undefined) {
              if (sp > row.SellerCost) {
                row["priceIncrease"] = 1;
              } else if (sp < +row.SellerCost) {
                row["priceIncrease"] = -1;
              } else if (sp == +row.SellerCost) {
                row["priceIncrease"] = 0;
              }
            } else {
              row["priceIncrease"] = 0;
            }
            // if (products[row.Item] !== undefined) {
            //   if (sp > +products[row.Item].SellerCost) {
            //     row["priceIncrease"] = 1;
            //   } else if (sp < +products[row.Item].SellerCost) {
            //     row["priceIncrease"] = -1;
            //   } else if (sp == +products[row.Item].SellerCost) {
            //     row["priceIncrease"] = 0;
            //   }
            // } else {
            //   row["priceIncrease"] = 0;
            // }
            row.qty = "";
            row.extendedPrice = "";
            /**filter out the rows for which qty shipped & extendedPrice is zero */
            if (row.qty == "0" && row.extendedPrice === "0.00") {
              return null;
            }
            /**Calulate qty for which qty is not read/scanned by textract */
            // if (!row.qty) {
            //   row.qty = (
            //     parseFloat(row.extendedPrice) / parseFloat(row.unitPrice)
            //   ).toFixed(0);
            // }
          return { ...row, sp, cp };
          });
          // setLoader(false);
          dispatch({type: "LOADER"});

          setTableData(table.filter((data) => data !== null));
          setItemNoDropdown(Object.keys(products));
          setProductDetails(products);
        })
        .catch((err) => {
          console.log("error on mapping ocrdata", err)
          // setLoader(false);
          dispatch({type: "LOADER"});
        });
    
  }

  // ************* Add by Deepanshu *****************
  // const fetchSavedData = async(invoice = inv, no = num, date = day) => {
  //   const data =  await tesseractService.GetSavedInvoiceData(invoice, no, date);
  //   console.log("fetchSavedData_data : ",data);
  //   if(data.length === 0) {
  //     alert("Invoice doesnt Exist!!");
  //   }else return data[0].InvoiceData;
  //   // console.log(data);
  //   // console.log(data[0].InvoiceData);
    
  // };

  async function invoiceData() {
    const products = await tesseractService.GetProductDetails(
      invoice
    );
    //console.log(props.selectedInvoice);
    return products;
  }

  const no = "2022-01-21";
  // fetchSavedData(invoice, no, date).then((ocrData) => {
  //   console.log("fetchSavedData_ocrData : ",ocrData);
  //   invoiceData()
  //     .then((products) => {
  //       console.log("fetchSavedData_products : ",products);
  //       /**post processing the table data after returning from filter */
  //       function convertToUpperCase(obj) {
  //         let newObj = {};
  //         for (let key in obj) {
  //           newObj[key.toUpperCase()] = obj[key];
  //         }
  //         return newObj;
  //       }
  //       products = convertToUpperCase(products);
  //       console.log(products);
  //       // scanInvoiceData.InvoiceData = ocrData;
  //     //   setOcrProducts(ocrData);
        
  //     //   console.log(scanInvoiceData);
  //       // scanInvoiceData.InvoiceData = ocrData;
  //       //console.log(resScnInvDta);
  //       console.log("OCERDATa", ocrData);
  //       //console.log(products);
  //       //console.log(scanInvoiceData);
  //       let table = ocrData.map((row) => {
  //         /**For invoices which dont have item no, set description as item no */
  //         row.itemNoPresent = row.itemNo === undefined ? false : true; 
  //         if (row.itemNo === undefined) {
  //           row.itemNo = row.description.trim().toUpperCase();
  //         }
  //         row.itemNo = row.itemNo.toString().toUpperCase();

  //         row.description = row.description;
  //           // products[row.itemNo] !== undefined
  //           //   ? products[row.itemNo].Description
  //           //   : row.description;
  //         row.pieces =
  //           products[row.itemNo] !== undefined
  //             ? products[row.itemNo].Quantity
  //             : 0;
  //         row.sku =
  //           products[row.itemNo] !== undefined
  //             ? products[row.itemNo].sku
  //             : "";
  //         row.barcode =
  //           products[row.itemNo] !== undefined
  //             ? products[row.itemNo].Barcode
  //             : "";
  //         row.posName =
  //           products[row.itemNo] !== undefined
  //             ? products[row.itemNo].POS
  //             : "";
  //         row.markup = 0;
  //         row.show = true;
  //         row.posSku =
  //           products[row.itemNo] !== undefined
  //             ? products[row.itemNo].PosSKU
  //             : "";
  //         row.isReviewed = 
  //           products[row.itemNo] !== undefined ? products[row.itemNo].isReviewed : "" ;
  //         row.size = 
  //           products[row.itemNo] !== undefined ? products[row.itemNo].Size : "";
  //         row.department = 
  //           products[row.itemNo] !== undefined ? products[row.itemNo].Department : "";
  //         row.cost = 
  //           products[row.itemNo] !== undefined ? products[row.itemNo].SellerCost : "";
  //         row.sellingPrice = 
  //           products[row.itemNo] !== undefined ? products[row.itemNo].SellingPrice : "";
  //         row.price = 
  //           products[row.itemNo] !== undefined ? products[row.itemNo].Price : "";
  //         row.details = 
  //           products[row.itemNo] !== undefined ? products[row.itemNo].Details : "";
  //         row.linkingCorrect = 
  //           products[row.itemNo] !== undefined ? products[row.itemNo].LinkingCorrect : "";
  //         row.margin = products[row.itemNo] !== undefined ? ((products[row.itemNo].SellingPrice - products[row.itemNo].SellerCost)/ products[row.itemNo].SellerCost)*100 : "";
  //         //console.log("department-" + row.department + "  cost-" + row.cost + "  price" + row.sellingPrice);
  //         let sp = 0;
  //         let cp = 0;
  //         // const barcode = products.Barcode
  //         if (parseInt(row.pieces)) {
  //           sp = (parseFloat(row.unitPrice) / parseInt(row.pieces)).toFixed(
  //             2
  //           );
  //           cp = sp;
  //         }
  //         if (products[row.itemNo] !== undefined) {
  //           if (sp > +products[row.itemNo].SellerCost) {
  //             row["priceIncrease"] = 1;
  //           } else if (sp < +products[row.itemNo].SellerCost) {
  //             row["priceIncrease"] = -1;
  //           } else if (sp == +products[row.itemNo].SellerCost) {
  //             row["priceIncrease"] = 0;
  //           }
  //         } else {
  //           row["priceIncrease"] = 0;
  //         }

  //         /**filter out the rows for which qty shipped & extendedPrice is zero */
  //         if (row.qty == "0" && row.extendedPrice === "0.00") {
  //           return null;
  //         }
  //         /**Calulate qty for which qty is not read/scanned by textract */
  //         if (!row.qty) {
  //           row.qty = (
  //             parseFloat(row.extendedPrice) / parseFloat(row.unitPrice)
  //           ).toFixed(0);
  //         }
  //       return { ...row, sp, cp };
  //       });
  //       // setLoader(false);
  //       dispatch({type: "LOADER"});

  //       setTableData(table.filter((data) => data !== null));
  //       console.log("fetchSavedData_tableData : ",tableData);
  //       setItemNoDropdown(Object.keys(products));
  //       setProductDetails(products);
  //     })
  //     .catch((err) => {
  //       console.log("error on mapping ocrdata", err)
  //       // setLoader(false);
  //       dispatch({type: "LOADER"});
  //     });
  // });


  // ************* Add by Deepanshu *****************
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
                  {/* <ul>
                  <li> */}
                  <Autocomplete
                      value={selectedDropdown}
                      onChange={(event, newValue) => {
                          console.log("newValue", newValue)
                          if (newValue) {
                            console.log(newValue);
                            setSelectedDropdown(newValue);
                          // setInvoice(newValue);
                          // setTimeout(()=> {}, 1000);
                          // invoice = newValue;
                          // console.log(invoice);
                          // setProductsInTable();
                          }
                          // getInvoices(newValue);
                      }}
                      id="combo-box"
                      options={dropdownOptions}
                      getOptionLabel={(option) => option.value}
                      style={{ width: 200 }}
                      autoHighlight
                      renderInput={(params) => (
                          <TextField {...params} label={dropdownLabel} variant="outlined" />
                      )}
                  />
                {/* </li> */}
                <br />

                {/* <li> */}
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
                  <TextField
                    label="Inoive No."
                    variant="outlined"
                    type="text"
                    name="invoiceNo"
                    value={invoiceNo}
                    onChange={(event) => {
                      setInvoiceNo(event.target.value);
                      console.log("setInvoiceNo_inoiceNo : ",invoiceNo);
                    }
                  }
                    />
                  
                  <TextField
                    
                    variant="outlined"
                    type="date"
                    name="date"
                    value={date}
                    onChange={(event) => {
                      setDate(event.target.value);
                      console.log("setDate_date : ",date);
                    }
                  }
                    />
                {/* </li> */}
                <br />
              {/* <li> */}
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
                      singleItemData = [];



                      //setDisabled(false);
                      //updateOnHoverDetails(index);
                      //setShowPosIndex(index);
                      // console.log(newValue);
                      console.log(newState);
                      //console.log(showPosState);
                      // toggleModal();
                      
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
                <button  style={{backgroundColor: "green",
                      height: "50px",
                      border: "none",
                      color: "white",
                      padding: "4px 8px",
                      textAlign: "center",
                      textDecoration: "none",
                      display: "inline-block",
                      fontSize: "14px",
                      align: "left",
                      marginLeft: 20}}
                      // onClick={setProductsInTable}
                      onClick={toggleModal}
                      >
                          Add New Product
                </button>
                {/* </li >
                </ul> */}
                  </Grid>
          </Paper>
          <p>Invoice-- {invoice}</p>
          

          <div>{renderTableData()}</div>



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