import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { dropdownOptions } from "../../utils/invoiceList";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Paper from "@material-ui/core/Paper";
import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TesseractService } from "../../services/TesseractService";

import { InventoryService } from "../../services/InventoryService";
import Checkbox from "@material-ui/core/Checkbox";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Api } from "../../services/Api";
import HicksData from "../DisplayData/Hicksville.json";
import { CContainer, CModalHeader, CCol, CFormGroup, CInput, CButton, CLabel, CModal, CModalBody, CModalFooter, CRow } from "@coreui/react";
import Button from "../../UI/Button";
import styles from "../DisplayData/DisplayData.module.css";
import IconButton from "@material-ui/core/IconButton";
import UpdateInventory from "../Update/UpdateInventory";
import Spinner from "../../UI/Spinner/Spinner";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import  CircularProgress from "@material-ui/core/CircularProgress";

import firebase from "firebase/app";
import "firebase/auth";
import Cancel from "@material-ui/icons/Cancel";
// import CircularProgress from '@material/circular-progress';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import Loading from 'react-loader-spinner';

import { useSelector} from "react-redux";


const useStyles = makeStyles({
        root: {
        width: "100%",
        // paddingTop: 50,
        // height: "125px"
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
let emptyColumnList = [];

const SaveInvoiceData = () => {

    const tesseractService = new TesseractService();
    const classes = useStyles();
    const [date, setDate] = useState("");
    const [invoice, setInvoice] = useState({});
    const [invoiceNo, setInvoiceNo] = useState("");
    const numOfCollections = dropdownOptions.length;
    const dropdownLabel = "Select Invoice("+   numOfCollections   + ")";
    // const [inv, setInv] = useState("");
    const inv = useSelector(state => state.openInvoice.inv);
    // const [ num, setNum] = useState("");
    const num = useSelector(state => state.openInvoice.num);
    // const [day, setDay] = useState("");
    const day = useSelector(state => state.openInvoice.day);
    // const [apiLoader, setApiLoader] = useState(false);

    const apiLoader = useSelector(state => state.loaders.apiLoader)
    const dispatch = useDispatch();

    

    //Following for display data functionalities.
    const [hicksvilleData, setHicksvilleData] = useState([]);
    let saveInvoiceFlag  = 1;
    const api = new Api();
    const [tableData, setTableData] = useState([]);
    const [emptyColumn, setEmptyColumn] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    const [pushToInventory, setPushToInventory] = useState(false);
    const [inventoryData, setInventoryData] = useState([]);
    const [itemNoDropdown, setItemNoDropdown] = useState([]);
    
    // const [loader, setLoader] = useState(false);
    const loader = useSelector(state => state.loaders.loader);

    const [reviewItems, setReviewItems] = useState([]);
    const [showPosIndex, setShowPosIndex] = useState(-1);
    const inventoryService = new InventoryService();
    const [showModal, setShowModal] = useState(false);
    // const [stateUpdated, setStateUpdated] = useState("false");
    const [costInc, setCostInc] = useState("false");
    const [costDec, setCostDec] = useState("false");
    const [unitCost, setUnitCost] = useState("");
    const [isUpdated, setIsUpdated] = useState("false");
    const [updateIndex, setUpdateIndex] = useState(-1);
    let posProducts = []
    let wooComProducts = [];
    let singleItemData = [];
    let itemNo = "";
    // const [posProducts, setPosProducts] = useState([]);

    // const [notFounds, setNotFounds] = useState("false");
    const notFounds = useSelector(state => state.redItems.notFounds);

    // const [unitsInCase, setUnitsInCase] = useState("");
    const unitsInCase = useSelector(state => state.redItems.unitsInCase);

    // const [price, setPrice] = useState("");
    const price = useSelector(state => state.redItems.price);

    const [redState, setRedState] = useState("true");
    let updateSku = "";
    const [searchVal, setSearchVal] = useState("");
    const [options, setOptions] = useState([]);
    const [detailsModal, setDetailsModal] = useState(false);
    const [invoiceOptions, setInvoiceOptions] = useState([]);
    const [details, setDetails] = useState("");
    const [detailsIndex, setDetailsIndex] = useState(-1);

    // const [userEmail, setUserEmail] = useState("");
    const userEmail = useSelector(state => state.userDetails.userEmail);
    
    // const [todayDate, setTodayDate] = useState("");
    const todayDate = useSelector(state => state.userDetails.todayDate);

    
    // const [openInvoice, setOpenInvoice] = useState(false);
    const openInvoice = useSelector(state => state.openInvoice.openInvoice);

    const[dropdownLoader, setDropdownLoader] = useState(false);
    const [fetchingOptions, setFetchingOptions] = useState(false);
    const [dropdownIndex, setDropwdownIndex] = useState(-1);

    const invoiceHeader = [
      "Sr.No.",
      "Invoice",
      "Invoice No.",
      "Invoice Date",
      "Open Invoice"
    ]

    
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
        "Tick to Delete",
        "Update POS",
        "Reverse POS Update",
        "NO LINKING",
        "Serial No.(2)"
    ];

    const showPosState = useSelector(state => state.showPosState);
    // const [showPosState, setShowPosState] = useState({
    //     item: "",
    //     quantity: "",
    //     description: "",
    //     price: "",
    //     pos: "",
    //     barcode: "",
    //     posSku: "",
    //     invoice: "",
    //     size: "",
    //     department: "",
    //     unitCost: "",
    //     unitPrice: "",
    // });

  //***************  INDIVIDUAL ITEM UPDATE FUNCTIONALITY STARTS*******************************************.

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
      dispatch({type: "LOADER"});
      console.log(items);
      wooComProducts = items;
      // setWooComProducts(items.filter((ele) => ele !== null));
      // setNotFoundProducts(tempNotFoundProducts);
    }

    //function to fetch POS products.
    async function getPosProducts() {
      console.log("IN POS PRODUCTS");
      // setLoader(true);
      dispatch({type: "LOADER"});
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
                  COST: row.cp,
                  PRICE: row.sp,
                  SKU,
                  UPC,
                  ITEMNAME,
                  TOTALQTY:
                    parseInt(row.qty) * parseInt(row.pieces) + parseInt(TOTALQTY),
                  itemNo: row.itemNo,
                  isNew: false,
                  BUYASCASE: 1,
                  CASEUNITS: row.pieces.toString(),
                  CASECOST: row.unitPrice.toString(),
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
      dispatch({type: "LOADER"});
      console.log(items);
      posProducts = items;
      console.log(posProducts);
      // setPosProducts(items.filter((ele) => ele !== null));
    }

    //PUSH TO WOOCOM.
    const pushToWoocom = async (products) => {
      // setLoader(true);
      dispatch({type: "LOADER"});
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
      dispatch({type: "LOADER"});
    };

    //PUSH TO POS.
    const pushToPOS = async (products) => {
      // setLoader(true);
      dispatch({type: "LOADER"});
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
            if (isNew) {
              const response = await inventoryService.CreateDBProduct(data);
              console.log("Created new product", response);
            } else {
              const response = await inventoryService.UpdateDBProduct({
                count: parseInt(product.qty) * parseInt(product.pieces),
                UPC,
              });
              console.log("updated existing product", response);
            }
  
            console.log("res from POS", res);
            return true;
          } catch (error) {
            console.log(error);
            return null;
          }
        })
      );
      // setLoader(false);
      dispatch({type: "LOADER"});
    };

    const pushInventoryDetails2 = async () => {
      console.log(posProducts);
      // setLoader(true);
      let data = singleItemData.map((element) => {
        return {
          item: element.itemNo,
          qty: parseInt(element.qty) * parseInt(element.pieces),
          cp: element.unitPrice,
          markup: element.markup,
          sp: element.sp,
          description: element.description,
        };
      });
  
      var duplicates = {};
      for (var i = 0; i < data.length; i++) {
        if (duplicates.hasOwnProperty(data[i].item)) {
          duplicates[data[i].item].push(i);
        } else if (data.lastIndexOf(data[i].item) !== i) {
          duplicates[data[i].item] = [i];
        }
      }
  
      let tempData = Object.values(duplicates).filter((ele) => ele.length > 1);
      if (tempData.length > 0) {
        tempData.forEach((index) => {
          let temp = 0;
          index.forEach((val) => {
            if (data[val]) {
              // console.log("data[val]", data[val]);
              temp += data[val].qty;
              if (temp - data[val].qty !== 0) {
                data[val] = null;
              }
            }
          });
          data[index[0]].qty = temp;
        });
      }
      data = data.filter((ele) => ele !== null);
  
      /**
       * add the fileds of  data from the woocom & ocr
      */
     console.log(wooComProducts.length);
      if(wooComProducts[0] != null){
        let updatedWoocomProducts = data
          .map((product, index) => {
            /**find index of the item in fetched woocom product list */
            const wooIndex = wooComProducts.findIndex(
              (wooProduct) => product.item === wooProduct.itemNo
            );
            if (wooIndex !== -1) {
              /**get the qty & other fileds of the woocom product */
              let { id, stock_quantity } = wooComProducts[wooIndex];
              stock_quantity += product.qty;
              const regular_price = product.sp;
              return { id, regular_price, stock_quantity, itemNo: product.item };
            }
            return null;
          })
          .filter((item) => item !== null);

        console.log(updatedWoocomProducts); 
        await pushToWoocom(updatedWoocomProducts);
        }
      await pushToPOS(posProducts);
  
      // setLoader(false);
      dispatch({type: "LOADER"});
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
    dispatch({type: "API_LOADER"});
    console.log(index);	
    setShowPosIndex(-1);
    
    
    console.log(tableData);
    const product = [];
    const notFoundItems = emptyColumn.map((i) => tableData[i]);
    const tempTable = [];
    product.push(tableData[index]);
    console.log(product);
    product.isUpdated = "true";
    itemNo = product.itemNo;
    
    product.forEach((element, index) => {
      if (
        !emptyColumn.includes(index) &&
        element.show === true &&
        element["isForReview"] != true
      ) {
        let rowData = { index: index + 1, ...element };
        tempTable.push(rowData);
      }
    });
    // console.log("notFoundItems", notFoundItems);
    console.log(tempTable);

    if (emptyColumn.length !== 0) {
      /**api to push  to not found list*/
      // setLoader(true);
      dispatch({type: "LOADER"});
      const responses = await Promise.all(
        notFoundItems.map(async (product) => {
          try {
            const data = {
              Item: product.itemNo,
              Description: product.description,
              Quantity: product.qty,
              Price: product.unitPrice,
              sku: product.sku,
              Barcode: product.barcode,
              PosSKU: product.posSku,
              InvoiceName: invoice.slug,
            };
            await inventoryService.CreateNotFoundItems(data);
            return true;
          } catch (error) {
            console.log(
              "Couldn't create not found product",
              product.description,
              { error }
            );
            alert("Couldn't create product on website.");
            return null;
          }
        })
      );
      // setLoader(false);
      dispatch({type: "LOADER"});
    }
    const priceIncreasedProducts = tempTable.filter(
      (product) => product.priceIncrease !== 0
    );
    // setLoader(true);
    dispatch({type: "LOADER"});
    const res = await Promise.all(
      priceIncreasedProducts.map(async (product) => {
        try {
          const data = {
            invoiceName: invoice.slug,
            itemName: product.itemNo,
            value: { Price: product.unitPrice },
          };
          console.log(data)
          await inventoryService.UpdateProductFields(data);
          
          
        } catch (error) {
          console.log(`couldn't update price for product ${product.itemNo}`);
        }
      })
    );
    // setLoader(false);
    dispatch({type: "LOADER"});
    // console.log(tempTable);
    tempTable[0].isUpdated = "true";
    singleItemData = tempTable;
    // setPushToInventory(true);
    console.log(singleItemData);
    
    updateSku = singleItemData[0].posSku;


    await getProducts();
    await getPosProducts();
    console.log(posProducts);
    if(posProducts[0] != undefined ){
      await pushInventoryDetails2();
      toConsoleState();
      setIsUpdated("true");
      setUpdateIndex(index);
      console.log(singleItemData);
      console.log(singleItemData.itemNo);
      await inventoryService.UpdateInvoiceData(inv, num, day, singleItemData[0].itemNo); 

      //Update unit cost n price in db, after update POS.
      let data1 = {
        cost: singleItemData[0].cp,
        price: singleItemData[0].sp,
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
        InvoiceDate: day,
        ItemNo: singleItemData[0].itemNo,
        InvoiceDescription: singleItemData[0].description,
        PosDescription: singleItemData[0].posName,
        PosUnitCost: singleItemData[0].cost,
        PosUnitPrice: singleItemData[0].sellingPrice,
        OldMarkup: singleItemData[0].margin.toFixed(2).toString(),
        InvUnitCost: singleItemData[0].cp,
        InvUnitPrice: singleItemData[0].sp,
        NewMarkup:( ((singleItemData[0].sp- singleItemData[0].cp)/ singleItemData[0].cp)*100).toFixed(2).toString(),
        UpdateDate: todayDate,
        Person: userEmail,
        TimeStamp: new Date().toTimeString().split(" ")[0], 
        InvCaseCost: singleItemData[0].unitPrice,
        InvUnitsInCase: singleItemData[0].pieces,
        SKU: singleItemData[0].posSku
      }
      console.log(log);

      const logUpdate = await inventoryService.posLogs(log);
      console.log(logUpdate)






      setProductsInTable();
    } else {
      alert("POS not updated!!");
      setProductsInTable();
    }
    // setApiLoader(false);
    dispatch({type: "API_LOADER"});

    
    
  }
  //***************************INDIVIDUAL ITEM UPDATE FUNCTIONALITY ENDS*****************************************.
 
  const saveDetails = async () => {
    console.log(detailsIndex);
    console.log(details);
    const item = tableData[detailsIndex];
    console.log(item);
    const data = {
      invoice: invoice.slug,
      itemNo: item.itemNo,
      details: details
    }
    const res = await inventoryService.saveDetails(data);
    console.log(res);
    if(res === "s"){
      alert("Details added successfully");
      setDetails("");
      setDetailsIndex(-1);
      toggleModal("details");
      setProductsInTable();
    }else {
      alert("Some error Occured.");
      setDetailsIndex(-1);
      setDetails("");
      toggleModal("details");
    }

  }

  const getInvoices = async () => {
    // setApiLoader(true);
    dispatch({type: "API_LOADER"})
    // setOpenInvoice(false);
    dispatch({type: "OPEN_INVOICE", data: false})
    console.log(invoice);
    const res = await inventoryService.getSavedInvoices(invoice);
    console.log(res);
    // let array = [];
    // res.map(item => {
    //   array.push(item.SavedInvoiceNo);
    // })
    console.log(res);
    setInvoiceOptions(res.reverse());
    
    // setApiLoader(false);
    dispatch({type: "API_LOADER"})

  }

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
    

    const reversePOSUpdate = async(index) => {
      console.log(index);
      console.log(tableData);
      console.log(tableData[index]);
      let item = tableData[index];
      const result = await inventoryService.reversePOSUpdate(inv, num, day, item.itemNo);
      if(result.ok == 1){
        setProductsInTable();
      }else {
        alert("Some error occured in updation");
      }

    }

    const linkingCorrect = async (index) => {
      console.log(index);
      console.log(tableData);
      console.log(tableData[index]);
      let item = tableData[index];
      console.log(item)
      let data = {
        invoice: inv,
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
          InvoiceName: inv,
          ItemCode: item.itemNo,
          LinkingDate: todayDate,
          PersonName: userEmail,
          Size: item.size,
          PosUnitCost: item.cost,
          PosUnitPrice: item.sellingPrice,
          InvoiceNo: num,
          InvoiceDate: day,
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

    const linkManually = async(index) => {
      console.log(index);
      console.log(tableData);
      console.log(tableData[index]);
      let item = tableData[index];
      console.log(item)
      let data = {
        invoice: inv,
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
        InvoiceName: inv,
        ItemCode: item.itemNo,
        LinkingDate: todayDate,
        PersonName: userEmail,
        Size: item.size,
        PosUnitCost: item.cost,
        PosUnitPrice: item.sellingPrice,
        InvoiceNo: num,
        InvoiceDate: day,
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

    const fetchSavedData = async(invoice = inv, no = num, date = day) => {
        const data =  await tesseractService.GetSavedInvoiceData(invoice, no, date);
        console.log(data);
        if(data.length === 0) {
          alert("Invoice doesnt Exist!!");
        }else return data[0].InvoiceData;
        // console.log(data);
        // console.log(data[0].InvoiceData);
        
    };

    const setProductsInTable = () => {
      // setLoader(true);
      dispatch({type: "LOADER"});
      async function invoiceData() {
        const products = await tesseractService.GetProductDetails(
          // invoice.slug
          inv
        );
        //console.log(props.selectedInvoice);
        return products;
      }

      fetchSavedData().then((ocrData) => {
        invoiceData()
          .then((products) => {
            /**post processing the table data after returning from filter */
            function convertToUpperCase(obj) {
              let newObj = {};
              for (let key in obj) {
                newObj[key.toUpperCase()] = obj[key];
              }
              return newObj;
            }
            products = convertToUpperCase(products);
            console.log(products);
            // scanInvoiceData.InvoiceData = ocrData;
          //   setOcrProducts(ocrData);
            
          //   console.log(scanInvoiceData);
            // scanInvoiceData.InvoiceData = ocrData;
            //console.log(resScnInvDta);
            //console.log("OCERDATa", ocrData);
            //console.log(products);
            //console.log(scanInvoiceData);
            let table = ocrData.map((row) => {
              /**For invoices which dont have item no, set description as item no */
              if (row.itemNo === undefined) {
                row.itemNo = row.description.trim().toUpperCase();
              }
              row.itemNo = row.itemNo.toString().toUpperCase();
  
              row.description = row.description;
                // products[row.itemNo] !== undefined
                //   ? products[row.itemNo].Description
                //   : row.description;
              row.pieces = 
                products[row.itemNo] !== undefined
                  ? products[row.itemNo].Quantity
                  : 0;
              row.sku =
                products[row.itemNo] !== undefined
                  ? products[row.itemNo].sku
                  : "";
              row.barcode =
                products[row.itemNo] !== undefined
                  ? products[row.itemNo].Barcode
                  : "";
              row.posName =
                products[row.itemNo] !== undefined
                  ? products[row.itemNo].POS
                  : "";
              row.markup = 0;
              row.show = true;
              row.posSku =
                products[row.itemNo] !== undefined
                  ? products[row.itemNo].PosSKU
                  : "";
              row.isReviewed = 
                products[row.itemNo] !== undefined ? products[row.itemNo].isReviewed : "" ;
              row.size = 
                products[row.itemNo] !== undefined ? products[row.itemNo].Size : "";
              row.department = 
                products[row.itemNo] !== undefined ? products[row.itemNo].Department : "";
              row.cost = 
                products[row.itemNo] !== undefined ? products[row.itemNo].SellerCost : "";
              row.sellingPrice = 
                products[row.itemNo] !== undefined ? products[row.itemNo].SellingPrice : "";
              row.price = 
                products[row.itemNo] !== undefined ? products[row.itemNo].Price : "";
              row.details = 
                products[row.itemNo] !== undefined ? products[row.itemNo].Details : "";
              row.linkingCorrect = 
                products[row.itemNo] !== undefined ? products[row.itemNo].LinkingCorrect : "";
              row.margin = products[row.itemNo] !== undefined ? ((products[row.itemNo].SellingPrice - products[row.itemNo].SellerCost)/ products[row.itemNo].SellerCost)*100 : "";
              //console.log("department-" + row.department + "  cost-" + row.cost + "  price" + row.sellingPrice);
              let sp = 0;
              let cp = 0;
              // const barcode = products.Barcode
              if (parseInt(row.pieces)) {
                sp = (parseFloat(row.unitPrice) / parseInt(row.pieces)).toFixed(
                  2
                );
                cp = sp;
              }
              if (products[row.itemNo] !== undefined) {
                if (sp > +products[row.itemNo].SellerCost) {
                  row["priceIncrease"] = 1;
                } else if (sp < +products[row.itemNo].SellerCost) {
                  row["priceIncrease"] = -1;
                } else if (sp == +products[row.itemNo].SellerCost) {
                  row["priceIncrease"] = 0;
                }
              } else {
                row["priceIncrease"] = 0;
              }
  
              /**filter out the rows for which qty shipped & extendedPrice is zero */
              if (row.qty == "0" && row.extendedPrice === "0.00") {
                return null;
              }
              /**Calulate qty for which qty is not read/scanned by textract */
              if (!row.qty) {
                row.qty = (
                  parseFloat(row.extendedPrice) / parseFloat(row.unitPrice)
                ).toFixed(0);
              }
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
      });
    }

    const toggleModal = (x) => {
      if(x == "notfounds"){
        setShowModal(!showModal);
      }else {
        setDetailsModal(!detailsModal);
      }
        // setDate("");
        // setInvNo("");
      };

    const hicksvilleDropdown = async (data) => {
          // const res = await inventoryService.getHicksvilleData(value);
          // const data = res[0].List;
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
                // sku: s[0] === "nan" ? null : s[0],
                // upc: s[1] === "nan" ? null : s[1],
                // altupc1: s[2] === "nan" ? null : s[2],
                // altupc2: s[3] === "nan" ? null : s[3],
                // name: s[4] === "nan" ? null : s[4],
                // vintage: s[5] === "nan" ? null : s[5],
                // totalQty: s[6] === "nan" ? null : s[6],
                // cost: s[7] === "nan" ? null : s[7],
                // pricea: s[8] === "nan" ? null : s[8],
                // priceb: s[9] === "nan" ? null : s[9],
                // pricec: s[10] === "nan" ? null : s[10],
                // department: s[11] === "nan" ? null : s[11],
                // salePrice: s[12] === "nan" ? null : s[12],
                // size: s[13] === "nan" ? null : s[13],
                // pack: s[14] === "nan" ? null : s[14],
                // price: s[15] === "nan" ? null : s[15],
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
          setHicksvilleData(filter);
        
      }
    
    const hicksvilleDropdownNew = async (event, value, index) => {
      console.log(event);
      console.log(value);
      console.log(value.length);
      console.log(tableData[index].itemNo);
      setDropwdownIndex(index);
      setOptions([]);

      if(!isNaN(value) && value.length>0 && value != tableData[index].itemNo){
        console.log("number");
        // setDropdownLoader(true);
        setFetchingOptions(true);
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
              // sku: s[0] === "nan" ? null : s[0],
              // upc: s[1] === "nan" ? null : s[1],
              // altupc1: s[2] === "nan" ? null : s[2],
              // altupc2: s[3] === "nan" ? null : s[3],
              // name: s[4] === "nan" ? null : s[4],
              // vintage: s[5] === "nan" ? null : s[5],
              // totalQty: s[6] === "nan" ? null : s[6],
              // cost: s[7] === "nan" ? null : s[7],
              // pricea: s[8] === "nan" ? null : s[8],
              // priceb: s[9] === "nan" ? null : s[9],
              // pricec: s[10] === "nan" ? null : s[10],
              // department: s[11] === "nan" ? null : s[11],
              // salePrice: s[12] === "nan" ? null : s[12],
              // size: s[13] === "nan" ? null : s[13],
              // pack: s[14] === "nan" ? null : s[14],
              // price: s[15] === "nan" ? null : s[15],
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
        setHicksvilleData(filter);
        setOptions(filter);

      }

      if(isNaN(value) && value != null && value.length>=4 && value != tableData[index].itemNo){
        console.log("string");
        // setDropdownLoader(true);
        setFetchingOptions(true);
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
              // sku: s[0] === "nan" ? null : s[0],
              // upc: s[1] === "nan" ? null : s[1],
              // altupc1: s[2] === "nan" ? null : s[2],
              // altupc2: s[3] === "nan" ? null : s[3],
              // name: s[4] === "nan" ? null : s[4],
              // vintage: s[5] === "nan" ? null : s[5],
              // totalQty: s[6] === "nan" ? null : s[6],
              // cost: s[7] === "nan" ? null : s[7],
              // pricea: s[8] === "nan" ? null : s[8],
              // priceb: s[9] === "nan" ? null : s[9],
              // pricec: s[10] === "nan" ? null : s[10],
              // department: s[11] === "nan" ? null : s[11],
              // salePrice: s[12] === "nan" ? null : s[12],
              // size: s[13] === "nan" ? null : s[13],
              // pack: s[14] === "nan" ? null : s[14],
              // price: s[15] === "nan" ? null : s[15],
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
        setHicksvilleData(filter);
        setOptions(filter);
      }
      setFetchingOptions(false);
    }

    const searchDropdown = (target, value) =>  {
      console.log(target);
      console.log(value);
      const options  = hicksvilleData.filter((item) => {
        if(item.name){
          let name = item.name;
          name = name.toLowerCase();
          value = value.toLowerCase();
          // console.log(name)
          return name.search(value) != -1;
        }
      })
      console.log(options);
      setOptions(options);
      setFetchingOptions(false);

    }

    const updateItemOld = (ocrCost) => {
        //console.log(showPosState);
        const data = {
          invoiceName: invoice.slug,
          itemName: showPosState.item,
          value: { 
            POS: showPosState.pos, 
            Barcode: showPosState.barcode, 
            PosSKU: showPosState.posSku, 
            isReviewed: "true",
            Size: showPosState.size, 
            Department: showPosState.department,
            //SellerCost: showPosState.unitCost,
            SellingPrice: showPosState.unitPrice
          },
        };
    
        inventoryService
        .UpdateProductFields(data)
        .then((res) => {
          if (!res) {
            throw new Error("Product not created")
          }
          console.log(res);
          alert("Successfully updated fields");
        })
        .catch((err) => {
          console.log(err);
          alert("Some error occuured in creating product");
        })
        .finally(() => { 
          // setLoader(false)
          dispatch({type: "LOADER"});
          
          // setStateUpdated("true");
          //  console.log(ocrCost);
          //  console.log(unitCost);
           if(ocrCost>unitCost){
             setCostInc("true");
             setCostDec("");
           }
           if(ocrCost<unitCost){
             setCostDec("true");
             setCostInc("");
           }
        });
    
    }

    const updateItem = (props, ocrCost) => {
      let data;
      //console.log(showPosState);
      if(notFounds === "true"){
        // console.log(props.selectedInvoice);
        console.log("notfoundstrue");
        data = {
          invoiceName: inv,
          itemName: showPosState.item,
          value: { 
            POS: showPosState.pos, 
            Barcode: showPosState.barcode, 
            PosSKU: showPosState.posSku, 
            isReviewed: "true",
            Description: showPosState.description,
            Size: showPosState.size, 
            Department: showPosState.department,
            SellerCost: showPosState.unitCost,
            SellingPrice: showPosState.unitPrice,
            Quantity: unitsInCase,
            Price: price,
            LinkingCorrect: "true"
          },
        };
  
        toggleModal("notfounds");
      
      }else{
        data = {
          invoiceName: inv,
          itemName: showPosState.item,
          value: { 
            POS: showPosState.pos, 
            Barcode: showPosState.barcode, 
            PosSKU: showPosState.posSku, 
            isReviewed: "true",
            Size: showPosState.size, 
            Department: showPosState.department,
            SellerCost: showPosState.unitCost,
            SellingPrice: showPosState.unitPrice,
            LinkingCorrect: "true"
          },
        };
      }
  
      console.log(data)
      inventoryService
      .UpdateProductFields(data)
      .then((res) => {
        if (!res) {
          throw new Error("Product not created")
        }
        console.log(res);
        alert("Successfully updated fields");
        // setStateUpdated(true);
      })
      .catch((err) => {
        console.log(err);
        alert("Some error occuured in creating product");
      })
      .finally(async () => { 
                      // setLoader(false);
                      // dispatch({type: "LOADER"});
                    //  setStateUpdated("true");
                    //  console.log(ocrCost);
                    //  console.log(unitCost);
                    if(ocrCost>unitCost){
                      setCostInc("true");
                      setCostDec("");
                    }
                    if(ocrCost<unitCost){
                      setCostDec("true");
                      setCostInc("");
                    }
                    if(notFounds === "true"){
                      // setNotFounds("false");
                      dispatch({type: "NOT_FOUNDS", data: "false"})
                      // setUnitsInCase("");
                      dispatch({type: "UNITS_IN_CASE", data: ""})
                      // setPrice("");
                      dispatch({type: "PRICE", data: ""})

                    }
                    console.log(userEmail);
                    console.log(tableData[showPosIndex]);
                    const description = tableData[showPosIndex].description;
                    
                    //Cost chnage and invoice error handling logic.
                    const costChange = tableData[showPosIndex].cp - data.value.SellerCost;
                    console.log(costChange);
                    let a = "", b = "", c = "";
                    const invError = tableData[showPosIndex].cp >= 3*tableData[showPosIndex].cost ? "YES" : "";
                    a = invError == "YES" ? "" : costChange > 0 ? "YES" : "";
                    b = invError == "YES" ? "" : costChange < 0 ? "YES" : ""; 
                    c = invError == "YES" ? "" : costChange == 0 ? "YES" : "";

                    console.log(costChange);
                    console.log(description);
                    console.log(todayDate);
                    console.log(day);
                    console.log(num);
                    const logState = data;
                    delete logState.value.isReviewed;
                    logState.Description = description;
                    logState.PersonName = userEmail;
                    logState.LinkingDate = todayDate;
                    logState.InvoiceDate = day;
                    logState.InvoiceNo = num;
                    logState.CostIncrease = a;                     
                    logState.CostDecrease = b; 
                    logState.CostSame = c;
                    logState.InvoiceUnitCost = tableData[showPosIndex].cp;
                    logState.InvError = invError;                   
                    console.log(logState);
                    

                    const res = await inventoryService.generateLog(logState);
                    console.log(res);
                    setProductsInTable(); 
              });
      
  
    }

    const addRow = () => {
        let tempTableData = [...tableData];
        tempTableData.push({
          qty: 0,
          itemNo: "",
          description: "",
          pieces: 0,
          unitPrice: 0.0,
          extendedPrice: "",
          markup: 0,
          sp: 0,
          show: true,
          showPOS: ""
        });
        emptyColumnList.push(tempTableData.length - 1);
        setEmptyColumn(emptyColumnList);
        setTableData(tempTableData);
    };
    const deleteRow = (index) => {
        let tempTableData = [...tableData];
        // console.log(emptyColumnList.length, "before");
        if (tableData[index]["show"]) {
          if (window.confirm("Delete the item?")) {
            tempTableData[index]["show"] = false;
            const i = emptyColumnList.indexOf(index);
            if (i > -1) {
              emptyColumnList.splice(i, 1);
            }
          }
        } else {
          tempTableData[index]["show"] = true;
          if (
            tempTableData[index]["qty"] !== "" &&
            tempTableData[index]["itemNo"] !== "" &&
            tempTableData[index]["unitPrice"] !== ""
          ) {
            const i = emptyColumnList.indexOf(index);
            if (i > -1) {
              emptyColumnList.splice(i, 1);
            }
          } else {
            emptyColumnList.push(index);
          }
        }
        setTableData(tempTableData);
        setEmptyColumn(emptyColumnList);
    };

    const renderInvoiceHeader = () => {
      return invoiceHeader.map((key, index) => {
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

   const setProductsInTableNew = (index) => {
    console.log(index);
    // setOpenInvoice(true);
    dispatch({type: "OPEN_INVOICE", data: true})
    console.log(invoiceOptions[index]);
    let invoice = invoiceOptions[index].InvoiceName;
    // setInv(invoice);
    dispatch({type: "SET_INV", data: invoice})
    let date =  invoiceOptions[index].SavedDate;
    // setDay(date);
    dispatch({type: "SET_DAY", data: date})
    let no = invoiceOptions[index].SavedInvoiceNo;
    // setNum(no);
    dispatch({type: "SET_NUM", data: no})
    // setLoader(true);
    dispatch({type: "LOADER"});
    async function invoiceData() {
      const products = await tesseractService.GetProductDetails(
        invoice
      );
      //console.log(props.selectedInvoice);
      return products;
    }

    fetchSavedData(invoice, no, date).then((ocrData) => {
      invoiceData()
        .then((products) => {
          /**post processing the table data after returning from filter */
          function convertToUpperCase(obj) {
            let newObj = {};
            for (let key in obj) {
              newObj[key.toUpperCase()] = obj[key];
            }
            return newObj;
          }
          products = convertToUpperCase(products);
          console.log(products);
          // scanInvoiceData.InvoiceData = ocrData;
        //   setOcrProducts(ocrData);
          
        //   console.log(scanInvoiceData);
          // scanInvoiceData.InvoiceData = ocrData;
          //console.log(resScnInvDta);
          //console.log("OCERDATa", ocrData);
          //console.log(products);
          //console.log(scanInvoiceData);
          let table = ocrData.map((row) => {
            /**For invoices which dont have item no, set description as item no */
            if (row.itemNo === undefined) {
              row.itemNo = row.description.trim().toUpperCase();
            }
            row.itemNo = row.itemNo.toString().toUpperCase();

            row.description = row.description;
              // products[row.itemNo] !== undefined
              //   ? products[row.itemNo].Description
              //   : row.description;
            row.pieces =
              products[row.itemNo] !== undefined
                ? products[row.itemNo].Quantity
                : 0;
            row.sku =
              products[row.itemNo] !== undefined
                ? products[row.itemNo].sku
                : "";
            row.barcode =
              products[row.itemNo] !== undefined
                ? products[row.itemNo].Barcode
                : "";
            row.posName =
              products[row.itemNo] !== undefined
                ? products[row.itemNo].POS
                : "";
            row.markup = 0;
            row.show = true;
            row.posSku =
              products[row.itemNo] !== undefined
                ? products[row.itemNo].PosSKU
                : "";
            row.isReviewed = 
              products[row.itemNo] !== undefined ? products[row.itemNo].isReviewed : "" ;
            row.size = 
              products[row.itemNo] !== undefined ? products[row.itemNo].Size : "";
            row.department = 
              products[row.itemNo] !== undefined ? products[row.itemNo].Department : "";
            row.cost = 
              products[row.itemNo] !== undefined ? products[row.itemNo].SellerCost : "";
            row.sellingPrice = 
              products[row.itemNo] !== undefined ? products[row.itemNo].SellingPrice : "";
            row.price = 
              products[row.itemNo] !== undefined ? products[row.itemNo].Price : "";
            row.details = 
              products[row.itemNo] !== undefined ? products[row.itemNo].Details : "";
            row.linkingCorrect = 
              products[row.itemNo] !== undefined ? products[row.itemNo].LinkingCorrect : "";
            row.margin = products[row.itemNo] !== undefined ? ((products[row.itemNo].SellingPrice - products[row.itemNo].SellerCost)/ products[row.itemNo].SellerCost)*100 : "";
            //console.log("department-" + row.department + "  cost-" + row.cost + "  price" + row.sellingPrice);
            let sp = 0;
            let cp = 0;
            // const barcode = products.Barcode
            if (parseInt(row.pieces)) {
              sp = (parseFloat(row.unitPrice) / parseInt(row.pieces)).toFixed(
                2
              );
              cp = sp;
            }
            if (products[row.itemNo] !== undefined) {
              if (sp > +products[row.itemNo].SellerCost) {
                row["priceIncrease"] = 1;
              } else if (sp < +products[row.itemNo].SellerCost) {
                row["priceIncrease"] = -1;
              } else if (sp == +products[row.itemNo].SellerCost) {
                row["priceIncrease"] = 0;
              }
            } else {
              row["priceIncrease"] = 0;
            }

            /**filter out the rows for which qty shipped & extendedPrice is zero */
            if (row.qty == "0" && row.extendedPrice === "0.00") {
              return null;
            }
            /**Calulate qty for which qty is not read/scanned by textract */
            if (!row.qty) {
              row.qty = (
                parseFloat(row.extendedPrice) / parseFloat(row.unitPrice)
              ).toFixed(0);
            }
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
    });
  }

   const renderInvoiceTable = () => {   
    const invoiceList = invoiceOptions.map((element, index) => {
      return (
        <tr key={index}>
          <td>{index+1}</td>
          <td>{element.InvoiceName}</td>
          <td>{element.SavedInvoiceNo}</td>
          <td>{element.SavedDate}</td>
          <td>
            <button 
              style={{
                backgroundColor: "#4CAF50",
                border: "none",
                color: "white",
                padding: "15px 32px",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "12px",
                margin: "4px 2px",
                cursor: "pointer"
              }}
              onClick={() => {
                setProductsInTableNew(index)
              }}
            >Show Invoice
            </button>
          </td>
        </tr>
        );
      })
    return (
      <div style={{ marginTop: "35px" }}>
        <table className="table table-hover table-responsive-sm">
          <tbody>
            <tr>{renderInvoiceHeader()}</tr>
            {invoiceList}
          </tbody>
        </table>
      </div>
    );     
  }

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
            let isEmpty =
              element.qty === "" ||
              element.itemNo === "" ||
              !element.pieces ||
              isNaN(element.unitPrice) ||
              element.unitPrice === "" ||
              isNaN(element.extendedPrice);
            if (isEmpty && element.show) {
              let emptyColumn = [...emptyColumnList, index];
              emptyColumnList = [...new Set(emptyColumn)];
            }
            let isFree = element.qty != 0 && element.extendedPrice === "0.00";
            // console.log(element.isUpdated);
            console.log(element);
            let margin = ((element.sellingPrice - element.cost)/ element.cost)*100;
            
    
            return (
              <tr
                key={index}
                className={isEmpty ? styles.red : isFree ? styles.free : null}
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
                <td>{element.pieces}</td>
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
              <Button
                text={element.show ? "Delete" : "Undo"}
                color="btn btn-info"
                type="submit"
                onClick={() => deleteRow(index)}
              />
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
                <td>
                <Button 
                    text="Reverse POS"
                    type="submit"
                    onClick={() => reversePOSUpdate(index)}
                    style={{ width: 120, backgroundColor: "red", color: "white" }}
                  />
                      
                </td>
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
                      <Button
                        text="Add cell"
                        color="btn btn-info"
                        onClick={addRow}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className={styles.divRow}>
                <Button
                  text="Update Inventory"
                  color="btn btn-info"
                  type="submit"
                  onClick={pushInventoryDetails}
                />
                {/* <Button
                  text="Save Invoice Data"
                  color="btn btn-info"
                  type="submit"
                  onClick={toggleModal}
                /> */}
                <Button
                  text="Re upload"
                  color="btn btn-info"
                  type="submit"
                  onClick={() => window.location.reload()}
                />
              </div>
            </div>
          );
        }
    };

    const pushInventoryDetails = async () => {
        const notFoundItems = emptyColumn.map((i) => tableData[i]);
        const tempTable = [];
        tableData.forEach((element, index) => {
          if (
            !emptyColumn.includes(index) &&
            element.show === true &&
            element["isForReview"] != true
          ) {
            let rowData = { index: index + 1, ...element };
            tempTable.push(rowData);
          }
        });
        // console.log("notFoundItems", notFoundItems);
        // console.log("final table data", tempTable);
    
        if (emptyColumn.length !== 0) {
          /**api to push  to not found list*/
          // setLoader(true);
          dispatch({type: "LOADER"});
          const responses = await Promise.all(
            notFoundItems.map(async (product) => {
              try {
                const data = {
                  Item: product.itemNo,
                  Description: product.description,
                  Quantity: product.qty,
                  Price: product.unitPrice,
                  sku: product.sku,
                  Barcode: product.barcode,
                  PosSKU: product.posSku,
                  InvoiceName: invoice.slug,
                };
                await inventoryService.CreateNotFoundItems(data);
                return true;
              } catch (error) {
                console.log(
                  "Couldn't create not found product",
                  product.description,
                  { error }
                );
                alert("Couldn't create product on website.");
                return null;
              }
            })
          );
          // setLoader(false);
          dispatch({type: "LOADER"});
        }
        const priceIncreasedProducts = tempTable.filter(
          (product) => product.priceIncrease !== 0
        );
        // setLoader(true);
        dispatch({type: "LOADER"});
        const res = await Promise.all(
          priceIncreasedProducts.map(async (product) => {
            try {
              const data = {
                invoiceName: invoice,
                itemName: product.itemNo,
                value: { Price: product.unitPrice },
              };
              await inventoryService.UpdateProductFields(data);
            } catch (error) {
              console.log(`couldn't update price for product ${product.itemNo}`);
            }
          })
        );
        console.log(priceIncreasedProducts.length);
        // setLoader(false);
        dispatch({type: "LOADER"});

        setInventoryData(mergeDuplicates(tempTable));
        setPushToInventory(true);
    };

    const handleChange = async (row, key, value) => {
        let tempTableData = [...tableData];
        tempTableData[row][key] = value;
        const { itemNo } = tempTableData[row];
        if (
          tempTableData[row]["qty"] !== "" &&
          tempTableData[row]["itemNo"] !== "" &&
          tempTableData[row]["unitPrice"] !== ""
        ) {
          const index = emptyColumnList.indexOf(row);
          if (index > -1) {
            emptyColumnList.splice(index, 1);
          }
        } else {
          emptyColumnList.push(row);
        }
        setEmptyColumn(emptyColumnList);
        if (key === "itemNo") {
          tempTableData[row]["description"] = productDetails[value].Description;
          tempTableData[row]["pieces"] = productDetails[value].Quantity;
          tempTableData[row]["sku"] = productDetails[value].sku;
          /**auto populate barcode & other pos fields*/
          tempTableData[row]["barcode"] = productDetails[value].Barcode;
          tempTableData[row]["posName"] = productDetails[value].POS;
          tempTableData[row]["posSku"] = productDetails[value].PosSKU;
        }
    
        if (key === "unitPrice" || key === "sp" || key === "itemNo") {
          let cp = parseFloat(tempTableData[row]["cp"]);
          let sp = parseFloat(tempTableData[row]["sp"]);
          let markup = ((sp - cp) / cp) * 100;
          let cost =
            parseFloat(tempTableData[row]["unitPrice"]) /
            tempTableData[row]["pieces"];
          // let sp = cp + (cp * markup) / 100;
          // if (tempTableData[row]["pieces"]) {
          //   sp = sp / tempTableData[row]["pieces"];
          // }
          tempTableData[row]["markup"] = isNaN(markup) ? 0 : markup.toFixed(2);
          tempTableData[row]["cp"] = isNaN(cost) ? 0 : cost.toFixed(2);
        }
    
        if (key === "qty" || key === "unitPrice") {
          const extendedPrice =
            parseFloat(tempTableData[row]["qty"]) *
            parseFloat(tempTableData[row]["unitPrice"]);
          const cp = tempTableData[row]["unitPrice"] / tempTableData[row]["pieces"];
          if (!isNaN(extendedPrice)) {
            tempTableData[row]["extendedPrice"] = extendedPrice.toFixed(2);
          }
          if (!isNaN(cp)) {
            tempTableData[row]["cp"] = cp.toFixed(2);
          }
        }
        if (itemNo) {
          if (+tempTableData[row]["unitPrice"] > +productDetails[itemNo].Price) {
            tempTableData[row]["priceIncrease"] = 1;
          } else if (
            +tempTableData[row]["unitPrice"] < +productDetails[itemNo].Price
          ) {
            tempTableData[row]["priceIncrease"] = -1;
          } else if (
            +tempTableData[row]["unitPrice"] == +productDetails[itemNo].Price
          ) {
            tempTableData[row]["priceIncrease"] = 0;
          }
        }
    
        if (key === "barcode") {
          tempTableData[row]["barcode"] = value;
        }
        setTableData(tempTableData);
    };

    const mergeDuplicates = (a) => {
        let arr = [...a];
        let map = new Map();
        for (let i = 0; i < arr.length; i++) {
          if (!map.has(arr[i].itemNo)) map.set(arr[i].itemNo, arr[i]);
          else {
            let obj = { ...map.get(arr[i].itemNo) };
            obj["qty"] = (
              parseFloat(obj["qty"]) + parseFloat(arr[i].qty)
            ).toString();
            map.set(arr[i].itemNo, obj);
          }
        }
        let newArr = [];
        for (let x of map.values()) newArr.push(x);
        return newArr;
    };

    useEffect(() => {
      // hicksvilleDropdown();
      // hicksvilleDropdown();
      const curDate = new Date();
      console.log(curDate);
      let date = curDate.getFullYear()+ "-" + (curDate.getMonth()+1) +"-"+ curDate.getDate();
      console.log(date);
      // setTodayDate(date);
      dispatch({type: "TODAY_DATE", data: date});
      // hicksvilleDropdown(HicksData);
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // setUserEmail(user.email);
          dispatch({type: "EMAIL", data: user.email})
            console.log('This is the user: ', user)
            console.log('This is the user: ', user.email);
        } else {
            // No user is signed in.
            console.log('There is no logged in user');
        }
    });
    


        /**Fetch the data from the aws textract for the image */
        // async function fetchOCRData() {
        //   // return chetak();
    
        //   setLoader(true);
        //   const ocrData = [];



        //   let newData = [];
        //   ocrData.forEach((data) => (newData = [...newData, ...data]));
        //   return newData;
        // }
    
        // async function invoiceData() {
        //   const products = await tesseractService.GetProductDetails(
        //     invoice
        //   );
        //   //console.log(props.selectedInvoice);
        //   return products;
        // }

        // fetchOCRData().then((ocrData) => {
        //   invoiceData()
        //     .then((products) => {
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
        //       //console.log("OCERDATa", ocrData);
        //       //console.log(products);
        //       //console.log(scanInvoiceData);
        //       let table = ocrData.map((row) => {
        //         /**For invoices which dont have item no, set description as item no */
        //         if (row.itemNo === undefined) {
        //           row.itemNo = row.description.trim().toUpperCase();
        //         }
        //         row.itemNo = row.itemNo.toString().toUpperCase();
    
        //         row.description =
        //           products[row.itemNo] !== undefined
        //             ? products[row.itemNo].Description
        //             : row.description;
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
        //           if (+row.unitPrice > +products[row.itemNo].Price) {
        //             row["priceIncrease"] = 1;
        //           } else if (+row.unitPrice < +products[row.itemNo].Price) {
        //             row["priceIncrease"] = -1;
        //           } else if (+row.unitPrice == +products[row.itemNo].Price) {
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
        //       setLoader(false);
        //       setTableData(table.filter((data) => data !== null));
        //       setItemNoDropdown(Object.keys(products));
        //       setProductDetails(products);
        //     })
        //     .catch((err) => {
        //       console.log("error on mapping ocrdata", err)
        //       setLoader(false);
        //     });
        // });
    }, []);

    console.log(apiLoader);
    console.log(showPosState);
    console.log(inv, num, day);
    console.log(notFounds, unitsInCase, price);
    if (loader) {
      return <Spinner />;
    }
    if(apiLoader){
      return (
      <div style={{marginTop: "100px", marginLeft: "700px"}}>
        <CircularProgress />
      </div>
      );       
    }
    return(

        <div className="container-fluid">
          <br />
            <Paper className={classes.root}>
                <Grid style={{ display: "flex" }}>
                  <Autocomplete
                      value={invoice}
                      onChange={(event, newValue) => {
                          // console.log("new value", newValue)
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
                    {/* <Autocomplete
                        value={invoiceNo}
                        onChange={(event, newValue) => {
                            // console.log("new value", newValue)
                            if (newValue) {
                            setInvoiceNo(newValue);
                            }
                        }}
                        id="combo-box"
                        options={invoiceOptions}
                        getOptionLabel={(option) => option.value}
                        style={{ width: 200 }}
                        autoHighlight
                        renderInput={(params) => (
                            <TextField {...params} label="Invoice No." variant="outlined" />
                        )}
                    /> */}
                    
                    {/* <TextField
                        label="Invoice No."
                        variant="outlined"
                        value={invoiceNo}
                        style={{ marginLeft: 20 }}
                        onChange={(e) => setInvoiceNo(e.target.value)}
                    />
                    <TextField
                        id="date"
                        label="Date"
                        type="date"
                        value={date}
                        style={{ marginLeft: 20 }}          
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(event) => setDate(event.target.value)}          
                    /> */}
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
                      onClick={getInvoices}
                      >
                          Fetch Invoice Data
                  </button>

                  <div style={{marginLeft: "20px"}}>
                  <table>
                  <tbody>
                      <tr style={{height: "21px"}}> 
                      <td style={{display: "flex",
                          width: "20px",
                          height: "20px",
                          backgroundColor: "rgb(238,129,237)",
                          borderRadius: "50%",
                          }}></td>
                          {/* <td style={{width: "0.25px", height: "0.25px", margin: "0px 0px 0px 0px"}}></td> */}
                      <td style={{height: "21px"}}><p >Product has been linked(on hovering).</p></td>
                      </tr>
                      <tr style={{height: "21px"}}> 
                      <td style={{display: "flex",
                          width: "20px",
                          height: "20px",
                          backgroundColor: "rgb(144,238,143)",
                          borderRadius: "50%",
                          }}></td>
                          {/* <td style={{width: "0.25px", height: "0.25px", margin: "0px 0px 0px 0px"}}></td> */}
                      <td style={{height: "21px"}}><p >Product has been updated on POS.</p></td>
                      </tr>
                      <tr style={{height: "21px"}}> 
                      <td style={{display: "flex",
                          width: "20px",
                          height: "20px",
                          backgroundColor: "rgb(231, 230, 162)",
                          borderRadius: "50%",
                          // border: "1px solid"
                          }}></td>
                          {/* <td style={{width: "0.25px", height: "0.25px", margin: "0px 0px 0px 0px"}}></td> */}
                      <td style={{height: "21px"}}><p >Product has not been linked(on hovering).</p></td>
                      </tr>
                      </tbody>
              </table>
              </div>
              <div style={{marginLeft: "20px"}}>
              <table>
              <tbody>
                  <tr style={{height: "21px"}}> 
                  <td style={{display: "flex",
                      width: "20px",
                      height: "20px",
                      backgroundColor: "rgb(210,180,140)",
                      borderRadius: "50%",
                      }}></td>
                      {/* <td style={{width: "0.25px", height: "0.25px", margin: "0px 0px 0px 0px"}}></td> */}
                  <td style={{height: "21px"}}><p >Product is free.</p></td>
                  </tr>
                  <tr style={{height: "21px"}}> 
                  <td style={{display: "flex",
                      width: "20px",
                      height: "20px",
                      backgroundColor: "rgb(24,140,255)",
                      borderRadius: "50%",
                      }}></td>
                      {/* <td style={{width: "0.25px", height: "0.25px", margin: "0px 0px 0px 0px"}}></td> */}
                  <td style={{height: "21px"}}><p >Invoice Unit Cost is greater </p></td>
                  </tr>
                  <tr style={{height: "21px"}}> 
                  <td style={{display: "flex",
                      width: "20px",
                      height: "20px",
                      backgroundColor: "rgb(255,179,26)",
                      borderRadius: "50%",
                      }}></td>
                      {/* <td style={{width: "0.25px", height: "0.25px", margin: "0px 0px 0px 0px"}}></td> */}
                  <td style={{height: "21px"}}><p >Invoice Unit Cost is lesser.</p></td>
                  </tr>
                  </tbody>
          </table>
          </div>

          <div style={{marginLeft: "20px"}}>
              <table>
              <tbody>
                  <tr style={{height: "21px"}}> 
                  <td style={{display: "flex",
                      width: "20px",
                      height: "20px",
                      backgroundColor: "pink",
                      borderRadius: "50%",
                      }}></td>
                      {/* <td style={{width: "0.25px", height: "0.25px", margin: "0px 0px 0px 0px"}}></td> */}
                  <td style={{height: "21px"}}><p >Product unidentified in POS.</p></td>
                  </tr>
                  </tbody>
          </table>
          </div>
        </Grid>

            </Paper>

            {openInvoice ? (<div><div><p>Invoice No.-- {num}</p></div><div><p>Invoice Date -- {day}</p></div></div>) : null}

        
            {pushToInventory ? (
            <UpdateInventory
                newInventoryData={inventoryData}
                header={header}
                goBack={setPushToInventory}
                invoice={invoice}
            />
            ) : ( openInvoice ? renderTableData() : renderInvoiceTable() 
            )}
            <CModal show={showModal} onClose={() => toggleModal("notfounds")}>
        <CModalHeader closeButton>Add Red Products</CModalHeader>
        <CModalBody>
          <CContainer fluid>
            <CRow>
              <CCol sm="6">
                <CFormGroup>
                  <CLabel htmlFor="invoiceNo">Units In Case</CLabel>
                  <CInput
                    type="text"
                    name="unitsInCase"
                    value={unitsInCase}
                    onChange={(event) => {
                      // setUnitsInCase(event.target.value)
                      dispatch({type: "UNITS_IN_CASE", data: event.target.value})
                    }}
                    />
                  <CLabel htmlFor="date">Case Cost</CLabel>
                  <CInput
                    type="text"
                    name="price"
                    value={price}
                    onChange={(event) => {
                      // setPrice(event.target.value)
                      dispatch({type: "PRICE", data: event.target.value})
                    }}
                    />
                </CFormGroup>
              </CCol>
            </CRow>
          </CContainer>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={updateItem}>
            ADD
          </CButton>{" "}
          <CButton color="secondary" onClick={() => toggleModal("notfounds")}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>

            <CModal show={detailsModal} onClose={() => toggleModal("details")}>
        <CModalHeader closeButton>Add Details</CModalHeader>
        <CModalBody>
          <CContainer fluid>
            <CRow>
              <CCol sm="6">
                <CFormGroup>
                  <CLabel htmlFor="invoiceNo">Add Details</CLabel>
                  <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="add details"
                    // minRows={4}
                    // maxRows={10}
                    style={{ width: 400, height: 100 }}
                    onChange={(event) => setDetails(event.target.value)}
                  />
                </CFormGroup>
              </CCol>
            </CRow>
          </CContainer>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={saveDetails}>
            ADD
          </CButton>{" "}
          <CButton color="secondary" onClick={() => toggleModal("details")}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>



        </div>

    );
}

export default SaveInvoiceData;