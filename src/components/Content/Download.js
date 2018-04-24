import React, {Component} from 'react';

export default class Download extends Component {

    render() {
        return (
            <div id="download">
                <div id="downloadSection" className="text-center">
                    <h1>DOWNLOAD</h1>
                    <div className="img-container">
                      <img src={require('../../resources/images/mail.png')}/>
                    </div>
                    <button className="btn">
                    </button>
                </div>
            </div>
        );
    }

}
/*    <img src={require('../../resources/images/buttons/btn3.png')}/>*/