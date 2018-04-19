import React from 'react';
import PropTypes from 'prop-types';

import FormInput from './FormInput';

class SelectInput extends FormInput {
  render(){
    let options = this.props.options;
    let value = this.state.value;
    return(
      <div className={this.props.className} style={this.props.style}>
        <label>
          {this.props.label}
          <select
            onChange={this.onChange.bind(this)}
            placeholder={this.props.placeholder}
            name={this.props.name}
            value = {this.props.value || undefined}
            >
            {
            options.map((option,i) => (
                <option
                  key={i}
                  value={option.id}>
                  {option.name}
                </option>
              ))
            }
            </select>
            <span className='text-danger'>{this.getErrorMessage()}</span>
        </label>
      </div>
    )
  }

}

SelectInput.propTypes = {
  type: PropTypes.string
}

export default SelectInput;
