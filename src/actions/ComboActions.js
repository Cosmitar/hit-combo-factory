'use strict'
import {Artist} from 'spotify-client';
import Dispatcher from './../core/appDispatcher';
import ComboMaker from './../core/ComboMaker';
import constants from './../constants/appConstants';
import ArtistsListStore from './../stores/ArtistsListStore';
import CombosListStore from './../stores/CombosListStore';
import SearchActions from './SearchActions';

let comboActions = {
    makeCombo: (artist) => {
        let blacklistedTracksMap = CombosListStore.getBlacklist();
        ComboMaker.makeCombo(artist,blacklistedTracksMap);
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
    removeTrack(track){
        Dispatcher.dispatch({
            type: constants.TRACK_REMOVE,
            track: track
        });
    },
    suggestArtist: () => {
        let artistsMap = ArtistsListStore.getList();
        let artistsLeft = ArtistsListStore.getLeft();
        let blacklistedArtistsMap = ArtistsListStore.getBlacklistMap();
        //dispatch event for suggesting process start
        Dispatcher.dispatch({
            type: constants.SUGGESTING_START
        });
        ComboMaker.suggestArtist( artistsMap, artistsLeft, blacklistedArtistsMap )
        .then(( artistCollection ) => {
            for( let artist of artistCollection ){
                SearchActions.selectArtist( artist );
                //ComboMaker.makeCombo( artist );
            }
            Dispatcher.dispatch({
                type: constants.SUGGESTING_END
            });
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