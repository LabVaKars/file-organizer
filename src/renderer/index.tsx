
import 'App.global.css'
import 'bootstrap/dist/js/bootstrap.js'

import React from 'react';
import ReactDOM from 'react-dom';
import IndexApp from './react/index.js';

declare global {
    interface Window {
        electron:any;
    }
}

ReactDOM.render(<IndexApp />, document.getElementById('root'));
