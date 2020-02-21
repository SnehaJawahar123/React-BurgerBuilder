import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer'
import {connect} from 'react-redux'

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
                <Toolbar clicked={this.toggleClicked} isAuthenticated ={this.props.isAuthenticated}/>
                <Sidedrawer showSideDrawer={this.state.showSideDrawer}
                    close={this.sideDrawerClosed}
                    open={this.sideDrawerOpen} 
                    isAuthenticated ={this.props.isAuthenticated}/>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }

}

let mapStateToProps = state =>{
    return {
        isAuthenticated : state.auth.token !=null
    }
}


export default connect(mapStateToProps)(Layout)