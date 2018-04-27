import React, {Component} from 'react';
import './App.css';
import Content from "./components/Content";
import Footer from "./components/Footer";
import Pdf from "./pages/pdf";
import {Switch, Route} from 'react-router-dom';
import './css/Common.css';

const portsocket = 8000;

const server = express()
  .listen(portsocket, () => console.log(`Listening on ${ portsocket }`));


const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
  ws.on('message',(message)=>{
    //message handling mby splitting ? mby different type according to each 


  });
});


export default class App extends Component {

    render() {
        return (
            <div className="App">
                <Switch>
                <Route path='/pages/pdf' component={Pdf}/>
                </Switch>
                <Content/>
                <Footer/>
            </div>
        );
    }

}
