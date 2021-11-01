import React, { useEffect, useState } from 'react'

import styles from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'
import CwIcon from "../../../Images/CwIcon.png"

const NavigationItems = (props) => {
    const [user, setUser] = useState(props.isAuth)
    useEffect(() => {
        setUser(props.isAuth)
        // console.log("User", user)
    }, [user])
    return (
      <ul className={styles.NavigationItems}>
        <img className={styles.logo} src={CwIcon} alt="" />
        {props.isAuth ? (
          <>
            <NavigationItem link="/logout">Logout</NavigationItem>
            {/* <NavigationItem link="/pos">Show Pos</NavigationItem> */}
            <NavigationItem link="/handwritten">Hand Written Invoices</NavigationItem>
            <NavigationItem link="/invoicedata">Invoice Data</NavigationItem>
            {/* <NavigationItem link="/inventory">Inventory</NavigationItem> */}
            <NavigationItem link="/invoice">Scan Invoice</NavigationItem>
            
          </>
        ) : null}
      </ul>
    );
};

export default NavigationItems;