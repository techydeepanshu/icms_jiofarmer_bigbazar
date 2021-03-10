const data = [
  {
    1: "ORDER DT ",
    2: "CUST ",
    3: "NO. ",
    4: "P.O. NO. ",
    5: "SHIP VIA ",
    6: "DATE SHIPPED ",
    7: "TERMS ",
  },
  {
    1: "10/08/2020 ",
    2: "NY246 ",
    3: "",
    4: "",
    5: "PK#934671 Driver ",
    6: "10/09/2020 ",
    7: "Bill to Bill/Net 30 ",
  },
  {
    1: "QTY. ORDERED ",
    2: "QTY. SHIPPED ",
    3: "ITEM ",
    4: "NO. ",
    5: "DESCRIPTION ",
    6: "UNIT PRICE ",
    7: "EXTENDED PRICE ",
  },
  {
    1: "1 0 * ",
    2: "CAS ",
    3: "61 ",
    4: "Deep Sna ",
    5: "Sev Thin 12 OZ (12) ",
    6: "30.09 ",
    7: "0.00 ",
  },
  {
    1: "1 0 * ",
    2: "CAS ",
    3: "DTB14 ",
    4: "Deep Sna ",
    5: "Total Bhel FP 14oz (12) ",
    6: "32.51 ",
    7: "0.00 ",
  },
  {
    1: "1 1 ",
    2: "CAS ",
    3: "S18 ",
    4: "Deep Spi ",
    5: "Cor-Cumin Pwd 14oz (20) ",
    6: "44.19 ",
    7: "44.19 ",
  },
  {
    1: "1 1 ",
    2: "CAS ",
    3: "S14 ",
    4: "Deep Spi ",
    5: "Corianderpdr14oz (20) ",
    6: "30.99 ",
    7: "30.99 ",
  },
  {
    1: "1 0 * ",
    2: "CAS ",
    3: "S16 ",
    4: "Deep Spi ",
    5: "Cumin Pwd 14oz (20) ",
    6: "52.99 ",
    7: "0.00 ",
  },
  {
    1: "1 1 ",
    2: "CAS ",
    3: "S15 ",
    4: "Deep Spi ",
    5: "Cumin Seeds 14oz (20) ",
    6: "49.79 ",
    7: "49.79 ",
  },
  {
    1: "1 1 ",
    2: "CAS ",
    3: "S81 ",
    4: "Deep Spi ",
    5: "Dill Seeds 7 OZ (20) ",
    6: "19.89 ",
    7: "19.89 ",
  },
  {
    1: "1 1 ",
    2: "CAS ",
    3: "S25 ",
    4: "Deep Spi ",
    5: "Garam Masala 14 OZ (20) ",
    6: "66.20 ",
    7: "66.20 ",
  },
  {
    1: "1 1 ",
    2: "CAS ",
    3: "S167 ",
    4: "Deep Spi ",
    5: "KSHMIRIChiliPD14oz (20) ",
    6: "55.18 ",
    7: "55.18 ",
  },
  {
    1: "1 0 * ",
    2: "CAS ",
    3: "S73 ",
    4: "Deep Spi ",
    5: "Methi Bhardo 7 OZ (20) ",
    6: "24.29 ",
    7: "0.00 ",
  },
  {
    1: "1 1 ",
    2: "CAS ",
    3: "S32 ",
    4: "Deep Spi ",
    5: "Red Chili Crush7oz (20) ",
    6: "27.69 ",
    7: "27.69 ",
  },
  {
    1: "1 0 * ",
    2: "CAS ",
    3: "S30 ",
    4: "Deep Spi ",
    5: "Red Chili X Hot7oz (20) ",
    6: "19.89 ",
    7: "0.00 ",
  },
  {
    1: "1 0 * ",
    2: "CAS ",
    3: "S78 ",
    4: "Deep Spi ",
    5: "Sesame Sds Wshd7oz (20) ",
    6: "22.09 ",
    7: "0.00 ",
  },
  {
    1: "1 0 * ",
    2: "CAS ",
    3: "S80 ",
    4: "Deep Spi ",
    5: "SesameSeedsNatr. 70(20) ",
    6: "19.89 ",
    7: "0.00 ",
  },
  {
    1: "1 1 ",
    2: "CAS ",
    3: "S64 ",
    4: "Deep Spi ",
    5: "Whole Chilli 3.5oz (30) ",
    6: "24.98 ",
    7: "24.98 ",
  },
  {
    1: "1 0 * ",
    2: "BAG ",
    3: "CW1 ",
    4: "Generic ",
    5: "DrywholeCoconut22L(1) ",
    6: "75.02 ",
    7: "0.00 ",
  },
  {
    1: "1 0 * ",
    2: "CAS ",
    3: "T53 ",
    4: "Horlicks ",
    5: "Horlicks Plain17. (24) ",
    6: "105.81 ",
    7: "0.00 ",
  },
  {
    1: "1 0 * ",
    2: "CAS ",
    3: "T53L ",
    4: "Horlicks ",
    5: "Horlicks Plain2.: (12) ",
    6: "99.26 ",
    7: "0.00 ",
  },
  {
    1: "1 0 * ",
    2: "CAS ",
    3: "T66 ",
    4: "Horlicks ",
    5: "HorlicksChoco.17.5 (24) ",
    6: "113.78 ",
    7: "0.00 ",
  },
  {
    1: "1 0 * ",
    2: "CAS ",
    3: "55M ",
    4: "Mirch Ma ",
    5: "AgraDalMooth 12oz (15) ",
    6: "25.31 ",
    7: "0.00 ",
  },
  {
    1: "1 0 * ",
    2: "CAS ",
    3: "54M ",
    4: "Mirch Ma ",
    5: "Aloo Bhujia 12 oz. (15) ",
    6: "25.31 ",
    7: "0.00 ",
  },
  {
    1: "1 0 * ",
    2: "CAS ",
    3: "20M ",
    4: "Mirch Ma ",
    5: "Bhadran Moong 12oz (15) ",
    6: "25.31 ",
    7: "0.00 ",
  },
  {
    1: "1 0 * ",
    2: "CAS ",
    3: "31M ",
    4: "Mirch Ma ",
    5: "Bombay Bh-Puril2oz (15) ",
    6: "25.31 ",
    7: "0.00 ",
  },
  {
    1: "1 0 * ",
    2: "CAS ",
    3: "13M ",
    4: "Mirch Ma ",
    5: "Boondi- - MM 12oz (15) ",
    6: "25.31 ",
    7: "0.00 ",
  },
  {
    1: "1 0 * ",
    2: "CAS ",
    3: "29M ",
    4: "Mirch Ma ",
    5: "Channa-MN 12oz(15) ",
    6: "26.36 ",
    7: "0.00 ",
  },
  {
    1: "1 1 ",
    2: "CAS ",
    3: "28M ",
    4: "Mirch Ma ",
    5: "Channadal-MM 12oz (15) ",
    6: "25.31 ",
    7: "25.31 ",
  },
  {
    1: "1 1 ",
    2: "CAS ",
    3: "12M ",
    4: "Mirch Ma ",
    5: "Chevda Mix-MM - 12oz (15) ",
    6: "25.31 ",
    7: "25.31 ",
  },
  {
    1: "1 0 * ",
    2: "CAS ",
    3: "26M ",
    4: "Mirch Ma ",
    5: "Chuckry-Stcksmm12o - (15) ",
    6: "25.31 ",
    7: "0.00 ",
  },
  {
    1: "1 0 * ",
    2: "CAS ",
    3: "27M ",
    4: "Mirch Ma ",
    5: "Corn Chvda-MM 12oz (15) ",
    6: "25.31 ",
    7: "0.00 ",
  },
  {
    1: "1 0 * ",
    2: "CAS ",
    3: "19M ",
    4: "Mirch Ma ",
    5: "Dal Muth 12oz (15) ",
    6: "25.31 ",
    7: "0.00 ",
  },
  {
    1: "1 0 * ",
    2: "CAS ",
    3: "15M ",
    4: "Mirch Ma ",
    5: "Ganthiya-MM 12oz (15) ",
    6: "25.31 ",
    7: "0.00 ",
  },
  {
    1: "1 0 * ",
    2: "CAS ",
    3: "21M ",
    4: "Mirch Ma ",
    5: "GreenVatana- - MM12oz (15) ",
    6: "26.36 ",
    7: "0.00 ",
  },
  {
    1: "2 0 * ",
    2: "CAS ",
    3: "59M ",
    4: "Mirch Ma ",
    5: "Khatta Mitha 12oz (15) ",
    6: "25.31 ",
    7: "0.00 ",
  },
  {
    1: "1 0 * ",
    2: "CAS ",
    3: "32M ",
    4: "Mirch Ma ",
    5: "Madras Mix 12oz (15) ",
    6: "26.36 ",
    7: "0.00 ",
  },
  {
    1: "1 1 ",
    2: "CAS ",
    3: "73M ",
    4: "Mirch Ma ",
    5: "Methi Puri 12oz (15) ",
    6: "25.32 ",
    7: "25.32 ",
  },
  {
    1: "1 1 ",
    2: "CAS ",
    3: "22M ",
    4: "Mirch Ma ",
    5: "Moong Dal-MM - 12oz (15) ",
    6: "25.31 ",
    7: "25.31 ",
  },
  {
    1: "2 2 ",
    2: "CAS ",
    3: "78M ",
    4: "Mirch Ma ",
    5: "Nylon Thin Sev24oz (12) ",
    6: "29.10 ",
    7: "58.20 ",
  },
  {
    1: "1 0 * ",
    2: "CAS ",
    3: "14M ",
    4: "Mirch Ma ",
    5: "Papadi - MM 12oz (15) ",
    6: "25.31 ",
    7: "0.00 ",
  },
  {
    1: "1 0 * ",
    2: "CAS ",
    3: "57M ",
    4: "Mirch Ma ",
    5: "Peanut Bhujia 12oz (15) ",
    6: "26.36 ",
    7: "0.00 ",
  },
  {
    1: "",
    2: "* ",
    3: "Price ",
    4: "increase ",
    5: "till May 2020 * ",
    6: "",
    7: "",
  },
];

export const chetak = () => {
 
  let filteredData = data.map((line) => Object.values(line).join("").trim());

  let tableData = filteredData.map((row, index) => {
    // console.log("Data received in row", row)
    row = row.replaceAll("* ", "")
    const extendedPrice = row.split(" ").splice(-1)[0];
    const unitPrice = row.split(" ").splice(-2)[0];
    // var pcs = row.split(" ").splice(-3)[0];
    // var qtyOredered = row.split(" ").splice(0)[0];
    const qty = row.split(" ").splice(1)[0];
    const description = row.split(" ").splice(4).slice(0, -2).join(" ");
    const itemNo = row.split(" ").splice(2).slice(0, 2).join(" ");
    const pieces = 0
    const markup = 0
    if (isNaN(extendedPrice) || isNaN(unitPrice)) {
      return null;
    }
    if (extendedPrice == "0.00" && qty == "0") {
      return null;
    }
    return {
      qty,
      itemNo,
      description,
      pieces,
      unitPrice,
      extendedPrice,
      markup,
    };
  });
  console.table(tableData)
  return tableData.filter((data) => data !== null);
};
/**
 * onChange={(event, newValue) => {
                  // console.log("Selected Value", newValue)
                  if (newValue) {
                    // element[1] = newValue
                    // // let itemDescription = [...itemNoDescription]
                    // // itemDescription[index] = productDetails[newValue].Description
                    // // setItemNoDescription(itemDescription);
                    // // console.log("Old value", itemDescription,);
                    // let tempTableData = [...tableData];
                    handleChange(index, 1, newValue);
                  }
 */
/**scan.jpg
 * 1: {1: "", 2: "ORDER DT ", 3: "CUST ", 4: "NO. ", 5: "P.O. ", 6: "NO. ", 7: "SHIP VIA ", 8: "DATE SHIPPED ", 9: "TERMS "}
2: {1: "", 2: "10/08/2020 ", 3: "NY246 ", 4: "", 5: "", 6: "", 7: "PK#934671- Driver ", 8: "10/09/2020 ", 9: "Bill to Bill/Net 30 "}
3: {1: "", 2: "QTY. ORDERED ", 3: "QTY. SHIPPED ", 4: "ITEM ", 5: "NO. ", 6: "", 7: "DESCRIPTION ", 8: "UNIT PRICE ", 9: "EXTENDED PRICE "}
4: {1: "2 ", 2: "0 * ", 3: "CAS ", 4: "HSMJ ", 5: "Deep ", 6: "Fro ", 7: "8JlpnoChsSmsa7oz (12) ", 8: "27.77 ", 9: "0.00 "}
5: {1: "2 ", 2: "0 * ", 3: "CAS ", 4: "EBM ", 5: "Deep ", 6: "Fro ", 7: "Bhindi Masala 10oz (12) ", 8: "26.49 ", 9: "0.00 "}
6: {1: "", 2: "", 3: "* ", 4: "Price ", 5: "reduction ", 6: "", 7: "from $2.55 to $2.21 * ", 8: "", 9: ""}
7: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "ECH ", 5: "Deep ", 6: "Fro ", 7: "Chhole 10oz (12) ", 8: "26.49 ", 9: "26.49 "}
8: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "HVSI ", 5: "Deep ", 6: "Fro ", 7: "Cktl.SpringRoll35P (24) ", 8: "67.13 ", 9: "67.13 "}
9: {1: "", 2: "", 3: "* ", 4: "$3.99 ", 5: "Sticker ", 6: "* ", 7: "", 8: "", 9: ""}
10: {1: "5 ", 2: "5 ", 3: "CAS ", 4: "I5P ", 5: "Deep ", 6: "Fro ", 7: "CktlPotatoSmsasopc( (24) ", 8: "52.74 ", 9: "263.70 "}
11: {1: "2 ", 2: "2 ", 3: "CAS ", 4: "SDK ", 5: "Deep ", 6: "Fro ", 7: "Dal Makhani 10 oz. (12) ", 8: "18.68 ", 9: "37.36 "}
12: {1: "2 ", 2: "2 ", 3: "CAS ", 4: "BR27 ", 5: "Deep ", 6: "Fro ", 7: "DeepChoralFafda7oz (24) ", 8: "28.91 ", 9: "57.82 "}
13: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "BR27 ", 5: "Deep ", 6: "Fro ", 7: "DeepChoralFafda7oz (24) ", 8: "28.91 ", 9: "0.00 "}
14: {1: "", 2: "", 3: "* ", 4: "", 5: "Free! ", 6: "", 7: "", 8: "", 9: ""}
15: {1: "5 ", 2: "5 ", 3: "CAS ", 4: "JPS ", 5: "Deep ", 6: "Fro ", 7: "Jumbo Punjbi 8pc (8) ", 8: "33.44 ", 9: "167.20 "}
16: {1: "15 ", 2: "15 ", 3: "CAS ", 4: "IJPS ", 5: "Deep ", 6: "Fro ", 7: "Jumbo Samosa 15pc (4) ", 8: "26.77 ", 9: "401.55 "}
17: {1: "2 ", 2: "2 ", 3: "CAS ", 4: "EMK ", 5: "Deep ", 6: "Fro ", 7: "Malai Kofta 10oz (12) ", 8: "41.36 ", 9: "82.72 "}
18: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "EMP ", 5: "Deep ", 6: "Fro ", 7: "Mutter Paneer 10oz (12) ", 8: "34.17 ", 9: "34.17 "}
19: {1: "1 ", 2: "0 * ", 3: "CAS ", 4: "DF13 ", 5: "Deep ", 6: "Fro ", 7: "Onion Pakora 10oz (24) ", 8: "42.15 ", 9: "0.00 "}
20: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "EPM ", 5: "Deep ", 6: "Fro ", 7: "Paneer MakhanilOoz (12) ", 8: "30.99 ", 9: "30.99 "}
21: {1: "2 ", 2: "2 ", 3: "CAS ", 4: "ISMVT ", 5: "Deep ", 6: "Fro ", 7: "Prty Smsa Veg 36pc (5) ", 8: "44.11 ", 9: "88.22 "}
22: {1: "1 ", 2: "0 * ", 3: "CAS ", 4: "DF12 ", 5: "Deep ", 6: "Fro ", 7: "Spinach PakoralOoz (24) ", 8: "42.15 ", 9: "0.00 "}
23: {1: "2 ", 2: "0 * ", 3: "CAS ", 4: "EUN ", 5: "Deep ", 6: "Fro ", 7: "Undhiu 10 OZ. (12) ", 8: "26.49 ", 9: "0.00 "}
24: {1: "2 ", 2: "0 * ", 3: "CAS ", 4: "VMB16 ", 5: "Deep ", 6: "Fro ", 7: "Veg MasalaBurgerFP (8) ", 8: "67.96 ", 9: "0.00 "}
25: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "DIQ35 ", 5: "Deep ", 6: "IQF ", 7: "Arvi 120z (24) ", 8: "30.90 ", 9: "30.90 "}
26: {1: "3 ", 2: "0 * ", 3: "CAS ", 4: "DIQ11 ", 5: "Deep ", 6: "IQF ", 7: "Baby Bhindi 12oz (24) ", 8: "26.58 ", 9: "0.00 "}
27: {1: "3 ", 2: "0 * ", 3: "CAS ", 4: "DIQ12 ", 5: "Deep ", 6: "IQF ", 7: "Bhindi Cut 12oz (24) ", 8: "27.90 ", 9: "0.00 "}
28: {1: "1 ", 2: "0 * ", 3: "CAS ", 4: "DIQ36 ", 5: "Deep ", 6: "IQF ", 7: "Chauri 12Oz (24) ", 8: "31.86 ", 9: "0.00 "}
29: {1: "1 ", 2: "0 * ", 3: "CAS ", 4: "DIQ13 ", 5: "Deep ", 6: "IQF ", 7: "Chikoo Slices12oz (24) ", 8: "37.86 ", 9: "0.00 "}
30: {1: "2 ", 2: "2 ", 3: "CAS ", 4: "DIQ77 ", 5: "Deep ", 6: "IQF ", 7: "Coconut Slices12Oz (24) ", 8: "46.38 ", 9: "92.76 "}
31: {1: "2 ", 2: "2 ", 3: "CAS ", 4: "DIQ14 ", 5: "Deep ", 6: "IQF ", 7: "Drumsticks 120z (24) ", 8: "29.22 ", 9: "58.44 "}
32: {1: "3 ", 2: "0 * ", 3: "CAS ", 4: "DIQ99 ", 5: "Deep ", 6: "IQF ", 7: "Fro.Mango Pulp14. 1 (24) ", 8: "40.54 ", 9: "0.00 "}
33: {1: "3 ", 2: "3 ", 3: "CAS ", 4: "DIQ63 ", 5: "Deep ", 6: "IQF ", 7: "Green Peas 21b (12) ", 8: "31.92 ", 9: "95.76 "}
34: {1: "3 ", 2: "3 ", 3: "CAS ", 4: "DIQ62 ", 5: "Deep ", 6: "IQF ", 7: "Green Peas 3. 851b (6) ", 8: "28.17 ", 9: "84.51 "}
35: {1: "3 ", 2: "0 * ", 3: "CAS ", 4: "DIQ98 ", 5: "Deep ", 6: "IQF ", 7: "GreenMangol2oz (24) ", 8: "35.83 ", 9: "0.00 "}
36: {1: "3 ", 2: "0 * ", 3: "CAS ", 4: "DIQ97 ", 5: "Deep ", 6: "IQF ", 7: "Mango Pulp 30oz (12) ", 8: "41.14 ", 9: "0.00 "}
37: {1: "3 ", 2: "0 * ", 3: "CAS ", 4: "DIQ96 ", 5: "Deep ", 6: "IQF ", 7: "Mango Slices 12oz (24) ", 8: "58.25 ", 9: "0.00 "}
38: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "DIQ72 ", 5: "Deep ", 6: "IQF ", 7: "Methi Chopped 10oz (24) ", 8: "41.09 ", 9: "41.09 "}
39: {1: "2 ", 2: "2 ", 3: "CAS ", 4: "DIQ67 ", 5: "Deep ", 6: "IQF ", 7: "Peas & Carrot 21b (12) ", 8: "27.74 ", 9: "55.48 "}
40: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "DIQ24 ", 5: "Deep ", 6: "IQF ", 7: "Punjabi Tinda12oz (24) ", 8: "29.22 ", 9: "29.22 "}
41: {1: "10 ", 2: "10 ", 3: "CAS ", 4: "DIQ42 ", 5: "Deep ", 6: "IQF ", 7: "ShreddedCoconut12o (24) ", 8: "43.74 ", 9: "437.40 "}
42: {1: "10 ", 2: "0 * ", 3: "CAS ", 4: "DIQ41 ", 5: "Deep ", 6: "IQF ", 7: "Shreddedcoconut240( (12) ", 8: "43.21 ", 9: "0.00 "}
43: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "DIQ27 ", 5: "Deep ", 6: "IQF ", 7: "Suran 120z (24) ", 8: "26.58 ", 9: "26.58 "}
 */

 /**scan 7
  * 1: {1: "1 ", 2: "1 ", 3: "CAS DDL2 Deep Dai Dahi Lowfat 21b (8) ", 4: "17.36 ", 5: "17.36 "}
2: {1: "1 ", 2: "1 ", 3: "CAS DDL5 Deep Dai Dahi Lowfat 51b (6) ", 4: "30.66 ", 5: "30.66 "}
3: {1: "1 ", 2: "1 ", 3: "CAS DDL5 Deep Dai Dahi Lowfat 51b (6) ", 4: "30.66 ", 5: "0.00 "}
4: {1: "", 2: "", 3: "* *** Free! ", 4: "", 5: ""}
5: {1: "1 ", 2: "1 ", 3: "CAS DDW2 Deep Dai Dahi Whl milk 21b (8) ", 4: "17.36 ", 5: "17.36 "}
6: {1: "5 ", 2: "5 ", 3: "CAS DDW5 Deep Dai Dahi Whlemlk 51b (6) ", 4: "30.66 ", 5: "153.30 "}
7: {1: "1 ", 2: "1 ", 3: "CAS DB21 Deep Dai Raw Paneer 12oz. (20) ", 4: "63.95 ", 5: "63.95 "}
8: {1: "", 2: "", 3: "* Suggested Retail Price $3.49 * ", 4: "", 5: ""}
9: {1: "1 ", 2: "1 ", 3: "CAS DB22 Deep Dai Raw Paneer 2.5 lbs (10) ", 4: "104.75 ", 5: "104.75 "}
10: {1: "", 2: "Refrigerated ", 3: "[11] Bxs *wt= 282 ", 4: "$387.38 ", 5: ""}
  */
 /** scan 2
  * 1: {1: "", 2: "ORDER DT ", 3: "CUST ", 4: "NO. ", 5: "P.O. NO. ", 6: "SHIP VIA ", 7: "DATE SHIPPED ", 8: "TERMS "}
2: {1: "", 2: "10/08/2020 ", 3: "NY246 ", 4: "", 5: "", 6: "PK#934671- Driver ", 7: "10/09/2020 ", 8: "Bill to Bill/Net 30 "}
3: {1: "", 2: "QTY. ORDERED ", 3: "QTY. SHIPPED ", 4: "ITEM ", 5: "NO. ", 6: "DESCRIPTION ", 7: "UNIT PRICE ", 8: "EXTENDED PRICE "}
4: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "K36 ", 5: "Bansi ", 6: "Kolh Jaggery 10Lb (4) ", 7: "24.60 ", 8: "24.60 "}
5: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "P18 ", 5: "Bansi ", 6: "Kurmura Ladoo3. 5oz (50) ", 7: "36.11 ", 8: "36.11 "}
6: {1: "3 ", 2: "3 ", 3: "CAS ", 4: "MH1 ", 5: "Bansi ", 6: "Phool Makhana 7oz (20) ", 7: "72.69 ", 8: "218.07 "}
7: {1: "1 ", 2: "0 * ", 3: "CAS ", 4: "G144L ", 5: "Bansi ", 6: "Poha Thick 4lb (10) ", 7: "34.50 ", 8: "0.00 "}
8: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "G53 ", 5: "Bansi ", 6: "Rst.Gulabichana14 (20) ", 7: "38.78 ", 8: "38.78 "}
9: {1: "1 ", 2: "0 * ", 3: "CAS ", 4: "T69 ", 5: "Boost ", 6: "Boost Powder 15.75(24) ", 7: "119.04 ", 8: "0.00 "}
10: {1: "2 ", 2: "2 ", 3: "CAS ", 4: "K38N ", 5: "Britanni ", 6: "Bourbon 3.5oz (30) ", 7: "12.66 ", 8: "25.32 "}
11: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "K38L ", 5: "Britanni ", 6: "Bourbon 6.9 OZ (24) ", 7: "17.15 ", 8: "17.15 "}
12: {1: "2 ", 2: "2 ", 3: "CAS ", 4: "BN121 ", 5: "Britanni ", 6: "Bourbon Cappuccino (24) ", 7: "8.45 ", 8: "16.90 "}
13: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "BN113 ", 5: "Britanni ", 6: "Chocolush 2. 64oz (24) ", 7: "17.32 ", 8: "17.32 "}
14: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "BN14 ", 5: "Britanni ", 6: "Digestive 14.11 oz (12) ", 7: "19.31 ", 8: "19.31 "}
15: {1: "2 ", 2: "2 ", 3: "CAS ", 4: "BN71 ", 5: "Britanni ", 6: "Fifty Fifty 2. 2oz (48) ", 7: "11.09 ", 8: "22.18 "}
16: {1: "", 2: "", 3: "* ", 4: "Suggested ", 5: "retail ", 6: "price 3 for $ 1.00 * ", 7: "", 8: ""}
17: {1: "5 ", 2: "5 ", 3: "CAS ", 4: "R53P ", 5: "Britanni ", 6: "GDPistaAlmond2.630( (48) ", 7: "18.32 ", 8: "91.60 "}
18: {1: "", 2: "", 3: "* 2 ", 4: "FOR ", 5: "$1 PRE ", 6: "PRINTED ", 7: "", 8: ""}
19: {1: "5 ", 2: "5 ", 3: "CAS ", 4: "K46P ", 5: "Britanni ", 6: "Good day Cashew2.6 (48) ", 7: "18.32 ", 8: "91.60 "}
20: {1: "", 2: "", 3: "* 2 ", 4: "FOR ", 5: "$1 PRE ", 6: "PRINTED ", 7: "", 8: ""}
21: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "K39 ", 5: "Britanni ", 6: "LittleHearts2.640z(72) ", 7: "33.96 ", 8: "33.96 "}
22: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "K4OS ", 5: "Britanni ", 6: "Marie Gold . loz (60) ", 7: "16.92 ", 8: "16.92 "}
23: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "K40 ", 5: "Britanni ", 6: "Marie Gold 5.29oz (60) ", 7: "28.33 ", 8: "28.33 "}
24: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "BN119 ", 5: "Britanni ", 6: "Marie Gold FP (10) ", 7: "19.13 ", 8: "19.13 "}
25: {1: "2 ", 2: "2 ", 3: "CAS ", 4: "BN25 ", 5: "Britanni ", 6: "Milk Bikis 3. 17oz (24) ", 7: "7.73 ", 8: "15.46 "}
26: {1: "2 ", 2: "2 ", 3: "CAS ", 4: "K47S ", 5: "Britanni ", 6: "Nice Time 2. . 8oz (30) ", 7: "10.56 ", 8: "21.12 "}
27: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "BN12 ", 5: "Britanni ", 6: "Nutri. 5 Grain8. 7oz (18) ", 7: "27.08 ", 8: "27.08 "}
28: {1: "3 ", 2: "3 ", 3: "CAS ", 4: "BN69 ", 5: "Britanni ", 6: "PunjabiCookies21. (8) ", 7: "21.47 ", 8: "64.41 "}
29: {1: "", 2: "", 3: "* ", 4: "Suggested ", 5: "Retail ", 6: "$3.49 * ", 7: "", 8: ""}
30: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "BG4 ", 5: "Britanni ", 6: "Pure Cow Ghee500Ml (24) ", 7: "135.86 ", 8: "135.86 "}
31: {1: "2 ", 2: "2 ", 3: "CAS ", 4: "BN112 ", 5: "Britanni ", 6: "Tiger Glucose FP (5) ", 7: "7.07 ", 8: "14.14 "}
32: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "BN114 ", 5: "Britanni ", 6: "Time Pass 1.4oz (40) ", 7: "7.04 ", 8: "7.04 "}
33: {1: "", 2: "", 3: "* ", 4: "Suggested ", 5: "Retail ", 6: "Price 4 for 1$ * ", 7: "", 8: ""}
34: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "BN27 ", 5: "Britanni ", 6: "WaferCaramel6.2oz (24) ", 7: "33.69 ", 8: "33.69 "}
35: {1: "5 ", 2: "5 ", 3: "CAS ", 4: "BN72M ", 5: "Britanni ", 6: "Wheat Rusk 21.51oz (12) ", 7: "26.16 ", 8: "130.80 "}
36: {1: "1 ", 2: "0 * ", 3: "CAS ", 4: "Q22 ", 5: "Complan ", 6: "ComplanChoco.17. (30) ", 7: "165.33 ", 8: "0.00 "}
37: {1: "10 ", 2: "10 ", 3: "CAS ", 4: "BS23 ", 5: "Deep ", 6: "Panipuri 4 Oz. (16) ", 7: "31.24 ", 8: "312.40 "}
38: {1: "2 ", 2: "2 ", 3: "CAS ", 4: "F24S ", 5: "Deep Flo ", 6: "AllPurpFlMaida2 (20) ", 7: "26.80 ", 8: "53.60 "}
39: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "F24L ", 5: "Deep Flo ", 6: "AllPurpFlMaida4 (10) ", 7: "25.70 ", 8: "25.70 "}
40: {1: "2 ", 2: "2 ", 3: "CAS ", 4: "F35L ", 5: "Deep Flo ", 6: "Besan 81b(5) ", 7: "40.00 ", 8: "80.00 "}
41: {1: "1 ", 2: "1 ", 3: "CAS ", 4: "F73 ", 5: "Deep Flo ", 6: "CrackWheat (Kansar) (10) ", 7: "22.40 ", 8: "22.40 "}
42: {1: "1 ", 2: "0 * ", 3: "CAS ", 4: "F72 ", 5: "Deep Flo ", 6: "CrackedWheat (Fada) (10) ", 7: "22.40 ", 8: "0.00 "}
43: {1: "2 ", 2: "2 ", 3: "CAS ", 4: "F95 ", 5: "Deep Flo ", 6: "MultiGrainFlour101 (4) ", 7: "30.00 ", 8: "60.00 "}
44: {1: "", 2: "", 3: "* ", 4: "ABSOLUTELY ", 5: "NO ", 6: "RETURNS * ", 7: "", 8: ""}

Array[1]
1: {1: "DATE ", 2: "NUMBER ", 3: "PAGE "}
2: {1: "10/09/2020 ", 2: "935459 ", 3: "5 of 9 "}
__proto__: Object
  * 
  */