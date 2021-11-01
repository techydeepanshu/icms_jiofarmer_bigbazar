import React, { useEffect, useState } from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { Box, Grid } from "@material-ui/core";
import { dropdownOptions } from "../../utils/invoiceList";
import { makeStyles } from "@material-ui/core/styles";

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

const HandWrittenInvoice = () => {
    const numOfCollections = dropdownOptions.length;
    const dropdownLabel = "Select Invoice("+   numOfCollections   + ")";
    const [invoice, setInvoice] = useState("");
    const classes = useStyles();
    const [posProduct, setPosProduct] = useState({
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
    });
    
    return (

        <div className="container-fluid">
            <Paper className={classes.root}>
                <Grid style={{ display: "flex" }}>
                    <Autocomplete
                        value={invoice}
                        onChange={(event, newValue) => {
                            // console.log("new value", newValue)
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

                {/* <Autocomplete
                    value={posProduct.item  }
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
                          hicksvilleDropdownNew(event, value, index);

                        }, 1500);
                      }
                      // hicksvilleDropdownNew(event, value, index);
                    }}
                    onChange={(event, newValue) => {
                      // console.log(event.target.value);
                      // console.log(newValue);
                      if (newValue) {
                        let newState = { ...showPosState };
                        console.log(newValue);
                        // newState.item = newValue.name;
                        newState.item = element.itemNo
                        newState.description = newValue.name;
                        newState.barcode = newValue.upc;
                        newState.pos = newValue.name;
                        newState.posSku = newValue.sku;
                        newState.size = newValue.size;
                        newState.department = newValue.department;
                        newState.unitCost = newValue.cost;
                        newState.unitPrice = newValue.price;
                        // setShowPosState(newState);
                        setShowPosIndex(index);
                        setUnitCost(newValue.cost);
                        // setStateUpdated("");
                        
                        //setDisabled(false);
                        //updateOnHoverDetails(index);
                        //setShowPosIndex(index);
                        // console.log(newValue);
                        console.log(newState);
                        //console.log(showPosState);
                        
                      }
                    }}
                    id="combo-box"
                    // options={element.fuzzSuggestion}
                    options={options}
                    // getOptionLabel={option => option.label}
                    getOptionLabel={(option) => option.label ?? element.itemNo}
                    // getOptionLabel={(option) => dropdownLoader ? <Spinner /> : option.label}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  /> */}
                    </Grid>
            </Paper>
        </div>    
    )
}

export default HandWrittenInvoice;