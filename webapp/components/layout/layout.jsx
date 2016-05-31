import './layout.less';
import { connect } from 'react-redux';

import Menu from '../menu/menu';
import Cache from '../../services/cache';
import TopPane from '../topPane/topPane';
import Loader from '../loader/loader';
import Functions from '../../services/utils';
import AccountActions from '../../actions/accountActions';
import RouterActions from '../../actions/routerActions';
import LoaderActions from '../../actions/loaderActions';
import LayoutConstants from '../../constants/layoutConstants';

class Layout extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const currentRoute = this.props.routes[this.props.routes.length - 1];
    LoaderActions.show();
    AccountActions.check()
      .then(() => {
        AccountActions.fetchAccount();
      })
      .catch(() => {
          if (!currentRoute.params.noAuth) {
            AccountActions.logout();
          } else {
            AccountActions.logout(true);
          }
      })
      .finally(() => {
        setTimeout(() => {
          AccountActions.setChecked();
          LoaderActions.hide();
        }, 500);
      })
  };

  componentWillReceiveProps(nextProps) {
    const currentRoute = this.props.routes[this.props.routes.length - 1];
    const nextRoute = nextProps.routes[nextProps.routes.length - 1];
    if (currentRoute.path != nextRoute.path && !Cache.get('token')) {
      AccountActions.logout();
    }
  }

  showEmptyLayout = (currentRoute) => {
    return(
      <div className={Functions.classModify('wf-layout', currentRoute.params.pageClassModifiers)}>
        {this.props.children}
      </div>
    )
  };

  showLeftMenuLayout = (currentRoute) => {
    return(
      <div className={Functions.classModify('wf-layout', currentRoute.params.pageClassModifiers)}>
        <TopPane account={ this.props.account }/>
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
    return (
      <div className="wf-page">
        { this.props.account.checked && this.showLayout() }
        <Loader />
      </div>
    );
  }
}

function props(state) {
  return {
    account: state.account
  };
}

export default connect(props)(Layout);
