import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SyncIcon from '@material-ui/icons/Sync';
import Button from '@material-ui/core/Button';

import NavigationItems from "../NavigationItems/NavigationItems";
import styles from "./Toolbar.module.css";
class Toolbar extends Component {
  render() {
    // console.log("isAuthenticated", this.props.isAuthenticated)
    return (
      <header className={styles.Toolbar}>
        <nav className={styles.DesktopOnly}>
          <NavigationItems isAuth={this.props.isAuthenticated} />
        </nav>
        <nav className={styles.sync}>
          <Button
            variant="contained"
            color="default"
            // className={classes.button}
            startIcon={<SyncIcon />}
          >
            Sync Products
          </Button>
        </nav>
      </header>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.userId,
  };
};

export default connect(mapStateToProps)(Toolbar);
