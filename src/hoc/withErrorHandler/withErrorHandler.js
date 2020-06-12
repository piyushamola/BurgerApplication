import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxj/Aux';

const withErrorHandler = (WrrapedComponent, axios) => {
    return class extends Component {
        state = {
            error:null
         }
        componentWillMount() {  // component will mount called before child componeent render so that intercepteros be set before calling child component and also you should place this code in the constructor
           this.reqInterceptor =  axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            }, error => {
                this.setState({error: error})
            })

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                console.log(error);
                this.setState({error:error});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        removeErrorHandler = () => {
            this.setState({error:null});
        }

        render()
        {
            return (
                <Aux>
                <Modal show={this.state.error}
                       modalClosed={this.removeErrorHandler}>
                          { (this.state.error)? this.state.error.message: null}</Modal>
                <WrrapedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;