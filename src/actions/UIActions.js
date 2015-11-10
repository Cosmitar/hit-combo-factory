'use strict'
import constants from './../constants/appConstants';
import Dispatcher from './../core/appDispatcher';

class UIActions {
    showLogin() {
        Dispatcher.dispatch({
            type: constants.USER_SHOW_LOGIN,
        });
    }

    closeLogin() {
        Dispatcher.dispatch({
            type: constants.USER_CLOSE_LOGIN,
        });
    }

    showExport() {
        Dispatcher.dispatch({
            type: constants.USER_SHOW_EXPORT,
        });
    }

    closeExport() {
        Dispatcher.dispatch({
            type: constants.USER_CLOSE_EXPORT,
        });
    }

    showExportSuccess() {
        Dispatcher.dispatch({
            type: constants.USER_SHOW_EXPORT_SUCCESS,
        });
    }
}

export default new UIActions();
