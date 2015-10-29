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
                <div className="panel-heading text-left">
                        <div className="navbar-header">
                            <span className="navbar-brand" href="#">
                                Playlist
                            </span>
                        </div>
                        <div className="container-fluid">
                            <ul className="nav navbar-nav">
                                <li>
                                    <p className="navbar-text">duration: {this.props.playlistDuration}</p>
                                </li>
                                <li><button type="button" className="btn btn-default navbar-btn">Export to Spotify</button></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><button type="button" className="btn btn-default navbar-btn">Preview</button></li>
                            </ul>
                        </div>
                    
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