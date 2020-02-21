import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import { Col, Form, FormGroup, Label, Input} from 'reactstrap';
import {connect} from 'react-redux'
import * as orderActions from '../../../store/actions'
import withErrorHandler from '../../../hoc/withErrorHandler'


class ContactData extends Component {
    state = {
        orderPostData:{
            name: '',
            email: '',
            address: {
                street: '',
                pincode: ''
            }
        },
        loading: false,
        pinValidity: '',
    }

    onChangeHandler =(event)=>{
        let statusCopy = Object.assign({}, this.state.orderPostData)
        if(['name','email'].indexOf(event.target.name) < 0) statusCopy.address[event.target.name] = event.target.value;
        else statusCopy[event.target.name] = event.target.value;
        this.setState({orderPostData : statusCopy})
    }

    orderHandler = (event) => {
        event.preventDefault();
        // console.log('check here' + this.props.ingredients.salad)

        // this.setState({ loading: true })
        let data = {
            customer: this.state.orderPostData,
            ingredients: this.props.ing,
            price: this.props.cost,
            userId: this.props.userId
        }

        this.props.onOrderHandle(data, this.props.token)
        // console.log("order data",data)
        // axios.post('orders.json', data)
        //     .then(response => {
        //         console.log(response)
        //         this.setState({ loading: false })
        //         this.props.history.push('/')
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         this.setState({ loading: false })
        //     })
    }

    render() {

        let formStrap =(
            <Form onSubmit={this.orderHandler}>
                <FormGroup row>
                    <Label for='fname' sm={3}>Name</Label>
                    <Col sm={7}>
                        <Input type='text' name='name' id='fname' onChange={this.onChangeHandler} placeholder='Enter your name here' required/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for='femail' sm={3}>Email</Label>
                    <Col sm={7}>
                        <Input type='email' name='email' id='femail' onChange={this.onChangeHandler} placeholder='Enter your email' required/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for='fstreet' sm={3}>Street</Label>
                    <Col sm={7}>
                        <Input type='text' name='street' id='fstreet' onChange={this.onChangeHandler} placeholder='Enter your Street'required/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for='fpin' sm={3}>Pin Code</Label>
                    <Col sm={7}>
                        <Input type='number' name='pincode' id='fpin' onChange={this.onChangeHandler} placeholder='Enter your ZIP CODE' required/>
                    </Col>
                </FormGroup>
                <FormGroup row> 
                    <Button btnType='Success'>ORDER</Button>
                </FormGroup>
            </Form>

        )

        let form = (<form className={classes.inputStyle}>
            <input type='text' name='name' placeholder='Your Name' />
            <input type='email' name='email' placeholder='Your email' />
            <input type='text' name='street' placeholder='Your street' />
            <input type='text' name='pin' placeholder='Your pincode' />
            <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
        </form>)

        if (this.props.loading) {
            formStrap = <Spinner />
        }

        return (

            <div className={classes.ContactData}>
                <h4>Enter your Contact Details</h4><br/>
                {formStrap}
            </div>
        )
    }

}

const mapStatetoProps=state=>{
    return{
        ing: state.burgerBuilder.ingredients,
        cost: state.burgerBuilder.price,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchtoProps = dispatch =>{
    return{
        onOrderHandle : (orderData, token) => dispatch(orderActions.orderBurger(orderData, token))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(ContactData, axios))