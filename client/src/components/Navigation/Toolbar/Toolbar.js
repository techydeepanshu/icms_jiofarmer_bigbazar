import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SyncIcon from "@material-ui/icons/Sync";
import Button from "@material-ui/core/Button";

import NavigationItems from "../NavigationItems/NavigationItems";
import styles from "./Toolbar.module.css";
import { InventoryService } from "../../../services/InventoryService";

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import firebase from "../../../firebase";
const db = firebase.firestore();
const inventoryService = new InventoryService();

class Toolbar extends Component {
  render() {
    console.log("isAuthenticated", this.props.isAuthenticated);
    console.log("username", this.props.username);
    // const syncProductsWithPos = async ()=>{
    //   const result = await inventoryService.syncProductsWithPos();
    //   console.log("syncProductsWithPos : ",result)
    // }
    // db.collection("syncproducts").doc("HfgC3uFpnEg1Kjw6oKRW").onSnapshot((snapshot)=>{
    //   console.log("snapshot : ",snapshot.data())
    // })

    // console.log("userID : ",this.state.userId)
    return (
      <>
        <header className={styles.Toolbar}>
          <nav className={styles.DesktopOnly}>
            <NavigationItems isAuth={this.props.isAuthenticated} />
          </nav>
          {this.props.isAuthenticated ? (
            <nav className={styles.sync}>
              <Button
                variant="contained"
                color="default"
                // className={classes.button}
                startIcon={<SyncIcon />}
                onClick={async () => {
                  try {
                    db.collection("syncproducts")
                      .doc("HfgC3uFpnEg1Kjw6oKRW")
                      .set({ loader: true, error: false, workdone: false })
                      .then(() => {
                        console.log("Document successfully written!");
                      });

                    const result = await inventoryService.syncProductsWithPos();
                    console.log("syncProductsWithPos : ", result);

                    if (result.success === false) {
                      db.collection("syncproducts")
                        .doc("HfgC3uFpnEg1Kjw6oKRW")
                        .set({ loader: false, error: true, workdone: false })
                        .then(() => {
                          console.log("Document successfully written!");
                        });
                    } else if (result.success === true) {
                      db.collection("syncproducts")
                        .doc("HfgC3uFpnEg1Kjw6oKRW")
                        .set({ loader: false, error: false, workdone: true })
                        .then(() => {
                          console.log("Document successfully written!");
                        });
                    }
                  } catch (err) {
                    db.collection("syncproducts")
                      .doc("HfgC3uFpnEg1Kjw6oKRW")
                      .set({ loader: false, error: err, workdone: false })
                      .then(() => {
                        console.log("Document successfully written!");
                      });
                  }
                }}
              >
                Sync Products
              </Button>
            </nav>
          ) : null}
        </header>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.userId,
    username: state.userDetails.userEmail,
  };
};

export default connect(mapStateToProps)(Toolbar);
