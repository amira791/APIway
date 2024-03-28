import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import React, { Component } from "react";
import './styles/tailwind.css';
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import Home from "./components/home";
import FourAccountManag from "./components/admin/fourAccountManag";
import ConsomAccountManag from "./components/admin/consAccountManag";
import AdminHome from "./components/admin/adminHomePage";

class Root extends Component {
  render() {
    return (
      <div id="App">
        <Router>
          <Routes>
            <Route exact path="/api" element={<Home />} />
            <Route exact path="/adminhome" element={<AdminHome />} />
            <Route exact path='/fourAccounts' element = {<FourAccountManag />} />
            <Route exact path='/consomAccounts' element = {<ConsomAccountManag />} />
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