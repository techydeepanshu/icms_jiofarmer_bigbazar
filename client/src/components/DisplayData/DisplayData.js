import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { TesseractService } from "../../services/TesseractService";
import Button from "../../UI/Button";
import { chooseFilter } from "../../utils/filterData";
import UpdateInventory from "../Update/UpdateInventory";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import styles from "./DisplayData.module.css";
import Spinner from "../../UI/Spinner/Spinner";
import { chetak } from "../../utils/invoice-filters/chetak";
import firebase from "../../firebase";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { InventoryService } from "../../services/InventoryService";
import Checkbox from "@material-ui/core/Checkbox";

import { Api } from "../../services/Api";
import HicksData from "./Hicksville.json";

let emptyColumnList = [];
const DisplayData = (props) => {
  const api = new Api();
  const [tableData, setTableData] = useState([]);
  const [emptyColumn, setEmptyColumn] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [pushToInventory, setPushToInventory] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);
  const [itemNoDropdown, setItemNoDropdown] = useState([]);
  const [loader, setLoader] = useState(true);
  const [reviewItems, setReviewItems] = useState([]);
  const tesseractService = new TesseractService();
  const inventoryService = new InventoryService();
  let hicksvilleData = [];
  let flag = 0;
  const scanInvoiceData = 
    {
      InvoiceName: props.selectedInvoice,
      InvoiceDate: "",
      InvoiceNumber: "",
      InvoicePage: "",
      InvoiceData: []
    }
  
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
      unitPrice: ""
    });

  const header = [
    "Serial No.",
    "Barcode",
    "POS SKU",
    "Qty Shipped",
    "ITEM NO",
    "Show POS",
    "DESCRIPTION",
    "Units in  Case",
    "Case cost",
    "Extended Price",
    "Unit Cost ",
    "Unit Price",
    "Mark up (%)"
  ];

  // added by parikshit.
  const saveInvoiceData = async () => {
    const resScnInvDta =  await inventoryService.CreateScanInvoiceData(scanInvoiceData);
    console.log(showPosState);
    console.log(resScnInvDta);
  }

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
      obj.label = `${element.name}- ${element.price}- ${element.upc} - ${element.size}`;
      //console.log(obj);
      return obj;
      
    });
    hicksvilleData = filter;
      console.log(hicksvilleData);
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
    if (tableData) {
      console.log(tableData);
      hicksvilleDropdown(HicksData);
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
                value={element.barcode}
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
                onClick={() => addForReview(element, index)}
              >
                <AddShoppingCartIcon
                  style={
                    reviewItems.includes(index)
                      ? { backgroundColor: "green" }
                      : null
                  }
                />
              </IconButton>
              <div className={element.isReviewed === "true" ? styles.tooltipIsReviewed: styles.tooltip} >
                <p>POS Product- {flag ? showPosState.pos : element.posName }</p>
                <p>UPC- {flag ? showPosState.barcode : element.barcode}</p>
                <p>Size- {flag ? showPosState.size : element.size}</p>
                <p>Department - {flag ? showPosState.department : element.department}</p>
                <p>Unit Cost- {flag ? showPosState.unitCost : element.cost}</p> 
                <p>Unit Price- {flag ? showPosState.unitPrice : element.sellingPrice}</p>
              </div>
            </td>
            <td>{element.posSku}</td>
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
                value={flag ? showPosState.item :element.itemNo }
                onChange={(event, newValue) => {
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
                    setShowPosState(newState);
                    flag = 1;
                    console.log(newValue);
                    console.log(newState);
                    
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
            <td>
              <Button
                text={element.show ? "Delete" : "Undo"}
                color="btn btn-info"
                type="submit"
                onClick={() => deleteRow(index)}
              />
            </td>
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
            <Button
              text="Save Invoice Data"
              color="btn btn-info"
              type="submit"
              onClick={saveInvoiceData}
            />
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
    console.log("notFoundItems", notFoundItems);
    console.log("final table data", tempTable);

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
              InvoiceName: props.selectedInvoice,
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
            invoiceName: props.selectedInvoice,
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

  //For preventing creation of new level in firebase.
 /*  const forbiddeChars = "/";
  escape(forbiddeChars);
  encodeURI(forbiddeChars);
  encodeURIComponent(forbiddeChars); */
  
  
  
  
  const addForReview = async (item, index) => {
    const data = {
      barcode: item.barcode,
      posName: item.posName,
      itemNo: item.itemNo,
      description: item.description,
      invoiceName: props.selectedInvoice,
      posSku: item.posSku,
    };
    const tempReviewItems = [...reviewItems];
    tempReviewItems.push(index);
    setReviewItems(tempReviewItems);
    try {
      console.log(item.itemNo)
      firebase.database().ref("/review").child(`${item.itemNo.replace('/',"SlasH")}`).set(data);
      let tempTableData = [...tableData];
      tempTableData[index]["isForReview"] = true;
      setTableData(tempTableData);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
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

  const setMarkup = (value) => {
    let tempTableData = [...tableData];

    for (let index = 0; index < tempTableData.length; index++) {
      handleChange(index, "markup", value);
    }
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
    async function fetchOCRData() {
      // return chetak();

      setLoader(true);
      const ocrData = await Promise.all(
        props.filename.map(async (file) => {
          try {
            //console.log("FILENAME" + props.filename);
            const res = await tesseractService.GetOCRData(file);
            console.log("ocrData from TSRCTsrvc goes to chooseFilter");
            console.log(res.body);
            let invDate = res.body[1]["2"]["1"];
            let invNo = res.body[1]["2"]["2"];
            let invPage = res.body[1]["2"]["3"];
            scanInvoiceData.InvoiceDate = invDate;
            scanInvoiceData.InvoiceNumber = invNo;
            scanInvoiceData.InvoicePage = invPage;
            //console.log(invDate);
            //console.log(invNo);
            //console.log(invPage);
            //console.log(scanInvoiceData);
            return chooseFilter(props.selectedInvoice, res.body);
          } catch (error) {
            console.log("error fetching descripton", error);
            // throw new Error(error);
          }
        })
      );
      let newData = [];
      ocrData.forEach((data) => (newData = [...newData, ...data]));
      return newData;
    }

    async function invoiceData() {
      const products = await tesseractService.GetProductDetails(
        props.selectedInvoice
      );
      //console.log(props.selectedInvoice);
      return products;
    }
    fetchOCRData().then((ocrData) => {
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
          let invData = { InvoiceData: ocrData};
          scanInvoiceData.InvoiceData = ocrData;
          //console.log(resScnInvDta);
          //console.log("OCERDATa", ocrData);
          //console.log(products);
          console.log(scanInvoiceData);
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
              if (+row.unitPrice > +products[row.itemNo].Price) {
                row["priceIncrease"] = 1;
              } else if (+row.unitPrice < +products[row.itemNo].Price) {
                row["priceIncrease"] = -1;
              } else if (+row.unitPrice == +products[row.itemNo].Price) {
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
  }, []);

  if (loader) {
    return <Spinner />;
  }
  return (
    <div className="container-fluid">
      {pushToInventory ? (
        <UpdateInventory
          newInventoryData={inventoryData}
          header={header}
          goBack={setPushToInventory}
          invoice={props.selectedInvoice}
        />
      ) : (
        renderTableData()
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.userId,
  };
};

export default connect(mapStateToProps)(DisplayData);
