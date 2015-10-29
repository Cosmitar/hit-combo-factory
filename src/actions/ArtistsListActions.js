'use strict'
import Dispatcher from './../core/appDispatcher';
import constants from './../constants/appConstants';
import {Artist} from 'spotify-client';

let artistsListActions = {
    addArtis(artist) {
        Dispatcher.dispatch({
            type: constants.ARTIST_ADD_NEW,
            text: artist
        });
    },
    removeArtist: (artist) => {
        Dispatcher.dispatch({
            type: constants.ARTIST_REMOVE,
            artist: artist
        });
    },
    clear: () => {
        Dispatcher.dispatch({
            type: constants.ARTIST_CLEAR_LIST
        });
    }
};

export default artistsListActions;