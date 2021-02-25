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

const DisplayData = (props) => {
  let emptyColumnList = [];
  const [tableData, setTableData] = useState([]);
  const [emptyColumn, setEmptyColumn] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [pushToInventory, setPushToInventory] = useState(false);
  const [inventoryData, setInventoryData] = useState([])
  const [itemNoDropdown, setItemNoDropdown] = useState([])
  const [loader, setLoader] = useState(true);
  // const [itemNoDescription, setItemNoDescription] = useState([])
  // const [itemNoPiece, setItemNoPiece] = useState([])
  const tesseractService = new TesseractService();
  // let itemDescription = []
  const header = [
        "Serial No.",
        "Qty Shipped",
        "ITEM NO",
        "DESCRPTION",
        "Units(Per item)",
        "Unit Price",
        "Extended Price",
        "Mark up (%)",
        "Selling Price",
  ];

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
          isNaN(element.unitPrice) ||
          isNaN(element.extendedPrice);
        if (isEmpty) {
          let emptyColumn = [...emptyColumnList, index];
          emptyColumnList = [...new Set(emptyColumn)];
        }
        let isFree = element.qty != "" && element.extendedPrice === "0.00";
        return (
          <tr
            key={index}
            className={isEmpty ? styles.red : isFree ? styles.free : null}
          >
            <td>{index + 1 }</td>
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
                  <TextField
                    {...params}
                    variant="outlined"
                  />
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
            <td>{element.sp}</td>
          </tr>
        );
      });

      return (
        <div className={styles.tablewrapper}>
          <table className="table table-hover table-responsive-sm">
            <tbody>
              <tr>{renderTableHeader()}</tr>
              {rows}
            </tbody>
          </table>
          <Button
            text="Update Inventory"
            color="btn btn-info"
            type="submit"
            onClick={pushInventoryDetails}
          />
        </div>
      );
    }
    return <h2>Fetching Data</h2>;
  };

  const pushInventoryDetails = () => {
    console.log("Pushing inventory");
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
    if (key === "unitPrice" || key === "markup") {
      let cp = parseFloat(tempTableData[row]["unitPrice"]);
      let markup = parseFloat(tempTableData[row]["markup"]);
      let sp = cp + (cp * markup) / 100;
      sp = sp / tempTableData[row]["pieces"];
      tempTableData[row]["sp"] = isNaN(sp) ? 0 : sp.toFixed(2);
    }
    if (key === "itemNo") {
      tempTableData[row]["description"] = productDetails[value].Description;
      tempTableData[row]["pieces"] = productDetails[value].Quantity;
    }
    if (
      (key === "qty" || key === "unitPrice") &&
      tempTableData[row]["extendedPrice"] !== "0.00"
    ) {
      const extendedPrice =
        parseFloat(tempTableData[row]["qty"]) *
        parseFloat(tempTableData[row]["unitPrice"]);
      console.log("enter if", value, extendedPrice);
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

    async function fetchOCRData() {
      setLoader(true)
      const ocrData = await tesseractService.GetOCRData(props.filename);
      console.log("ocr recieved data", ocrData);
      setLoader(false);
      return chooseFilter(props.selectedInvoice, Object.values(ocrData.body[0]));
      // return ocrData
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
            let table = ocrData.map(row =>{
              row.description = typeof(products[row.itemNo]) !== undefined ? products[row.itemNo].Description: row.Description
              row.pieces = typeof(products[row.itemNo]) !== undefined ? products[row.itemNo].Quantity : row.pieces
              let sp = 0
              if (parseInt(row.pieces)) {
                sp = (parseFloat(row.unitPrice)/parseInt(row.pieces)).toFixed(2)
              }
              return {...row, sp}
            })
            setTableData(table)
            setItemNoDropdown(Object.keys(products));
            setProductDetails(products);
          })
          .catch(err => console.log("err with ocr", err))
          .then(() => setLoader(false))
      })
    // invoiceData();
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