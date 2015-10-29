'use strict'
import React, {Component} from 'react';
import ArtistsListActions from './../actions/ArtistsListActions';

class ArtistItemControl extends Component {
    render() {
        return (
            <div className="col-sm-6 col-md-4 Artist-card">
                <div className="thumbnail Artist-card-back">
                    <a href="#" onClick={this._removeClickHandler.bind(this)}>
                        <span className="glyphicon glyphicon-remove alert-danger" aria-hidden="true"></span>
                    </a>
                </div>
            </div>
        );
    }

    _removeClickHandler(e) {
        e.preventDefault();
        ArtistsListActions.removeArtist( this.props.artist );
    }
}

export default ArtistItemControl;