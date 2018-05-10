import React, {Component} from 'react';

import About from "./Content/About";
import Download from "./Content/Download";
import Contact from "./Content/Contact";
import '../css/Content.css';
var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;

export default class Content extends Component {
    constructor(props) {
        super(props);
        this.scrollToTop = this.scrollToTop.bind(this);
    }
    scrollToTop() {
        scroll.scrollToTop();
    }
    render() {
        return (
            <div>
                <div>
                    <button onClick={this.scrollToTop} id="top-btn" title="Go to top"><i className="fas fa-chevron-up"></i></button></div>

                <About/>
                <Download/>
                <Contact/>
            </div>
        );
    }

}