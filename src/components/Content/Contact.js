import React, {Component} from 'react';
var Scroll = require('react-scroll');
var Element = Scroll.Element;

export default class Contact extends Component {

    render() {
        return (
            <Element name="contact" id="contact">
                <div id="contactWrapper">
                    <div id="contactSection" className="container">
                    <h1 className="text-center">CONTACT</h1>
                    <div className="row">
                        <div className="col-md-5">
                            <img src={require('../../resources/images/mail.png')} alt="Contact us"/>
                        </div>
                        <div className="col-md-7">
                            <div className="form row">
                                <div className="col-sm-6 form-group">
                                    <input className="form-control" id="name" name="name" placeholder="Name" type="text" required/>
                                </div>
                                <div className="col-sm-6 form-group">
                                    <input className="form-control" id="email" name="email" placeholder="Email" type="email" required/>
                                </div>
                                <div className="col-sm-12">
                                    <textarea className="form-control" id="comments" name="comments" placeholder="Comment" rows="5"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 form-group">
                                    <button className="btn"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </Element>
        );
    }

}
