'use strict'
import React, {Component} from 'react';
import UserActions from './../actions/UserActions';
import UIActions from './../actions/UIActions';

class LoginFrame extends Component {
    componentDidMount() {
        //UserActions.checkLogin();
    }

    render() {
        return(
            <div className="LoginFrame-container">
                <div className="LoginFrame-box">
                        <span className="LoginFrame-copy">
                            Log in with your Spotify Account <br/>
                            to let Hit Combo Factory export the playlists.
                        </span>
                        <a href="#" onClick={this._onLoginHandler.bind(this)}>
                            <img src="style/images/log_in-desktop.svg" />
                        </a> 
                </div>
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
                UserActions.setLoginToken( event.newValue );
                UIActions.closeLogin();
                UIActions.showExport();
            }
            win.close();
        });
        /*
        window postMessage method
        window.addEventListener('message',(event) => {
            if( event.data != '' ){
                UserActions.setLoginToken( event.data );
            }else{
                console.warn('something went wrong authenticating on Spotify');
                console.log( event.data );
            }
            win.close();
        });*/
    }
}

export default LoginFrame;