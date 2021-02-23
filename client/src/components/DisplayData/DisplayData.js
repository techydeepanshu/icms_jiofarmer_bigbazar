import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { TesseractService } from "../../services/TesseractService";
import Button from "../../UI/Button";
import { chooseFilter } from "../../utils/filterData";
import UpdateInventory from "../Update/UpdateInventory";

import styles from "./DisplayData.module.css";

const DisplayData = (props) => {
  let emptyColumnList = [];
  const [tableData, setTableData] = useState(chooseFilter(props.selectedInvoice, "data"));
  const [emptyColumn, setEmptyColumn] = useState([]);
  const [description, setDescription] = useState([]);
  const [pushToInventory, setPushToInventory] = useState(false);
  const [inventoryData, setInventoryData] = useState([])
  const tesseractService = new TesseractService();
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
            <input
              type="number"
              onChange={(e) => {
                setMarkup(e.target.value);
              }}
            />
          ) : null}
        </th>
      );
    });
  };

  const renderTableData = () => {
    if (tableData) {
      let count = 0;
      let rows = tableData.map((element, index) => {
        let isEmpty =
          element[0] === "" ||
          element[1] === "" ||
          description[index] === undefined ||
          isNaN(element[3]) ||
          isNaN(element[4]);
        if (isEmpty) {
          let emptyColumn = [...emptyColumnList, index];
          emptyColumnList = [...new Set(emptyColumn)];
        }
        if (!isNaN(element[3])) {
          let cp = parseFloat(element[3]);
          let markup = parseFloat(element[5]);
          let sp = cp + (cp * markup) / 100;
          sp = sp / description[index]?.Quantity;
          element[6] = isNaN(sp)
            ? (element[3] / description[index]?.Quantity).toFixed(2)
            : sp.toFixed(2);
        }
        let isFree = element[0] != "" && element[4] == "0.00";
        count++;
        return (
          <tr
            key={index}
            className={isEmpty ? styles.red : isFree ? styles.free : null}
          >
            <td>{count}</td>
            <td className={isFree ? styles.element : null}>
              <input
                value={element[0]}
                type="number"
                onChange={(e) => {
                  handleChange(index, 0, e.target.value);
                }}
              />
              <span className={styles.tooltip}>
                The extended price for this is {element[4]} but quantity shipped
                is {element[0]} is this a free item? Please eneter the unit
                price manually.
              </span>
            </td>
            <td>
              <input
                value={element[1]}
                type="text"
                onChange={(e) => {
                  handleChange(index, 1, e.target.value);
                }}
              />
            </td>
            <td>{description[index]?.Description}</td>
            <td>{description[index]?.Quantity} </td>
            <td>
              <input
                value={element[3]}
                type="number"
                onChange={(e) => {
                  handleChange(index, 3, e.target.value);
                }}
              />
            </td>
            <td>
              <input
                value={element[4]}
                type="number"
                onChange={(e) => {
                  handleChange(index, 4, e.target.value);
                }}
              />
            </td>
            <td>
              <input
                value={element[5]}
                type="number"
                onChange={(e) => {
                  handleChange(index, 5, e.target.value);
                }}
              />
            </td>
            <td>
              {element[6]}
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
        let rowData = {index: index + 1, qty: element[0], item: element[1], description: description[index]?.Description, pieces: description[index]?.Quantity, unitPrice: element[3], extendedPrice: element[4], markup: element[5], sp: element[6]}

        tempTable.push(rowData)
      });
      setInventoryData(tempTable)
      setPushToInventory(true);
    } else {
      alert("Please fill all the values");
    }
  };

  const handleChange = async (row, column, value) => {
    let tempTableData = [...tableData];
    tempTableData[row][column] = value;
    // console.log("Empty col list", emptyColumnList, emptyColumn);
    if (
      tempTableData[row][0] !== "" &&
      tempTableData[row][1] !== "" &&
      tempTableData[row][2] !== "" &&
      tempTableData[row][4] !== "" &&
      tempTableData[row][5] !== ""
    ) {
      const index = emptyColumnList.indexOf(row);
      if (index > -1) {
        emptyColumnList.splice(index, 1);
      }
      setEmptyColumn(emptyColumnList);
    }
    if (column === 5 || column === 3) {
      let cp = parseFloat(tempTableData[row][3]);
      let markup = parseFloat(tempTableData[row][5]);
      let sp = cp + (cp * markup) / 100;
      sp = sp / tempTableData[row][7];
      tempTableData[row][6] = isNaN(sp) ? 0 : sp.toFixed(2);
    }
    if (column === 1) {
      const item = await tesseractService.GetProductDetails(value);
      let productDetails = [...description];
      productDetails[row] = item;
      setDescription(productDetails);
    }
    if (column === 3 || column === 0) {
      const extendedPrice =
        parseFloat(tempTableData[row][3]) * parseFloat(tempTableData[row][0]);
      console.log("enter if", tempTableData[row][3], value, extendedPrice);
      if (!isNaN(extendedPrice)) {
        tempTableData[row][4] = extendedPrice.toFixed(2);
      }
    }
    setTableData(tempTableData);
  };

  const setMarkup = (value) => {
    let tempTableData = [...tableData];

    for (let index = 0; index < tempTableData.length; index++) {
      handleChange(index, 5, value);
    }
  };

  useEffect(() => {
    // ws.onopen = () => {
    //   // on connecting, do nothing but log it to the console
    //   console.log("connected");
    // };
    // ws.onmessage = (evt) => {
    //   // listen to data sent from the websocket server
    //   if (evt.data) {
    //     const message = JSON.parse(evt.data);
    //     setTableData(calculateTableFields(message))
    //     //  this.setState({ dataFromServer: message });
    //     console.log(message);
    //   } else {
    //     console.log("No data received");
    //   }
    // };
    async function fetchData() {
      const ocrData = await tesseractService.GetOCRData(props.filename);
      console.log("ocr recieved data", ocrData);
    }
   fetchData();
  }, []);

  useEffect(() => {
    const getDescription = async () => {
      // console.log("Here tabledata", tableData);
      const productDetails = await Promise.all(
        tableData.map(async (product) => {
          try {
            const item = await tesseractService.GetProductDetails(product[1]);
            // console.log("Gettting description for", product[1], item)
            return item;
          } catch (error) {
            console.log("error fetching descripton", error);
            return null;
          }
        })
      );
      setDescription(productDetails);
    };
    if (description.length === 0 && tableData) {
      getDescription();
    }
  }, [description, tableData]);

  console.log("Item fetched", tableData, description)
  return (
    <div className="container-fluid">
      {pushToInventory ? (
        <UpdateInventory newInventoryData={inventoryData} header={header}/>
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