import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { TesseractService } from "../../services/TesseractService";
import Button from "../../UI/Button";
import { calculateTableFields } from "../../utils/filterData";

import styles from "./DisplayData.module.css";

const DisplayData = (props) => {
  const ws = new WebSocket("ws://localhost:5000");
  const data = [
    "2 0 * CAS TCEPZ Deep Ind EggplntNaanPiza90z (12) 23.46 0.00",
    "3 3 CAS ISMJT Deep Ind Smsa jlpnchse 36(5) 41.91 125.73",
    "1 1 CAS DRM01 Deep Rea Soak&BoilKalaChana (12) 21.84 21.84",
    "T 1 CAS 162 Deep Sna Papadi 12.30z (12) 44.01 44.01",
    "Z 0 * CAS USB Deep Sou Sambhar 10oz. (12) 17-90 0.00",
    "x Dp * CAS M27 Maharani Elayada 14.loz(12) 26.51 0.00",
    "5 0 * CAS MLS Maharani Grated Coconutl4.1 (24) 50.26 0.00",
    "1 1 CAS M2 Maharani Idiyappaml4.loz (12) 20.15 20.15",
    "1 O:* CAS M3 Maharani Masala Dosa 14.10z(12) 21.24 0.00",
    "T Q * CAS Mil Maharani Porotta Malbar12.3(30) 49.80 0.00",
    "I 1 CAS M24 Maharani Veg. Cutlet 10.60z (12) 26.48 26.48",
    "1 1 CAS ML17 Mirch Ma Aloo Puri 15.750z1{12) 20.88 20.88",
    "z 1 CAS ML16 Mirch Ma Dal Puri 15.7502z{12) 20.88 20.388",
    "I T CAS ML25 Mirch Ma WholeWheatRoti30pc (6) 34.52 34.52",
    "2 0 *» CAS RCC Mirch Ma MM Chhole Chatpate (12) 15.63 0.00",
    "1 0 * CAS SF06 Sujata F Methi Paratha 5P(24) 32.52 0.00",
    "iT I CAS SF09 Sujata F Plain Paratha 24P(6) 27.24 27.24",
    "iL x CAS SF12 Sujata F Tawa Chapati 30P{12) 47.04 47.04",
    "2 0 * CAS TCST Tandoor 2 Chkn Samosa 7 ©z(l2) 41.33 0.00",
    "2 0 * CAS TCC Tandoor “‘Chkrn Curry 100z. (12) 45.00 0.00",
    "* Suggested retail $4.99 *",
    "2 0 * CAS GIVMB Tandoor Veg.Msl.Burgerl0oz(12) 30.08 0.00",
    "1 T CAS 24UID Udupi Fr F.P.Idli 24 Pcs(8) 33.20 33.20",
    "1 T CAS IUMV Udupi Fr F.P.MenduVada 24pc (8) 37.34 37.34",
    "* $5.99 Sticker *",
    "X 0 * CAS UMD Udupi Fr Masala Dosa 4pc (12) 22.553 0.00",
    "2 2 CAS UTT Udupi Fr Onion Uttapam 4pc (12) av 53 45.06",
    "2 0 * CAS URM Udupi Fr OnionRavaMasalaDos (12) 22.55 0.00",
    "2 0 * CAS UTR Udupi Fr Tamrind Rice 90z. (12) 18.67 0.00",
    "5 5 CAS UP16 Upvas RajgaroWholel4.10z (20) 32.08 160.40",
    "5 5 CAS F89 Upvas SingodaFlour28.20z (10) 25.48 127.40",
    "3 0 * CAS UP1l Upvas Upvas Moraiyo 140z(20) 24.38 0.00",
    "5 0 *. CAs UP12 Upvas Upvas Moraiyo 280z (10) 19.43 0.00",
    "5 5 CAS UP13 Upvas UpvasMoraiyoFlrl4o(20) 21.63 108.15",
    "5 0 * CAS UPl7 Upvas UpvasRajgaro28.20z(10) 19.43 0.00",
    "5 0 * CAS UPl4 Upvas UpvasRajgaroFlrl4o(20) 21.63 0.00",
    "5 0* CAS UPL5 Upvas UpvasRajgaroFlr28o(10) 18.88 0.00",
    "Frozen----------------------[135]Bxs *wt= 2024 *$ 4742.15",
    "1 0. * CAS 1238 Bansi Bhel PuriKitl4.1loz (16) 46.38 0.00",
    "CONTINUED ON NEXT PAGE... (Total = $ 9,697.15)",
  ];
  let emptyColumnList = [];
  const [tableData, setTableData] = useState(calculateTableFields(data))
  const [emptyColumn, setEmptyColumn] = useState([])
  const [readData, setReadData] = useState(null)
  const [description, setDescription] = useState([])
  const tesseractService = new TesseractService();

  const renderTableHeader = () => {
    let header = [
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
          element[0] == "" ||
          element[1] == "" ||
          element[3] == "" ||
          element[4] == "" /* || */
          // description[index]?.Description === undefined
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
            <td>
              {description[index]?.Description ?? element[2]} 
            </td>
            <td>{description[index]?.Quantity ?? element[3]} </td>
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
            <td>{element[6]}</td>
          </tr>
        );
      });

      return (
        <div className={styles.tablewrapper}>
          <table className="table table-primary table-striped table-responsive-sm">
            <tbody>
              <tr>{renderTableHeader()}</tr>
              {rows}
            </tbody>
          </table>
          <Button text="Update Inventory" color="btn btn-info"  type="submit"
            onClick={pushInventoryDetails} />
        </div>
      );
    } 
    return (
      <h2>Fetching Data</h2>
    );
  };

  const pushInventoryDetails = () => {
      console.log("Pushing inventory")
  }

  const handleChange = async (row, column, value) => {
    let tempTableData = [...tableData];
    tempTableData[row][column] = value;

    if (
      tempTableData[row][0] !== "" &&
      tempTableData[row][1] !== "" &&
      tempTableData[row][3] !== "" &&
      tempTableData[row][3] !== ""
    ) {
      const index = emptyColumnList.indexOf(row);
      if (index > -1) {
        emptyColumnList.splice(index, 1);
      }
      setEmptyColumn(emptyColumnList)
    }
    if (column === 5 || column === 3) {
      let cp = parseFloat(tempTableData[row][3]);
      let markup = parseFloat(tempTableData[row][5]);
      let sp = cp + (cp * markup) / 100;
      sp = sp / tempTableData[row][7];
      tempTableData[row][6] = isNaN(sp) ? 0 : sp.toFixed(2);
    }
    if (column === 1 ) {
      const item = await tesseractService.GetProductDetails(value)
      let productDetails = [...description]
      productDetails[row] = item
      setDescription(productDetails)
    }
    setTableData(tempTableData)
  };

  const setMarkup = (value) => {
    let tempTableData = [...tableData];

    for (let index = 0; index < tempTableData.length; index++) {
      handleChange(index, 5, value);
    }
  };

  useEffect( async () => {
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
    const ocrData = await tesseractService.GetOCRData(props.filename)
    console.log('ocr recieved data', ocrData)
  }, []);

  useEffect(() => {
    const getDescription = async () => {
      // console.log("Here tabledata", tableData);
      const productDetails = await Promise.all(tableData.map(async (product) => {
        try {
          const item = await tesseractService.GetProductDetails(product[1])
          // console.log("Gettting description for", product[1], item)
          return item
        } catch (error) {
          console.log("error fetching descripton", error)
          return null
        }
      }))
      setDescription(productDetails);
    }
    // if (!tableData) {
    //   postImage()
    //   // .then( res => getDescription())
    // } 
    if(description.length === 0  && tableData) {
      getDescription()
    }
  },[readData, description, tableData]);

  // console.log("Item fetched", tableData, description)
  return (
    <div className='container-fluid'>
      {renderTableData()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.userId,
  };
};

export default connect(mapStateToProps)(DisplayData);



/**
1: {1: "ORDER DT ", 2: "CUST ", 3: "NO. ", 4: "P.O. NO. ", 5: "SHIP VIA ", 6: "DATE SHIPPED ", 7: "TERMS "}
2: {1: "10/08/2020 ", 2: "NY246 ", 3: "", 4: "", 5: "PK#934671 Driver ", 6: "10/09/2020 ", 7: "Bill to Bill/Net 30 "}
3: {1: "QTY. ORDERED ", 2: "QTY. SHIPPED ", 3: "ITEM ", 4: "NO. ", 5: "DESCRIPTION ", 6: "UNIT PRICE ", 7: "EXTENDED PRICE "}
4: {1: "1 0 * ", 2: "CAS ", 3: "61 ", 4: "Deep Sna ", 5: "Sev Thin 12 OZ (12) ", 6: "30.09 ", 7: "0.00 "}
5: {1: "1 0 * ", 2: "CAS ", 3: "DTB14 ", 4: "Deep Sna ", 5: "Total Bhel FP 14oz (12) ", 6: "32.51 ", 7: "0.00 "}
6: {1: "1 1 ", 2: "CAS ", 3: "S18 ", 4: "Deep Spi ", 5: "Cor-Cumin Pwd 14oz (20) ", 6: "44.19 ", 7: "44.19 "}
7: {1: "1 1 ", 2: "CAS ", 3: "S14 ", 4: "Deep Spi ", 5: "Corianderpdr14oz (20) ", 6: "30.99 ", 7: "30.99 "}
8: {1: "1 0 * ", 2: "CAS ", 3: "S16 ", 4: "Deep Spi ", 5: "Cumin Pwd 14oz (20) ", 6: "52.99 ", 7: "0.00 "}
9: {1: "1 1 ", 2: "CAS ", 3: "S15 ", 4: "Deep Spi ", 5: "Cumin Seeds 14oz (20) ", 6: "49.79 ", 7: "49.79 "}
10: {1: "1 1 ", 2: "CAS ", 3: "S81 ", 4: "Deep Spi ", 5: "Dill Seeds 7 OZ (20) ", 6: "19.89 ", 7: "19.89 "}
11: {1: "1 1 ", 2: "CAS ", 3: "S25 ", 4: "Deep Spi ", 5: "Garam Masala 14 OZ (20) ", 6: "66.20 ", 7: "66.20 "}
12: {1: "1 1 ", 2: "CAS ", 3: "S167 ", 4: "Deep Spi ", 5: "KSHMIRIChiliPD14oz (20) ", 6: "55.18 ", 7: "55.18 "}
13: {1: "1 0 * ", 2: "CAS ", 3: "S73 ", 4: "Deep Spi ", 5: "Methi Bhardo 7 OZ (20) ", 6: "24.29 ", 7: "0.00 "}
14: {1: "1 1 ", 2: "CAS ", 3: "S32 ", 4: "Deep Spi ", 5: "Red Chili Crush7oz (20) ", 6: "27.69 ", 7: "27.69 "}
15: {1: "1 0 * ", 2: "CAS ", 3: "S30 ", 4: "Deep Spi ", 5: "Red Chili X Hot7oz (20) ", 6: "19.89 ", 7: "0.00 "}
16: {1: "1 0 * ", 2: "CAS ", 3: "S78 ", 4: "Deep Spi ", 5: "Sesame Sds Wshd7oz (20) ", 6: "22.09 ", 7: "0.00 "}
17: {1: "1 0 * ", 2: "CAS ", 3: "S80 ", 4: "Deep Spi ", 5: "SesameSeedsNatr. 70(20) ", 6: "19.89 ", 7: "0.00 "}
18: {1: "1 1 ", 2: "CAS ", 3: "S64 ", 4: "Deep Spi ", 5: "Whole Chilli 3.5oz (30) ", 6: "24.98 ", 7: "24.98 "}
19: {1: "1 0 * ", 2: "BAG ", 3: "CW1 ", 4: "Generic ", 5: "DrywholeCoconut22L(1) ", 6: "75.02 ", 7: "0.00 "}
20: {1: "1 0 * ", 2: "CAS ", 3: "T53 ", 4: "Horlicks ", 5: "Horlicks Plain17. (24) ", 6: "105.81 ", 7: "0.00 "}
21: {1: "1 0 * ", 2: "CAS ", 3: "T53L ", 4: "Horlicks ", 5: "Horlicks Plain2.: (12) ", 6: "99.26 ", 7: "0.00 "}
22: {1: "1 0 * ", 2: "CAS ", 3: "T66 ", 4: "Horlicks ", 5: "HorlicksChoco.17.5 (24) ", 6: "113.78 ", 7: "0.00 "}
23: {1: "1 0 * ", 2: "CAS ", 3: "55M ", 4: "Mirch Ma ", 5: "AgraDalMooth 12oz (15) ", 6: "25.31 ", 7: "0.00 "}
24: {1: "1 0 * ", 2: "CAS ", 3: "54M ", 4: "Mirch Ma ", 5: "Aloo Bhujia 12 oz. (15) ", 6: "25.31 ", 7: "0.00 "}
25: {1: "1 0 * ", 2: "CAS ", 3: "20M ", 4: "Mirch Ma ", 5: "Bhadran Moong 12oz (15) ", 6: "25.31 ", 7: "0.00 "}
26: {1: "1 0 * ", 2: "CAS ", 3: "31M ", 4: "Mirch Ma ", 5: "Bombay Bh-Puril2oz (15) ", 6: "25.31 ", 7: "0.00 "}
27: {1: "1 0 * ", 2: "CAS ", 3: "13M ", 4: "Mirch Ma ", 5: "Boondi- - MM 12oz (15) ", 6: "25.31 ", 7: "0.00 "}
28: {1: "1 0 * ", 2: "CAS ", 3: "29M ", 4: "Mirch Ma ", 5: "Channa-MN 12oz(15) ", 6: "26.36 ", 7: "0.00 "}
29: {1: "1 1 ", 2: "CAS ", 3: "28M ", 4: "Mirch Ma ", 5: "Channadal-MM 12oz (15) ", 6: "25.31 ", 7: "25.31 "}
30: {1: "1 1 ", 2: "CAS ", 3: "12M ", 4: "Mirch Ma ", 5: "Chevda Mix-MM - 12oz (15) ", 6: "25.31 ", 7: "25.31 "}
31: {1: "1 0 * ", 2: "CAS ", 3: "26M ", 4: "Mirch Ma ", 5: "Chuckry-Stcksmm12o - (15) ", 6: "25.31 ", 7: "0.00 "}
32: {1: "1 0 * ", 2: "CAS ", 3: "27M ", 4: "Mirch Ma ", 5: "Corn Chvda-MM 12oz (15) ", 6: "25.31 ", 7: "0.00 "}
33: {1: "1 0 * ", 2: "CAS ", 3: "19M ", 4: "Mirch Ma ", 5: "Dal Muth 12oz (15) ", 6: "25.31 ", 7: "0.00 "}
34: {1: "1 0 * ", 2: "CAS ", 3: "15M ", 4: "Mirch Ma ", 5: "Ganthiya-MM 12oz (15) ", 6: "25.31 ", 7: "0.00 "}
35: {1: "1 0 * ", 2: "CAS ", 3: "21M ", 4: "Mirch Ma ", 5: "GreenVatana- - MM12oz (15) ", 6: "26.36 ", 7: "0.00 "}
36: {1: "2 0 * ", 2: "CAS ", 3: "59M ", 4: "Mirch Ma ", 5: "Khatta Mitha 12oz (15) ", 6: "25.31 ", 7: "0.00 "}
37: {1: "1 0 * ", 2: "CAS ", 3: "32M ", 4: "Mirch Ma ", 5: "Madras Mix 12oz (15) ", 6: "26.36 ", 7: "0.00 "}
38: {1: "1 1 ", 2: "CAS ", 3: "73M ", 4: "Mirch Ma ", 5: "Methi Puri 12oz (15) ", 6: "25.32 ", 7: "25.32 "}
39: {1: "1 1 ", 2: "CAS ", 3: "22M ", 4: "Mirch Ma ", 5: "Moong Dal-MM - 12oz (15) ", 6: "25.31 ", 7: "25.31 "}
40: {1: "2 2 ", 2: "CAS ", 3: "78M ", 4: "Mirch Ma ", 5: "Nylon Thin Sev24oz (12) ", 6: "29.10 ", 7: "58.20 "}
41: {1: "1 0 * ", 2: "CAS ", 3: "14M ", 4: "Mirch Ma ", 5: "Papadi - MM 12oz (15) ", 6: "25.31 ", 7: "0.00 "}
42: {1: "1 0 * ", 2: "CAS ", 3: "57M ", 4: "Mirch Ma ", 5: "Peanut Bhujia 12oz (15) ", 6: "26.36 ", 7: "0.00 "}
43: {1: "", 2: "* ", 3: "Price ", 4: "increase ", 5: "till May 2020 * ", 6: "", 7: ""}
*/