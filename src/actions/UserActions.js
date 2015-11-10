'use strict'
import {User, Playlist, Session} from 'spotify-client';
import constants from './../constants/appConstants';
import Dispatcher from './../core/appDispatcher';
import CombosListStore from './../stores/CombosListStore';
import UIActions from './../actions/UIActions';

class UserActions {
    constructor() {
        Session.config({
            clientId: '[your app client id]',
            secretId: '[your app secret id]',
            scopes: ['playlist-modify-public'],
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

    exportPlaylist( name ) {
        let playlist = new Playlist;
        playlist.name = name;
        for( let combo of CombosListStore.getList() ){
            if( combo.tracks[0] ){ playlist.addTrack( combo.tracks[0] ) };
            if( combo.tracks[1] ){ playlist.addTrack( combo.tracks[1] ) };
        }
        playlist.save().then(playlist => {
            Dispatcher.dispatch({
                type: constants.PLAYLIST_EXPORTED,
            });
            UIActions.showExportSuccess();
        });
    }
}

export default new UserActions();