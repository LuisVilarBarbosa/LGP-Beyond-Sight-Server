import React, { Component } from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import About from "../pages/about";
import Home from "../pages/home";
import Pdfs from "../pages/pdfs";
export default class Header extends Component {
  
  render() {
    return (
      <header>
    
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><Link to="/" exact="true">Home</Link></li>
              <li><Link to="/pages/about" exact="true">About</Link></li>
            </ul>
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