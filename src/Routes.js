import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from './App';
import Service from './pages/Service';

export default function Routes(){
    return (
        <Router>
            <Route exact path='/' component={App} />
            <Route exact path='/servicos/:id' component={Service} />
        </Router>
    )
}