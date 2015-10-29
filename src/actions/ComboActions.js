'use strict'
import {Artist} from 'spotify-client';
import Dispatcher from './../core/appDispatcher';
import ComboMaker from './../core/ComboMaker';
import constants from './../constants/appConstants';
import ArtistsListStore from './../stores/ArtistsListStore';
import ComboListStore from './../stores/CombosListStore';
import SearchActions from './SearchActions';

let comboActions = {
    makeCombo: (artist) => {
        ComboMaker.makeCombo(artist);
    },
    addCombo: (combo) => {
        Dispatcher.dispatch({
            type: constants.COMBO_ADD_NEW,
            combo: combo
        });
    },
    removeComboByArtist: (artist) => {
        Dispatcher.dispatch({
            type: constants.COMBO_REMOVE,
            artist: artist
        });
    },
    suggestArtist: () => {
        let artists = ArtistsListStore.getList();
        let artistsLeft = ArtistsListStore.getLeft();
        //dispatch event for suggesting process start
        ComboMaker.suggestArtist( artists, artistsLeft )
        .then(( artistCollection ) => {
            for( let artist of artistCollection ){
                SearchActions.selectArtist( artist );
                //ComboMaker.makeCombo( artist );
            }
            //dispatch event for suggesting process end
        });
    },
    clear: () => {
        Dispatcher.dispatch({
            type: constants.COMBO_CLEAR_LIST
        });
    }
};

export default comboActions;