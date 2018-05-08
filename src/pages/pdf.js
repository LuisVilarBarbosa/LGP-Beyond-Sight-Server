import React, { Component } from 'react';
var pdfjsLib = require('pdfjs-dist');

export default class pdfs extends Component {
    state={
        currentPage: 1,
        isSync: true,
        file: null,
        numPages: 1,
    };

    async componentDidMount(){
        function importAll(r) {
             let files = {};
             r.keys().map((item, index) => { files[item.replace('./', '')] = r(item); return true});
             return files;
        }

        const files = importAll(require.context('../', false, /\.pdf$/));
        this.setState({file:files[this.props.match.params.file_name]});

        let numPages = null;
        let numPagesN = null;

        /* This returns some info about the file */
        numPages = pdfjsLib.getDocument(files[this.props.match.params.file_name]).then(function (doc) {
            numPages = doc.numPages;
            return numPages;
        });
        numPagesN = await numPages.then(function(value){
            return value});
        this.setState({numPages: numPagesN});
    }

    previousPage(){
        if(this.state.currentPage > 1)
        {
            this.setState({currentPage: this.state.currentPage - 1});
        }
    };

    nextPage(){
        if(this.state.currentPage < this.state.numPages)
        {
            this.setState({currentPage: this.state.currentPage + 1});
        }

    };

    goToPage(newPage){
        if(newPage >= 1 && newPage <= this.state.numPages)
        {
            this.setState({currentPage: newPage});
        }
    };


    render() {
        if(this.state.file === null)
            return (
                <div id="pdf">
                    <h3>Failed loading file</h3>
                </div>
            );
        else
            return (
                <div id="pdf">
                    <div className="pdf-viewer">
                        <div className="container">
                            <button className="arrow-btn" alt="Previous Page" onClick={()=>{this.previousPage()}}><i className="fas fa-arrow-left"></i></button>
                            <object data={this.state.file + '#page=' + this.state.currentPage } type="application/pdf" width="80%" height="600px">
                                <a href={this.file}>test.pdf</a>
                            </object>
                            <button className="arrow-btn" alt="Next Page" onClick={()=>{this.nextPage()}}><i className="fas fa-arrow-right"></i></button>
                        </div>
                    </div>
                    <div className="pdf-pages container">
                        Page {this.state.currentPage} of {this.state.numPages}
                    </div>
                </div>

            );
    }
}
/* <button onClick={()=>{this.previousPage()}}>Previous</button>
                     <button onClick={()=>{this.nextPage()}}>Next</button>


                     + "&toolbar=0&navpanes=0&scrollbar=0"*/