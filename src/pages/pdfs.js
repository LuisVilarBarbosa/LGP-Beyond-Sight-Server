import React, { Component } from 'react';
import { Page, Document } from 'react-pdf';
import DPFfile from '../pdf-sample.pdf';

export default class pdfs extends Component {

    openNewWindow() {
        window.open('http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf', 'PDF_View', 'toolbar=0,status=0,width=548,height=325');
    }

    state = {
        numPages: null,
        pageNumber: 1,
    }
     
    onDocumentLoad = ({ numPages }) => {
        this.setState({ numPages });
    }

    render() {
        const { pageNumber, numPages } = this.state;
        return (
            <div>
            <h1>pdf page</h1>

            {/*ONE WAY*/}
            <p onClick={this.openNewWindow}>Click here to open a new window</p>

            {/*OTHER WAY -- NOT WORKING */}
            <Document
            file={DPFfile}
            onLoadSuccess={this.onDocumentLoad}
            >
            <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>

            </div>
        );
    }
}