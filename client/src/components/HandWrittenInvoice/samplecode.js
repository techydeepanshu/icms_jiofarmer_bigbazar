const renderTableData = () => {
    const tableContant = [
      {
        barcode: "894559000389",
        cost: "2.0",
        cp: "3.75",
        department: "ROTI AND NAAN",
        description: "TAZA TANDOORI NAAN JUMBO 8PCS X12 4.99",
        details: undefined,
        extendedPrice: "225.00",
        isReviewed: "false",
        isUpdated: "false",
        itemNo: "TAZA TANDOORI NAAN JUMBO 8PCS X12 4.99",
        itemNoPresent: true,
        linkingCorrect: "false",
        margin: 49.500000000000014,
        markup: 0,
        pieces: "12",
        posName: "TANDOORI NAAN 5 PC",
        posSku: "13051",
        price: "45",
        priceIncrease: 1,
        qty: "5",
        sellingPrice: "2.99",
        show: true,
        size: "425 GM ..",
        sku: undefined,
        sp: "3.75",
        unitPrice: "45.00",
      },
      {
        barcode: "894559000389",
        cost: "2.0",
        cp: "3.75",
        department: "ROTI AND NAAN",
        description: "TAZA TANDOORI NAAN JUMBO 8PCS X12 4.99",
        details: undefined,
        extendedPrice: "225.00",
        isReviewed: "false",
        isUpdated: "false",
        itemNo: "TAZA TANDOORI NAAN JUMBO 8PCS X12 4.99",
        itemNoPresent: true,
        linkingCorrect: "false",
        margin: 49.500000000000014,
        markup: 0,
        pieces: "12",
        posName: "TANDOORI NAAN 5 PC",
        posSku: "13051",
        price: "45",
        priceIncrease: 1,
        qty: "5",
        sellingPrice: "2.99",
        show: true,
        size: "425 GM ..",
        sku: undefined,
        sp: "3.75",
        unitPrice: "45.00",
      },
    ];
    // setTableData(tableContant);
    console.log("renderTableData_tableData : ", tableData);
    console.log("renderTableData_tableContant : ", tableContant);
    console.log("renderTableData_showPosState : ", showPosState);
    // console.log(stateUpdated);

    if (tableContant) {
      // console.log(tableContant);

      // console.log(showPosIndex);

      let rows = tableContant.map((element, index) => {
        //fuzzwuzzSuggestion = getFuzzwuzzSuggestion(element.description);
        let isEmpty =
          element.qty === "" ||
          element.itemNo === "" ||
          !element.pieces ||
          isNaN(element.unitPrice) ||
          element.unitPrice === "" ||
          isNaN(element.extendedPrice);
        // if (isEmpty && element.show) {
        //   let emptyColumn = [...emptyColumnList, index];
        //   emptyColumnList = [...new Set(emptyColumn)];
        // }
        let isFree = element.qty != 0 && element.extendedPrice === "0.00";

        const isUpdated = "true";
        const updateIndex = 1;
        const costInc = "true";
        const costDec = "true";
        let hicksvilleData = [];
        const deleteRow = () => {
          console.log("deleteRow");
        };
        const addRow = () => {
          console.log("addRow");
        };
        const pushInventoryDetails = () => {
          console.log("pushInventoryDetails");
        };

        return (
          <tr
            key={index}
            className={isEmpty ? styles.red : isFree ? styles.free : null}
            style={
              isUpdated === "true"
                ? updateIndex === index
                  ? { backgroundColor: "lightBlue" }
                  : {}
                : element.show
                ? { opacity: "1" }
                : { opacity: "0.4" }
            }
          >
            <td>{index + 1}</td>
            <td className={styles.element}>
              <TextField
                type="tel"
                value={
                  showPosIndex === index
                    ? showPosState.barcode
                    : element.barcode
                }
                id="outlined-secondary"
                variant="outlined"
                onChange={(e) => {
                  handleChange(index, "barcode", e.target.value);
                }}
                style={{ width: 150 }}
              />
              {/* <IconButton
                color="primary"
                aria-label="add to review"
                // onClick={() => addForReview(element, index)}
              >
                <InfoOutlinedIcon
                  style={
                    reviewItems.includes(index)
                      ? { backgroundColor: "green" }
                      : null
                  }
                /> 
              </IconButton>
              <div className={element.isReviewed  === "true" || (showPosIndex === index && stateUpdated === "true") ? styles.tooltipIsReviewed: styles.tooltip} >
                <p>POS Product- {showPosIndex === index ? showPosState.pos : element.posName }</p>
                <p>UPC- {showPosIndex === index ? showPosState.barcode : element.barcode}</p>
                <p>Size- {showPosIndex === index ? showPosState.size : element.size}</p>
                <p>Department - {showPosIndex === index ? showPosState.department : element.department}</p>
                <p>Unit Cost- {showPosIndex === index ? showPosState.unitCost : element.cost}</p> 
                <p>Unit Price- {showPosIndex === index ? showPosState.unitPrice : element.sellingPrice}</p>
                <div >
                <button onClick={ () => {
                            if(notFounds === "true"){
                              toggleModal();
                            }else{
                              updateItem(props, (parseFloat(element.unitPrice) / parseInt(element.pieces)).toFixed(2))
                            }
                          }
                        } 
                  disabled={showPosIndex === index ? false : true}
                  style={{backgroundColor: "green",
                  border: "none",
                  color: "white",
                  padding: "4px 8px",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "inline-block",
                  fontSize: "14px",
                  align: "left"}} >
                  Update Item
                </button>
                </div> 
              </div> */}
            </td>
            <td>
              {showPosIndex === index ? showPosState.posSku : element.posSku}
            </td>
            <td>
              <TextField
                type="tel"
                value={element.qty}
                id="outlined-secondary"
                variant="outlined"
                onChange={(e) => {
                  handleChange(index, "qty", e.target.value);
                }}
                style={{ width: 100 }}
              />
            </td>
            <td>
              <Autocomplete
                value={element.itemNo}
                onChange={(event, newValue) => {
                  if (newValue) {
                    handleChange(index, "itemNo", newValue);
                  }
                }}
                id="combo-box"
                options={itemNoDropdown}
                getOptionLabel={(option) => option}
                style={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </td>
            <td>
              <Autocomplete
                value={
                  showPosIndex === index ? showPosState.item : element.itemNo
                }
                onChange={(event, newValue) => {
                  if (newValue) {
                    let newState = { ...showPosState };
                    console.log(newValue);
                    // newState.item = newValue.name;
                    newState.item = element.itemNo;
                    newState.description = element.description;
                    newState.barcode = newValue.upc;
                    newState.pos = newValue.name;
                    newState.posSku = newValue.sku;
                    newState.size = newValue.size;
                    newState.department = newValue.department;
                    newState.unitCost = newValue.cost;
                    newState.unitPrice = newValue.price;
                    setShowPosState(newState);
                    setShowPosIndex(index);
                    setUnitCost(newValue.cost);
                    if (isEmpty) {
                      setNotFound("true");
                    }
                    //setDisabled(false);
                    //updateOnHoverDetails(index);
                    //setShowPosIndex(index);
                    // console.log(newValue);
                    // console.log(newState);
                    //console.log(showPosState);
                  }
                }}
                id="combo-box"
                disabled
                // options={element.fuzzSuggestion}
                options={hicksvilleData}
                getOptionLabel={(option) => option.label ?? element.itemNo}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </td>

            <td>{element.description}</td>
            {/* <td>{element.pieces}</td> */}
            <td>
              <TextField
                type="tel"
                value={element.pieces}
                variant="outlined"
                onChange={(e) => {
                  handleChange(index, "pieces", e.target.value);
                }}
                style={{ width: 100 }}
              />
            </td>
            <td>
              <TextField
                type="tel"
                value={element.unitPrice}
                variant="outlined"
                onChange={(e) => {
                  handleChange(index, "unitPrice", e.target.value);
                }}
                style={
                  // element.priceIncrease === 1
                  //   ? { backgroundColor: "#1a8cff", width: 100 }
                  //   : element.priceIncrease === -1
                  //   ? { backgroundColor: "#ffb31a", width: 100 }
                  //   : { width: 100 }
                  showPosIndex === index
                    ? costInc === "true"
                      ? { backgroundColor: "#1a8cff", width: 100 }
                      : costDec === "true"
                      ? { backgroundColor: "#ffb31a", width: 100 }
                      : { width: 100 }
                    : element.priceIncrease === 1
                    ? { backgroundColor: "#1a8cff", width: 100 }
                    : element.priceIncrease === -1
                    ? { backgroundColor: "#ffb31a", width: 100 }
                    : { width: 100 }
                }
              />
            </td>
            <td>{element.extendedPrice}</td>
            {/* <td>{element.cp}</td> */}
            <td>
              <TextField
                type="tel"
                value={element.cp}
                variant="outlined"
                onChange={(e) => {
                  handleChange(index, "cp", e.target.value);
                }}
                style={{ width: 100 }}
              />
            </td>
            <td>
              <TextField
                type="tel"
                value={element.sp}
                variant="outlined"
                onChange={(e) => {
                  handleChange(index, "sp", e.target.value);
                }}
                style={{ width: 100 }}
              />
            </td>
            <td>{element.markup}</td>
            {/* <td>
              <Checkbox
                checked={!element.show}
                onChange={(e) => handleChange(index, "show", e.target.value)}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </td> */}
            <td>
              <Button
                text={element.show ? "Delete" : "Undo"}
                color="btn btn-info"
                type="submit"
                onClick={() => deleteRow(index)}
              />
            </td>
            <td>
              <Button
                text="Update POS"
                color="btn btn-info"
                type="submit"
                onClick={() => pushSingleItemToInventory(index)}
                style={{ width: 120 }}
              />
            </td>
            <td>{index + 1}</td>
            {/* <td>
              <Button
                text={element.show ? "Delete" : "Undo"}
                color="btn btn-info"
                type="submit"
                onClick={() => deleteRow(index)}
              />
            </td> */}
          </tr>
        );
      });
      return (
        <div style={{ marginTop: "70px" }}>
          <div className={styles.divRow} style={{ marginTop: "80px" }}>
            <Button
              text="Save Invoice Data"
              color="btn btn-info"
              type="submit"
              onClick={toggleModal}
            />
            <Button
              text="Re upload"
              color="btn btn-info"
              type="submit"
              onClick={() => window.location.reload()}
            />
          </div>
          <table className="table table-hover table-responsive-sm">
            <tbody>
              <tr>{renderTableHeader()}</tr>
              {rows}
              <tr>
                <td>
                  <Button text="Add cell" color="btn btn-info" />
                </td>
              </tr>
            </tbody>
          </table>
          <div className={styles.divRow}>
            <Button
              text="Update Inventory"
              color="btn btn-info"
              type="submit"
            />
            <Button
              text="Save Invoice Data"
              color="btn btn-info"
              type="submit"
              onClick={toggleModal}
            />
            <Button
              text="Re upload"
              color="btn btn-info"
              type="submit"
              onClick={() => window.location.reload()}
            />
          </div>
        </div>
      );
    }
  };