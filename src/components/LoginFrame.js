'use strict'
import React, {Component} from 'react';
import LoginActions from './../actions/LoginActions';

class LoginFrame extends Component {
    componentDidMount() {
        //LoginActions.checkLogin();
    }

    render() {
        return(
            <div>
                <button onClick={this._onLoginHandler.bind(this)}>Login to Spotify</button>  
            </div>
        );
    }

    _onLoginHandler(e) {
        let win = window.open(
            this.props.src,
            'Spotify Login',
            'menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,width=400,height=500'
        );
        window.addEventListener('storage',(event) => {
            if( event.key == 'token' ){
                LoginActions.setLoginToken( event.newValue );
            }
            win.close();
        });
        /*
        window postMessage method
        window.addEventListener('message',(event) => {
            if( event.data != '' ){
                LoginActions.setLoginToken( event.data );
            }else{
                console.warn('something went wrong authenticating on Spotify');
                console.log( event.data );
            }
            win.close();
        });*/
    }
}

export default LoginFrame;