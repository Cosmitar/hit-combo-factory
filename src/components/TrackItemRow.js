'use strict'
import React, {Component} from 'react';

class TrackItemRow extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            playingSong: false
        }
    }
    render() {
        let iconClassName = this.props.track.id
            ? 'glyphicon glyphicon-remove text-danger'
            : 'glyphicon glyphicon-refresh'
        return (
            <tr className="ComboItem-item-row">
                <td className="ComboItem-first-cell">
                    {this.props.track.name}
                </td>
                <td className="hidden">
                    <a href="#" onClick={this._handlePlayTrack.bind(this)}>
                        <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
                    </a>
                </td>
                <td>
                    <a href="#" onClick={this._handleRemoveTrack.bind(this)}>
                        <span className={iconClassName} aria-hidden="true"></span>
                    </a>
                </td>
            </tr>
        );
    }

    _handlePlayTrack(e){
        e.preventDefault();
        //...
        this.props.onPlayTrack(this.props.track);
    }

    _handleRemoveTrack(e) {
        e.preventDefault();
        if( !this.props.track.id ) return;

        this.state.removingSong = true;
        this.setState(this.state);
        this.props.onRemoveTrack(this.props.track);
    }
}
TrackItemRow.defaultProps = {
    onRemoveTrack: ()=>{},
    onPlayTrack: ()=>{}
}

export default TrackItemRow;