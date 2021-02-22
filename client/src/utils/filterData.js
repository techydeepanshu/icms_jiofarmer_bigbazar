export const calculateTableFields = (data) => {
  let itemArray = ["CAS", "Deep", "BAG", "PK", "TRY", "CAs"];
  let filteredData = data
    .filter((line) => itemArray.some((item) => line./* text. */includes(item)))
    .filter((line) => line./* text. */includes("("))
    .map((line) => line./* text. */trim());

  let regExp = /[&\/\\#,;?<>{}»«=§+$~%-'"“:]/g;

  let tableData = filteredData.map((data, index) => {
    data = data.replaceAll(regExp, ".");
    data = data.replaceAll("..", "");
    data = data.replace("*", " ");
    data = data.replaceAll("  ", " ");
    data = data.replaceAll("-", ".");

    let digitOne = ["i", "I", "l", "L", "T", "t"];
    let digitZero = ["0", "O", "o"];
    let checkedIndex = 0;
    /**first col */
    let ly = [];
    for (let i = checkedIndex; i < data.length; i++) {
      if (
        !isNaN(parseInt(data[i])) ||
        i == 0 ||
        digitZero.includes(data[i]) ||
        digitOne.includes(data[i])
      ) {
        ly.push(data[i]);
      } else if (data[i] == " ") {
        checkedIndex = i + 1;
        break;
      }
    }

    /**second col */
    let qty = [];
    for (let i = checkedIndex; i < data.length; i++) {
      if (!isNaN(parseInt(data[i]))) {
        qty.push(data[i]);
      } else if (digitOne.includes(data[i])) {
        qty.push("1");
      } else if (digitZero.includes(data[i])) {
        qty.push("0");
      } else {
        checkedIndex = i + 1;
        break;
      }
    }
    qty = qty.join("").replaceAll(" ", "");

    /**filter dots */
    let dotCount = [];
    for (let i = checkedIndex; i < data.length; i++) {
      if (data[i] == "." || data[i + 1] == ".") {
        dotCount.push(data[i]);
      } else if (data[i] == " ") {
        checkedIndex = i + 1;
        break;
      } else {
        checkedIndex = i;
        break;
      }
    }

    /**Filter space  & itemNO*/
    let spaceCount = 0;
    let itemNo = [];
    for (let i = checkedIndex; i < data.length; i++) {
      if (data[i] === " " && spaceCount === 1) {
        checkedIndex = i;
        break;
      } else if (data[i] == "*") {
        continue;
      } else {
        itemNo.push(data[i]);
        if (data[i] === " ") {
          spaceCount++;
        }
      }
    }
    itemNo = itemNo.join("").trim().replaceAll(".", "");

    /**
     * third col & pieces count
     */
    let description = [];
    let pieces = [];
    let flag2 = false;
    for (let i = checkedIndex; i < data.length; i++) {
      if (flag2) {
        pieces.push(data[i]);
      }
      if (data[i] == ")") {
        description.push(data[i]);
        checkedIndex = i + 2;
        break;
      } else {
        if (data[i] == "(") {
          flag2 = true;
        }
        description.push(data[i]);
      }
    }
    description = description.join("").trim();
    pieces = parseInt(pieces.join("").trim().replaceAll(")", ""));

    /**unit price(4th col) */
    let unitPrice = [];
    for (let i = checkedIndex; i < data.length; i++) {
      unitPrice.push(data[i]);
      if (data[i] == ".") {
        unitPrice.push(data[i + 1]);
        unitPrice.push(data[i + 2]);
        checkedIndex = i + 3;
        break;
      }
    }
    unitPrice = unitPrice.join("").replaceAll(" ", "");

    /**extended price(5th col) */
    // let extendedPrice = [];
    // for (let i = checkedIndex; i < data.length; i++) {
    //   extendedPrice.push(data[i]);
    //   if (data[i] == ".") {
    //     extendedPrice.push(data[i + 1]);
    //     extendedPrice.push(data[i + 2]);
    //     checkedIndex = i;
    //     break;
    //   }
    // }
    var extendedPrice = data.split(" ").splice(-1)[0]
    // extendedPrice = extendedPrice
    //   .join("")
      .replaceAll(" ", "")
      .replaceAll(",", ".")
      .replaceAll("%", "")
      .replaceAll("..", ".");

    if (unitPrice[unitPrice.length - 1] == ".") {
      console.log("enter if in unit price");
      unitPrice = unitPrice + "00";
    }

    /** set quantity 0 for not shipped items. */
    if (qty == "" && extendedPrice == "0.00") {
      qty = "0";
    }

    if (extendedPrice == "0.00" && qty == "0") {
      // initialData.push(index);
      return null;
    }

    if (qty == 1) {
      unitPrice = extendedPrice
    }
    if (isNaN(unitPrice)) {
      unitPrice = (parseFloat(extendedPrice)/parseInt(qty)).toFixed(2)
    } 
    else if (isNaN(extendedPrice)) {
      extendedPrice = (parseFloat(unitPrice) * parseInt(qty)).toFixed(2)
    }
    
    return [
      qty,
      itemNo,
      "",
      unitPrice,
      extendedPrice,
      0,
    ];
  });
  return tableData.filter((data) => data !== null);
};
/**
 * 
 * 
 * ——Zwerac. MMM -—--:ioo wooo
[0] a NEW YORK ..c o o I DATE NUMBER _ Lo PAGE
[0] 351 Mill Road, Edison, New Jersey 08837 INVOIC@ 10/03/2020 935459 sors
[0] ORDERDT| CUSTNO. | PO.NO. |  SHIPVIA  |DATESHIPPED TERMS
[0] 10/08/2020 I NYS .iib..... il. _______PK#934671- Driver 10/09/2020 | Bill to Bill/Net 30 |
[0] ORDERED SHIPPED : |
[0] 1 i CAS K36 Bansi Kolh.Jaggery 10Lb(4) 24.60 24.60
[0] t iL CAS P18 Bansi Kurmura Ladoo3.5oz (50) 36.11 35:tl
[0] 3 3 CAS MH1l Bansi Phool Makhana 7oz(20) 73.69 218.07
[0] 1 0 * CAS Gl44L Bansi Poha Thick 41b(10) 34.50 0.00
[0] % 1 CAS G53 Bansi Rst.GulabiChanal4(20) 38.78 38.78
[0] L 0 * CAS T69 Boost Boost Powder 15.75(24) 119.04 0.00
[0] 2 2 CAS K38N Britanni Bourbon 3.50z(30) 12.66 25.32
[0] il 1 CAS K38L Britanni Bourbon 6.9 oz (24) 17.15 17-15
[0] 2 2 CAS BNl2l1 Britanni Bourbon Cappuccino(24) 8.45 16.90
[0] i, 1 CAS BN113 Britanni Chocolush 2.64oz (24) l7Z.32 17.32
[0] it i CAS BNl4 Britanni Digestive 14.11 oz(12) L9.3L 13.3%
[0] 2 ? CAS BN71 Britanni Fifty Fifty 2.2oz{48) 11:09 22:18
[0] * Suggested retail price 3 for 5 1.00 *
[0] 5 B CAS R53P Britanni GDPistaAlmond2.63o(48) 18.32 91.69
[0] * 2 FOR 51 PRE PRINTED *
[0] 5 5 CAS K46P Britanni Good day Cashew2.6(48) 18.32 91.60
[0] * 2 FOR Sl PRE PRINTED *
[0] L I CAS K39 Britanni LittleHearts2.64oz(72) 33.86 33.326
[0] I L CAS K40S Britanni Marie Gold 3.1oz(60) 16.92 1G.S2
[0] x i CAS K40 Britanni Marie Gold 5.29oz (50) 23.33 22.33
[0] id id CAS BN119 Britanni Marie Gold FP(10) l2.i3 19.3
[0] 2 2 CAS BN25 Britanni Milk Bikis 3.17oz(24) 7.73 15.46
[0] Z 2 CAS K47S Britanni Nice Time 2.8oz(30) 10.56 21.12
[0] 1 I CAS BNl12 Britanni Nutri.5 Grain8.7oz(18) e7.08B 27.08
[0] 3 3 CAS BN69 Britanni PunjabiCookies21.9(8) 2l.47 64.41
[0] * Suggested Retail $3.49 *
[0] E 1 CAS BG4 Britanni Pure Cow Ghee500Ml (24) 135.86 135.86
[0] 2 2 CAS BNll2 Britanni Tiger Glucose FP(5) 7.07 14.14
[0] L 1 CAS BNl1l4 Britanni Time Pass 1.4o0z (40) 7.04 7.04
[0] * Suggested Retail Price 4 for 1$ *
[0] x IL CAS BN27 Britanni WaferCaramel6.2oz(24) 33.59 33.59
[0] 5 5 CAS BN72M Britanni Wheat Rusk 21.5loz(12) 25.16 180.30
[0] l g * CAS Q22 Complan  ComplanChoco.17.5/(30) 1565.33 0.00
[0] 10 10 CAS BS23 Deep Panipuri 4 Oz. (l6) 3l.24 312.40
[0] 2 2 CAS F24S Deep Flo AllPurpFlMaida2(20) 26.80 53.60
[0] IL I CAS F24L Deep Flo AllPurpFlMaida4 (10) 25.70 25.70
[0] 2 2 CAS F35L Deep Flo Besan 8lb(5) 40.00 80.00
[0] L 1 CAS F73 Deep Flo CrackWheat (Kansar) (10) 22.40 22.40
[0] 1 0 *¥ “CAS U72 Deep Flo CrackedWheat (Fada) (10) 22.40 0.00
[0] 2 2 CAS F95 Deep Flo MultiGrainFlourl01l(4) 30.090 60.00
[0] * ABSOLUTELY NO RETURNS *
[0] CONTINUED ON NEXT PAGE...(Total = $ 9,527.15)
[0] Checks payable to CHETAK New York, LLC. Overdue balances subject to finance charge (1.5% per month). All Sales Final. DFEP FOODS
 * 
 */