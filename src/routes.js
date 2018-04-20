"use strict";
var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;
var routes = (
  <Route name="app" path="/" handler={require('./components/app')}>
    <DefaultRoute handler={require('./components/homePage')} />
    //<Route name="about" handler={require('./components/about/aboutPage')} />
    //<Route name="news" handler={require('./components/news/news')} />
    <Route name="not-found" handler={require('./components/Content/NotFound')} />
    //<Redirect from="about-us" to="about" />
    <Redirect from="*" to="not-foundt" />
  </Route>
);
module.exports = routes;