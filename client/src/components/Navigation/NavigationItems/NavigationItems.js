import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import CwIcon from "../../../Images/CwIcon.png";
import { ToastContainer, toast } from "react-toastify";
import { css } from "@emotion/react";
import MoonLoader from "react-spinners/MoonLoader";
import firebase from "../../../firebase";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const db = firebase.firestore();
const NavigationItems = (props) => {
  const [user, setUser] = useState(props.isAuth);
  const [loader, setLoader] = useState(false);
  const [error,setError] = useState();
  const [workdone,setWorkdone] = useState();
  useEffect(() => {
    setUser(props.isAuth);
    // console.log("User", user)
  }, [user]);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();

  const handleClose = (event, reason) => {
    db.collection("syncproducts")
                    .doc("IBZundn6ANloUUUeVnSP")
                    .set({ loader: false, error: false,workdone:false })
                    .then(() => {
                      console.log("Document successfully written!");
                    })
  };
  const handleClosWorkdone = (event, reason) => {
    db.collection("syncproducts")
                    .doc("IBZundn6ANloUUUeVnSP")
                    .set({ loader: false, error: false,workdone:false })
                    .then(() => {
                      console.log("Document successfully written!");
                    })
  };

  db.collection("syncproducts")
    .doc("IBZundn6ANloUUUeVnSP")
    .onSnapshot((snapshot) => {
      console.log("snapshot : ", snapshot);
      console.log("snapshot data: ", snapshot.data());
      let data = snapshot.data();

      setLoader(data.loader);
      
      setError(data.error)
      setWorkdone(data.workdone)
      // if(data.error!==""){
      //   setError(true);
      // }
      
    });
 
    
    console.log("error state : ",error)
  
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const loadercss = {
    position: "absolute",
    marginTop: "46rem",
    marginLeft: "-2rem",
    background: "#ffffffc7",
    padding: "24rem",
    zIndex: 1,
    width: "101vw",
  };

  return (
    <>
      <ul className={styles.NavigationItems}>
        <img className={styles.logo} src={CwIcon} alt="" />
        {props.isAuth ? (
          <>
            <NavigationItem link="/logout">Logout</NavigationItem>
            {/* <NavigationItem link="/pos">Show Pos</NavigationItem> */}
            <NavigationItem link="/handwritten">
              Hand Written Invoices
            </NavigationItem>
            <NavigationItem link="/invoicedata">Invoice Data</NavigationItem>
            {/* <NavigationItem link="/inventory">Inventory</NavigationItem> */}
            <NavigationItem link="/invoice">Scan Invoice</NavigationItem>

            {loader ? (
              <div style={loadercss}>
                <MoonLoader
                  color={"#42a5f5"}
                  loading={true}
                  css={override}
                  size={100}
                />
                <div style={{textAlign:"center",margin:"20px"}}>
                  <h4>Products Syncing...</h4>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        ) : null}
      </ul>
      <div className={classes.root}>
      <Snackbar open={error} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Some Error Occerred !
        </Alert>
      </Snackbar>
      <Snackbar open={workdone} onClose={handleClose}>
        <Alert onClose={handleClosWorkdone} severity="success">
          Products Sync Successfully
        </Alert>
      </Snackbar>
      </div>
      <ToastContainer limit={1}/>
    </>
  );
};

export default NavigationItems;
