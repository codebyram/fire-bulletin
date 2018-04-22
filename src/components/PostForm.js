import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../helpers/actions';
import {Form, TextInput, TextArea } from './form_components';

export default class PostForm extends React.Component {

  render(){
    return(
      <div className="col-12">
        <div className="container">
          <div className='col-xs-12 col-md-8 offset-md-2 col-lg-8 offset-lg-2'>
            <div className="form-box col-12">
              <div className="form-head">
                <h2 className="page-sub-title">Post</h2>
              </div>
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-body col-12">
                <TextInput className='col-12 pull-left'
                 required
                 name='title'
                 placeholder='Your post title'
                 value=''
                 type='text' />
               <TextArea className='col-12 pull-left'
                 required
                 name='description'
                 placeholder='Your post data'
                 value=''/>
                  <div className="col-12 pull-left text-center">
                  {this.getButton()}
                  <button className='button button--xl' type="reset" onClick={this.closeForm.bind(this)} >Cancel</button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  closeForm(){
    this.props.onClose();
  }

  getButton(){
    if (this.props.isFetching) {
      return(
        <button className='button button--xl' type="submit" disabled>Posting</button>
      )
    }
    return(
      <button className='button button--xl' type="submit" >Post</button>
    )
  }

  handleSubmit(data){
    this.props.onSubmit(data);
  }

  showSignUp(e){
    e.preventDefault();
    this.props.signup();
  }
}
