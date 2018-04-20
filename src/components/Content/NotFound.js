import React, {Component} from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

export default class Content extends Component {

    render() {
        return (
            <div>
			<h1>Page Not Found</h1>
				<p>Sorry, there is nothing to see here.</p>
				<p><Link to="app">Back to Home</Link></p>
            </div>
        );
    }

}