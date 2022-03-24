import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { InventoryService } from "../../services/InventoryService";
import Button from "../../UI/Button";
import Spinner from "../../UI/Spinner/Spinner";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button2 from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
const UpdateInventory = (props) => {
  // const header = props.header;

  const [tableData, setTableData] = useState(props.newInventoryData);
  const [unitPriceModify, setUnitPriceModify] = useState(props.unitPriceModify);
  const [inv, setInv] = useState(props.inv);
  const [num, setNum] = useState(props.num);
  const [day, setDay] = useState(props.day);
  const [itemNoDescription, setItemNoDescription] = useState(
    props.itemNoDescription
  );
  const [incPrice, setIncPrice] = useState(props.incPrice);
  const [decPrice, setDecPrice] = useState(props.decPrice);
  const [tableDataCopy, setTableDataCopy] = useState(props.tableDataCopy);
  const [todayDate, setTodayDate] = useState(props.todayDate);
  const [selectedDropdown, setSelectedDropdown] = useState(props.invoice);
  const [userEmail, setUserEmail] = useState(props.userEmail);
  // const [posProducts, setPosProducts] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [loader, setLoader] = useState(false);
  const [pendingloader, setPendingLoader] = useState(false);
  const [spinnerLoader, setSpinnerLoader] = useState(false);
  // const [wooComProducts, setWooComProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const inventoryService = new InventoryService();
  // const [posProducts,setPosProducts] = useState(undefined)
  let posProducts = [];
  let wooComProducts = [];
  let posInventory = undefined;
  let updateBarcode = "";
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

  const renderTableData = () => {
    console.log("unitPriceModify : ", unitPriceModify);
    console.log("incPrice : ", incPrice);
    console.log("decPrice : ", decPrice);
    let rows = tableData.map((element, index) => {
      // <tr key={index} style={element.priceIncrease === 1 ? {background:"#90EE90"} : element.priceIncrease === -1 ? {background:"#FFB31A"} : {background:"#b7b7b7"}}>
      return (
        <>
          <tr
            key={index}
            style={
              element.NotFound !== true
                ? element.invError !== "YES"
                  ? element.priceIncrease === 1
                    ? { background: "#90EE90" }
                    : element.priceIncrease === -1
                    ? { background: "#FFB31A" }
                    : { background: "#b7b7b7" }
                  : { background: "linear-gradient(233deg,#ff5151,#a6c1ee)" }
                : { background: "rgb(212 212 212)", color: "rgb(157 156 156)" }
            }
          >
            <td>{element.SerialNoInInv}</td>
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
                disabled={element.NotFound !== true ? false : true}
                type="tel"
                /*value={element.sp}*/
                value={element.sellingPriceChange}
                variant="outlined"
                onChange={(e) => {
                  handleChange(index, "sellingPriceChange", e.target.value);
                }}
                style={{ width: 100 }}
              />
            </td>
            <td>{element.markup}</td>
          </tr>
        </>
      );
    });
    return (
      <div style={{ marginTop: "70px" }}>
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <CheckCircleIcon
            style={{
              color: "#deb88700",
              background: "rgb(212, 212, 212)",
              borderRadius: "100px",
            }}
          />{" "}
          Product Not Found In POS{" "}
          <CheckCircleIcon
            style={{
              color: "#deb88700",
              background: "linear-gradient(264deg,#ff5151,#a6c1ee)",
              borderRadius: "100px",
            }}
          />{" "}
          Invoice Error{" "}
          <div style={{ margin: "10px 0" }}>
            <span>
              {incPrice === true ? (
                <span>
                  <CheckCircleIcon style={{ color: "90EE90" }} /> Price Increase
                  Auto Margin Selected{" "}
                </span>
              ) : null}
            </span>
            <span>
              {decPrice === true ? (
                <span>
                  <CheckCircleIcon style={{ color: "#FFB31A" }} /> Price
                  Decrease Auto Margin Selected{" "}
                </span>
              ) : null}
            </span>
            <span>
              {unitPriceModify === true ? (
                <span>
                  <CheckCircleIcon style={{ color: "#b7b7b7" }} /> Custom Margin
                  Select{" "}
                </span>
              ) : null}
            </span>
          </div>
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
            onClick={() => {
              props.goBack(false);
              // setTableData();
              // setUnitPriceModify();
              // setInv();
              // setNum()
              // setDay()
              // setItemNoDescription()
              // setIncPrice()
              // setDecPrice()
            }}
          />
        </div>
        <div className="d-flex justify-content-center">
          <Button
            text="Submit"
            color="btn btn-info"
            type="submit"
            onClick={async()=>{
              setSpinnerLoader(true);
              await mainfunction()
              setSpinnerLoader(false);
            }}
          />
        </div>
      </div>
    );
  };

  const handleChange = async (index, key, value) => {
    console.log("handleChange_key : ", key);
    console.log("handleChange_val : ", value);
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
      console.log("NewUnitPrice_value : ", value);
      console.log(
        "PrevNewUnitPrice_value : "
        // tableDataCopy[index].sellingPrice
      );
    }

    const tempTableData = {
      ...tableData,
      [index]: {
        ...tableData[index],
        [key]: value,
        ["markup"]: parseFloat(
          ((parseFloat(value) - parseFloat(tableData[index].cp)) /
            parseFloat(tableData[index].cp)) *
            100
        ).toFixed(2),
      },
    };
    const propertyNames = Object.values(tempTableData);

    console.log("propertyName : ", propertyNames);
    console.log("handelChange_propertyNames[index] : ", propertyNames[index]);
    setTableData(propertyNames);
    // await getProducts();
    // await getPosProducts();
  };

  const mainfunction = async () => {
    // dispatch({ type: "API_LOADER" });
    console.log("mainfunction : ", tableData);
    // setSpinnerLoader(true);
    // setLoader(true);
    // await getInventory();

    await getPosProducts();
    console.log(posProducts);
    console.log("pI_posProducts : ", posProducts);
    // const id = toast.loading("Please wait...")
    if (posProducts[0] !== undefined) {
      await pushInventoryDetails();
      // await pushQtyToInventory();
      // toConsoleState();
      // setIsUpdated("true");
      // setUpdateIndex(index);
      console.log("inv : ", inv);
      console.log("num : ", num);
      console.log("day : ", day);
      // setSpinnerLoader(false);
      // setSpinnerLoader(true);
      
      await Promise.all(
        posProducts.map(async (element, i) => {
        
          console.log("pI_singleItemData : ", element);
          console.log("pI_singleItemData.itemNo : ", element.itemNo);
          await inventoryService.UpdateInvoiceData(inv, num, day, element.itemNo);
  
          //Update unit cost n price in db, after update POS.
          let data1 = {
            cost: element.cp,
            price: element.sellingPriceChange,
            item: element.itemNo,
            itemName: element.ITEMNAME,
            invoice: selectedDropdown.slug,
          };
          // await getPosProducts();
          console.log("I am data from updatedb after Pos", data1);
          console.log(
            "I am posProducts.ITEMNAME from updatedb after Pos",
            element.ITEMNAME
          );
  
          await inventoryService.UpdateDBafterPosUpdate(data1);
  
          console.log(
            tableDataCopy.filter((elem) => elem.itemNo === element.itemNo)
          );
          let tableDataCopy2 = tableDataCopy.filter(
            (elem) => elem.itemNo === element.itemNo
          );
          //Log Generate.
          console.log("PRODUCTT");
          console.log("pI_singleItemData : ", element);
          const log = {
            InvoiceName: selectedDropdown.slug,
            InvoiceDate: day,
            InvoiceNo: num,
            ItemNo: element.itemNo,
            InvoiceDescription: element.description,
            PosDescription: element.posName,
            PosUnitCost: element.cost,
            PosUnitPrice: tableDataCopy2[0].sellingPrice,
            OldMarkup: (
              ((tableDataCopy2[0].sellingPrice - element.cost) / element.cost) *
              100
            )
              .toFixed(2)
              .toString(),
            InvUnitCost: element.COST,
            // InvUnitPrice: element.sp,
            InvUnitPrice: element.PRICE,
            // NewMarkup:( ((element.sp- element.cp)/ element.cp)*100).toFixed(2).toString(),
            NewMarkup: (((element.PRICE - element.COST) / element.COST) * 100)
              .toFixed(2)
              .toString(),
            UpdateDate: todayDate,
            Person: userEmail,
            TimeStamp: new Date().toTimeString().split(" ")[0],
            InvCaseCost: element.unitPrice,
            InvUnitsInCase: element.pieces,
            SKU: element.posSku,
            Barcode: element.barcode,
            SerialNoInInv: element.SerialNoInInv,
          };
          console.log("pI_log : ", log);
          const logUpdate = await inventoryService.posLogs(log);
          console.log("pI_logUpdate : ", logUpdate);
  
          // update inventory
          
          let result = await inventoryService.getPosInventoryLogs({
            Barcode: element.barcode,
            ItemNo: element.itemNo,
            InvoiceName: inv,
            InvoiceNo: num,
            InvoiceDate: day,
          });
          console.log("result : ", result);
          if (result === "") {
            let res = await pushQtyToInventory(element.barcode,element.itemNo,element.description);
            console.log(res);
            
          } else {
            // alert("Inventory already updated!!");
            toast.info("Inventory already updated!!", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          // setSpinnerLoader(false);
          // setProductsInTable();
        })
      )
     
    } else {
      alert("POS not updated!!");
      // setProductsInTable();
    }
    // toast.update(id, { render: "All is good", type: "success", isLoading: false });
    // setSpinnerLoader(false);
    // setLoader(false);
  };

  const pushInventoryDetails = async () => {
    // setSpinnerLoader(true);
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
        sp: element.sellingPriceChange,
        description: element.description,
      };
    });

    console.log(data);

    var duplicates = {};
    for (var i = 0; i < data.length; i++) {
      if (duplicates.hasOwnProperty(data[i].item)) {
        duplicates[data[i].item].push(i);
      } else if (data.lastIndexOf(data[i].item) !== i) {
        duplicates[data[i].item] = [i];
      }
    }

    console.log(duplicates);

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

      // await pushToWoocom(updatedWoocomProducts);
    }
    await pushToPOS(posProducts);

    // setLoader(false);
    // if (itemsNotPushed.length === 0) {
    window.alert("Inventory updated successfully");
    // setSpinnerLoader(false);
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
          console.log("res[0].ITEMNAME.indexOf(" - ")", ITEMNAME.indexOf("-"));
          let itemName = ITEMNAME;
          console.log("pushToPos_ITEMNAME : ", ITEMNAME);
          if (ITEMNAME.indexOf("-") < 0) {
            let itemNoPresent;
            for (let i = 0; i < itemNoDescription.length; i++) {
              if (itemNoDescription[i] === selectedDropdown.slug) {
                itemNoPresent = false;
                break;
              } else {
                itemNoPresent = true;
                break;
              }
            }

            console.log("itemNoPresent", itemNoPresent);
            if (itemNoPresent) {
              codeOrSku = product.itemNo;
            } else {
              codeOrSku = "SKU" + " " + product.posSku;
            }
            itemName = ITEMNAME + " " + "-" + " " + codeOrSku;
          }
          const res = await inventoryService.UpdatePOSProducts(
            JSON.stringify({
              UPC,
              ITEMNAME: itemName,
              DESCRIPTION: "",
              PRICE,
              COST,
              QTY: "-662",
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

  async function getProducts() {
    console.log(tableData);
    console.log("IN WOOCOM PRODUCTS");
    const items = await Promise.all(
      tableData.map(async (row) => {
        console.log(row.barcode);
        try {
          const res = await inventoryService.GetProductDetails(row.barcode);
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
    // setWooComProducts(items.filter((ele) => ele !== null));
    wooComProducts = items.filter((ele) => ele !== null);

    // setNotFoundProducts(tempNotFoundProducts);
  }

  // async function getPosProducts() {
  //   // setLoader(true);
  //   let hasErrorOccured = false;
  //   let ApiCheck = true;
  //   console.log("IN POS PRODUCTS");
  //   const items = await Promise.all(
  //     tableData.map(async (row) => {
  //       try {
  //         console.log(row.barcode);
  //        const res = await inventoryService.GetPOSProductDetails(row.barcode)

  //             console.log(row.barcode);
  //             console.log(res);
  //             if (!Array.isArray(res)) {
  //               //   alert("API not working");
  //                 ApiCheck = false;
  //                 return ;
  //               }
  //               console.log("fetched pos data", res);
  //               const { SKU, UPC, ITEMNAME, TOTALQTY, DEPNAME } = res[0];
  //               return {
  //                   ...row,
  //                   COST: row.cp,
  //                   PRICE: row.sellingPriceChange,
  //                   SKU,
  //                   UPC,
  //                   ITEMNAME,
  //                   TOTALQTY:
  //                   parseInt(row.qty) * parseInt(row.pieces) + parseInt(TOTALQTY),
  //                   itemNo: row.itemNo,
  //                   isNew: false,
  //                   BUYASCASE: 1,
  //                   CASEUNITS: row.pieces.toString(),
  //                   CASECOST: row.unitPrice.toString(),
  //                   DEPNAME,
  //                   NotFound: false,
  //               };

  //           } catch (error) {
  //               hasErrorOccured = true;
  //               console.log("pos throw error : ", error);
  //               return {
  //                   ...row,
  //                   COST: row.cp,
  //                   PRICE: row.sp,
  //                   SKU: row.posSku,
  //                   UPC: row.barcode,
  //                   ITEMNAME: row.description,
  //                   TOTALQTY: parseInt(row.qty) * parseInt(row.pieces),
  //                   itemNo: row.itemNo,
  //                   isNew: true,
  //                   BUYASCASE: 1,
  //                   CASEUNITS: row.pieces.toString(),
  //                   CASECOST: row.unitPrice.toString(),
  //                   DEPNAME: "",
  //                   NotFound: true,
  //               };
  //           }
  //       })

  //       );
  //       if (hasErrorOccured) {
  //           // alert("Couldn't fetch some data from POS");
  //           toast.error("Couldn't fetch some data from POS", {
  //               position: "top-center",
  //               autoClose: 10000,
  //               hideProgressBar: false,
  //               closeOnClick: true,
  //               pauseOnHover: true,
  //               draggable: true,
  //               progress: undefined,
  //               theme: "dark"
  //       });
  //       }
  //       if(ApiCheck === false){
  //           toast.error("API NOT WORKING", {
  //               position: "top-center",
  //               autoClose: 10000,
  //               hideProgressBar: false,
  //               closeOnClick: true,
  //               pauseOnHover: true,
  //               draggable: true,
  //               progress: undefined,
  //               theme: "dark"
  //       })
  //       }
  //   // setLoader(false);
  //   // setPosProducts(items.filter((ele) => ele !== null));

  //   console.log(items)
  //   posProducts = items.filter((ele) => ele !== null || ele.NotFound !== true || ele !== undefined );
  //   console.log("posProduct : ",posProducts);
  //   if(items[0]!==undefined){
  //       setTableData(items.filter((ele) => ele !== null || ele !== undefined));
  //       renderTableData();
  //   }
  // }

  async function getPosProducts() {
    // setLoader(true);
    console.log("getPosProducts : ", tableData);
    let hasErrorOccured = false;
    let ApiCheck2 = "false";
    console.log("IN POS PRODUCTS");
    const items = await Promise.all(
      tableData.map(async (row) => {
        try {
          console.log(row.barcode);
          const res = await inventoryService.GetPOSProductDetails(row.barcode);

          console.log(row.barcode);
          console.log(res);
          if (!Array.isArray(res)) {
            //   alert("API not working");
            ApiCheck2 = "true";
            // return ;
          } else {
            console.log("fetched pos data", res);
            const { SKU, UPC, ITEMNAME, TOTALQTY, DEPNAME } = res[0];
            return {
              ...row,
              COST: row.cp,
              PRICE: row.sellingPriceChange,
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
              NotFound: false,
            };
          }
        } catch (error) {
          hasErrorOccured = true;
          console.log("pos throw error : ", error);
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
            NotFound: true,
          };
        }
      })
    );
    if (hasErrorOccured) {
      // alert("Couldn't fetch some data from POS");
      toast.error("Couldn't fetch some data from POS", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    if (ApiCheck2 === "true") {
      // toast.error("API NOT WORKING", {
      //     position: "top-center",
      //     autoClose: 10000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "dark"
      //   })
      return null;
    } else {
      // setLoader(false);
      // setPosProducts(items.filter((ele) => ele !== null));

      console.log(items);

      posProducts = items.filter((ele) =>
        ele !== null || ele !== undefined ? ele.NotFound !== true : ele !== null
      );
      console.log("posProduct : ", posProducts);
      if (items[0] !== undefined) {
        setTableData(items.filter((ele) => ele !== null || ele !== undefined));
        renderTableData();
      }
      return posProducts;
    }
  }

  const pushQtyToInventory = async (barcode,itemNo,description) => {
    console.log("pushQtyToInventory", barcode);
    await getInventory(barcode,itemNo,description);
    console.log("posInventory : ", posInventory);

    // posInventory.map(async(element,index)=>{

    if (posInventory[0].NotFound !== true) {
      let response = await pushQtyDetailsInInventory(barcode);
      console.log("response : ", response);
      if (response[0] !== null) {
        response.map((element) => {
          if (element.length !== 0) {
            toast.success("Inventory Update Successfully", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            // alert("Inventory Update Successfully")
          } else {
            toast.success("Inventory Created", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // alert("Inventory Created")
          }
        });
        return true;
      } else {
        toast.error("Does not Working Pos-inventory API", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return false;
      }
    } else {
      // alert("Some Error Occurred")
      toast.error("Some Error Occurred", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }
  };

  const getInventory = async (barcode,itemNo,description) => {
    console.log("getInventory");
    console.log("tableData : ", posProducts);
    let newPosProducts = posProducts.filter((e) => e.barcode === barcode  && e.itemNo === itemNo && e.description === description);
    // setLoader(true);
    //  dispatch({ type: "LOADER" });
    let hasErrorOccured = false;
    let ApiCheck = true;
    console.log(tableData);
    let isEmpty = "";
    console.log("newPosProducts : ", newPosProducts);
    const items = await Promise.all(
      newPosProducts.map(async (row) => {
        console.log(row.barcode);
        isEmpty =
          row.qty === "" ||
          row.itemNo === "" ||
          !row.pieces ||
          isNaN(row.unitPrice) ||
          row.unitPrice === "" ||
          isNaN(row.extendedPrice);

        if (!isEmpty) {
          try {
            const res = await inventoryService.GetPOSInventoryDetails(
              row.barcode
            );
            if (!Array.isArray(res)) {
              //  alert("API not working (GetInventory)");
              ApiCheck = false;
              return { NotFound: true };
            } else {
              if (res.length !== 0) {
                console.log("fetched pos inventory data", res);
                const { BARCODE, ITEMNAME, TOTALQTY } = res[0];
                console.log(BARCODE);
                console.log(row.barcode);
                if (BARCODE == row.barcode) {
                  console.log(BARCODE);
                  console.log(row.barcode);
                  return {
                    ...row,
                    COST: row.cp,
                    PRICE: row.sellingPrice,
                    BARCODE,
                    ITEMNAME,
                    OLD_TOTALQTY: TOTALQTY,
                    TOTALQTY:
                      parseInt(row.qty) * parseInt(row.pieces) +
                      parseInt(TOTALQTY),
                    itemNo: row.itemNo,
                    isNew: false,
                    BUYASCASE: 1,
                    CASEUNITS: row.pieces.toString(),
                    CASECOST: row.unitPrice.toString(),
                    NotFound: false,
                  };
                } else {
                  alert("SKU mismatch!!");
                }
              } else {
                return {
                  ...row,
                  COST: row.cp,
                  PRICE: row.sp,
                  SKU: row.posSku,
                  BARCODE: row.barcode,
                  ITEMNAME: row.posName,
                  TOTALQTY: parseInt(row.qty) * parseInt(row.pieces),
                  OLD_TOTALQTY: parseInt(row.qty) * parseInt(row.pieces),
                  itemNo: row.itemNo,
                  isNew: true,
                  BUYASCASE: 1,
                  CASEUNITS: row.pieces.toString(),
                  CASECOST: row.unitPrice.toString(),
                  DEPNAME: "",
                  NotFound: false,
                };
              }
            }
          } catch (error) {
            hasErrorOccured = true;
            return {
              ...row,
              COST: row.cp,
              PRICE: row.sp,
              SKU: row.posSku,
              BARCODE: row.barcode,
              ITEMNAME: row.posName,
              TOTALQTY: parseInt(row.qty) * parseInt(row.pieces),
              OLD_TOTALQTY: parseInt(row.qty) * parseInt(row.pieces),
              itemNo: row.itemNo,
              isNew: true,
              BUYASCASE: 1,
              CASEUNITS: row.pieces.toString(),
              CASECOST: row.unitPrice.toString(),
              DEPNAME: "",
              NotFound: true,
            };
          }
        } else {
          return { NotFound: true };
        }
      })
    );
    //  if (hasErrorOccured) {
    //   //  alert("Couldn't fetch some data from POS");
    //    alert("New Inventory Added to POS");
    //  }
    if (ApiCheck === false) {
      toast.error("API NOT WORKING (GetInventory)", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    // setLoader(false);
    //  dispatch({ type: "LOADER" });
    console.log(items);
    posInventory = items;
    console.log("posProducts array is: ", posInventory);
    // setPosProducts(items.filter((ele) => ele !== null));
  };

  const pushQtyDetailsInInventory = async (barcode) => {
    // dispatch({ type: "LOADER" });
    console.log("products values are: ", posInventory);
    console.log("barcode : ", barcode);
    let responses = "";
    if (posInventory[0].BARCODE == barcode) {
 
        responses = await Promise.all(
          posInventory.map(async (product) => {
            try {
              const {
                COST,
                PRICE,
                BARCODE,
                TOTALQTY,
                isNew,
                ITEMNAME,
                BUYASCASE,
                CASEUNITS,
                CASECOST,
                DEPNAME,
                itemNo,
              } = product;

              console.log("product : ", product);

              const res = await inventoryService.UpdatePOSInventory({
                BARCODE,
                ITEMNAME: product.posName,
                DESCRIPTION: "",
                PRICE,
                COST,
                QTY: TOTALQTY,
                SIZE: product.size,
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
              });
              console.log("updated pos data", res);

              // CREATE LOG AND UPDATE IN DB
              let tempdata2 = tableData.filter(
                (e) => e.barcode === product.BARCODE && e.itemNo === product.itemNo
              );
              if (tempdata2[0].barcode == product.BARCODE) {
                const inventoryLog = {
                  Barcode: tempdata2[0].barcode,
                  InvoiceName: selectedDropdown.slug,
                  InvoiceDate: day,
                  InvoiceNo: num,
                  ItemNo: tempdata2[0].itemNo,
                  InvoiceDescription: tempdata2[0].description,
                  PosDescription: tempdata2[0].posName,
                  PosUnitCost: tempdata2[0].cost,
                  PosUnitPrice: tempdata2[0].sellingPrice,
                  UpdateDate: todayDate,
                  Person: userEmail,
                  TimeStamp: new Date().toTimeString().split(" ")[0],
                  SKU: tempdata2[0].posSku,
                  OldQty: product.OLD_TOTALQTY.toString(),
                  NewQty: product.TOTALQTY,
                  SerialNoInInv: tempdata2[0].SerialNoInInv,
                };
                console.log("inventoryLog : ", inventoryLog);
                const inventoryLogUpdate =
                  await inventoryService.posInventoryLogs(inventoryLog);
                console.log("inventoryLogUpdate : ", inventoryLogUpdate);

                const updateinventoryindb =
                  await inventoryService.UpdateInventoryInDB(
                    inv,
                    num,
                    day,
                    tempdata2[0].itemNo
                  );

                console.log("updateinventoryindb : ", updateinventoryindb);
              } else {
                alert("posInventory Logs does not Created");
              }
              return res;
            } catch (error) {
              console.log("error : ",error);
              toast.error("Some Error Occurred during inventory updation !!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              return null;
            }
          })
        );
     
    } else {
      alert("inventory not updated");
      return null;
    }
    // setLoader(false);
    // dispatch({ type: "LOADER" });
    return responses;
  };

  useEffect(async () => {
    setLoader(true);
    // const wooProduct = await getProducts();
    const posProduct = await getPosProducts();
    // console.log("wooProduct : ",wooProduct)
    console.log("posProduct : ", posProduct);
    if (posProduct === null) {
      setModal(true);
      // props.goBack(!window.confirm("POS API NOT WORKING \n Do you want to Go Back ?"));
    }
    setLoader(false);
  }, []);

  if (redirect) {
    return <Redirect to="/" />;
  }
  if (loader) {
    return (
      <div style={{ margin: "auto", width: "68vh", display: "flex" }}>
        <CircularProgress />{" "}
        <h1 style={{ margin: "0 23px", color: "#727272", fontSize: "2rem" }}>
          Product Checking in POS ...
        </h1>
      </div>
    );
  }

  if (spinnerLoader) {
    return <Spinner />;
  }
  return (
    <div>
      {renderTableData()}

      <ToastContainer />
      <Dialog
        open={modal}
        // onClose={false}
        // PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle>POS API NOT WORKING</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: "#605e5e" }}>
            Do you want to Go Back
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button2
            onClick={() => {
              setModal(false);
            }}
            style={{ color: "grey", background: "#edebeb" }}
          >
            No
          </Button2>
          <Button2
            onClick={() => props.goBack(false)}
            style={{ background: "green", color: "white" }}
          >
            Yes
          </Button2>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateInventory;
