'use strict'
import Dispatcher from './../core/appDispatcher';
import {EventEmitter} from 'events';
import {SEARCH_NEW,SEARCH_ARTIST_RESULT} from './../constants/appConstants';

let CHANGE_EVENT = 'change';

class SearchStore extends EventEmitter {
    constructor(){
        super();
        this._search = '';
        this._searchResult = null;
        this._registerDispatcher();
    }

    _emmitChange() {
        this.emit(CHANGE_EVENT);
    }

    _registerDispatcher() {
        Dispatcher.register((action) => {
            switch(action.type) {
                case SEARCH_NEW: {
                    this._search = action.text;
                    this._emmitChange();
                    break;
                }

                case SEARCH_ARTIST_RESULT: {
                    this._searchResult = action.result;
                    this._emmitChange();
                    break;
                }

                default: {
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

    getSearch() {
        return this._search;
    }
    
}

export default new SearchStore();