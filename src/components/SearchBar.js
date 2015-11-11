'use strict'
import React, {Component} from 'react';
import SearchActions from './../actions/SearchActions';
import CombosListStore from './../stores/CombosListStore';

class SearchBar extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            suggesting: false
        };
    }

    componentDidMount() {
        this._setInitialUIState();
        CombosListStore.addChangeListener(this._onChangeComboStore.bind(this));
    }

    componentWillUnmount() {
        CombosListStore.removeChangeListener(this._onChangeComboStore.bind(this));
    }

    render() {
        let disableSuggestion = this.props.totalSelectedArtists < 1 || this.state.suggesting;
        let artistLeft = this.props.totalSelectableArtists != this.props.totalSelectedArtists;
        return (
            <div className="center-block">

                <ul className={artistLeft? "nav nav-pills SearchBar-nav-container" : "hidden" }>
                    <li>
                        <form onSubmit={this._handleSubmit.bind(this)} className={artistLeft? "SearchBar-form form-inline" : "hidden" }>
                            <div className="form-group">
                                <div className="input-group">
                                    <a href="#" onClick={this._handleSearchBtn.bind(this)} className="input-group-addon btn hcm-btn highlighted">
                                        <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                                    </a>
                                    <input type="text" className="form-control" placeholder="Type an artist" ref="search" />
                                </div>
                            </div>
                            <input type="submit" className="hidden"/>
                        </form>
                    </li>
                    <li>
                        <button className={artistLeft? "btn btn-default hcm-btn" : "hidden" } onClick={this._handleSuggest.bind(this)} disabled={disableSuggestion}>Suggest me artists</button>
                    </li>
                </ul>
                <div className={!artistLeft? "block" : "hidden" }>
                    <button className="btn btn-default hcm-btn" onClick={this._handleRestart.bind(this)}>Restart</button>
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

    _handleSearchBtn(e) {
        this._handleSubmit(e);
    }

    _handleSubmit(e) {
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
        this.setState({
            suggesting: true
        });
        SearchActions.suggestArtist();
    }

    _handleRestart(e){
        SearchActions.restart();
        this._setInitialUIState();
    }

    _search(text) {
        SearchActions.search(text);
    }

    _onChangeComboStore() {
        this.setState({
            suggesting: CombosListStore.isSuggesting()
        })
    }
}

export default SearchBar;