import React, {Component} from 'react';
import './App.css';
import Content from "./components/Content";
import Footer from "./components/Footer";
import Pdf from "./pages/pdf";
import Pdf2 from "./pages/pdf2";
import NotFound from "./components/NotFound";
import {Switch, Route} from 'react-router-dom';
import './css/Common.css';

export default class App extends Component {

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact={true} path='/pages/pdf/:file_name' component={Pdf}/>
                    <Route exact={true} path='/pages/pdf2' component={Pdf2}/>
                    <Route exact={true} path='/' component={Content}/>
                    <Route component={NotFound} />
                </Switch>
                <Footer/>
            </div>
        );
    }
}