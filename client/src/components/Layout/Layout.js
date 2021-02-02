import React, { Component } from 'react'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import styles from './Layout.module.css'
class Layout extends Component {
    render() {
        return (
            <div>
                <Toolbar/>
                <main className = {styles.main}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout;