'use strict'
import React, {Component} from 'react';
import ComboItem from './ComboItem';

class CombosList extends Component {
    constructor(...props) {
        super(...props);
        this.defaultProps = {
            currentList: []
        }
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <button className="btn btn-default">Export to Spotify</button>
                </div>
                <div className="ComboList-container">
                    {this.props.currentList.map((combo) => {
                        return <ComboItem key={combo.id} combo={combo}/>
                    })}
                </div>
            </div>
        );
    }
}

export default CombosList;