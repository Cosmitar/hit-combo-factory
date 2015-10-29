'use strict'
import React, {Component} from 'react';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import Layouts from './components/Layouts'

import SearchStore from './stores/SearchStore';
import ArtistsListStore from './stores/ArtistsListStore';
import CombosListStore from './stores/CombosListStore';

let getState = () => {
    return {
        currentSearch: SearchStore.getSearch(),
        currentArtists: ArtistsListStore.getList(),
        totalArtists: ArtistsListStore.getTotal(),
        currentCombos: CombosListStore.getList(),
        playlistDuration: CombosListStore.getDuration()
    }
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = getState();
    }

    componentDidMount() {
        SearchStore.addChangeListener(this._onChange.bind(this));
        ArtistsListStore.addChangeListener(this._onChange.bind(this));
        CombosListStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        SearchStore.removeChangeListener(this._onChange.bind(this));
        ArtistsListStore.removeChangeListener(this._onChange.bind(this));
        CombosListStore.removeChangeListener(this._onChange.bind(this));
    }

    render() {
        return <Layouts.home state={this.state}/>;
    }

    _onChange() {
        this._updateState();
    }

    _updateState() {
        this.setState(getState());
    }

}

export default App;