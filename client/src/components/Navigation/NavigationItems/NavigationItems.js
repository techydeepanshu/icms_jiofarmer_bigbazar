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
            <img className={styles.logo}  src={CwIcon} alt=""/>
            {props.isAuth?
                <>
                    <NavigationItem link = "/logout">Logout</NavigationItem>
                    <NavigationItem  link="/queue">Show Queue</NavigationItem>
                    <NavigationItem  link="/pos">Show Pos</NavigationItem>
                </>
            :null}
        </ul>
    )
};

export default NavigationItems;