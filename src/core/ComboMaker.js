'use strict'
import ComboActions from './../actions/ComboActions';

class Combo {
    constructor(){
        this.type;
        this.artist;
        this.tracks = [];
    }
}

class ComboMaker {
    makeCombo(artist) {
        let selectedArtist = artist;
        let pairTracks;
        selectedArtist.getTopTracks('US')//@TODO set user country.
        .then( trackList => {
            if( trackList.length < 2 ){
                //save combo searching albums by popularity.
                console.warn('Artist has less than 2 songs on top-tracks');
            }
            //sort tracks by popularity (not always are well sorted).
            pairTracks = trackList.sort((a,b) => {
                return b.popularity - a.popularity;
            }).slice(0,2);//@TODO check if two songs isn't it the same on different versions
            //@TODO check if track isn't already in the paylist

            //@TODO analyze the tracks and catalog the combo.
            let combo = new Combo();
            combo.id = selectedArtist.id + pairTracks[0].id + pairTracks[1].id;
            combo.type = 'TRENDING';//CLASSIC, HIT, DISCOVER
            combo.artist = selectedArtist;
            combo.tracks = pairTracks;
            ComboActions.addCombo(combo);
        });
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