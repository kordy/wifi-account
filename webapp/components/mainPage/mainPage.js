import ElemUserInfo from '../ElemUserInfo/ElemUserInfo.jsx';

import './MainPage.less';

import EntityUser from '../Entity/EntityUser.jsx';

class MainPage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  onSubmitResponce(result){
    console.log('We did it!');
  }

  onUserInfoSubmit(userInfo){
    EntityUser.postPhone(userInfo, (result)=>this.onSubmitResponce(result))
  }
  // Show methods:
  // --
  showHeader(){
    return (
        <h1 className="mainPage__header">Get your access code!</h1>
    );
  }

  render() {
    var interfaceActions = {
      onUserInfoSubmit : (userInfo)=>this.onUserInfoSubmit(userInfo)
    };
    return(
        <div className="mainPage">
          { this.showHeader() }
          <ElemUserInfo interfaceActions={ interfaceActions } />

        </div>
    )
  }
}

export default MainPage;
