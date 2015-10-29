'use strict'
import React, {Component} from 'react';
import SearchBar from './SearchBar';
import ArtistsList from './ArtistsList';
import Footer from './Footer';
import CombosList from './CombosList';

class LayoutHome extends Component {
    render() {
        let state = this.props.state;
        let panelsConditionaStyle = {
            display: state.currentArtists.length > 0 ? 'block' : 'none'
        };
        return <div className="container-responsive">
            <header className="row text-center">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <SearchBar 
                            currentSearch={state.currentSearch} 
                            totalSelectedArtists={state.currentArtists.length}
                            totalSelectableArtists={state.totalArtists}/>
                    </div>
                </div>
            </header>
            <section className="row text-center" style={panelsConditionaStyle}>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        Showing {state.currentArtists.length} of {state.totalArtists} artists
                    </div>
                    <div className="panel-body">
                        <ArtistsList currentList={state.currentArtists}/>
                    </div>
                </div>
            </section>
            <section className="row text-center Layout-tracklist-row" style={panelsConditionaStyle}>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <CombosList currentList={state.currentCombos}/>
                    </div>
                </div>
            </section>
            <footer className="row text-center Footer-wrapper">
                <Footer/>
            </footer>
        </div>
    }
}
/*
            <div class="row">
                <SelectionList/>
            </div>
            <div class="row">
                <Playlist/>
            </div>
*/
export default {
    home: LayoutHome
}