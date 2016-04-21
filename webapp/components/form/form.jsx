import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import ReduxForm from './reduxForm';
import classModifiers from '../../services/functions';
import classnames from 'classnames';

const validate = (values, data) => {
  const errors = {};
  let fields = data.formFields;

  fields.map(field =>{
    if (!field.validation && !field.isRequired) return;
    if (field.isRequired && !values[field.name]) {
      errors[field.name] = 'Поле обязательно для заполнения!';
      return;
    }

    switch(field.validation) {
      case 'email':
        let re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(values[field.name])) {
          errors[field.name] = 'Некорректный email!';
        }
    }
  });
  return errors;
};

class Form extends Component {

	constructor(props) {
		super(props);
	}

	showField(field, i) {
		let fieldAttrs = field,
			fieldView;

		fieldAttrs.key = i; //TODO Здесь вроде не правильно, нужен уникальный ключ, а здесь итератор, может бажить. исправлю.
		fieldAttrs.className = classModifiers('form__field', [field.type, field.className]);

		switch (field.type) {
			case 'textarea':
				fieldView = this.showTextArea(field, fieldAttrs);
				break;
			case 'select':
				fieldView = this.showSelect(field, fieldAttrs);
				break;
			default:
				fieldAttrs.type = field.type;
				fieldView = this.showInput(field, fieldAttrs);
		}

    let currentField = this.props.fields[fieldAttrs.name];
    let rowClasses = classnames({
      'form__row': true,
      'form__row--error': currentField.touched && currentField.error
    });

		return (
      <div className={ rowClasses }>
				{fieldView}
        {currentField.touched && currentField.error && <div>{currentField.error}</div>}
      </div>
		);
	}


	showInput(field, fieldAttrs) {
    let currentField = this.props.fields[fieldAttrs.name];
		return (<input {...fieldAttrs} {...currentField} />);
	}

	showTextArea(field, fieldAttrs) {
    let currentField = this.props.fields[fieldAttrs.name];
		return (
			<textarea {...fieldAttrs}  {...currentField} />
		);
	}

	showSelect(field, fieldAttrs) {
    let currentField = this.props.fields[fieldAttrs.name];
		var options = field.options.map((option, i)=> {
			return (
				<option key={i} {...option.attrs} >{option.name}</option>
			)
		});
		return (
			<select {...fieldAttrs} {...currentField} >
				{options}
			</select>
		);
	}

	render() {
		const {
      handleSubmit,
			resetForm,
			valid
			} = this.props;
		return (
			<form
        className='form'
        onSubmit={handleSubmit}
				>
				{
					this.props.formFields.map((item, i) => {
						return this.showField(item, i);
					})
				}
				<div>
					<button disabled = {!valid} onClick={handleSubmit}>Submit</button>
					<button onClick={resetForm}>Clear Values</button>
				</div>
			</form>
		);
	}
}

export default reduxForm({
  validate
})(Form);