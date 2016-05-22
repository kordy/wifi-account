import Functions from '../../services/functions'

class Logo extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className={Functions.classModifiers('wf-logo', this.props.classModifiers)}>
        <span className="wf-logo__span">Wi</span>Face
      </div>
    );
  }
}

export default Logo;
