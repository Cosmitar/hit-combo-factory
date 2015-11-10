'use strict'
import Dispatcher from './../core/appDispatcher';
import {EventEmitter} from 'events';
import {
    USER_SHOW_LOGIN,
    USER_CLOSE_LOGIN,
    USER_SHOW_EXPORT,
    USER_CLOSE_EXPORT,
    USER_SHOW_EXPORT_SUCCESS
} from './../constants/appConstants';

let CHANGE_EVENT = 'change';

class UIStore extends EventEmitter {
    constructor(){
        super();
        this._showLogin = false;
        this._showExport = false;
        this._showExportSuccess = false;
        this._registerDispatcher();
    }

    _emmitChange() {
        this.emit(CHANGE_EVENT);
    }

    _registerDispatcher() {
        Dispatcher.register((action) => {
            switch(action.type) {

                case USER_SHOW_LOGIN: {
                    this._showLogin = true;
                    this._emmitChange();
                    break;
                }

                case USER_CLOSE_LOGIN: {
                    this._showLogin = false;
                    this._emmitChange();
                    break;
                }

                case USER_SHOW_EXPORT: {
                    this._showExport = true;
                    this._emmitChange();
                    break;
                }

                case USER_CLOSE_EXPORT: {
                    this._showExport = false;
                    this._showExportSuccess = false;
                    this._emmitChange();
                    break;
                }

                case USER_SHOW_EXPORT_SUCCESS: {
                    this._showExport = true;
                    this._showExportSuccess = true;
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

    showLogin() {
        return this._showLogin;
    }

    showExport() {
        return this._showExport;
    }

    showExportSuccess() {
        return this._showExportSuccess;
    }
}

export default new UIStore();