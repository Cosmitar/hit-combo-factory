'use strict'
import React, {Component} from 'react';
import TrackItemRow from './TrackItemRow';
import ComboActions from './../actions/ComboActions';

class ComboItem extends Component {
    render() {
        return (
            <table className="table">
                {this._renderItems()}
            </table>
        );
    }

    _renderItems() {
        let items = [];
        this.props.combo.tracks.forEach((item) => {
            items.push(
                <TrackItemRow track={item} 
                    onRemoveTrack={this._onRemoveTrack.bind(this)}
                    onPlayTrack={this._onPlayTrack.bind(this)}/>
            );
        });
        return items;
    }

     _onRemoveTrack(track) {
        ComboActions.removeTrack(track);
        ComboActions.makeCombo(this.props.combo.artist);
     }

     _onPlayTrack(track) {
        console.log('play');
     }
}

export default ComboItem;