'use strict'
import Dispatcher from './../core/appDispatcher';
import {EventEmitter} from 'events';
import {COMBO_ADD_NEW,COMBO_CLEAR_LIST} from './../constants/appConstants';

let CHANGE_EVENT = 'change';

class CombosListStore extends EventEmitter {
    constructor(){
        super();
        this._list = [];
        this._registerDispatcher();
    }

    _emmitChange() {
        this.emit(CHANGE_EVENT);
    }

    _registerDispatcher() {
        Dispatcher.register((action) => {
            switch(action.type) {

                case COMBO_ADD_NEW: {
                    this._list.push( action.combo );
                    this._emmitChange();
                    break;
                }

                case COMBO_CLEAR_LIST: {
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

}

export default new CombosListStore();