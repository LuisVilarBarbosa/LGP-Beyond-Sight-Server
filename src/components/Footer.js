import React, {Component} from 'react';
import '../css/Footer.css';

export default class Footer extends Component {

    render() {
        return (
            <footer className="container-fluid text-center">
                <a href="#myPage" title="To Top">
                    <span class="glyphicon glyphicon-chevron-up"></span>
                </a>
                <p>(C) BEYOND SIDE</p>
            </footer>
        );
    }

}