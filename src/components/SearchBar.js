'use strict'
import React, {Component} from 'react';
import SearchActions from './../actions/SearchActions';

class SearchBar extends Component {
    componentDidMount() {
        this._setInitialUIState();
    }
    render() {
        let disableSuggestion = this.props.totalSelectedArtists < 1;
        let artistLeft = this.props.totalSelectableArtists != this.props.totalSelectedArtists;
        let restartConditionalStyle = {
            display: artistLeft? 'none':'block'
        };
        let searchConditionalStyle = {
            display: artistLeft? 'block': 'none'
        };
        return (
            <div className="center-block">
                <form className="SearchBar-form form-inline" onSubmit={this._handleSubmit.bind(this)}  style={searchConditionalStyle}>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-btn">
                                <input className="btn btn-default" type="submit" value="Search" />
                            </span>
                            <input type="text" className="form-control" placeholder="type an artist" ref="search" />
                        </div>
                    </div>
                    <button className="btn btn-default" onClick={this._handleSuggest.bind(this)} disabled={disableSuggestion}>Suggest artists</button>
                </form>
                <div style={restartConditionalStyle}>
                    <button className="btn btn-default" onClick={this._handleRestart.bind(this)}>Restart</button>
                </div>
            </div>
        );
    }

    _setInitialUIState() {
        let searchNode = this.refs.search.getDOMNode();
        //offset in time to wait React shows the input element on restart process
        setTimeout(function(){
            searchNode.focus();
        },0);
        
    }

    _handleSubmit(e) {
        console.log('submit');
        e.preventDefault();
        let searchNode = this.refs.search.getDOMNode();
        let text = searchNode.value.trim();
        if( text != '' ){
            this._search(text);
        }
        searchNode.value = '';
    }

    _handleSuggest(e) {
        e.preventDefault();
        SearchActions.suggestArtist();
    }

    _handleRestart(e){
        SearchActions.restart();
        this._setInitialUIState();
    }

    _search(text) {
        SearchActions.search(text);
    }
}

export default SearchBar;