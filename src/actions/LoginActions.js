'use strict'
import {User, Session} from 'spotify-client';
import constants from './../constants/appConstants';
import Dispatcher from './../core/appDispatcher';

class LoginActions {
    constructor() {
        Session.config({
            clientId: '1dd4ae27b3fc480ebf627679e5bb0e17',
            secretId: '31e8696e70574648b55b6fcc7c5b1135',
            redirect_uri: 'http://localhost:5000/loginHandler.html'
        });
        Session.login().then((url) => {
            Dispatcher.dispatch({
                type: constants.SET_LOGIN_URL,
                url: url
            });
        });
    }

    setLoginToken(token) {
        Session.token = token;
        User.findMe().then( me => {
           Dispatcher.dispatch({
                type: constants.USER_LOGIN,
                user: me
            });
        });
    }

    checkLogin() {
        //@TODO verify localStorage for existant session
    }

}

export default new LoginActions();