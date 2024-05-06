import ReactDOM from 'react-dom/client';
import './index.css';

import React, { Component } from "react";

import {
  BrowserRouter as Router,

  Route,
  Routes,

} from "react-router-dom";
import Home from "./components/home";
import AddAPIPage from './components/provider_componants/AddApi';
import Details from './components/provider_componants/Details';

class Root extends Component {
  render() {
    return (
      <div id="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/addAPI" element={<AddAPIPage />} />
            <Route exact path="details/:id/" element={<Details />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
export default Root;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <Root />

);