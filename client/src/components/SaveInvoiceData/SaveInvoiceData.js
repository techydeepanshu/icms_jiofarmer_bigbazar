import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { dropdownOptions } from "../../utils/invoiceList";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Paper from "@material-ui/core/Paper";
import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TesseractService } from "../../services/TesseractService";

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

const SaveInvoiceData = () => {

    const tesseractService = new TesseractService();

    const classes = useStyles();
    const [date, setDate] = useState("7/09/2021 ");
    const [invoice, setInvoice] = useState(dropdownOptions[0]);
    const [invoiceNo, setInvoiceNo] = useState("");

    const numOfCollections = dropdownOptions.length;
    const dropdownLabel = "Select Invoice("+   numOfCollections   + ")";

    const onGo = async() => {
        const data =  await tesseractService.GetSavedInvoiceData(invoice.slug, date);
        console.log(data);

    }

    return(
        <Paper className={classes.root}>
            <Grid style={{ display: "flex" }}>
                <Autocomplete
                    value={invoice}
                    onChange={(event, newValue) => {
                        // console.log("new value", newValue)
                        if (newValue) {
                        setInvoice(newValue);
                        }
                    }}
                    id="combo-box"
                    options={dropdownOptions}
                    getOptionLabel={(option) => option.value}
                    style={{ width: 300 }}
                    autoHighlight
                    renderInput={(params) => (
                        <TextField {...params} label={dropdownLabel} variant="outlined" />
                    )}
                />
                <TextField
                    label="Invoice No."
                    variant="outlined"
                    value={invoiceNo}
                    style={{ marginLeft: 20 }}
                    onChange={(e) => setInvoiceNo(e.target.value)}
                />
                <TextField
                    id="date"
                    label="Date"
                    type="date"
                    value={date}
                    style={{ marginLeft: 20 }}          
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(event) => setDate(event.target.value)}          
                />
                <button  style={{backgroundColor: "green",
                    border: "none",
                    color: "white",
                    padding: "4px 8px",
                    textAlign: "center",
                    textDecoration: "none",
                    display: "inline-block",
                    fontSize: "14px",
                    align: "left",
                    marginLeft: 20}}
                    onClick={onGo}>
                        Fetch Invoice Data
                </button>
            </Grid>
        </Paper>

    );
}
export default SaveInvoiceData;