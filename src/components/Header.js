import React, { Component } from 'react';

export default class Header extends Component {

    render() {
        return (
            <header>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">Logo</a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="#about">ABOUT</a></li>
                                <li><a href="#contact">CONTACT</a></li>
                                <li><a href="#download">DOWNLOAD</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }

}