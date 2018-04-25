import React, {Component, ReactDOM} from 'react';

import About from "./Content/About";
import Download from "./Content/Download";
import Contact from "./Content/Contact";
import '../css/Content.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
var Scroll = require('react-scroll');
var Link = Scroll.Link;
var DirectLink = Scroll.DirectLink;
var Element = Scroll.Element;
var Events = Scroll.Events;
var scroll = Scroll.animateScroll;
var scrollSpy = Scroll.scrollSpy;


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
                    <button onClick={this.scrollToTop} id="top-btn" title="Go to top">To Top</button></div>

                <About/>
                <Download/>
                <Contact/>
            </div>
        );
    }

}