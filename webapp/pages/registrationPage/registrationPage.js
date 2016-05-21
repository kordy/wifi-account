import Form from '../../components/form/form.jsx';
import { connect } from 'react-redux';


class Registration extends React.Component {

  constructor(props) {
    super(props);

    this.formData = {
      form: 'registrationForm',
      onSubmit: this.onSubmit,
      formFields: [
        {
          type: 'email',
          validation: 'email',
          name: 'email',
          placeholder: 'Электронный адрес',
          isRequired: true
        },
        {
          type: 'password',
          name: 'password',
          placeholder: 'Пароль',
          isRequired: true,
          onChange: this.passChange.bind(this)
        }
      ]
    }

  }
  /**
   *CUSTOM ONCHANGE
   */
  passChange(){

  }

  onSubmit(values) {
    console.log(values);
  }

  get fields() {
    let fields = [];
    this.formData.formFields.map(field => {
      fields.push(field.name);
    });
    return fields;
  }

  render() {
    return (
        <div className='form-wrapper'>
          <Form
            fields = {this.fields}
            {...this.formData}
          />
        </div>
    );
  }
}


export default Registration;
/*
function props(state) {
  return {
    form: state.form
  };
}

export default connect(props)(Registration);
    */