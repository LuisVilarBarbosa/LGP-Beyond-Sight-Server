import React, {Component} from 'react';
var rp = require('request-promise');
var Scroll = require('react-scroll');
var Element = Scroll.Element;

export default class Contact extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      comments: ''
    };

    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleComment = this.handleComment.bind(this);

    this.sendContact = this.sendContact.bind(this);
  }

  render() {
    return (
        <Element name="contact" id="contact">
          <div id="contactWrapper">
            <div id="contactSection" className="container">
              <h1 className="text-center">CONTACT</h1>
              <div className="row">
                <div className="col-md-5">
                  <img src={require('../../resources/images/mail.png')} alt="Contact Form"/>
                </div>
                <div className="col-md-7">
                  <div className="form row">
                    <div className="col-sm-6 form-group">
                      <input className="form-control" id="name" name="name" placeholder="Name" type="text" value={this.state.name} onChange={this.handleName} required/>
                    </div>
                    <div className="col-sm-6 form-group">
                      <input className="form-control" id="email" name="email" placeholder="Email" type="email" value={this.state.email} onChange={this.handleEmail} required/>
                    </div>
                    <div className="col-sm-12 form-group">
                      <textarea className="form-control" id="comments" name="comments" placeholder="Comment" value={this.state.comments} onChange={this.handleComment} rows="5"/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 form-group">
                      <button aria-label="Send Email" className="btn" onClick={this.sendContact}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Element>
    );
  }

  sendContact() {
    console.log('My name is:' + this.state.name + '\n' +
        'My email is:' + this.state.email + '\n' +
        'My comment is:' + this.state.comments);
    let options = {
      method: 'POST',
      uri: 'http://localhost:8000/email',
      body: {
        name: this.state.name,
        email: this.state.email,
        message: this.state.comments
      },
      json: true // Automatically stringifies the body to JSON
    };

    rp(options).then(function(parsedBody) {
      alert("Message sent.");
    }).catch(function(err) {
      alert("Message failed to send.")
    });
  }

  handleName(event) {
    this.setState({name: event.target.value});
    //console.log(event.target.value);
  }

  handleEmail(event) {
    this.setState({email: event.target.value});
    //console.log(event.target.value);
  }

  handleComment(event) {
    this.setState({comments: event.target.value});
    //console.log(event.target.value);
  }

}
