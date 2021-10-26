import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from './App';
// import CreateService from './pages/CreateService';
import Service from './pages/Service';

export default function Routes(){
    return (
        <Router>
            <Route exact path='/' component={App} />
            <Route exact path='/servicos/:id' component={Service} />
            {/* <Route exact path='/servicos/criar' component={CreateService} /> */}
        </Router>
    )
}