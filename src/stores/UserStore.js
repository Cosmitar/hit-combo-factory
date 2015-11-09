'use strict'
import Dispatcher from './../core/appDispatcher';
import {EventEmitter} from 'events';
import {USER_LOGIN,SET_LOGIN_URL} from './../constants/appConstants';

let CHANGE_EVENT = 'change';

class UserStore extends EventEmitter {
    constructor(){
        super();
        this.session = null;
        this._isLoggedIn = false;
        this._loginUrl = '';
        this._registerDispatcher();
    }

    _emmitChange() {
        this.emit(CHANGE_EVENT);
    }

    _registerDispatcher() {
        Dispatcher.register((action) => {
            switch(action.type) {

                case USER_LOGIN: {
                    this._user = action.user;
                    this._isLoggedIn = true;
                    this._emmitChange();
                    break;
                }

                case SET_LOGIN_URL: {
                    this._loginUrl = action.url;
                    this._emmitChange();
                    break;
                }
            }
        });
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    isLoggedIn() {
        return this._isLoggedIn;
    }

    getLoginUrl() {
        return this._loginUrl;
    }
}

export default new UserStore();