'use strict'
import React, {Component} from 'react';

class ArtistItem extends Component {
    render() {
        let profilePicAlt = this.props.artist.name + "'s profile pic";
        let image = this.props.artist.getImage("m") || { url: '' };
        let coverStyle = {
            backgroundImage: `url('${image.url}')`
        };
        return (
            <div className="col-sm-6 col-md-4 Artist-card">
                <div className="thumbnail Artist-card-front">
                    <div>
                        <div style={coverStyle} className="Artist-img-container img-responsive" />
                    </div>
                    <div className="caption">
                        <h4>{this.props.artist.name}</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default ArtistItem;