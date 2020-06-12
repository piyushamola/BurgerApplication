import React, { Component } from 'react';
import classes from './Auth.css'
import { connect } from 'react-redux'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import WithErrorComponent from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import * as actions from '../../store/actions/index'
import { withRouter } from 'react-router-dom'
import Spinner from '../../components/UI/spinner/spinner'
import { Redirect } from 'react-router-dom'
class Auth extends Component {

    state = {
        controls : {
            email:  {
                elementType: "input",
                elementConfig: {
                    type:"email",
                    placeholder: "Enter Your Email"
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password :  {
                elementType: "input",
                elementConfig: {
                    type:"password",
                    placeholder: "Enter Your Password"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount() {
        if (!this.props.burgerBuilder && this.props.authRedirectPath !== '/') {
            this.props.onSetRedirectPath();
        }
    }

    checkValue = (value, rules) => {
        let isValid = true;
    
        if(!rules) {
            return true;
        }
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
    
        if(rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
        }
    
        if(rules.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid;
        }

        if(rules.isEmail) {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            isValid = pattern.test(value) && isValid;
        }

        if(rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(pattern) && isValid;
        }
    
        return isValid;
      }

      onChangeHandler = (event, controlName) => {
       const updatedControls = {
           ...this.state.controls,
           [controlName] : {
               ...this.state.controls[controlName],
               value: event.target.value,
               valid: this.checkValue(event.target.value, this.state.controls[controlName].validation ),
               touched: true
           }
       }

       this.setState({controls: updatedControls});
      }

      formSubmit = (event) => {
        event.preventDefault();
        this.props.onSumitForm(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
      }

      switchFormHanlder = () => {
         this.setState(prevState => {
            return  {isSignUp: !prevState.isSignUp}
         })
      }

    render () {
        let arrayFormElements = [];
        for(let key in this.state.controls) {
            arrayFormElements.push(
                {
                    id: key,
                    config: this.state.controls[key]
                }
            )
        }

        let form = arrayFormElements.map(formElement => (
                 <Input 
                 key={formElement.id}
                 elementType={formElement.config.elementType}
                 elementConfig={formElement.config.elementConfig}
                 value={formElement.config.value}
                 valid={formElement.config.valid}
                 shouldValidate={formElement.config.validation}
                 elementTouched= {formElement.config.touched}
                 changed={(event) => this.onChangeHandler(event, formElement.id)}/>
             ))

             if (this.props.loading) {
                 form = <Spinner/>
             }
             let errorMessage = null;
             if (this.props.error) {
                 errorMessage = (
                     <p>{this.props.error.message}</p>
                 )
             }
             let authRedirect = null;
             if (this.props.isAuthenticated) {
                authRedirect = <Redirect to={this.props.authRedirectPath}/>
             }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.formSubmit}>
                    {form}
                <Button  btnType="Success">Submit</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchFormHanlder}>Switch to {this.state.isSignUp ? "SignIn": "SignUp"}</Button> 
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSumitForm : (email, password, SignUp) => dispatch(actions.auth(email, password, SignUp)),
        onSetRedirectPath: () => dispatch(actions.authRedirectPath("/"))
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated : state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        burgerBuilder: state.burgerBuilder.building
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorComponent(Auth,axios));