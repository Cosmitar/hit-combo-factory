'use strict'
import React, {Component} from 'react';
import ComboItem from './ComboItem';
import UIActions from './../actions/UIActions';
import UserStore from './../stores/UserStore';

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
                                <a href="#" onClick={this._exportHandler.bind(this)} className="btn-spotify-square">
                                    <img src="style/images/create_playlist-green.svg" />
                                </a>
                                <a type="button" onClick={this._exportHandler.bind(this)} className="btn btn-default navbar-btn hcm-btn hidden">Export to Spotify</a>
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

    _exportHandler(e) {
        e.preventDefault();
        if( !UserStore.isLoggedIn() ){
            //show login
            UIActions.showLogin();
        }else{
            UIActions.showExport();
            //show export
        }
    }
}

export default CombosList;