'use strict'
import React, {Component} from 'react';
import ArtistItem from './ArtistItem';
import ArtistItemControl from './ArtistItemControl';
import Flipper from './flipper/FlipComponent';

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
                    return <Flipper key={artist.id} className="Artist-card">
                        <ArtistItem artist={artist}/>
                        <ArtistItemControl artist={artist}/>
                    </Flipper>
                })}
            </div>
        );
    }
}

export default ArtistsList;