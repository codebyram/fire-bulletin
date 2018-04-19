import React from 'react';
import PropTypes from 'prop-types';

import FormInput from './FormInput';

class TextArea extends FormInput {
  render(){
    return(
      <div className={this.props.className} style={this.props.style}>
        <label>
          {this.props.showLabel? this.props.label : ''}
          <textarea
            onChange={this.onChange.bind(this)}
            placeholder={this.props.placeholder}
            value = {this.props.value || undefined}
            name={this.props.name} ></textarea>
            <span className='text-danger'>{this.getErrorMessage()}</span>
        </label>
      </div>
    )
  }
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,

  required: PropTypes.bool,
  disabled: PropTypes.bool
}

TextArea.defaultProps = {
  value: null,
  placeholder: '',
  showLabel: true
};

export default TextArea;
