import React, {Component} from 'react';

export default class Footer extends Component {

    render() {
        return (
            <div>
                <footer class="container-fluid text-center">
                    <a href="#myPage" title="To Top">
                        <span class="glyphicon glyphicon-chevron-up"></span>
                    </a>
                    <p>This is footer</p>
                </footer>
            </div>
        );
    }

}