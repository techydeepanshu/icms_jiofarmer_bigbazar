import React, { useEffect, useState } from 'react'
import firebase from "../../firebase";

const UpdateInventory = ({newInventoryData}) => {
    console.log('calling preview')
    const [inventory, setInventory] = useState([])

    const getInventoryData = () => {
        const ref = firebase.database().ref("/inventory");
        ref.on("value", (snapshot) => {
            console.log(snapshot.val());
            if (snapshot.val()) {
                const data = Object.values(snapshot.val());
                setInventory(data)
            }
        });
    }

    const pushInventoryDetails = async () => {

        let data = newInventoryData.map((element) => {
          return {
            item: element[1],
            qty: parseInt(element[0]),
            cp: element[3],
            markup: element[5],
            sp: element[6],
          };
        });

        data = [...data, ...inventory];
        console.log("Before", data.length);

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
                console.log("data[val]", data[val]);
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
        console.log("All Data", data);
        const success = await updateData(data);

        if (success) {
          window.alert("Inventory updated successfully");

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
    return (
        <div>
            <h1>ji</h1>
        </div>
    )
}

export default UpdateInventory
