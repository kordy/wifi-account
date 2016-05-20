import { Link } from 'react-router'
import { LeftMenu } from '../../routes'

class Menu extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    console.log(LeftMenu);
    return (
      <div className="wf-menu">
        {
          LeftMenu.map((item) => {
            return (
              <div className="wf-menu__item">
                <Link className="wf-menu__link" to={ item.path }>{ item.name }</Link>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Menu;
