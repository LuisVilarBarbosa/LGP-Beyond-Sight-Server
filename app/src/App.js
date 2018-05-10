import React, {Component} from 'react';
import './App.css';
import Content from "./components/Content";
import Footer from "./components/Footer";
import Pdf from "./pages/pdf";
import NotFound from "./components/NotFound";
import {Switch, Route} from 'react-router-dom';
import './css/Common.css';

/*https://stackoverflow.com/questions/33039152/split-pdf-in-separate-file-in-javascript*/

export default class App extends Component {

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact={true} path='/pages/pdf/:file_name' component={Pdf}/>
                    <Route exact={true} path='/' component={Content}/>
                    <Route component={NotFound} />
                </Switch>
                <Footer/>
            </div>
        );
    }
}