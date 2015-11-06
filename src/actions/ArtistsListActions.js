'use strict'
import Dispatcher from './../core/appDispatcher';
import constants from './../constants/appConstants';
import {Artist} from 'spotify-client';

let artistsListActions = {
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