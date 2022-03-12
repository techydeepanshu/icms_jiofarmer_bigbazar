import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { InventoryService } from "../../services/InventoryService";
import Button from "../../UI/Button";
import Spinner from "../../UI/Spinner/Spinner";
import { handwrittenInvoiceList } from "../HandWrittenInvoice/HandWrittenInvoiceList";
import TextField from "@material-ui/core/TextField";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
const UpdateHandwrittenInventory = (props) => {
  // const header = props.header;
  const [unitPriceModify, setUnitPriceModify] = useState(props.unitPriceModify);
  const [tableData, setTableData] = useState(props.newInventoryData);
  const [incPrice, setIncPrice] = useState(props.incPrice);
  const [decPrice, setDecPrice] = useState(props.decPrice);
  const [tableDataCopy, setTableDataCopy] = useState(props.tableDataCopy);
  const [todayDate, setTodayDate] = useState(props.todayDate);
  const [selectedDropdown, setSelectedDropdown] = useState(props.invoice);
  const [userEmail, setUserEmail] = useState(props.userEmail);
  const [posProducts, setPosProducts] = useState([]);
  //   const posProducts = [];
  const [redirect, setRedirect] = useState(false);
  const [loader, setLoader] = useState(false);
  const [wooComProducts, setWooComProducts] = useState([]);
  const inventoryService = new InventoryService();
  const header = [
    "Serial No.",
    "Barcode",
    "POS SKU",
    "Qty Shipped",
    "ITEM NO",
    "DESCRIPTION",
    "Units in  Case",
    "Case cost",
    "Extended Price",
    "Unit Cost ",
    "Unit Price",
    "Mark up (%)",
  ];

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

  const handleChange = (index, key, val) => {
    console.log("handleChange_key : ", key);
    console.log("handleChange_val : ", val);
    console.log("handleChange_index : ", index);
    // console.log("handleChange_setPosProduct : ", posProduct);
    // console.log("handleChange_tableData[index] : ", tableData[index]);
    // setPosProduct({
    //   ...posProduct,
    //   [key]: val,
    // });
    // const tempData = [{...tableData[index], [key]:val }]

    if (key === "sellingPrice") {
      // setNewUnitPrice(val);
      // setPrevNewUnitPrice(tableDataCopy[index].sellingPrice);
      console.log("NewUnitPrice_value : ", val);
      console.log(
        "PrevNewUnitPrice_value : "
        // tableDataCopy[index].sellingPrice
      );
    }

    const tempTableData = {
      ...tableData,
      [index]: { ...tableData[index], [key]: val },
    };
    const propertyNames = Object.values(tempTableData);

    console.log("propertyName : ", propertyNames);
    console.log("handelChange_propertyNames[index] : ", propertyNames[index]);
    setTableData(propertyNames);
  };

  const renderTableData = () => {
    let rows = tableData.map((element, index) => {
      return (
        <tr key={index} style={element.priceIncrease === 1 ? {background:"#90EE90"} : element.priceIncrease === -1 ? {background:"#FFB31A"} : {background:"#b7b7b7"}}>
          <td>{index + 1}</td>
          <td>{element.barcode}</td>
          <td>{element.posSku}</td>
          <td>{element.qty}</td>
          <td>{element.itemNo}</td>
          <td>{element.description}</td>
          <td>{element.pieces}</td>
          <td>{element.unitPrice}</td>
          <td>{element.extendedPrice}</td>
          <td>{element.cp}</td>
          <td>
            <TextField
              type="tel"
              /*value={element.sp}*/
              value={element.sellingPrice}
              variant="outlined"
              onChange={(e) => {
                handleChange(index, "sellingPrice", e.target.value);
              }}
              style={{ width: 100 }}
            />
          </td>
          <td>{element.markup}</td>
        </tr>
      );
    });
    return (
      <div style={{ marginTop: "70px" }}>
        <div style={{ textAlign: "center" }}>
          {incPrice === true && decPrice === true && unitPriceModify === true ? (
            <p>
              {" "}
              <CheckCircleIcon style={{ color: "90EE90" }} /> Price
              Increase Auto Margin Selected{" "}
              <CheckCircleIcon style={{ color: "#FFB31A" }} /> Price
              Decrease Auto Margin Selected{" "}
              <CheckCircleIcon style={{ color: "#b7b7b7" }} /> Custom
              Margin Select{" "}
            </p>
          ) : incPrice === true && decPrice === true ? (
            <p>
              {" "}
              <CheckCircleIcon style={{ color: "90EE90" }} /> Price
              Increase Auto Margin Selected{" "}
              <CheckCircleIcon style={{ color: "#FFB31A" }} /> Price
              Decrease Auto Margin Selected{" "}
            </p>
          ) : unitPriceModify === true && incPrice === true ? (
            <p>
              {" "}
              <CheckCircleIcon style={{ color: "90EE90" }} /> Price
              Increase Auto Margin Selected{" "}
              <CheckCircleIcon style={{ color: "#b7b7b7" }} /> Custom
              Margin Select{" "}
            </p>
          ) : unitPriceModify === true && decPrice === true ? (
            <p>
              {" "}
              <CheckCircleIcon style={{ color: "#FFB31A" }} /> Price
              Decrease Auto Margin Selected{" "}
              <CheckCircleIcon style={{ color: "#b7b7b7" }} /> Custom
              Margin Select{" "}
            </p>
          ) : unitPriceModify === true ? (
            <p>
              {" "}
              <CheckCircleIcon style={{ color: "#b7b7b7" }} /> Custom
              Margin Select{" "}
            </p>
          ):incPrice === true ? (
            <p>
              {" "}
              <CheckCircleIcon style={{ color: "90EE90" }} /> Price
              Increase Auto Margin Selected{" "}
            </p>
          ) : decPrice === true ? (
            <p>
              {" "}
              <CheckCircleIcon style={{ color: "#FFB31A" }} /> Price
              Decrease Auto Margin Selected{" "}
            </p>
          ): ""}
        </div>
        <table className="table table-hover table-responsive-sm">
          <tbody>
            <tr>{renderTableHeader()}</tr>
            {rows}
          </tbody>
        </table>
        <div className="d-flex justify-content-start">
          <Button
            text="Back"
            color="btn btn-info"
            type="submit"
            onClick={() => props.goBack(false)}
          />
        </div>
        <div className="d-flex justify-content-center">
          <Button
            text="Submit"
            color="btn btn-info"
            type="submit"
            onClick={mainfunction}
          />
        </div>
      </div>
    );
  };

  const mainfunction = async () => {
    // dispatch({ type: "API_LOADER" });
    // const product = [];
    // console.log("posProduct : ", posProduct);
    // const tempTable = [];
    // product.push(posProduct);
    // console.log(product);
    // product.isUpdated = "true";
    // itemNo = product.itemNo;

    // singleItemData = [tableData[index]];
    // console.log(singleItemData);

    // updateSku = singleItemData[0].posSku;

    // await getProducts();
    // await getPosProducts();
    console.log(posProducts);
    if (posProducts[0] != undefined) {
      await pushInventoryDetails();

      posProducts.map(async (element) => {
        console.log(element);
        console.log(element.itemNo);

        //Update unit cost n price in db, after update POS.
        let data1 = {
          invoiceName: selectedDropdown.slug,
          itemName: element.itemNo.toLowerCase(),
          value: {
            cost: element.cp,
            sellingPrice: element.sellingPrice,
            isUpdated: "true",
            isUpdatedDate: todayDate,
          },
        };
        console.log(data1);
        await inventoryService.UpdateHandWrittenProductFields(data1);

        console.log(
          tableDataCopy.filter((elem) => elem.itemNo === element.itemNo)
        );
        let tableDataCopy2 = tableDataCopy.filter(
          (elem) => elem.itemNo === element.itemNo
        );
        //Log Generate.
        console.log("PRODUCTT");
        console.log(element);
        console.log(tableDataCopy);
        const log = {
          InvoiceName: selectedDropdown.slug,
          InvoiceDate: "",
          ItemNo: element.itemNo,
          InvoiceDescription: element.description,
          PosDescription: element.posName,
          OldUnitCost: element.cost,
          OldUnitPrice: tableDataCopy2[0].sellingPrice,
          // OldMarkup: element.margin.toFixed(2).toString(),
          OldMarkup: (
            ((tableDataCopy2[0].sellingPrice - element.cost) / element.cost) *
            100
          )
            .toFixed(2)
            .toString(),

          NewUnitCost: element.COST,
          NewUnitPrice: element.PRICE,
          // NewMarkup:( ((element.sp- element.cp)/ element.cp)*100).toFixed(2).toString(),
          NewMarkup: (((element.PRICE - element.COST) / element.COST) * 100)
            .toFixed(2)
            .toString(),

          UpdateDate: todayDate,
          Person: userEmail,
          TimeStamp: new Date().toTimeString().split(" ")[0],
          InvCaseCost: element.unitPrice,
          InvUnitsInCase: element.pieces,
          HandWritten: "YES",
          SKU: element.posSku,
        };
        console.log(log);

        const logUpdate = await inventoryService.handwrittenPosLogs(log);
        console.log(logUpdate);
        //   setProductsInTableNew(selectedDropdown);
      });
    } else {
      alert("POS not updated!!");
      //   setProductsInTableNew(selectedDropdown);
    }
  };

  const pushInventoryDetails = async () => {
    console.log("pushInventoryDetails");
    // setLoader(true);
    console.log(posProducts);
    console.log(tableData);
    let data = tableData.map((element) => {
      return {
        item: element.itemNo,
        qty: parseInt(element.qty) * parseInt(element.pieces),
        cp: element.unitPrice,
        markup: element.markup,
        sp: element.sellingPrice,
        description: element.description,
      };
    });

    console.log(data);

    var duplicates = {};
    for (var i = 0; i < data.length; i++) {
      if (duplicates.hasOwnProperty(data[i].item)) {
        console.log("true");
        duplicates[data[i].item].push(i);
      } else if (data.lastIndexOf(data[i].item) !== i) {
        console.log("false");
        console.log(data.lastIndexOf(data[i].item));
        duplicates[data[i].item] = [i];
      }
    }

    console.log(duplicates);

    let tempData = Object.values(duplicates).filter((ele) => ele.length > 1);
    console.log(tempData);
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
    console.log(data);
    data = data.filter((ele) => ele !== null);
    console.log(data);
    /**
     * add the fileds of  data from the woocom & ocr
     */
    console.log(wooComProducts.length);
    console.log(wooComProducts);
    if (wooComProducts[0] != null) {
      let updatedWoocomProducts = data
        .map((product, index) => {
          /**find index of the item in fetched woocom product list */
          const wooIndex = wooComProducts.findIndex(
            (wooProduct) => product.item === wooProduct.itemNo
          );
          console.log("wooIndex : ", wooIndex);
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

      console.log("updatedWoocomProducts : ", updatedWoocomProducts);
      console.log("posProducts : ", posProducts);
      await pushToWoocom(updatedWoocomProducts);
    }
    await pushToPOS(posProducts);

    // setLoader(false);
    // if (itemsNotPushed.length === 0) {
    window.alert("Inventory updated successfully");
    // setRedirect(true);
    // } else {
    //   window.alert("Inventory not updated");
    // }
  };

  const pushToWoocom = async (products) => {
    // setLoader(true);
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
    console.log("pushToWoocom_result : ", responses);
    // setLoader(false);
    // dispatch({ type: "LOADER" });
  };

  const pushToPOS = async (products) => {
    // setLoader(true);
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
            itemNo,
          } = product;
          console.log("product : ", product);

          // SET ITEMNAME...
          let codeOrSku = "";
          console.log(product.itemNo);
          console.log(ITEMNAME.indexOf("-"));
          let itemName = ITEMNAME;
          console.log("pushToPos_ITEMNAME : ", ITEMNAME);
          if (ITEMNAME.indexOf("-") < 0) {
            let itemNoPresent;
            for (let i = 0; i < handwrittenInvoiceList.length; i++) {
              console.log(selectedDropdown.slug);
              if (handwrittenInvoiceList[i].slug === selectedDropdown.slug) {
                itemNoPresent = false;
                break;
              } else {
                itemNoPresent = true;
                break;
              }
            }
            console.log(itemNoPresent);
            // if (itemNoPresent) {
            //   codeOrSku = product.itemNo;
            // } else {
            codeOrSku = "SKU" + " " + product.posSku;
            // }
            itemName = ITEMNAME + " " + "-" + " " + codeOrSku;
          }

          const res = await inventoryService.UpdatePOSProducts(
            JSON.stringify({
              UPC,
              ITEMNAME: itemName,
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
              VENDORNAME: selectedDropdown.slug,
              VENDORCODE: itemNo,
              VENDORCOST: "",
              ISNEWITEM: isNew ? 1 : 0,
              BUYASCASE,
              CASEUNITS,
              CASECOST,
              COMPANYNAME: selectedDropdown.slug,
              PRODUCTCODE: itemNo,
              MODELNUM:
                userEmail.slice(0, 4) + " " + new Date().toLocaleDateString(),
              VINTAGE: "ICMS",
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
  };
  useEffect(async () => {
    async function getProducts() {
      console.log(tableData);
      console.log("IN WOOCOM PRODUCTS");
      const items = await Promise.all(
        tableData.map(async (row) => {
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
            console.log("res[0]");
            console.log("id : ", id);
            console.log("name : ", name);
            console.log("regular_price : ", regular_price);
            console.log("price : ", price);
            console.log("sku : ", sku);
            console.log("slug : ", slug);
            console.log("stock_quantity : ", stock_quantity);
            console.log("sale_price : ", sale_price);
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
      setWooComProducts(items);
      // setWooComProducts(items.filter((ele) => ele !== null));
      // setNotFoundProducts(tempNotFoundProducts);
      setWooComProducts(items.filter((ele) => ele !== null));
      // setNotFoundProducts(tempNotFoundProducts);
    }

    async function getPosProducts() {
      //   setLoader(true);
      console.log("IN POS PRODUCTS");
      // setLoader(true);
      // dispatch({ type: "LOADER" });
      let hasErrorOccured = false;
      const items = await Promise.all(
        tableData
          .filter((row) => !row.isForReview)
          .map(async (row) => {
            console.log(row.barcode);
            try {
              const res = await inventoryService.GetPOSProductDetails(
                row.barcode
              );
              console.log(res);
              if (!Array.isArray(res)) {
                alert("API not working");
                return;
              }
              console.log("fetched pos data", res);
              const { SKU, UPC, ITEMNAME, TOTALQTY, DEPNAME } = res[0];
              //   console.log(SKU);
              //   console.log(updateSku);
              //   if (SKU == updateSku) {
              //     console.log(SKU);
              //     console.log(updateSku);
              return {
                ...row,
                COST: row.cp,
                // PRICE: newUnitPrice === "" ? row.sp : newUnitPrice,
                PRICE: row.sellingPrice,
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
              //   } else {
              //     alert("SKU mismatch!!");
              //   }
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
      // dispatch({ type: "LOADER" });
      console.log(items);
      setPosProducts(items);
      console.log(posProducts);
      // setPosProducts(items.filter((ele) => ele !== null));
    }
    await getProducts();
    await getPosProducts();
  }, []);

  if (redirect) {
    return <Redirect to="/" />;
  }
  if (loader) {
    return <Spinner />;
  }
  return <div>{renderTableData()}</div>;
};

export default UpdateHandwrittenInventory;
