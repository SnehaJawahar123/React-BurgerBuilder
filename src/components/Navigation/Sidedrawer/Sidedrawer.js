import React from 'react'
import classes from './Sidedrawer.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sidedrawer = (props) => {

    let attachedClasses = [classes.Sidedrawer, classes.Close];
    if(props.showSideDrawer){
        attachedClasses = [classes.Sidedrawer, classes.Open];
    }

    return (
        <React.Fragment>
            <Backdrop showModal={props.showSideDrawer}
                close={props.close}
                open={props.open} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </React.Fragment>
    )
}
export default sidedrawer