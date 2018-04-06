import React, { Component } from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import About from "../pages/about";
import Home from "../pages/home";

export default class Header extends Component {
  
  render() {
    return (
      <header>
    
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li><Link to="/" exact>Home</Link></li>
              <li><Link to="/pages/about" exact>About</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/pages/about' component={About}/>
      </Switch>
      
      </header>
    );
  }

}