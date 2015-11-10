'use strict'
import React, {Component} from 'react';
import UserActions from './../actions/UserActions';
import UIActions from './../actions/UIActions';
import CombosListStore from './../stores/CombosListStore';
import {SUCCESS_MESSAGES} from './../constants/appConstants';

class ExportFrame extends Component {
    render() {
        setTimeout(this._handleRandomBtn.bind(this),100);
        let content = this.props.export && !this.props.success
            ? this.getFormContent() : null;
        content = this.props.export && this.props.success
            ? this.getSuccessContent() : content;
        return(
            <div className="ExportFrame-container">
                <div className="ExportFrame-box">
                    {content}
                </div>
            </div>
        );
    }

    getFormContent() {
        return(
            <div>
                <div className="form-group">
                    <label>Name your playlist (or take our suggestion)</label>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="your playlist's name" ref="name" />
                        <a href="#" onClick={this._handleRandomBtn.bind(this)} className="input-group-addon btn hcm-btn highlighted">
                            <span className="glyphicon glyphicon-random" aria-hidden="true"></span>
                        </a>
                    </div>
                </div>
                <button className="btn btn-default hcm-btn" onClick={this._handleExport.bind(this)}>Export</button>
            </div>
        );
    }

    getSuccessContent() {
        let message = SUCCESS_MESSAGES[~~(Math.random()*SUCCESS_MESSAGES.length)];
        return (
            <div>
                <p className="ExportFrame-success">
                    {message[0]}<br/>{message[1]}
                </p>
                <button className="btn btn-default hcm-btn" onClick={this._handleClose.bind(this)}>Close</button>
            </div>
        );
    }

    _getRandomName() {
        let names = new Set(['Hit','Combo','Max']);
        let capitalize = (value) => {
            return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        };
        for( let track of CombosListStore.getTracks() ){
            for( let word of track.name.split(' ') ){
                names.add( capitalize(word).replace(/[()\[\]{}-]/g,'') );
            }
        }
        let words = 2+~~(Math.random()*3);
        let newName = [];
        let arrNames = [...names.values()];
        while( words > 0 ){
            newName.push( (arrNames.splice( ~~(Math.random()*arrNames.length),1)[0]) );
            --words;
        }
        
        return newName.join(' ');
    }

    _handleRandomBtn() {
        if(!this.refs.name) return;
        this.refs.name.getDOMNode().value = this._getRandomName();
    }

    _handleExport() {
        let name = this.refs.name.getDOMNode().value.trim();
        name = name != ''? name : 'Just a Hit Combo Factory playlist :)';
        UserActions.exportPlaylist(name);
    }

    _handleClose() {
        UIActions.closeExport();
    }
}

export default ExportFrame;