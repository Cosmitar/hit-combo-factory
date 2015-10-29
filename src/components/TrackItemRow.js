'use strict'
import React, {Component} from 'react';

class TrackItemRow extends Component {
    render() {
        return (
            <tr className="ComboItem-item-row">
                <td className="ComboItem-first-cell">
                    {this.props.track.name}
                </td>
                <td>
                    <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
                </td>
                <td>
                    <a href="#" onClick={this._handleSongRemove.bind(this)}>
                        <span className="glyphicon glyphicon-remove text-danger" aria-hidden="true"></span>
                    </a>
                </td>
            </tr>
        );
    }

    _handleSongRemove(e) {
        e.preventDefault();
        ComboActions.removeTrack(this.props.track);
    }
}

export default TrackItemRow;