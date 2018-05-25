import React, {Component} from 'react';
import { Link } from 'react-router-dom'

export default class NotFound extends Component {

    render() {
        return (
            <div className="notFound">
                <div id="pdf">
                    <div className="pdf-viewer">
                        <div className="not-found">
                            <h3>Page Not Found</h3>
                            <p>Sorry, there is nothing to see here.</p>
                            <p><Link to="/">Go Back To Homepage</Link></p>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}