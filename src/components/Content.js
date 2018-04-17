import React, {Component} from 'react';
import About from "./Content/About";
import Download from "./Content/Download";
import Contact from "./Content/Contact";

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