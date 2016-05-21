import './layout.less';
import { connect } from 'react-redux';

import Menu from '../menu/menu';
import TopPane from '../topPane/topPane';

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
        <TopPane />
        <div className="wf-wrapper">
          <div className="wf-left">
            <Menu />
          </div>
          <div className="wf-right">
           {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
export default connect()(Layout);