import Api from '../../services/api'

class PersonalInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('herre');
    Api.get('/account')
      .then((res) => {

      })
      .catch((err) => {

      });
  }

  render() {
    return(
      <div>PersonalInfo</div>
    )
  }
}

export default PersonalInfo;
