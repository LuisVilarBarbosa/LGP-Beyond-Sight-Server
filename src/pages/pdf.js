import React, { Component } from 'react';
var pdfjsLib = require('pdfjs-dist');

export default class pdfs extends Component {
    state={
        currentPage: 1,
        isSync: true,
        file: null,
        numPages: 1,
    };

    /*
    https://github.com/tcr/scissors
    https://github.com/galkahana/HummusJS
    https://blog.stvmlbrn.com/2016/12/01/search-and-split-pdf-files-with-node.html
     */

    async componentDidMount(){

        //One way is to load all files (because require works before variable declaration)
        //then select the file we want
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

            console.log('# Document Loaded');
            console.log('Number of Pages: ' + numPages);
            console.log();
            return numPages;

            /* var lastPromise; // will be used to chain promises
             lastPromise = doc.getMetadata().then(function (data) {
                 console.log('# Metadata Is Loaded');
                 console.log('## Info');
                 console.log(JSON.stringify(data.info, null, 2));
                 console.log();
                 if (data.metadata) {
                     console.log('## Metadata');
                     console.log(JSON.stringify(data.metadata.getAll(), null, 2));
                     console.log();
                 }
             });

             var loadPage = function (pageNum) {
                 return doc.getPage(pageNum).then(function (page) {
                     console.log('# Page ' + pageNum);
                     var viewport = page.getViewport(1.0);
                     console.log('Size: ' + viewport.width + 'x' + viewport.height);
                     console.log();
                     return page.getTextContent().then(function (content) {
                         // Content contains lots of information about the text layout and
                         // styles, but we need only strings at the moment
                         var strings = content.items.map(function (item) {
                             return item.str;
                         });
                         console.log('## Text Content');
                         console.log(strings.join(' '));
                     }).then(function () {
                         console.log();
                     });
                 })
             };
             // Loading of the first page will wait on metadata and subsequent loadings
             // will wait on the previous pages.
             for (var i = 1; i <= numPages; i++) {
                 lastPromise = lastPromise.then(loadPage.bind(null, i));
             }
             return lastPromise;
        }).then(function () {
            console.log('# End of Document');
        }, function (err) {
            console.error('Error: ' + err);*/
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
                    <div className="container">
                        <button onClick={()=>{this.previousPage()}}><i className="fas fa-arrow-left"></i></button>
                        <object data={this.state.file + '#page=' + this.state.currentPage + "&toolbar=0&navpanes=0&scrollbar=0"} type="application/pdf" width="80%" height="600px">
                            <a href={this.file}>test.pdf</a>
                        </object>
                        <button onClick={()=>{this.nextPage()}}><i className="fas fa-arrow-right"></i></button>

                    </div>
                </div>
            );
    }
}
/* <button onClick={()=>{this.previousPage()}}>Previous</button>
                     <button onClick={()=>{this.nextPage()}}>Next</button>*/