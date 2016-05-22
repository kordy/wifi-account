import Form from '../../components/form/form.jsx';
import Logo from '../../components/logo/logo';
import Api from '../../services/api';
import { connect } from 'react-redux';


class LoginPage extends React.Component {

  constructor(props) {
    super(props);


    this.formData = {
      form: 'registrationForm',
      onSubmit: this.onSubmit,
      buttonText: 'Войти',
      formFields: [
        {
          type: 'text',
          name: 'login',
          placeholder: 'Ваш логин',
          isRequired: true
        },
        {
          type: 'password',
          name: 'password',
          placeholder: 'Ваш пароль',
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
    return Api.post('/authorize', {data: values});
    //return new Promise((resolve, reject) => {
    //  setTimeout(() => {
    //    if (![ 'john', 'paul', 'george', 'ringo' ].includes(values.login)) {
    //      reject({ login: 'User does not exist' })
    //    } else if (values.password !== 'redux-form') {
    //      reject({ password: 'Wrong password' })
    //    } else {
    //      dispatch(showResults(values));
    //      resolve()
    //    }
    //  }, 1000); // simulate server latency
    //})
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
      <div className='wf-login-form'>
        <Logo classModifiers='login' />
        <Form
          fields = {this.fields}
          {...this.formData}
        />
      </div>
    );
  }
}


export default LoginPage;
