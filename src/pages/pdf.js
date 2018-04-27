import React, { Component } from 'react';

export default class pdfs extends Component {

    render() {

        //this.file = ('../'+this.props.match.params.file_name);
        //this.file = require(this.file);
        //this.file = require('../pdf-sample2.pdf');
        // Doesnt work

        //One way is to load all files (because require works before variable declaration)
        //then select the file we want
        function importAll(r) {
            let files = {};
            r.keys().map((item, index) => { files[item.replace('./', '')] = r(item); return true});
            return files;
        }

        const files = importAll(require.context('../', false, /\.pdf$/));
        this.file = files[this.props.match.params.file_name];

        if(!this.file)
            return (
                <div>

                <h1>pdf page</h1>

                <h3>Failed loading file</h3>

                </div>
            );
        else
            return (
                <div>

                <h1>pdf page</h1>

                <object data={this.file} type="application/pdf" width="90%" height="600px">
                <a href={this.file}>test.pdf</a>
                </object>

                </div>
            );
    }
}