'use strict'
import {Artist} from 'spotify-client';
import constants from './../constants/appConstants';
import Dispatcher from './../core/appDispatcher';
import ComboActions from './ComboActions';
import ArtistsListActions from './ArtistsListActions';

class SearchActions {
    search(text) {
        Dispatcher.dispatch({
            type: constants.SEARCH_NEW,
            text: text
        });

        //automatic add artist
        let eventTypeNotFound = constants.ARTIST_NOT_FOUND;
        Artist.where(text)
        //auto select first result
        .first()
        .then((artist)=>{
            if( artist ){
                //perform selection
                this.selectArtist(artist);
            }else{
                Dispatcher.dispatch({
                    type: eventTypeNotFound,
                    text: text
                });
            }
        });
    }

    selectArtist(artist) {
        let eventTypeAddNew = constants.ARTIST_ADD_NEW;
        Dispatcher.dispatch({
            type: eventTypeAddNew,
            artist: artist
        });
        //automatic make combo
        ComboActions.makeCombo(artist);
    }

    suggestArtist() {
        ComboActions.suggestArtist();
    }

    restart() {
        ArtistsListActions.clear();
        ComboActions.clear();
    }
}

export default new SearchActions();