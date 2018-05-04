import React, {Component} from 'react';
import './App.css';
import Content from "./components/Content";
import Footer from "./components/Footer";
import Pdf from "./pages/pdf";
import {Switch, Route} from 'react-router-dom';
import './css/Common.css';
  
export default class App extends Component {

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path='/pages/pdf/:file_name' component={Pdf}/>
                    <Route path='/' component={Content}/>
                </Switch>
                <Footer/>
            </div>
        );
    }

}
