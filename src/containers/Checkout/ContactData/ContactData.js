import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/spinner/spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as orderActions from '../../../store/actions/index'
class ContactData extends Component {
  state = {
      orderForm : {
        name : {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Enter Name"
            },
            value: "",
            validation: {
                required: true,
                minLength: 3,
                maxLength: 12
            },
            valid: false,
            touched: false
        },
        street:  {
            elementType: "input",
            elementConfig: {
                type:"text",
                placeholder: "Enter Street Name"
            },
            value: "",
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        country:  {
            elementType: "input",
            elementConfig: {
                type:"text",
                placeholder: "Enter Country Name"
            },
            value: "",
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email:  {
            elementType: "input",
            elementConfig: {
                type:"email",
                placeholder: "Enter Your Email"
            },
            value: "",
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode : {
            elementType: "input",
            elementConfig : {
                type:"text",
                placeholder:"Enter Zip Code"
            },
            value: "",
            validation: {
                required: true,
                minLength: 6,
                maxLength: 6
            },
            valid: false,
            touched: false
        },
        delivertyMethod:  {
            elementType: "select",
            elementConfig: {
                options : [
                    { value: 'fastest', displayValue: 'FASTEST'},
                    { value: 'cheapest', displayValue: 'CHEAPEST'}
                ]
            },
            value: "fastest",
            valid: true
        }
    },
    isFormValid: false
  }

  orderHandler = (event) => {
    event.preventDefault();
        let orderFormData = {}
        for( let formDataVariable in this.state.orderForm) {
            orderFormData[formDataVariable] = this.state.orderForm[formDataVariable].value;
        }
        let order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: orderFormData,
            userId: this.props.userId
        }
        this.props.onOrderPress(order, this.props.token);
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

    return isValid;
  }

  onChangeHandler = (event, id) => {
    let updatedFormOrder = {
        ...this.state.orderForm
    }
    let updatedFormELement = {
        ...this.state.orderForm[id]
    }
    updatedFormELement.value = event.target.value;
    updatedFormELement.valid = this.checkValue(updatedFormELement.value, updatedFormELement.validation);
    updatedFormELement.touched = true;
    updatedFormOrder[id] = updatedFormELement;
    let isFormValid = true;
    for(let inputIdentifier in updatedFormOrder) {
        isFormValid = updatedFormOrder[inputIdentifier].valid && isFormValid;
    }
    this.setState({orderForm: updatedFormOrder,isFormValid: isFormValid})
  }

  render() {
      let arrayFormElements = [];
      for(let key in this.state.orderForm) {
          arrayFormElements.push(
              {
                  id: key,
                  config: this.state.orderForm[key]
              }
          )
      }
      let form = (
        <form onSubmit={this.orderHandler}>
         {arrayFormElements.map(formElement => (
             <Input 
             key={formElement.id}
             elementType={formElement.config.elementType}
             elementConfig={formElement.config.elementConfig}
             value={formElement.config.value}
             valid={formElement.config.valid}
             shouldValidate={formElement.config.validation}
             elementTouched= {formElement.config.touched}
             changed={(event) => this.onChangeHandler(event, formElement.id)}/>
         ))}
        <Button disabled={!this.state.isFormValid} btnType="Success">Submit</Button>
        </form>
      )
      if(this.props.loading) {
          form = <Spinner/>
      }
      return (
          <div className={classes.ContactData}>
              <h1>Enter the Contact Data</h1>
            {form}
          </div>
      )
  }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token : state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderPress : (orderData, token) => dispatch(orderActions.purchaseOrder(orderData, token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));