import React, {Component} from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import Pdf from "./pages/pdf";
import {Switch, Route} from 'react-router-dom';

export default class App extends Component {

    render() {
        return (
            <div className="App">
                <Header/>

                <Switch>
                <Route path='/pages/pdf' component={Pdf}/>
                </Switch>

                <Content/>
                <Footer/>
            </div>
        );
    }

}