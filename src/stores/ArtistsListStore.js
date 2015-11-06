'use strict'
import Dispatcher from './../core/appDispatcher';
import {EventEmitter} from 'events';
import {ARTIST_ADD_NEW,ARTIST_CLEAR_LIST,ARTIST_REMOVE} from './../constants/appConstants';
import CombosListStore from './CombosListStore';

let CHANGE_EVENT = 'change';

class ArtistsListStore extends EventEmitter {
    constructor(){
        super();
        this._list = new Map();
        this._blacklist = new Map();
        this._total = 8;//@TODO make it customizable
        this._registerDispatcher();
    }

    _emmitChange() {
        this.emit(CHANGE_EVENT);
    }

    _registerDispatcher() {
        Dispatcher.register((action) => {
            switch(action.type) {

                case ARTIST_ADD_NEW: {
                    //console.log(action.artist);
                    this._list.set( action.artist.id, action.artist );
                    this._emmitChange();
                    break;
                }

                case ARTIST_REMOVE: {
                    Dispatcher.waitFor([CombosListStore.dispatchToken]);
                    this._blacklist.set(action.artist.id, action.artist );
                    this._list.delete( action.artist.id );
                    this._emmitChange();
                    break;
                }

                case ARTIST_CLEAR_LIST: {
                    this._list.clear();
                    this._blacklist.clear();
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

    getList() {
        return this._list;
    }

    getBlacklistMap() {
        return this._blacklist;
    }

    getLeft() {
        return this._total - this._list.size;
    }

    getTotal() {
        return this._total;
    }

}

export default new ArtistsListStore();