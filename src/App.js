import React, {Component} from 'react';
import './App.css';
import './css/Common.css';
import Footer from "./components/Footer";
import Content from "./components/Content";


export default class App extends Component {

    render() {
        return (
            <div className="App">
                <Content/>
                <Footer/>
            </div>
        );
    }

}