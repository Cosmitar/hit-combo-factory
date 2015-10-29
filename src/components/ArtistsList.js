'use strict'
import React, {Component} from 'react';
import ArtistItem from './ArtistItem';

class ArtistsList extends Component {
    constructor(...props) {
        super(...props);
        this.defaultProps = {
            currentList: []
        }
    }

    render() {
        return (
            <div>
                {this.props.currentList.map((artist) => {
                    return <ArtistItem key={artist.id} artist={artist}/>
                })}
            </div>
        );
    }
}

export default ArtistsList;