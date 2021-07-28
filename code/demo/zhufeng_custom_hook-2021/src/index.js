import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import Table from './pages/Table.js'

ReactDOM.render(
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <BrowserRouter>
          <ul className="nav nav-tabs">
            <li><Link to="/table">Table</Link></li>
            <li><Link to="/drag">Drag</Link></li>
            <li><Link to="/form">Form</Link></li>
            <li><Link to="/animation">Animation</Link></li>
          </ul>
          <Route path="/table"><Table/></Route>
          <Route path="/drag"><Table/></Route>
          <Route path="/form"><Table/></Route>
          <Route path="/animation"><Table/></Route>
        </BrowserRouter>
      </div>
    </div>
  </div>,
  document.getElementById('root')
);


