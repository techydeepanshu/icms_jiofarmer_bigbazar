export const calculateTableFields = (data) => {
  let itemArray = ["CAS", "Deep", "BAG", "PK", "TRY", "CAs"];
  let filteredData = data
    .filter((line) => itemArray.some((item) => line.text.includes(item)))
    .filter((line) => line.text.includes("("))
    .map((line) => line.text.trim());

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
    let extendedPrice = [];
    for (let i = checkedIndex; i < data.length; i++) {
      extendedPrice.push(data[i]);
      if (data[i] == ".") {
        extendedPrice.push(data[i + 1]);
        extendedPrice.push(data[i + 2]);
        checkedIndex = i;
        break;
      }
    }
    extendedPrice = extendedPrice
      .join("")
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

    return [
      qty,
      itemNo,
      description,
      unitPrice,
      extendedPrice,
      0,
      (unitPrice / pieces).toFixed(2),
      pieces,
    ];
  });
  return tableData.filter((data) => data !== null);
};
