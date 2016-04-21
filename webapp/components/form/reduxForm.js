import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';

class ReduxForm extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.children[0]);
    return (
      <form
        //onSubmit={this.fdata.onSubmit ? this.fdata.onSubmit : null}
        //name={this.fdata.name ? this.fdata.name : null}
        //action={this.fdata.action ? this.fdata.action : null}
        //method={this.fdata.method ? this.fdata.method : null}
      >
        {this.props.children}
      </form>
    );
  }
}

export default reduxForm()(ReduxForm);