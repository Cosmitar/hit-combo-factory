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
                    <ul className="nav nav-pills">
                            <li>
                                <a type="button" className="btn btn-default navbar-btn hcm-btn">Export to Spotify</a>
                            </li>
                            <li className="pull-right">
                                <h5><span className="glyphicon glyphicon-time" aria-hidden="true"></span> {this.props.playlistDuration}</h5>
                            </li>
                        </ul>
                </div>
                <div className="ComboList-container">
                    {this.props.currentList.map((combo) => {
                        return <ComboItem key={combo.key} combo={combo}/>
                    })}
                </div>
            </div>
        );
    }
}

export default CombosList;