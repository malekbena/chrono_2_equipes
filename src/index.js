import React from 'react';
import ReactDOM from 'react-dom';
import './Main.css';
import Home from './Screens/Home';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<Home />, document.getElementById('root'));

serviceWorker.unregister();
