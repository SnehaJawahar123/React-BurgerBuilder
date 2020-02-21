import React, { Component } from 'react'
import Modal from '../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }


        //Imp: If this was within componentDidMount then it will get rendered only after all the child components get rendered
      // initialization gets called before render or Compdidmount
            // Everytime a req is passed we clear out the error
             reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req;
            })

            //When response is recvd we set it if there is an error
             resInterceptor = axios.interceptors.response.use(res=> res, error => {
                this.setState({ error: error })
            })
        
            componentWillUnmount(){
                console.log('unmount', this.reqInterceptor,  this.resInterceptor)
                axios.interceptors.request.eject(this.reqInterceptor);
                axios.interceptors.response.eject(this.resInterceptor);
            }

        errorConfirmedHandler =()=>{
            this.setState({error:null})
        }


        render() {
            return (
                <React.Fragment>
                    <Modal showModal={this.state.error}
                        close={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            )
        }
    }
}

export default withErrorHandler