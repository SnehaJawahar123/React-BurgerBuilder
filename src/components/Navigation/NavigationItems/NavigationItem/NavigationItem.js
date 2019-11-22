import React from 'react'
import classes from './NavigationItem.module.css'
import {NavLink} from 'react-router-dom'

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink exact={props.exact} to={props.link} activeClassName={classes.active} >{props.children}</NavLink> {/*Active class name used will not apply here because we use css modules and it will change the css name, hence change the activeClassName */}
        {/* <a href={props.link}
         className={props.active ? classes.active : null}>{props.children}</a> */}
    </li>
)

export default navigationItem