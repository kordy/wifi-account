import './layout.less';
import { connect } from 'react-redux';

class Layout extends React.Component {

  constructor(props) {
    super(props);
  }

  showLoader = () => {
    return <div>Loading...</div>
  };

  checkConfig = () => {
    return true;
  };

  render() {
    if (!this.checkConfig()) return this.showLoader();
    return(
      <div>
         {this.props.children}
      </div>
    )
  }
}
export default connect()(Layout);