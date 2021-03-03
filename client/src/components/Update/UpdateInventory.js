import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router';
import firebase from "../../firebase";
import Button from '../../UI/Button';
import Spinner from '../../UI/Spinner/Spinner';

const UpdateInventory = ({newInventoryData, header}) => {
    const [inventory, setInventory] = useState([])
    const [redirect, setRedirect] = useState(false)
    const [loader, setLoader] = useState(true)
    const getInventoryData = () => {
        const ref = firebase.database().ref("/test");
        ref.on("value", (snapshot) => {
            // console.log(snapshot.val());
            if (snapshot.val()) {
                const data = Object.values(snapshot.val());
                setInventory(data)
            }
            setLoader(false)
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
              <td>{element.markup}</td>
              <td>{element.sp}</td>
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

        data = [...data, ...inventory];
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

        const success = await updateData(data)
        setLoader(false)
        if (success) {
          
          window.alert("Inventory updated successfully");
          setRedirect(true)
        } else {
          window.alert("Inventory not updated");
        }
      
    };

    const updateData = async (data) => {
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

    useEffect(() => {
      getInventoryData()
    }, [])

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
