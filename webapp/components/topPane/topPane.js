import Logo from '../logo/logo'
import AccountActions from '../../actions/accountActions';

class TopPane extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }
  logout() {
    AccountActions.logout();
  }

  render() {

    const info = this.props.account.info;
    return (
      <div className="wf-top-pane">
        <div className="wf-top-pane__left"><Logo /></div>
        <div className="wf-top-pane__right">
          <div className="wf-top-pane__login"> { info && info.fio }</div>
          <div className="wf-top-pane__exit" onClick={ this.logout }>выйти</div>
        </div>
      </div>
    )
  }
}

export default TopPane;
