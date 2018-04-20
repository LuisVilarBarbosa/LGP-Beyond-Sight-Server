import React, { Component } from 'react';
import DPFfile from '../pdf-sample2.pdf';

export default class pdfs extends Component {
    render() {
        return (
            <div>
            <h1>pdf page</h1>

            <object data={DPFfile} type="application/pdf" width="90%" height="600px">
            <a href={DPFfile}>test.pdf</a>
            </object>


            </div>
        );
    }
}