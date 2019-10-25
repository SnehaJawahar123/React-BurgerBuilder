import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer'

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosed = () => {
        this.setState({ showSideDrawer: false })
    }

    sideDrawerOpen = () => {
        this.setState({ showSideDrawer: true })
    }

    toggleClicked =()=>{
        this.setState((prevState)=>{
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar clicked={this.toggleClicked}/>
                <Sidedrawer showSideDrawer={this.state.showSideDrawer}
                    close={this.sideDrawerClosed}
                    open={this.sideDrawerOpen} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }

}


export default Layout