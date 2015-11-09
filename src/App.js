'use strict'
import React, {Component} from 'react';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import Layouts from './components/Layouts'
import Modal from './components/modal/ModalComponent';
import LoginFrame from './components/LoginFrame';
import WaterMark from './components/WaterMark';

import SearchStore from './stores/SearchStore';
import ArtistsListStore from './stores/ArtistsListStore';
import CombosListStore from './stores/CombosListStore';
import UserStore from './stores/UserStore';

let getState = () => {
    return {
        currentSearch: SearchStore.getSearch(),
        currentArtists: [...ArtistsListStore.getList().values()],
        totalArtists: ArtistsListStore.getTotal(),
        currentCombos: CombosListStore.getList(),
        playlistDuration: CombosListStore.getDuration(),
        isLoggedIn: UserStore.isLoggedIn(),
        loginUrl: UserStore.getLoginUrl(),
        showLogin: false
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
        UserStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        SearchStore.removeChangeListener(this._onChange.bind(this));
        ArtistsListStore.removeChangeListener(this._onChange.bind(this));
        CombosListStore.removeChangeListener(this._onChange.bind(this));
        UserStore.removeChangeListener(this._onChange.bind(this));
    }

    render() {
        //        <button onClick={this._openLoginModal.bind(this)}>open</button>
        return (
            <Layouts.home state={this.state}>
                <WaterMark className={this.state.currentArtists.length == 0? 'block':'hidden'}/>
                <Modal isOpen={this.state.showLogin} onClose={this._onCloseLoginModal.bind(this)}>
                    <LoginFrame isLoggedIn={this.state.isLoggedIn} src={this.state.loginUrl}/>
                </Modal>
            </Layouts.home>
        );
    }

    _onCloseLoginModal() {
        this.setState({showLogin: false});
    }
    _openLoginModal() {
        this.setState({showLogin: true});
    }

    _onChange() {
        this._updateState();
    }

    _updateState() {
        let newState = getState();
        //auto close login modal when login callback
        newState.showLogin = !this.state.isLoggedIn && newState.isLoggedIn? false : newState.showLogin;
        this.setState(newState);
    }

}

export default App;