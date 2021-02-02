import React, { Component } from 'react'
import { connect } from 'react-redux'

import NavigationItems from '../NavigationItems/NavigationItems'
import styles from './Toolbar.module.css'
class Toolbar extends Component {
    render() {
        console.log("isAuthenticated", this.props.isAuthenticated)
        return (
            <header className = {styles.Toolbar}>
                <nav className = {styles.DesktopOnly}>
                    <NavigationItems isAuth = {this.props.isAuthenticated}/>
                </nav>

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