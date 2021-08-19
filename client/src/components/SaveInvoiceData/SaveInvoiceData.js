import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
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
let emptyColumnList = [];

const SaveInvoiceData = () => {

    const tesseractService = new TesseractService();
    const classes = useStyles();
    const [date, setDate] = useState("");
    const [invoice, setInvoice] = useState(dropdownOptions[0]);
    const [invoiceNo, setInvoiceNo] = useState("");
    const numOfCollections = dropdownOptions.length;
    const dropdownLabel = "Select Invoice("+   numOfCollections   + ")";

    //Following for display data functionalities.
    let hicksvilleData = [];
    let saveInvoiceFlag  = 1;
    const api = new Api();
    const [tableData, setTableData] = useState([]);
    const [emptyColumn, setEmptyColumn] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    const [pushToInventory, setPushToInventory] = useState(false);
    const [inventoryData, setInventoryData] = useState([]);
    const [itemNoDropdown, setItemNoDropdown] = useState([]);
    const [loader, setLoader] = useState(true);
    const [reviewItems, setReviewItems] = useState([]);
    const [showPosIndex, setShowPosIndex] = useState(-1);
    const inventoryService = new InventoryService();
    const [showModal, setShowModal] = useState(false);
    const [stateUpdated, setStateUpdated] = useState("false");
    const [costInc, setCostInc] = useState("false");
    const [costDec, setCostDec] = useState("false");
    const [unitCost, setUnitCost] = useState("");
    const [posProducts, setPosProducts] = useState([]);
    const header = [
        "Serial No.",
        "Barcode",
        "POS SKU",
        "Qty Shipped",
        "ITEM NO",
        "Link Product",
        "Update Item",
        "DESCRIPTION",
        "Units in  Case",
        "Case cost",
        "Extended Price",
        "Unit Cost ",
        "Unit Price",
        "Mark up (%)",
        "Tick to Delete",
        "Serial No.(2)"
    ];

    const [showPosState, setShowPosState] = useState({
        item: "",
        quantity: "",
        description: "",
        price: "",
        pos: "",
        barcode: "",
        posSku: "",
        invoice: "",
        size: "",
        department: "",
        unitCost: "",
        unitPrice: "",
    });

    const pushSingleItemToInventory = async (index) =>{
      console.log(index);
  
      const pushInventoryDetails2 =  (data2) => {
        let items = [];
  
        async function getPosProducts() {
          setLoader(true);
          let hasErrorOccured = false;
          console.log(products);
           items = 
            products
              .map( (row) => {
                try {
                  const res =  inventoryService.GetPOSProductDetails(
                    row.barcode
                  );
                  console.log("fetched pos data", res);
                  const { SKU, UPC, ITEMNAME, TOTALQTY, DEPNAME } = res[0];
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
          
          if (hasErrorOccured) {
            alert("Couldn't fetch some data from POS");
          }
          setLoader(false);
          console.log(items);
          setPosProducts(items);
        }
        getPosProducts();
  
        console.log(posProducts);
        pushToPOS(items);
    
        setLoader(false);
        // if (itemsNotPushed.length === 0) {
        window.alert("Inventory updated successfully");
        // } else {
        //   window.alert("Inventory not updated");
        // }
      };
      
    
      const pushToPOS = async (products) => {
        setLoader(true);
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
                  VENDORNAME: invoice.slug,
                  VENDORCODE: itemNo,
                  VENDORCOST: "",
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
        setLoader(false);
      };
      const tempTable = [];
      const products = [];
      console.log(tableData);
      console.log(tableData[index]);
      products.push(tableData[index]);
      console.log(products);
      
      products.forEach((element, index) => {
        if (
          !emptyColumn.includes(index) &&
          element.show === true
        ) {
          let rowData = { index: index + 1, ...element };
          tempTable.push(rowData);
        }
      });
      console.log(tempTable)
      const priceIncreasedProducts = tempTable.filter(
        (product) => product.priceIncrease !== 0
      );
      setLoader(true);
      console.log(priceIncreasedProducts);
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
      setLoader(false);
      // setInventoryData(mergeDuplicates(tempTable));
      pushInventoryDetails2(tempTable);
    }

    const fetchSavedData = async() => {
        const data =  await tesseractService.GetSavedInvoiceData(invoice.slug, invoiceNo, date);
        console.log(data);
        console.log(data[0].InvoiceData);
        return data[0].InvoiceData;
    };

    const setProductsInTable = () => {
      async function invoiceData() {
        const products = await tesseractService.GetProductDetails(
          invoice.slug
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
  
              row.description =
                products[row.itemNo] !== undefined
                  ? products[row.itemNo].Description
                  : row.description;
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
            setLoader(false);
            setTableData(table.filter((data) => data !== null));
            setItemNoDropdown(Object.keys(products));
            setProductDetails(products);
          })
          .catch((err) => {
            console.log("error on mapping ocrdata", err)
            setLoader(false);
          });
      });
    }

    const toggleModal = () => {
        setShowModal(!showModal);
        // setDate("");
        // setInvNo("");
      };
    
    const hicksvilleDropdown = (data) => {
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
              sku: s[0] === "nan" ? null : s[0],
              upc: s[1] === "nan" ? null : s[1],
              altupc1: s[2] === "nan" ? null : s[2],
              altupc2: s[3] === "nan" ? null : s[3],
              name: s[4] === "nan" ? null : s[4],
              vintage: s[5] === "nan" ? null : s[5],
              totalQty: s[6] === "nan" ? null : s[6],
              cost: s[7] === "nan" ? null : s[7],
              pricea: s[8] === "nan" ? null : s[8],
              priceb: s[9] === "nan" ? null : s[9],
              pricec: s[10] === "nan" ? null : s[10],
              department: s[11] === "nan" ? null : s[11],
              salePrice: s[12] === "nan" ? null : s[12],
              size: s[13] === "nan" ? null : s[13],
              pack: s[14] === "nan" ? null : s[14],
              price: s[15] === "nan" ? null : s[15],
            }
          newData.push(obj);
        }
        const filter = newData.map((element) => {
          let obj = { ...element };
          obj.label = `${element.name}- ${element.price}- ${element.upc} - ${element.size}-${element.cost}`;
          //console.log(obj);
          return obj; 
        });
        hicksvilleData = filter;
          // console.log(hicksvilleData);
    }

    const updateItem = (ocrCost) => {
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
          setLoader(false)
          setStateUpdated("true");
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
        hicksvilleDropdown(HicksData);
    
        if (tableData) {
          console.log(tableData);
    
          // console.log(showPosIndex);
          
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
    
            return (
              <tr
                key={index}
                className={isEmpty ? styles.red : isFree ? styles.free : null}
                style={element.show ? { opacity: "1" } : { opacity: "0.4" }}
              >
                <td>{index + 1}</td>
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
                      style={
                        reviewItems.includes(index)
                          ? { backgroundColor: "green" }
                          : null
                      }
                    /> 
                    {/* <AddShoppingCartIcon
                      style={
                        reviewItems.includes(index)
                          ? { backgroundColor: "green" }
                          : null
                      }
                    /> */}
                  </IconButton>
                  <div className={element.isReviewed  === "true" || (showPosIndex === index && stateUpdated === "true") ? styles.tooltipIsReviewed: styles.tooltip} >
                    <p>POS Product- {showPosIndex === index ? showPosState.pos : element.posName }</p>
                    {/* <p>UPC- {showPosIndex === index ? showPosState.barcode : element.barcode}</p> */}
                    <p>Size- {showPosIndex === index ? showPosState.size : element.size}</p>
                    <p>Department - {showPosIndex === index ? showPosState.department : element.department}</p>
                    <p>Unit Cost- {showPosIndex === index ? showPosState.unitCost : element.cost}</p> 
                    <p>Unit Price- {showPosIndex === index ? showPosState.unitPrice : element.sellingPrice}</p>
                    <div >
                    <button onClick={() => updateItem((parseFloat(element.unitPrice) / parseInt(element.pieces)).toFixed(2))} disabled={showPosIndex === index ? false : true}
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
                  <Autocomplete
                    value={showPosIndex  === index ? showPosState.item : element.itemNo }
                    onChange={(event, newValue) => {
                      if (newValue) {
                        let newState = { ...showPosState };
                        //console.log(newValue);
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
                        setShowPosState(newState);
                        setShowPosIndex(index);
                        setUnitCost(newValue.cost);
                        setStateUpdated("");
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
                    options={hicksvilleData}
                    getOptionLabel={(option) => option.label ?? element.itemNo}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </td>
                <td>
                <Button 
                    text="Update Item"
                    color="btn btn-info"
                    type="submit"
                    onClick={() => pushSingleItemToInventory(index)}
                    style={{ width: 120 }}
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
                      // element.priceIncrease === 1
                      //   ? { backgroundColor: "#1a8cff", width: 100 }
                      //   : element.priceIncrease === -1
                      //   ? { backgroundColor: "#ffb31a", width: 100 }
                      //   : { width: 100 }
                      showPosIndex === index ? costInc==="true" ? { backgroundColor: "#1a8cff", width: 100 } : costDec==="true" ? { backgroundColor: "#ffb31a", width: 100 } : {width: 100}
                        : element.priceIncrease === 1 
                            ? { backgroundColor: "#1a8cff", width: 100 }
                            : element.priceIncrease === -1 
                            ? { backgroundColor: "#ffb31a", width: 100 }
                            : { width: 100 }
                    }
                  />
                </td>
                <td>{element.extendedPrice}</td>
                <td>{element.cp}</td>
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
                <td>
                  <Checkbox
                    checked={!element.show}
                    onChange={(e) => handleChange(index, "show", e.target.value)}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
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
            <div style={{ marginTop: "70px" }}>
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
          setLoader(true);
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
                  InvoiceName: invoice,
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
          setLoader(false);
        }
        const priceIncreasedProducts = tempTable.filter(
          (product) => product.priceIncrease !== 0
        );
        setLoader(true);
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
        setLoader(false);
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

    

    return(
        <div className="container-fluid">
            <Paper className={classes.root}>
                <Grid style={{ display: "flex" }}>
                    <Autocomplete
                        value={invoice}
                        onChange={(event, newValue) => {
                            // console.log("new value", newValue)
                            if (newValue) {
                            setInvoice(newValue);
                            }
                        }}
                        id="combo-box"
                        options={dropdownOptions}
                        getOptionLabel={(option) => option.value}
                        style={{ width: 300 }}
                        autoHighlight
                        renderInput={(params) => (
                            <TextField {...params} label={dropdownLabel} variant="outlined" />
                        )}
                    />
                    <TextField
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
                    />
                    <button  style={{backgroundColor: "green",
                        border: "none",
                        color: "white",
                        padding: "4px 8px",
                        textAlign: "center",
                        textDecoration: "none",
                        display: "inline-block",
                        fontSize: "14px",
                        align: "left",
                        marginLeft: 20}}
                        onClick={setProductsInTable}>
                            Fetch Invoice Data
                    </button>
                </Grid>
            </Paper>
        
            {pushToInventory ? (
            <UpdateInventory
                newInventoryData={inventoryData}
                header={header}
                goBack={setPushToInventory}
                invoice={invoice}
            />
            ) : (
            renderTableData()
            )}
        </div>

    );
}

export default SaveInvoiceData;