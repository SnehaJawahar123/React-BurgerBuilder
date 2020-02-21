import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import style from './Auth.module.css'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner'

class Auth extends Component {

    state = {
        email: '',
        password: '',
        isSignUp: true
    }

    onChangeHandler = event => {
        console.log(event.target.name + '' + event.target.value)
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmitHandler =  (event) => {
        event.preventDefault();
         this.props.onAuth(this.state.email, this.state.password, this.state.isSignUp, (data)=>{
             if(data.error && !data.error.response) this.props.history.push(this.props.redirectPath)
         })
        // if (!this.props.error) this.props.history.push(this.props.redirectPath)
    }

    switchSignUpHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        })
    }

    render() {

        let data = (
            <Form >
                <Form.Group>
                    <Form.Label>Email ID</Form.Label>
                    <Form.Control name='email' type='email' onChange={this.onChangeHandler} value={this.state.email} placeholder='Enter your Email'></Form.Control>
                    <Form.Control.Feedback type="invalid">It is invalid</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type='password' onChange={this.onChangeHandler} value={this.state.password} placeholder='Enter your password'></Form.Control>
                </Form.Group>
                <Button variant='primary' type='submit' onClick={this.onSubmitHandler}>Submit</Button> <span></span>
                <Button variant='danger' onClick={this.switchSignUpHandler}>Switch to {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
            </Form>
        )

        if (this.props.loading) data = <Spinner />

        let errorMessage = null
        if (this.props.error && this.props.error.response) errorMessage = this.props.error.response.data.error.message


        return (
            <>
                <div className={style.Closed}>
                    <p>{errorMessage}</p>
                    {data}
                </div>
            </>
        )
    }
}

let mapStatetoProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        redirectPath: state.auth.redirectPath
    }
}

let mapDispatchtoProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp, cb) => dispatch(actions.auth(email, password, isSignUp, cb))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Auth)