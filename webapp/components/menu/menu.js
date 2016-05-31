import { Link } from 'react-router'
import { LeftMenu } from '../../routes'

class Menu extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="wf-menu">
        {
          LeftMenu.map((item) => {
            return (
              <div className="wf-menu__item">
                <Link
                  className="wf-menu__link"
                  activeClassName="wf-menu__link--active"
                  to={ item.path }
                >
                  { item.name }
                </Link>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Menu;
