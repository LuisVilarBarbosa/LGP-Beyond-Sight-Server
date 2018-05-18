import React, { Component } from 'react';
import Chatroom from '../components/Chat/Chatroom';
let pdfjsLib = require('pdfjs-dist');

/* https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/ */

function pad2(number) {
    number = (number < 10 ? '0' : '') + number;
    number = number.substring(0,2);
    return number;
}

function importAll(r) {
    let files = {};
    r.keys().map((item, index) => { files[item.replace('./', '')] = r(item); return true});
    return files;
}

const files = importAll(require.context('../pdf/', false, /\.pdf$/));

export default class pdfs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            isSync: true,
            file: null,
            numPages: 1,
        };
    }

    async componentDidMount(){
       /* let url = 'http://localhost:3050/split/' + this.props.match.params.file_name;
        const request = async () => {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }});
            const json = await response.json();
            console.log(json);
        };
        request();*/

        this.setState({file:files[this.props.match.params.file_name + '_' + pad2(this.state.currentPage) + '.pdf']});

        let numPages = null;
        let numPagesN = null;

        /* This return page info about the file */
        numPages = pdfjsLib.getDocument(files[this.props.match.params.file_name + '.pdf']).then(function (doc) {
            numPages = doc.numPages;
            return numPages;
        });
        numPagesN = await numPages.then(function(value){
            return value});
        this.setState({numPages: numPagesN});

        if(this.state.currentPage === 1)
        {
            let pages = "Page 1 of " + this.state.numPages;
            window.responsiveVoice.speak(pages);
        }
    }

    previousPage(){
        if(this.state.currentPage > 1)
        {
            let newPage = this.state.currentPage - 1;
            this.setState({file:files[this.props.match.params.file_name + '_' + pad2(newPage) + '.pdf']});
            this.setState({currentPage: newPage});
            if(newPage !== 1)
            {
                let pages = "Page " + newPage;
                window.responsiveVoice.speak(pages);
            }
            else
            {
                let pages = "Page 1 of " + this.state.numPages;
                window.responsiveVoice.speak(pages);
            }
        }
    };

    nextPage(){
        if(this.state.currentPage < this.state.numPages)
        {
            let newPage = this.state.currentPage + 1;
            this.setState({file:files[this.props.match.params.file_name + '_' + pad2(newPage) + '.pdf']});
            this.setState({currentPage: newPage});
            let pages = "Page " + newPage;
            window.responsiveVoice.speak(pages);

            if(newPage === this.state.numPages)
            {
                window.responsiveVoice.speak("Last page.");
            }
        }
    };

    goToPage(newPage)
    {
        if(newPage >= 1 && newPage <= this.state.numPages)
        {
            this.setState({file:files[this.props.match.params.file_name + '_' + pad2(newPage) + '.pdf']});
            this.setState({currentPage: newPage});
        }
    };

    pause()
    {
        this.setState({isSync: false});
        window.responsiveVoice.speak("Presentation paused.");
    };

    play()
    {
        this.setState({isSync: true});
        window.responsiveVoice.speak("Resume presentation.");
    };

    render() {
        let pages = "Page " + this.state.currentPage + " of " + this.state.numPages;

        let syncBtn = <button aria-label="Pause" className="arrow-btn" onClick={()=>{this.pause()}}><i className="fas fa-pause"></i></button>;
        if(!this.state.isSync)
        {
            syncBtn = <button aria-label="Synchronize" className="arrow-btn" onClick={()=>{this.play()}}><i className="fas fa-play"></i></button>;
        }

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
                        <div className="sync-button">
                            {syncBtn}
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-8">
                                    <button aria-label="Previous Page" className="arrow-btn previous-page" onClick={()=>{this.previousPage()}}><i className="fas fa-arrow-left"></i></button>
                                    <button aria-label="Next Page" className="arrow-btn next-page" onClick={()=>{this.nextPage()}}><i className="fas fa-arrow-right"></i></button>
                                    <div className="pdf-container">
                                    <object data={this.state.file + "#scrollbar=0"} type="application/pdf" width="80%" height="600px">
                                        <a href={this.state.file}>test.pdf</a>
                                    </object>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="chat">
                                        <Chatroom />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pdf-pages container">
                        <p>{pages}</p>
                    </div>
                </div>
            );
    }
}