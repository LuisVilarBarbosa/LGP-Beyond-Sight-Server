import React, { Component } from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import About from "../pages/about";
import Home from "../pages/home";
import Pdfs from "../pages/pdfs";
export default class Header extends Component {

  render() {
    return (
      <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-faded">
              <a className="navbar-brand" href="#">Navbar</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div className="navbar-nav">
                      <a className="nav-item nav-link active" href="/">Home </a>
                      <a className="nav-item nav-link" href="/pages/about">About</a>
                  </div>
              </div>
          </nav>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/pages/about' component={About}/>
        <Route path='/pages/pdfs' component={Pdfs}/>
      </Switch>
      
      </header>
    );
  }

}