import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router';
import firebase from "../../firebase";
import { InventoryService } from '../../services/InventoryService';
import Button from '../../UI/Button';
import Spinner from '../../UI/Spinner/Spinner';

const UpdateInventory = (props) => {
    const header = props.header
    const [newInventoryData, setNewInventoryData] = useState(props.newInventoryData);
    const [inventory, setInventory] = useState([])
    const [redirect, setRedirect] = useState(false)
    const [loader, setLoader] = useState(true)
    const [wooComProducts, setWooComProducts] = useState([])
    const inventoryService = new InventoryService()
    const getInventoryData = () => {
        const ref = firebase.database().ref("/test");
        ref.on("value", (snapshot) => {
            // console.log(snapshot.val());
            if (snapshot.val()) {
                const data = Object.values(snapshot.val());
                setInventory(data)
            }
            
        });
    }
    const renderTableHeader = () => {
      return header.map((key, index) => {
        return (
          <th key={index}>
            {key.toUpperCase()}
          </th>
        );
      });
    };
    const renderTableData = () => {
        let rows = newInventoryData.map((element, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{element.qty}</td>
              <td>{element.itemNo}</td>
              <td>{element.description}</td>
              <td>{element.pieces}</td>
              <td>{element.unitPrice}</td>
              <td>{element.extendedPrice}</td>
              <td>{element.cp}</td>
              <td>{element.sp}</td>
              <td>{element.markup}</td>
            </tr>
          );
        });
        return (
          <div >
            <table className="table table-hover table-responsive-sm">
              <tbody>
                <tr>{renderTableHeader()}</tr>
                {rows}
              </tbody>
            </table>
            <Button
              text="Confirm Submit"
              color="btn btn-info"
              type="submit"
              onClick={pushInventoryDetails}
            />
          </div>
        );
    };
    /**Incomplete push inventory function*/
    const pushInventoryDetails = async () => {
        setLoader(true)
        let data = newInventoryData.map((element) => {
          return {
            item: element.itemNo,
            qty: parseInt(element.qty) * parseInt(element.pieces),
            cp: element.unitPrice,
            markup: element.markup,
            sp: element.sp,
          };
        });

        // data = [...data, ...inventory];
        // console.log("Before", data.length);

        var duplicates = {};
        for (var i = 0; i < data.length; i++) {
          if (duplicates.hasOwnProperty(data[i].item)) {
            duplicates[data[i].item].push(i);
          } else if (data.lastIndexOf(data[i].item) !== i) {
            duplicates[data[i].item] = [i];
          }
        }
        // console.log("duplicates", duplicates)
        let tempData = Object.values(duplicates).filter(
          (ele) => ele.length > 1
        );
        // let indices = tempData.map(ele => ...ele)
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
        // console.log("All Data", data);

        /**
         * add the fileds of  data from the woocom & ocr 
         */
        let updatedWoocomProducts = data.map((product, index) => {
          /**find index of the item in fetched woocom product list */
          const wooIndex = wooComProducts.findIndex(wooProduct => product.item === wooProduct.itemNo)
          if (wooIndex !== -1) {
            /**get the qty & other fileds of the woocom product */
            let {id, stock_quantity} = wooComProducts[wooIndex]
            stock_quantity += product.qty
            const regular_price = product.sp
            return {id, regular_price, stock_quantity, itemNo: product.item}
          }
          return null
        })

        // const success = await pushToFirebase(data)
        const wooComResponse = await pushToWoocom(updatedWoocomProducts)

        /**filter out the items not pushed on store */ 
        const itemsNotPushed = newInventoryData.filter(
          ({ item: item1 }) => !wooComResponse.some(({ itemNo: item2 }) => item1 !== item2)
        );
        /**set the current table data to be the not pushed items */
        setNewInventoryData(itemsNotPushed)
        // console.log("woo com", itemsNotPushed)
        setLoader(false)
        if (itemsNotPushed.length === 0) {
          window.alert("Inventory updated successfully");
          setRedirect(true)
        } else {
          window.alert("Inventory not updated");
        }
      
    };

    const pushToFirebase = async (data) => {
        try {
            await data.map((item) => {
                firebase
                  .database()
                  .ref("/test")
                  .child(`${item.item}`)
                  .set(item);
                });
            return true;
        } catch (error) {
            return false;
        }
    };

    const pushToWoocom = async (products) => {
      setLoader(true)
      const responses = await Promise.all(
        products.map(async (product) => {
          try {
            const res = await inventoryService.UpdateProductDetails(product.id,{regular_price: product.regular_price, stock_quantity: product.stock_quantity} /* {regular_price, stock_quantity} = product */);
            const {id, name, regular_price, price, sku, slug, stock_quantity, sale_price} = res
            return {id, name, regular_price, stock_quantity, itemNo: product.itemNo}
          } catch (error) {
            /**
             * break the event loop if any product fails
             */
            console.log(error)
             alert("Couldn't update product on website.");
              console.log("Couldn't update product ", product.itemNo);
            return null
          }
        })
      );
      setLoader(false)
      return responses.filter(item => item !== null)
    }
    useEffect(() => {
      getInventoryData()
      async function getProducts() {
        const items = await Promise.all(
          newInventoryData.map(async (row) => {
            try {
              /**
               * The args in getproductdetails will be the sku fetched from the json file
               * const sku = jsonfile[row.itemNo]
               */
              const res = await inventoryService.GetProductDetails(row.sku);
              const {id, name, regular_price, price, sku, slug, stock_quantity, sale_price} = res[0]
              return {id, name, regular_price, price, sku, slug, stock_quantity, sale_price, itemNo: row.itemNo}
            } catch (error) {
              // throw new Error(error);
              alert("Couldn't fetch product ", row.itemNo);
              console.log("Couldn't fetch product from woodpress.", row.itemNo);
              return null
            }
          })
        );
        setLoader(false)
        setWooComProducts(items)
      }
      getProducts()
    }, [])
    useEffect(() => {
      // console.log("Inventory data", newInventoryData)
    }, [newInventoryData, setLoader])
    if (redirect) {
      return  <Redirect to="/" />;
    }
    if (loader) {
      return <Spinner />
    }
    return (
      <div>
        {renderTableData()}
      </div>
    );
}

export default UpdateInventory
