'use strict'
import ComboActions from './../actions/ComboActions';
import CombosListStore from './../stores/CombosListStore';

class Combo {
    constructor(){
        this.type;
        this.artist;
        this.tracks = [];
    }
}

class ComboMaker {
    _getCurrentList() {
        let retVal = new Map();
        for( let combo of CombosListStore.getList() ){
            retVal.set( combo.tracks[0].id, combo.tracks[0] );
            retVal.set( combo.tracks[1].id, combo.tracks[1] );
        };
        return retVal;
    }
    _getPairByPopularity(trackList) {
        let currentList = this._getCurrentList();
        let pair = [];
        //sort tracks by popularity (not always are well sorted).
        let sortedTracks = trackList.sort((a,b) => {
            return b.popularity - a.popularity;
        });

        for( let track of sortedTracks ){
            //check if track isn't already in the paylist
            if( !currentList.has(track.id) ){
                pair.push( track );
            }else{
                console.warn('Track already in list: '+ track.name);
            }
            if( pair.length == 2 ){
                break;
            }
        }

        return pair;
    }
    
    makeCombo(artist) {
        let pairTracks;
        artist.getTopTracks('US')//@TODO set user country.
        .then( trackList => {
            pairTracks = this._getPairByPopularity(trackList);
            if( pairTracks.length < 2 ){
                //@TODO build combo by searching albums by popularity.
                console.warn('less than 2 songs found');
            }else{
                this._buildCombo(artist,pairTracks);
            }
        });
    }

    _buildCombo(artist, pairTracks){
            //@TODO analyze the tracks and catalog the combo.
            let combo = new Combo();
            combo.id = artist.id + pairTracks[0].id + pairTracks[1].id;
            combo.type = 'TRENDING';//CLASSIC, HIT, DISCOVER
            combo.artist = artist;
            combo.tracks = pairTracks;
            ComboActions.addCombo(combo);
    }

    suggestArtist( referenceArtists, amount = 0 ) {
        let suggestionOptions = new Map();
        let promises = [], promise;
        let retVal = new Promise((resolve, reject) => {
            for( let artist of referenceArtists ){
                promise = artist.getRelatedArtists();
                promise.then((artistsCollection) => {
                    for( let relArtist of artistsCollection ){
                        suggestionOptions.set( relArtist.id, relArtist );
                    }
                });
                promises.push( promise );
            }

            Promise.all( promises ).then(() =>{
                let suggestion = [...suggestionOptions.values()].sort((a,b) => {
                    return b.popularity - a.popularity;
                }).slice(0,amount);
                resolve(suggestion);
            });
        });
        return retVal;
    }
}

export default new ComboMaker();