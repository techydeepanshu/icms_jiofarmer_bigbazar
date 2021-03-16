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

const DisplayData = (props) => {
  let emptyColumnList = [];
  const [tableData, setTableData] = useState([]);
  const [emptyColumn, setEmptyColumn] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [pushToInventory, setPushToInventory] = useState(false);
  const [inventoryData, setInventoryData] = useState([])
  const [itemNoDropdown, setItemNoDropdown] = useState([])
  const [loader, setLoader] = useState(true);
  const tesseractService = new TesseractService();
  const header = [
        "Serial No.",
        "Qty Shipped",
        "ITEM NO",
        "DESCRPTION",
        "Units(Per item)",
        "Unit Price",
        "Extended Price",
        "Cost Price",
        "Selling Price",
        "Mark up (%)",
  ];

  const addRow = () => {
    let tempTableData = [...tableData]
    tempTableData.push({qty: 0, itemNo: "", description: "", pieces: 0, unitPrice: 0.00, extendedPrice: "", markup: 0, sp: 0})
    setTableData(tempTableData)
  };
  const deleteRow = (index) => {
    let tempTableData = [...tableData]
    tempTableData.splice(index, 1)
    setTableData(tempTableData)
  }
  const renderTableHeader = () => {
    return header.map((key, index) => {
      return (
        <th key={index}>
          {key.toUpperCase()}
          {key.includes("Mark") ? (
            <TextField
                type={"number"}
                variant="outlined"
                onChange={(e) => {
                  setMarkup(e.target.value);
                }}
                style={{width: 100}}
              />
          ) : null}
        </th>
      );
    });
  };

  const renderTableData = () => {
    if (tableData) {
      // console.log("invoiceData", itemNoDropdown);
      let rows = tableData.map((element, index) => {
        let isEmpty =
          element.qty === "" ||
          element.itemNo === "" ||
          !element.pieces ||
          isNaN(element.unitPrice) ||
          isNaN(element.extendedPrice);
        if (isEmpty) {
          let emptyColumn = [...emptyColumnList, index];
          emptyColumnList = [...new Set(emptyColumn)];
        }
        let isFree = element.qty != 0 && element.extendedPrice === "0.00";
        return (
          <tr
            key={index}
            className={isEmpty ? styles.red : isFree ? styles.free : null}
          >
            <td>{index + 1}</td>
            <td className={isFree ? styles.element : null}>
              <TextField
                type="number"
                value={element.qty}
                id="outlined-secondary"
                variant="outlined"
                onChange={(e) => {
                  handleChange(index, "qty", e.target.value);
                }}
                style={{ width: 100 }}
              />
              <span className={styles.tooltip}>
                The extended price for this is {element.extendedPrice} but
                quantity shipped is {element.qty} is this a free item? Please
                eneter the unit price manually.
              </span>
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
            <td>{element.description}</td>
            <td>{element.pieces}</td>
            <td>
              <TextField
                type="number"
                value={element.unitPrice}
                id="outlined-secondary"
                variant="outlined"
                onChange={(e) => {
                  handleChange(index, "unitPrice", e.target.value);
                }}
                style={{ width: 100 }}
              />
            </td>
            <td>{element.extendedPrice}</td>
            <td>{element.cp}</td>
            <td>{element.sp}</td>
            <td>
              <TextField
                type="number"
                value={element.markup}
                id="outlined-secondary"
                variant="outlined"
                onChange={(e) => {
                  handleChange(index, "markup", e.target.value);
                }}
                style={{ width: 100 }}
              />
            </td>
            <td>
              <Button
                text="Delete"
                color="btn btn-info"
                type="submit"
                onClick={() => deleteRow(index)}
              />
            </td>
          </tr>
        );
      });

      return (
        <div className={styles.tablewrapper}>
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
              text="Re upload"
              color="btn btn-info"
              type="submit"
              onClick={() =>window.location.reload()}
            />
          </div>
        </div>
      );
    }
    return <h2>Fetching Data</h2>;
  };

  const pushInventoryDetails = () => {
    // console.log("Pushing inventory");
    if (emptyColumn.length === 0 && emptyColumnList.length === 0) {
      let tempTable = []
      tableData.forEach((element, index) => {
        let rowData = {index: index + 1, ...element}
        tempTable.push(rowData)
      });
      setInventoryData(tempTable)
      setPushToInventory(true);
    } else {
      alert("Please fill all the values");
    }
  };

  const handleChange = async (row, key, value) => {
    let tempTableData = [...tableData];
    tempTableData[row][key] = value;

    // console.log("Empty col list", emptyColumnList, emptyColumn);
    if (
      tempTableData[row]["qty"] !== "" &&
      tempTableData[row]["itemNo"] !== "" &&
      tempTableData[row]["unitPrice"] !== ""
    ) {
      const index = emptyColumnList.indexOf(row);
      if (index > -1) {
        emptyColumnList.splice(index, 1);
      }
      setEmptyColumn(emptyColumnList);
    }
    if (key === "itemNo") {
      tempTableData[row]["description"] = productDetails[value].Description;
      tempTableData[row]["pieces"] = productDetails[value].Quantity;
      tempTableData[row]["sku"] = productDetails[value].sku;
    }

    if (key === "unitPrice" || key === "markup" || key === "itemNo") {
      let cp = parseFloat(tempTableData[row]["unitPrice"]);
      let markup = parseFloat(tempTableData[row]["markup"]);
      let cost =
        parseFloat(tempTableData[row]["unitPrice"]) /
        tempTableData[row]["pieces"];
      let sp = cp + (cp * markup) / 100;
      if (tempTableData[row]["pieces"]) {
        sp = sp / tempTableData[row]["pieces"];
      }
      tempTableData[row]["sp"] = isNaN(sp) ? 0 : sp.toFixed(2);
      tempTableData[row]["cp"] = isNaN(cost)? 0 : cost.toFixed(2)
    }

    if (
      (key === "qty" || key === "unitPrice")/*  &&
      tempTableData[row]["extendedPrice"] !== "0.00" */
    ) {
      const extendedPrice =
        parseFloat(tempTableData[row]["qty"]) *
        parseFloat(tempTableData[row]["unitPrice"]);
      // console.log("enter if", value, extendedPrice);
      if (!isNaN(extendedPrice)) {
        tempTableData[row]["extendedPrice"] = extendedPrice.toFixed(2);
      }
    }
    setTableData(tempTableData);
  };

  const setMarkup = (value) => {
    let tempTableData = [...tableData];

    for (let index = 0; index < tempTableData.length; index++) {
      handleChange(index, "markup" , value);
    }
  };

  useEffect(() => {
    /**Fetch the data from the aws textract for the image */
    async function fetchOCRData() {
      // return chetak();

      setLoader(true)
      const ocrData = await Promise.all(
        props.filename.map(async (file) => {
          try {
            const res = await tesseractService.GetOCRData(file);
            // console.log("Gettting description for", inputFile, res)
            // return res.body;
            return chooseFilter(props.selectedInvoice, res.body);
          } catch (error) {
            // console.log("error fetching descripton", error);
            // return null;
            throw new Error(error);
          }
        })
      );
      // const ocrData = await tesseractService.GetOCRData(props.filename);
      // console.log("ocr recieved data", ocrData);
      /**
       * combine ocrdata into "newData" and return it
       */
      // setLoader(false);
      /** apply filter for the specific invoice */
      let newData = []
      ocrData.forEach(data => newData=[...newData,...data])
      return newData
    }
    async function invoiceData () {
      const products = await tesseractService.GetProductDetails(props.selectedInvoice);
      return products
      // setItemNoDropdown(Object.keys(products))
      // setProductDetails(products);
    };
    fetchOCRData()
      .then(ocrData => {
        invoiceData()
          .then(products => {
            // /**post processing the table data after returning form filter */
            function convertToUpperCase(obj) {
              let newObj = {}
              for ( let key in obj) {
                // console.log("obj[key]", obj[key])
                newObj[key.toUpperCase()] = obj[key]
              }
              return newObj
            }
            products = convertToUpperCase(products)
            // console.log("The products key", products)
            let table = ocrData.map(row =>{
              /**For invoices which dont have item no, set description as item no */
              if (row.itemNo === undefined) {
                row.itemNo = row.description.trim().toUpperCase()
              }
              row.itemNo = row.itemNo.toString().toUpperCase();
              row.description = products[row.itemNo] !== undefined ? products[row.itemNo].Description: row.description
              row.pieces = products[row.itemNo] !== undefined ? products[row.itemNo].Quantity : 0
              row.sku = products[row.itemNo] !== undefined ? products[row.itemNo].sku : ""
              row.markup = 0
              let sp = 0
              let cp = 0
              if (parseInt(row.pieces)) {
                sp = (parseFloat(row.unitPrice)/parseInt(row.pieces)).toFixed(2)
                cp = sp
              }
              /**filter out the rows for which qty shipped & extendedPrice is zero */
              if (row.qty == "0" && row.extendedPrice === "0.00") {
                return null
              }
              /**Calulate qty for which qty is not read/scanned by textract */
              if (!row.qty) {
                row.qty = (
                  parseFloat(row.extendedPrice) / parseFloat(row.unitPrice)
                ).toFixed(0);
              }
              return {...row, sp, cp}
            })
            setLoader(false);
            setTableData(table.filter((data) => data !== null));
            setItemNoDropdown(Object.keys(products));
            setProductDetails(products);
          })
          .catch(err => {
            setLoader(false);
            // console.log("err with ocr", err)
          })
          // .then(() => setLoader(false))
      })
  }, []);

  useEffect(() => {
    // console.log("rerendered", tableData[0]);
  }, [ tableData ])
  // console.log("Item fetched", tableData, productDetails)
  if (loader) {
    return <Spinner />;
  }
  return (
    <div className="container-fluid">
      {pushToInventory ? (
        <UpdateInventory newInventoryData={tableData} header={header}/>
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