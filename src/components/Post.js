import React from 'react';

export default class Post extends React.Component {
  render() {
    return (
      <div className="job-card">
        <div className="job-details">
          <h3 className="block-title">{this.props.title}</h3>
          <h5 className="text-block-title">By - {this.props.by} </h5>
          <p>{this.props.description}</p>
          {this.renderDelete()}
        </div>
      </div>
    )
  }

  renderDelete(){
    if (this.props.canDelete) {
      return(
        <button className="button button--danger float-right" onClick={()=>{this.props.delete(this.props.id)}}>DELETE</button>
      )
    }
  }
}
