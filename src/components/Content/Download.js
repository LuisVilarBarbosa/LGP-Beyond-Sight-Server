import React, {Component} from 'react';
var Scroll = require('react-scroll');
var Link = Scroll.Link;
var DirectLink = Scroll.DirectLink;
var Element = Scroll.Element;
var Events = Scroll.Events;
var scroll = Scroll.animateScroll;
var scrollSpy = Scroll.scrollSpy;

export default class Download extends Component {

    render() {
        return (
            <Element name="download" id="download">
                <div id="downloadSection" className="text-center">
                    <h1>DOWNLOAD</h1>
                    <div className="img-container">
                        <img src={require('../../resources/images/comp.png')}/>
                    </div>
                    <button className="btn">
                    </button>
                </div>
            </Element>
        );
    }

}
/*    <img src={require('../../resources/images/buttons/btn3.png')}/>*/