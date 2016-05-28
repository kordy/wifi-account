import { connect } from 'react-redux';
import Utils from '../../services/utils';
import './less/loader.less';

class Loader extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className={Utils.classModify('wf-loading-w', this.props.loader.isShow ? 'show' : '')}>
        <div className='wf-loading'>
          <span className="wf-loading__item wf-loading__item--color">W</span>
          <span className="wf-loading__item wf-loading__item--color">i</span>
          <span className="wf-loading__item">F</span>
          <span className="wf-loading__item">a</span>
          <span className="wf-loading__item">c</span>
          <span className="wf-loading__item">e</span>
        </div>
      </div>
    )
  }
}

function props(state) {
  return {
    loader: state.loader
  };
}

export default connect(props)(Loader);