import React from 'react';
import PropTypes from 'prop-types';

import FormStore from './FormStore';

class Form extends React.Component {
  constructor(){
    super(...arguments);
    this.formStore = new FormStore();
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit.bind(this)} className={this.props.className} style={this.props.style}>
        {this.props.children}
      </form>
    )
  }

  handleSubmit(e){
    e.preventDefault();
    this.formStore.forceValidate();
    if(this.formStore.errors.length === 0) {
      this.props.onSubmit(this.formStore.getAll());
    } else {
      console.log(this.formStore.errors)
      return;
    }
  }

  getChildContext(){
    return {formStore : this.formStore };
  }
}

Form.childContextTypes = {
  formStore : PropTypes.object
}

export default Form;
