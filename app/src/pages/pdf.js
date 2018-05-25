import React, { Component } from 'react';
import Chatroom from '../components/Chat/Chatroom';
import Pusher from 'pusher-js';
import { Link } from 'react-router-dom'
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

const files = importAll(require.context('../../uploaded_files/', false, /\.pdf$/));

export default class pdfs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            syncExtensionPage: 1,
            currentPage: 1,
            isSync: true,
            file: null,
            numPages: 1,
            invalidPDF: false,
        };
    }

    async componentDidMount(){

        if(!files[this.props.match.params.file_name + ".pdf"])
        {
            this.setState({invalidPDF: true});
        }
        else
        {
            this.setState({invalidPDF: false});
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

           let pusher = new Pusher('649f74e3a883bf7aa954', {
                cluster: 'eu',
                encrypted: true
                });

            let channel = pusher.subscribe('react-node');
                channel.bind('message', data => {

                    if(data.message[0] === this.props.match.params.file_name)
                    {
                        switch(data.message[1]) {
                            case "SlideShowBeginEventHandler":
                                if(!this.state.isSync)
                                    return;
                                window.responsiveVoice.speak("Presentation Started");
                                break;
                            case "SlideShowNextSlideEventHandler":
                            case "SlideShowNextBuildEventHandler":
                                let page = parseInt(data.message[2]);
                                this.setState({syncExtensionPage: page});
                                if(!this.state.isSync)
                                    return;
                                this.goToPage(page);
                                break;
                            case "SlideShowEndEventHandler":
                                if(!this.state.isSync)
                                    return;
                                window.responsiveVoice.speak("Presentation Finished");
                                break;
                            default:
                                break;
                        }
                    }
            });
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

            if(newPage === 1)
            {
                let pages = "Page 1 of " + this.state.numPages;
                window.responsiveVoice.speak(pages);
            }
            else
            {
                let pages = "Page " + newPage;
                window.responsiveVoice.speak(pages);
            }

            if(newPage === this.state.numPages)
            {
                window.responsiveVoice.speak("Last page.");
            }
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
        this.goToPage(this.state.syncExtensionPage);
    };

    render() {
        let pages = "Page " + this.state.currentPage + " of " + this.state.numPages;

        let syncBtn = <button aria-label="Pause" className="arrow-btn" onClick={()=>{this.pause()}}><i className="fas fa-pause"></i></button>;
        if(!this.state.isSync)
        {
            syncBtn = <button aria-label="Synchronize" className="arrow-btn" onClick={()=>{this.play()}}><i className="fas fa-play"></i></button>;
        }

        if(this.state.invalidPDF)
            return (
                <div id="pdf">
                    <div className="pdf-viewer">
                        <div className="error">
                           <h3>Invalid File Name</h3>
                            <p><Link to="/">Go Back To Homepage</Link></p>
                        </div>
                    </div>
                </div>
            );
        else
            return (
                <div id="pdf">
                    <div className="chat">
                        <Chatroom chatID={this.props.match.params.file_name}/>
                    </div>
                    <div className="pdf-viewer">
                        <div className="sync-button">
                            {syncBtn}
                        </div>
                        <div className="container">
                            <button aria-label="Previous Page" className="arrow-btn previous-page" onClick={()=>{this.previousPage()}}><i className="fas fa-arrow-left"></i></button>
                            <button aria-label="Next Page" className="arrow-btn next-page" onClick={()=>{this.nextPage()}}><i className="fas fa-arrow-right"></i></button>
                            <div className="pdf-container">
                                <object data={this.state.file + "#scrollbar=0"} type="application/pdf" width="90%" height="660px">
                                    <a href={this.state.file}>test.pdf</a>
                                </object>
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