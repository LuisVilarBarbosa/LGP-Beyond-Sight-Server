import React, {Component} from 'react';
var Scroll = require('react-scroll');
var Element = Scroll.Element;

export default class Download extends Component {

    render() {
        return (
            <Element name="download" id="download">
                <div id="downloadSection" className="text-center">
                    <h1>DOWNLOAD</h1>
                    <div className="img-container">
                        <img src={require('../../resources/images/comp.png')} alt="Download Beyond Sight Bellow"/>
                    </div>
                    <button aria-label="Download Here" className="btn">
                    </button>
                </div>
            </Element>
        );
    }

}