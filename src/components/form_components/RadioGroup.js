import React from 'react';
import PropTypes from 'prop-types';

class RadioGroup extends React.Component {
  render(){

  }
}

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.array.isRequired,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string
  onChange: PropTypes.func.isRequired,
}

RadioGroup.defaultProps = {
  hasError: false,
  errorMessage: ''
};

export default Select;
