import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import React, { Component } from "react";
import './styles/tailwind.css';
import './styles/SearchApi.css';

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
import SearchApi from "./components/RechercherAPI";
import AdminHome from "./components/admin/adminHomePage";
import ApiDetails from './components/ApiDetails'
import LoginPage from './components/auth_components/login';

class Root extends Component {
  render() {
    return (
      <div id="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/adminhome" element={<AdminHome />} />
            <Route exact path='/fourAccounts' element = {<FourAccountManag />} />
            <Route exact path='/consomAccounts' element = {<ConsomAccountManag />} />
            <Route exact path="/searchApi" element={<SearchApi  />} />
            <Route exact path="/login" element={<LoginPage  />} />
            <Route path='/ApiDetail' element={<ApiDetails/>}></Route>
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