import { CRow, CCol, CDataTable } from "@coreui/react";
import { InventoryService } from "../../services/InventoryService";
import Spinner from "../../UI/Spinner/Spinner";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Box, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";

const columns = [
  { id: "upc", label: "UPC" },
  { id: "sku", label: "SKU" },
  { id: "itemName", label: "Item Name" },
  { id: "cost", label: "Cost" },
  { id: "price", label: "Price" },
  { id: "currentStockQuantity", label: "Current Stock Quantity" },
  { id: "posSoldQuantity", label: "POS Sold Quantity" },
  { id: "wordpressSoldQty", label: "Wordpress Sold Qty." },
  { id: "OnHand", label: "On Hand"},
];

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

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const inventoryService = new InventoryService();
  const [products, setProducts] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const [searchVal, setSearchVal] = React.useState("");
  const [startDate, setStartDate] = React.useState("20-July-2021");
  const [endDate, setEndDate] = React.useState("22-July-2021");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const changeDateFormat = (date) => {
    let defaultDate = new Date(date);
    let month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"][defaultDate.getMonth()];
    let formattedDate = defaultDate.getDate()+"-"+month+"-"+defaultDate.getFullYear();
    return formattedDate;
  }

  const onGo = () => {
    console.log(startDate);
    console.log(endDate);
    const options = {
      method: "GET",
      headers:{
        UserId: "lRRqlkYefuV=",
        Password: "lRRqlkYefuV6jJ==",
        Pin: "qzOUsBmZFgMDlwGtrgYypxUz",
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body:{
        STARTDATE: startDate,
        ENDDATE: endDate
      },
      json: true,
    }    
    const dateObj = {startDate: startDate, endDate: endDate};
    try {
      setLoader(true);
      const res = Axios.get("https://dataservices.sypramsoftware.com/api/Product/GetSoldItemList",options)
                    .then(response => {return response});
      const data = res.map((item) => {
        const {
          UPC,
          SKU,
          //ItemName,
          ITEMNAME,
          //Price,
          PRICEPERUNIT,
          Cost,
          TotalQty,
          //soldQty,
          QuantitySold,
          wordpressSoldQty,
          OnHand
        } = item;
        return {
          upc: UPC,
          itemName: ITEMNAME,
          cost: Cost,
          price: PRICEPERUNIT,
          sku: SKU,
          currentStockQuantity: TotalQty,
          posSoldQuantity: QuantitySold,
          wordpressSoldQty,
          OnHand: OnHand
        };
      });

      setProducts(data);
    } catch (error) {
      alert("Couldn't sync inventory", error);
    } finally {
      setLoader(false);
    }
  }

  const getProducts = async () => {
    try {
      setLoader(true);
      const res = await inventoryService.SyncInventory();
      const data = res.map((item) => {
        const {
          UPC,
          SKU,
          ItemName,
          Price,
          Cost,
          TotalQty,
          soldQty,
          wordpressSoldQty,
        } = item;
        return {
          upc: UPC,
          itemName: ItemName,
          cost: Cost,
          price: Price,
          sku: SKU,
          currentStockQuantity: TotalQty,
          posSoldQuantity: soldQty,
          wordpressSoldQty,
        };
      });
      setProducts(data);
      alert("Sync complete");
    } catch (error) {
      alert("Couldn't sync inventory", error);
    } finally {
      setLoader(false);
    }
  };

  React.useEffect(() => {
    async function getInitialSyncedData() {
      try {
        setLoader(true);
        const res = await inventoryService.getInitialSyncedData();
        const data = res.map((item) => {
          const {
            UPC,
            SKU,
            //ItemName,
            ITEMNAME,
            //Price,
            PRICEPERUNIT,
            Cost,
            TotalQty,
            //soldQty,
            QuantitySold,
            wordpressSoldQty,
            OnHand
          } = item;
          return {
            upc: UPC,
            itemName: ITEMNAME,
            cost: Cost,
            price: PRICEPERUNIT,
            sku: SKU,
            currentStockQuantity: TotalQty,
            posSoldQuantity: QuantitySold,
            wordpressSoldQty,
            OnHand: OnHand
          };
        });

        setProducts(data);
      } catch (error) {
        alert("Couldn't sync inventory", error);
      } finally {
        setLoader(false);
      }
    }
    console.log(startDate, endDate);
    getInitialSyncedData();
  }, []);

  if (loader) {
    return <Spinner />;
  }
  return (
    <Paper className={classes.root}>
      <Grid style={{ display: "flex" }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchVal}
          style={{ marginLeft: 20 }}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <TextField
          id="date"
          label="Start Date"
          type="date"
          value={startDate}
          style={{ marginLeft: 20 }}          
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => setStartDate(event.target.value)}          
        />
        <TextField
          id="date"
          label="End Date"
          type="date"
          value={endDate}
          style={{ marginLeft: 20 }}          
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => setEndDate(event.target.value)}
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
          onClick={() => onGo()}>
            Go!
          </button>

        <Box style={{ flexGrow: 1 }} />
        <CCol sm="1">
          <button className="btn btn-lg btn-info" onClick={() => getProducts()}>
            Sync
          </button>
        </CCol>
      </Grid>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .filter((item) => {
                if (searchVal) {
                  if (item.itemName.toLowerCase().includes(searchVal)) {
                    return item;
                  } else {
                    return null;
                  }
                }
                return item;
              })
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" key={row.upc}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[100, 200, 500]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
