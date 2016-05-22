import Api from '../../services/api'

class PersonalInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Api.get('/account');
  }

  render() {
    return(
      <div>PersonalInfo</div>
    )
  }
}

export default PersonalInfo;
