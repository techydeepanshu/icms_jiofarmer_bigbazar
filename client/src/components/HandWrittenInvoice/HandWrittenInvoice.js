import React, { useEffect, useState } from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { Box, Grid } from "@material-ui/core";
import { dropdownOptions } from "../../utils/invoiceList";
import { makeStyles } from "@material-ui/core/styles";
import { InventoryService } from "../../services/InventoryService";
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CButton,
  CContainer,
  CCol,
  CRow,
  CFormGroup,
  CLabel,
  CInput,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react";

const useStyles = makeStyles({
    root: {
    width: "100%",
    paddingTop: 50,
    },
    container: {
        maxHeight: "80vh",
        marginTop: 10,
      },
      table: {
        "& thead th": {
          fontWeight: "600",
          fontSize: 20,
          backgroundColor: "grey",
        },
        "& tbody td": {
          fontWeight: "300",
        },
        "& tbody tr:hover": {
          backgroundColor: "#fffbf2",
          cursor: "pointer",
        },
      },
});

const HandwrittenInvoice = () => {
    const numOfCollections = dropdownOptions.length;
    const dropdownLabel = "Select Invoice("+   numOfCollections   + ")";
    const [invoice, setInvoice] = useState("");
    const classes = useStyles();
    const inventoryService = new InventoryService();
    const [options, setOptions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalLabel, setModalLabel] = useState("");
    const [posProduct, setPosProduct] = useState({
        itemName: "",
        item: "",
        quantity: "",
        description: "",
        price: "",
        pos: "",
        barcode: "",
        posSku: "",
        invoice: "",
        size: "",
        department: "",
        unitCost: "",
        unitPrice: "",
        newUnitCost: "",
        newUnitPrice: ""
    });

    let posProducts = []
    let wooComProducts = [];
    let singleItemData = [];
    let updateSku = "";


    const toggleModal = () => {
      console.log(posProduct);
      setShowModal(!showModal);
    };

    const handleChange = (key, val) => {
      setPosProduct({
        ...posProduct,
        [key]: val,
      });
    };

    const addProduct = () => {
      setShowModal(!showModal);
      console.log(posProduct);
      const data = {
        InvoiceName: invoice.slug,
        ItemName: posProduct.itemName,
        POS: posProduct.pos, 
        Barcode: posProduct.barcode, 
        PosSKU: posProduct.posSku, 
        Size: posProduct.size, 
        Department: posProduct.department,
        SellerCost: posProduct.unitCost,
        SellingPrice: posProduct.unitPrice,
        NewUnitCost: posProduct.newUnitCost,
        NewUnitPrice: posProduct.newUnitPrice
      };
      
      inventoryService
        .handwrittenLogs(data)
        .then((res) => {
          if (!res) {
            throw new Error("Product not created")
          }
          console.log(res);
          alert("Successfully updated fields");
        })
        .then()
        .catch((err) => {
          console.log(err);
          alert("Some error occuured in creating product");
        })
        .finally();
    };

    const hicksvilleDropdownNew = async (event, value, index) => {
      console.log(event);
      console.log(value);
      console.log(value.length);
      setOptions([]);

      if(!isNaN(value) && value.length>0 ){
        console.log("number");
        const res = await inventoryService.getHicksvilleData(value.toUpperCase());
        const data = res;
        console.log(data);


        let productsString = "";
        for(let i=0;i<data.length;i++){
          productsString = productsString + data[i].name + '$$$';
        } 
        let result = productsString.split("$$$");
      
        let newData = [];
        for (let i = 0; i < result.length; i++) {
          let s = result[i].split("@@@");
          let obj =
            {
              sku: s[1] === "nan" ? null : s[1],
              upc: s[0] === "nan" ? null : s[0],
              altupc1: s[14] === "nan" ? null : s[14],
              altupc2: s[15] === "nan" ? null : s[15],
              name: s[2] === "nan" ? null : s[2],
              vintage: s[8] === "nan" ? null : s[8],
              totalQty: s[13] === "nan" ? null : s[13],
              cost: s[4] === "nan" ? null : s[4],
              pricea: s[10] === "nan" ? null : s[10],
              priceb: s[11] === "nan" ? null : s[11],
              pricec: s[12] === "nan" ? null : s[12],
              department: s[9] === "nan" ? null : s[9],
              salePrice: s[5] === "nan" ? null : s[5],
              size: s[6] === "nan" ? null : s[6],
              pack: s[7] === "nan" ? null : s[7],
              price: s[3] === "nan" ? null : s[3],
            }
          newData.push(obj);
        }
        const filter = newData.map((element) => {
          let obj = { ...element };
          obj.label = `${element.name}--${element.price}--${element.upc}--${element.size}--${element.cost}--${element.sku}`;
          //console.log(obj);
          return obj; 
        });
        setOptions(filter);

      }

      if(isNaN(value) && value != null && value.length>=4){
        console.log("string");
        // setDropdownLoader(true);
        // setFetchingOptions(true);
        const res = await inventoryService.getHicksvilleData(value.toUpperCase());
        const data = res;
        console.log(data);


        let productsString = "";
        for(let i=0;i<data.length;i++){
          productsString = productsString + data[i].name + '$$$';
        } 
        let result = productsString.split("$$$");
      
        let newData = [];
        for (let i = 0; i < result.length; i++) {
          let s = result[i].split("@@@");
          let obj =
            {
              sku: s[1] === "nan" ? null : s[1],
              upc: s[0] === "nan" ? null : s[0],
              altupc1: s[14] === "nan" ? null : s[14],
              altupc2: s[15] === "nan" ? null : s[15],
              name: s[2] === "nan" ? null : s[2],
              vintage: s[8] === "nan" ? null : s[8],
              totalQty: s[13] === "nan" ? null : s[13],
              cost: s[4] === "nan" ? null : s[4],
              pricea: s[10] === "nan" ? null : s[10],
              priceb: s[11] === "nan" ? null : s[11],
              pricec: s[12] === "nan" ? null : s[12],
              department: s[9] === "nan" ? null : s[9],
              salePrice: s[5] === "nan" ? null : s[5],
              size: s[6] === "nan" ? null : s[6],
              pack: s[7] === "nan" ? null : s[7],
              price: s[3] === "nan" ? null : s[3],
            }
          newData.push(obj);
        }
        const filter = newData.map((element) => {
          let obj = { ...element };
          if(element.itemNo != "undefined"){
          obj.label = `${element.name}--${element.price}--${element.upc}--${element.size}--${element.cost}--${element.sku}`;
          }
          //console.log(obj);
          return obj; 
        });
        setOptions(filter);
      }
    }
    
    return (

        <div className="container-fluid">
            <Paper className={classes.root}>
                <Grid style={{ display: "flex" }}>
                    <ul>
                    <li>
                    <Autocomplete
                        value={invoice}
                        onChange={(event, newValue) => {
                            console.log("new value", newValue)
                            if (newValue) {
                            setInvoice(newValue);
                            }
                            // getInvoices(newValue);
                        }}
                        id="combo-box"
                        options={dropdownOptions}
                        getOptionLabel={(option) => option.value}
                        style={{ width: 250 }}
                        autoHighlight
                        renderInput={(params) => (
                            <TextField {...params} label={dropdownLabel} variant="outlined" />
                        )}
                    />
                  </li>
                  <br />

                  <li>
                  <TextField
                        label="Item Name"
                        variant="outlined"
                        value={posProduct.itemName}
                        onChange={(event) =>
                          handleChange("itemName", event.target.value)
                        }
                    />
                  </li>
                  <br />
                <li>
                <Autocomplete
                    value={posProduct.pos}
                    loading={true}
                    onInputChange={(event, value) => {
                      console.log("ON INPUT CHANGE");
                      // event.toLowerCase();
                      // value.toLowerCase();
                      // console.log(event.target.value);
                      // console.log(value);
                      // searchDropdown(event, value);
                      // setOptions([]);
                      if(event != null){
                        setTimeout(()=> {
                          hicksvilleDropdownNew(event, value);

                        }, 1500);
                      }
                      // hicksvilleDropdownNew(event, value, index);
                    }}
                    onChange={(event, newValue) => {
                      // console.log(event.target.value);
                      // console.log(newValue);
                      if (newValue) {
                        let newState = { ...posProduct };
                        console.log(newValue);
                        newState.item = newValue.name;
                        // newState.item = element.itemNo
                        newState.description = newValue.name;
                        newState.barcode = newValue.upc;
                        newState.pos = newValue.name;
                        newState.posSku = newValue.sku;
                        newState.size = newValue.size;
                        newState.department = newValue.department;
                        newState.unitCost = newValue.cost;
                        newState.unitPrice = newValue.price;
                        // setShowPosState(newState);
                        // setShowPosIndex(index);
                        // setUnitCost(newValue.cost);
                        // setStateUpdated("");
                        setPosProduct(newState);
                        singleItemData = []
                        
                        //setDisabled(false);
                        //updateOnHoverDetails(index);
                        //setShowPosIndex(index);
                        // console.log(newValue);
                        console.log(newState);
                        //console.log(showPosState);
                        toggleModal();
                        
                      }
                    }}
                    id="combo-box"
                    // options={element.fuzzSuggestion}
                    options={options}
                    // getOptionLabel={option => option.label}
                    getOptionLabel={(option) => option.label ?? posProduct.item}
                    // getOptionLabel={(option) => dropdownLoader ? <Spinner /> : option.label}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="POS Product" variant="outlined" />
                    )}
                  />
                  </li >
                  </ul>
                    </Grid>
            </Paper>

            <CModal show={showModal} onClose={toggleModal}>
        <CModalHeader closeButton>{modalLabel}</CModalHeader>
        <CModalBody>
          <CContainer fluid>
            <CRow>
              <CCol sm="12">
                <CRow>
                  <CCol sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="type">Barcode</CLabel>
                      <CInput 
                        disabled
                        type="text"
                        name="type"
                        value={posProduct.barcode}
                        onChange={(event) =>
                          handleChange("barcode", event.target.value)
                        }
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="short_description">POS SKU</CLabel>
                      <CInput
                        disabled
                        type="text"
                        name="short_description"
                        value={posProduct.posSku}
                        onChange={(event) =>
                          handleChange("posSku", event.target.value)
                        }
                      />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CFormGroup>
                  <CLabel htmlFor="regular_price">POS Name</CLabel>
                  <CInput
                    disabled
                    type="text"
                    name="regular_price"
                    value={posProduct.pos}
                    onChange={(event) =>
                      handleChange("pos", event.target.value)
                    }
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="size">POS Size</CLabel>
                  <CInput
                    disabled
                    type="text"
                    name="size"
                    value={posProduct.size}
                    onChange={(event) =>
                      handleChange("size", event.target.value)
                    }
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="department">Department</CLabel>
                  <CInput
                    disabled
                    type="text"
                    name="department"
                    value={posProduct.department}
                    onChange={(event) =>
                      handleChange("department", event.target.value)
                    }
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="unitPrice">POS Unit Price</CLabel>
                  <CInput
                    disabled
                    type="text"
                    name="unitPrice"
                    value={posProduct.unitPrice}
                    onChange={(event) =>
                      handleChange("unitPrice", event.target.value)
                    }
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="unitCost">POS Unit Cost</CLabel>
                  <CInput
                    disabled
                    type="text"
                    name="unitCost"
                    value={posProduct.unitCost}
                    onChange={(event) =>
                      handleChange("unitCost", event.target.value)
                    }
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="newUnitCost">New POS Unit Cost</CLabel>
                  <CInput
                    type="text"
                    name="newUnitCost"
                    value={posProduct.newUnitCost}
                    onChange={(event) =>
                      handleChange("newUnitCost", event.target.value)
                    }
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="newUnitPrice">New POS Unit Price</CLabel>
                  <CInput
                    type="text"
                    name="newUnitPrice"
                    value={posProduct.newUnitPrice}
                    onChange={(event) =>
                      handleChange("newUnitPrice", event.target.value)
                    }
                  />
                </CFormGroup>
              </CCol>
            </CRow>
          </CContainer>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => addProduct()}>
            Add
          </CButton>{" "}
          <CButton color="secondary" onClick={toggleModal}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
        </div>    
    )
}

export default HandwrittenInvoice;