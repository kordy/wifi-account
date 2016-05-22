import './layout.less';
import { connect } from 'react-redux';

import Menu from '../menu/menu';
import TopPane from '../topPane/topPane';

import Functions from '../../services/functions';

import LayoutConstants from '../../constants/layoutConstants/layoutConstants';

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

  showEmptyLayout = (currentRoute) => {
    return(
      <div className={Functions.classModifiers('wf-layout', currentRoute.params.pageClassModifiers)}>
        {this.props.children}
      </div>
    )
  };

  showLeftMenuLayout = (currentRoute) => {
    return(
      <div className={Functions.classModifiers('wf-layout', currentRoute.params.pageClassModifiers)}>
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
  };

  showLayout = () => {
    const currentRoute = this.props.routes[this.props.routes.length - 1];
    switch (currentRoute.params.layout) {
      case LayoutConstants.LAYOUT_EMPTY:
        return this.showEmptyLayout(currentRoute);
      default:
        return this.showLeftMenuLayout(currentRoute);
    }
  };

  render() {
    if (!this.checkConfig()) return this.showLoader();
    return this.showLayout();
  }
}
export default connect()(Layout);