import React, { Component } from 'react'
import { connect } from 'react-redux';
import Grid from '@material-ui/core/grid'

import NavigationItems from '../NavigationItems/NavigationItems'
import styles from './Toolbar.module.css'
class Toolbar extends Component {
    render() {
        // console.log("isAuthenticated", this.props.isAuthenticated)
        return (
            <header className = {styles.Toolbar}>
                <nav className = {styles.DesktopOnly}>
                    <NavigationItems isAuth = {this.props.isAuthenticated}/>
                </nav>
                <div>
                {/* <p style={{fontSize: "8px"}}><strong>Colors and Description</strong></p> */}
                <Grid container 
                // rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
 
 
                    <Grid item xs={6}>
                    <table>
                    <tbody>
                        <tr style={{height: "12px"}}> 
                        <td style={{display: "flex",
                            width: "10px",
                            height: "10px",
                            backgroundColor: "violet",
                            borderRadius: "50%",
                            }}></td>
                            {/* <td style={{width: "0.25px", height: "0.25px", margin: "0px 0px 0px 0px"}}></td> */}
                        <td ><p style={{fontSize: "10px",width: "100%", color: "white", margin: "0 0 0 0 "}}>Product has been linked(on hovering).</p></td>
                        </tr>
                        <tr style={{height: "12px"}}> 
                        <td style={{display: "flex",
                            width: "10px",
                            height: "10px",
                            backgroundColor: "lightgreen",
                            borderRadius: "50%",
                            }}></td>
                            {/* <td style={{width: "0.25px", height: "0.25px", margin: "0px 0px 0px 0px"}}></td> */}
                        <td ><p style={{fontSize: "10px",width: "100%", color: "white", margin: "0 0 0 0 "}}>Product has been updated on POS.</p></td>
                        </tr>
                        <tr style={{height: "12px"}}> 
                        <td style={{display: "flex",
                            width: "10px",
                            height: "10px",
                            backgroundColor: "lightyellow",
                            borderRadius: "50%",
                            }}></td>
                            {/* <td style={{width: "0.25px", height: "0.25px", margin: "0px 0px 0px 0px"}}></td> */}
                        <td ><p style={{fontSize: "10px",width: "100%", color: "white", margin: "0 0 0 0 "}}>Product has not been linked(on hovering).</p></td>
                        </tr>
                        </tbody>
                </table>
                            



                    </Grid>
                    
                    
                    
                    <Grid item xs={6}>
                    <table>
                    <tbody>
                        <tr style={{height: "12px"}}> 
                        <td style={{display: "flex",
                            width: "10px",
                            height: "10px",
                            backgroundColor: "brown",
                            borderRadius: "50%",
                            }}></td>
                            {/* <td style={{width: "0.25px", height: "0.25px", margin: "0px 0px 0px 0px"}}></td> */}
                        <td ><p style={{fontSize: "10px",width: "100%", color: "white", margin: "0 0 0 0 "}}>Product is free.</p></td>
                        </tr>
                        <tr style={{height: "12px"}}> 
                        <td style={{display: "flex",
                            width: "10px",
                            height: "10px",
                            backgroundColor: "blue",
                            borderRadius: "50%",
                            }}></td>
                            {/* <td style={{width: "0.25px", height: "0.25px", margin: "0px 0px 0px 0px"}}></td> */}
                        <td ><p style={{fontSize: "10px",width: "100%", color: "white", margin: "0 0 0 0 "}}>Invoice Unit Cost is greater </p></td>
                        </tr>
                        <tr style={{height: "12px"}}> 
                        <td style={{display: "flex",
                            width: "10px",
                            height: "10px",
                            backgroundColor: "yellow",
                            borderRadius: "50%",
                            }}></td>
                            {/* <td style={{width: "0.25px", height: "0.25px", margin: "0px 0px 0px 0px"}}></td> */}
                        <td ><p style={{fontSize: "10px",width: "100%", color: "white", margin: "0 0 0 0 "}}>Invoice Unit Cost is lesser than linked product.</p></td>
                        </tr>
                        </tbody>
                </table>
                        


                    </Grid>
 
                </Grid>
                </div>

                
                

            </header>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.userId
    }
}

export default connect(mapStateToProps)(Toolbar);