import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {validatorMap, exprMessageMap } from './validatorMap';

let getValidationRule = (item) => {
  let expressionMap = exprMessageMap(item.expr,item.value || item.element);
  return {
    expr: expressionMap.expr,
    value: item.value,
    element: item.element,
    func: expressionMap.expr === 'function' ? item.func : validatorMap[expressionMap.expr],
    message: item.message || expressionMap.message
  };
}

class FormInput extends React.Component {
  constructor(){
    super(...arguments);
    this.setUpStore();
    this.setUpValidations();
  }

  componentWillMount(){
    this.setState({value: this.props.value, errors:[]});
  }

  setUpValidations(){
    let validations = this.props.validations || [];

    if(this.props.type != 'text' && this.props.type != 'password' && this.props.type != undefined) {
      validations.unshift({expr: this.props.type});
    }
    if(this.props.required) {
      validations.unshift({expr: 'req', message: this.props.label?this.props.label+' is required':'Required'});
    }

    this.validations = _.filter(validations, item => item.element === undefined ).map( rule => getValidationRule(rule));
    this.siblingValidations = _.filter(validations, item => item.element !== undefined ).map( rule => getValidationRule(rule));

    console.log(this.siblingValidations,this.props.name)

  }

  setUpStore(){
    if(this.context.formStore){
      this.formStore = this.context.formStore;
      this.formStore.setValue(this.props.name,this.props.value,false)
      this._unsuscribe = this.formStore.subscribe(this.storeListener.bind(this));
    } else {
      throw Error("FormStore not initialized")
    }
  }

  onChange(event){
    this.setValue(this.getValueFromNode(event.target));
  }

  setValue(value){
    this.runValidations(value);

    this.formStore.setValue(this.props.name,value);
  }

  runValidations(value){
    let errors = [];
    this.validations.map(item=>{
      if(!item.func.call(this,item,value))
        errors.push(item.message);
    });

    if(errors.length === 0){
      this.runSiblingValidations(value);
    } else {
      let element = this.props.name;
      let message = errors[0];
      this.formStore.setError({element,message});
      this.setState({value: value, errors: errors});
    }
  }

  runSiblingValidations(value){
    var self = this;
    let errors = [];
    this.siblingValidations.map(item=>{
      item.value = self.formStore.getValue(item.element);
      if(!item.func.call(this,item,value))
        errors.push(item.message)
    })

    if(errors.length === 0){
      this.formStore.removeError(this.props.name);
      this.setState({value: value, errors:[]});
    } else{
      let element = this.props.name;
      let message = errors[0];
      this.formStore.setError({element,message});
      this.setState({value: value, errors: errors});
    }
  }

  getErrorMessage(){
    if(this.state && this.state.errors){
      let error = this.state.errors[0];
      return(
        error
      )
    } else {
      return (
        ''
      )
    }
  }

  getValueFromNode(node) {
    return node.value;
  }

  storeListener(type,value){
    switch(type){
      case 'change':
        break;
      case 'validate':
        this.runValidations(this.state.value);
        break;
    }
  }
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  validations: PropTypes.array,

  required: PropTypes.bool,
  disabled: PropTypes.bool
}

FormInput.defaultProps = {
  value: null,
  placeholder: '',
  showLabel: true,
  validations: []
}

FormInput.contextTypes = {
  formStore : PropTypes.object
}

export default FormInput;
