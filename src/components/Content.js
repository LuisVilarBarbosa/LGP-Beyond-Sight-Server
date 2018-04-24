import React, {Component, ReactDOM} from 'react';
import About from "./Content/About";
import Download from "./Content/Download";
import Contact from "./Content/Contact";
import '../css/Content.css';

export default class Content extends Component {

    render() {
        return (
            <div>
                <About/>
                <Download/>
                <Contact/>
            </div>
        );
    }

}