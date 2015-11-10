'use strict'
import React, {Component} from 'react';

class WaterMark extends Component {
    render() {
        return (
            <div className={this.props.className + " WaterMark-container" }>
                <div className="mainCopy">
                    <h3>How it works</h3>
                    Choose an artist, let me suggest you the others.<br/>
                    You'll get a playlist with 2 Hit Combo for each artist of your choice.<br/>
                    <small>Relax! you can remove an artis or a song if you don't like it.</small>
                    <br/><br/>
                    built with <img src="style/images/spotify-logo.png" width="70" className="spotify-logo"/> Web API
                </div>
                <img src="style/images/watermark.png" className="WaterMark-image" />

            </div>
        );
    }
}

export default WaterMark;