import React,{Component} from 'react'
import classes from './Modal.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

class Modal extends Component{

    shouldComponentUpdate(nextProps, nextState){
        console.log('should update? ',nextProps.showModal !== this.props.showModal )
        return nextProps.showModal !== this.props.showModal || nextProps.children !== this.props.children
    }

    componentDidUpdate(){
        console.log('model update')
    }


    render(){
        var modalView = null;
        if (this.props.showModal) {
            modalView = (
                <div className={classes.Modal}>
                    {this.props.children}
                </div>
            )
        }
    
        return (
            <React.Fragment>
            <Backdrop showModal={this.props.showModal} close={this.props.close}/>
             {modalView}
             </React.Fragment>
        )
    }
    }
    

export default Modal