'use strict'
import React, {Component} from 'react';
import TrackItemRow from './TrackItemRow';

class ComboItem extends Component {
    render() {
        return (
            <table className="table">
                <TrackItemRow track={this.props.combo.tracks[0]} />
                <TrackItemRow track={this.props.combo.tracks[1]} />
            </table>
        );
    }
}

export default ComboItem;