'use strict';

import './ElemUserInfo.less';

class ElemUserInfo extends React.Component{
    constructor(props){
        super(props);
        this._interfaceActions = this.props.interfaceActions || {};

        this.state = {
            phone: null,
            code: null
        };
    }
    onInputChange(e){
        var propName = e.target.name;
        var newValue = e.target.value;
        if(!this.state.hasOwnProperty(propName)) return;
        var newState = {};
        newState[propName] = newValue;
        this.setState(newState)
    }
    onSubmit(){
        if('function' === typeof this._interfaceActions.onUserInfoSubmit ){
            this._interfaceActions.onUserInfoSubmit({
                phone : this.state.phone,
                code : this.state.code
            });
        }
    }
    render(){
        return(
            <div className="userWindow">
                <div className="userWindow__row uwRow">
                    <div className="uwRow__head">Enter your phone number:</div>
                    <div className="uwRow__content">
                        <input name="phone"
                               value={ this.state.phone }
                               onInput={ (e)=>this.onInputChange(e) }
                        />
                    </div>
                </div>
                <div className="userWindow__row uwRow">
                    <div className="uwRow__head">Already have a code?</div>
                    <div className="uwRow__content">
                        <input name="phone" value={ this.state.code } />
                    </div>
                </div>
                <div className="userWindow__row uwRow">
                    <div className="uwRow__head"></div>
                    <div className="uwRow__content">
                        <button onClick={ this.onSubmit.bind(this) } className="btn">Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ElemUserInfo;