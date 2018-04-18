import React, {Component} from 'react';
import '../../css/Contact.css';

export default class Contact extends Component {

    render() {
        return (
            <div id="contact" className="jumbotron">
                <div className="container-fluid">
                    <h1 className="text-center">CONTACT</h1>
                    <br/>
                    <div className="row">
                        <div className="col-sm-5">
                            <p>Contact us</p>
                            <p>*picture here*</p>
                        </div>
                        <div className="col-sm-4">
                            <div className="row">
                                <div className="col-sm-6 form-group">
                                    <input className="form-control" id="name" name="name" placeholder="Name" type="text" required/>
                                </div>
                                <div className="col-sm-6 form-group">
                                    <input className="form-control" id="email" name="email" placeholder="Email" type="email" required/>
                                </div>
                            </div>
                            <textarea className="form-control" id="comments" name="comments" placeholder="Comment" rows="5"/>
                            <br/>
                            <div className="row">
                                <div className="col-sm-12 form-group">
                                    <button className="btn btn-default float-right" type="submit">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
