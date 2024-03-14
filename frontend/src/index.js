import ReactDOM from 'react-dom/client';
import './index.css';

import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Home from "./components/home";
import signupForm from './components/forms/signupForm';

class Root extends Component {
  render() {
    return (
      <div id="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<signupForm />} />
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