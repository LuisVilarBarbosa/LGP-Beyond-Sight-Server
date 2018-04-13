import React, { Component } from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import About from "../pages/about";
import Home from "../pages/home";
import Pdfs from "../pages/pdfs";
export default class Header extends Component {

  render() {
    return (
      <header>
          <nav class="navbar navbar-expand-lg navbar-light bg-faded">
              <a class="navbar-brand" href="#">Navbar</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div class="navbar-nav">
                      <a class="nav-item nav-link active" href="/">Home </a>
                      <a class="nav-item nav-link" href="/pages/about">About</a>
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