import Logo from '../logo/logo'

class TopPane extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="wf-top-pane">
        <div className="wf-top-pane__left"><Logo /></div>
        <div className="wf-top-pane__right">
          <div className="wf-top-pane__login">magomed05</div>
          <div className="wf-top-pane__exit">выйти</div>
        </div>
      </div>
    )
  }
}

export default TopPane;
