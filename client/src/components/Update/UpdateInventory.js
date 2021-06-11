import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import firebase from "../../firebase";
import { InventoryService } from "../../services/InventoryService";
import Button from "../../UI/Button";
import Spinner from "../../UI/Spinner/Spinner";

const UpdateInventory = (props) => {
  const header = props.header;
  const [newInventoryData, setNewInventoryData] = useState(
    props.newInventoryData
  );
  const [posProducts, setPosProducts] = useState([]);
  const [notFoundProducts, setNotFoundProducts] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [loader, setLoader] = useState(true);
  const [wooComProducts, setWooComProducts] = useState([]);
  const inventoryService = new InventoryService();
  const tempNotFoundProducts = [];

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
    let rows = newInventoryData.map((element, index) => {
      let isNotFound =
        notFoundProducts.filter((val) => val.itemNo === element.itemNo).length >
        0;
      let isAddedToQueue =
        notFoundProducts.filter(
          (val) => val.itemNo === element.itemNo && val.isQueued
        ).length > 0;
      return (
        <tr
          key={index}
          style={
            isAddedToQueue
              ? { background: "green" }
              : isNotFound
              ? { background: "red" }
              : null
          }
        >
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
          <td>{element.sp}</td>
          <td>{element.markup}</td>
          <td>
            {isNotFound && !isAddedToQueue && (
              <Button
                text={"Add to queue"}
                color="btn btn-info"
                type="submit"
                onClick={() => pushToFirebase(element)}
              />
            )}
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
            onClick={pushInventoryDetails}
          />
        </div>
      </div>
    );
  };
  /**Incomplete push inventory function*/
  const pushInventoryDetails = async () => {
    setLoader(true);
    let data = newInventoryData.map((element) => {
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

    await pushToWoocom(updatedWoocomProducts);
    await pushToPOS(posProducts);

    setLoader(false);
    // if (itemsNotPushed.length === 0) {
    window.alert("Inventory updated successfully");
    setRedirect(true);
    // } else {
    //   window.alert("Inventory not updated");
    // }
  };

  const pushToFirebase = async (item) => {
    try {
      firebase.database().ref("/queue").child(`${item.itemNo}`).set(item);
      let temp = [...notFoundProducts];
      let index = temp.findIndex((product) => product.itemNo === item.itemNo);
      temp[index]["isQueued"] = true;

      setNotFoundProducts(temp);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const pushToWoocom = async (products) => {
    setLoader(true);
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
    setLoader(false);
  };

  const pushToPOS = async (products) => {
    setLoader(true);
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
              DEPARTMENT: "",
              CATEGORY: "",
              SUBCATEGORY: "",
              ISFOODSTAMP: 1,
              ISWEIGHTED: 0,
              ISTAXABLE: 1,
              VENDORNAME: "",
              VENDORCODE: "",
              VENDORCOST: "",
              ISNEWITEM: isNew ? 1 : 0,
              BUYASCASE,
              CASEUNITS,
              CASECOST,
            })
          );
          console.log("updated pos data", res)
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

          // console.log("res from POS", res);
          return true;
        } catch (error) {
          console.log(error);
          return null;
        }
      })
    );
    setLoader(false);
  };
  useEffect(() => {
    async function getProducts() {
      const items = await Promise.all(
        newInventoryData.map(async (row) => {
          try {
            /**
             * The args in getproductdetails will be the sku fetched from the json file
             * const sku = jsonfile[row.itemNo]
             */
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
            tempNotFoundProducts.push(row);
            console.log("Couldn't fetch product from woodpress.", row.itemNo);
            return null;
          }
        })
      );
      setLoader(false);
      setWooComProducts(items.filter((ele) => ele !== null));
      setNotFoundProducts(tempNotFoundProducts);
    }

    async function getPosProducts() {
      setLoader(true);
      let hasErrorOccured = false;
      const items = await Promise.all(
        newInventoryData
          .filter((row) => !row.isForReview)
          .map(async (row) => {
            try {
              const res = await inventoryService.GetPOSProductDetails(
                row.barcode
              );
              console.log("fetched pos data", res);
              const { SKU, UPC, ITEMNAME, TOTALQTY } = res[0];
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
                CASEUNITS: row.qty.toString(),
                CASECOST: row.unitPrice.toString(),
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
                CASEUNITS: row.qty.toString(),
                CASECOST: row.unitPrice.toString(),
              };
            }
          })
      );
      if (hasErrorOccured) {
        alert("Couldn't fetch some data from POS");
      }
      setLoader(false);
      setPosProducts(items.filter((ele) => ele !== null));
    }
    getProducts();
    getPosProducts();
  }, []);

  if (redirect) {
    return <Redirect to="/" />;
  }
  if (loader) {
    return <Spinner />;
  }
  return <div>{renderTableData()}</div>;
};

export default UpdateInventory;
