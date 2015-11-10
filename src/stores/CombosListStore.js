'use strict'
import Dispatcher from './../core/appDispatcher';
import {EventEmitter} from 'events';
import {
    COMBO_ADD_NEW,
    COMBO_CLEAR_LIST,
    ARTIST_REMOVE,
    TRACK_REMOVE
} from './../constants/appConstants';

let CHANGE_EVENT = 'change';

class CombosListStore extends EventEmitter {
    constructor(){
        super();
        this._list = new Map();
        this._blacklistTracks = new Map();
        this.dispatchToken = null;
        this._registerDispatcher();
    }

    _emmitChange() {
        this.emit(CHANGE_EVENT);
    }

    _registerDispatcher() {
        this.dispatchToken = Dispatcher.register((action) => {
            switch(action.type) {

                case COMBO_ADD_NEW: {
                    if( this._list.has(action.combo.id) ){
                        let currentCombo = this._list.get(action.combo.id);
                        let tracksKey = '';
                        currentCombo.tracks.forEach((trackSlot, index) => {
                            if( !trackSlot.id ){
                                currentCombo.tracks[index] = action.combo.tracks.shift();
                            }
                            tracksKey+= currentCombo.tracks[index].id;
                        });

                        currentCombo.key = currentCombo.artist.id + tracksKey;
                        //update
                        this._list.set( currentCombo.id, currentCombo );
                    }else{
                        //insert
                        this._list.set( action.combo.id, action.combo );
                    }
                    this._emmitChange();
                    break;
                }

                case COMBO_CLEAR_LIST: {
                    this._list.clear();
                    this._emmitChange();
                    break;
                }

                case TRACK_REMOVE: {
                    this._list.forEach((combo) => {
                        if( combo.tracks[0].id == action.track.id ) {
                            combo.tracks[0] = {};
                        }
                        if( combo.tracks[1].id == action.track.id ) {
                            combo.tracks[1] = {};
                        }
                        this._blacklistTracks.set( action.track.id, action.track );
                    });
                    this._emmitChange();
                    break;
                }

                case ARTIST_REMOVE: {
                    this._list.delete(action.artist.id);
                    /*this._list.forEach((combo) => {
                        if( combo.artist.id == action.artist.id ){
                            this._list.delete(combo);
                        }
                    });*/
                    break;
                }

                default: {
                    break;
                }
            }
            return action;
        });
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    getList() {
        return [...this._list.values()];
    }

    getTracks() {
        let retVal = [];
        for( let combo of this.getList() ){
            if( combo.tracks[0] ){ retVal.push(combo.tracks[0]) };
            if( combo.tracks[1] ){ retVal.push(combo.tracks[1]) };
        }
        return retVal;
    }

    getBlacklist() {
        return this._blacklistTracks;
    }

    getDuration() {
        let time = 0;
        this._list.forEach((combo) => {
            if( combo.tracks[0].duration_ms ){
                time+= combo.tracks[0].duration_ms;
            }
            if( combo.tracks[1].duration_ms ){
                time+= combo.tracks[1].duration_ms;
            }
        });
        return this._msToTime(time);
    }

    _msToTime(duration) {
        let minutes = parseInt((duration/(1000*60))%60)
            , hours = parseInt((duration/(1000*60*60))%24);
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;

        return hours + "h" + (hours > 1? 's' : 'r') + ' ' + minutes + "m";
    }

}

export default new CombosListStore();