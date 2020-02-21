import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import * as actions from '../../store/actions/index' 

class Logout extends Component {

    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return <Redirect to='/' />
    }
}

let mapDispatchtoProps = dispatch => {
    return {
        onLogout : () => dispatch(actions.logoutUser())
    }
}

export default connect(null, mapDispatchtoProps)(Logout)