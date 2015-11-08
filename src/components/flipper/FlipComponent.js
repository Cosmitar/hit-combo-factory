'use strict'
import React, {Component} from 'react';

class FlipContainer extends Component {
    render() {
        let wrapperClassName = "flip-container " + this.props.className;
        return (
            <div className={wrapperClassName} onTouchStart={this._onTouchStart.bind(this)}>
                <div className="flipper">
                    <div className="front">
                        {this.props.children[0]}
                    </div>
                    <div className="back">
                        {this.props.children[1]}
                    </div>
                </div>
            </div>
        );
    }

    _onTouchStart(e) {
        //classList.toggle('hover');
    }
}

export default FlipContainer;