'use strict'
import React, {Component} from 'react';
import SearchBar from './SearchBar';
import ArtistsList from './ArtistsList';
import Footer from './Footer';
import CombosList from './CombosList';

class LayoutHome extends Component {
    /*constructor(...props){
        super(...props);
    }*/
    
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
                        <h5><span className="glyphicon glyphicon-user" aria-hidden="true"> </span> {state.currentArtists.length} / {state.totalArtists}</h5>
                    </div>
                    <div className="panel-body">
                        <ArtistsList currentList={state.currentArtists}/>
                    </div>
                </div>
            </section>
            <section className="row text-center Layout-tracklist-row" style={panelsConditionaStyle}>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <CombosList currentList={state.currentCombos} playlistDuration={state.playlistDuration}/>
                    </div>
                </div>
            </section>
            <footer className="row text-center Footer-wrapper">
                <Footer/>
            </footer>
            {this.props.children}
        </div>
    }
}

export default {
    home: LayoutHome
}