'use strict'
import React, {Component} from 'react';

class WaterMark extends Component {
    render() {
        return (
            <div className={this.props.className + " WaterMark-continer" }>
                <img src="style/images/watermark.png" className="WaterMark-image" />
            </div>
        );
    }
}

export default WaterMark;