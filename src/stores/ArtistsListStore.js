'use strict'
import Dispatcher from './../core/appDispatcher';
import {EventEmitter} from 'events';
import {ARTIST_ADD_NEW,ARTIST_CLEAR_LIST} from './../constants/appConstants';

let CHANGE_EVENT = 'change';

class ArtistsListStore extends EventEmitter {
    constructor(){
        super();
        this._list = [];
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
                    this._list.push( action.artist );
                    this._emmitChange();
                    break;
                }

                case ARTIST_CLEAR_LIST: {
                    this._list = [];
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

    getLeft() {
        return this._total - this._list.length;
    }

    getTotal() {
        return this._total;
    }

}

export default new ArtistsListStore();