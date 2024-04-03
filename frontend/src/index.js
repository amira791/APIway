import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import Home from "./components/pages/home";
import ForumPage from './components/pages/ForumPage';
import ThreadPage from './components/pages/ThreadPage';

class Root extends Component {
  render() {
    return (
      <div id="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path='forum' element = {<ForumPage />}/>
            <Route path='forum/threads/:thread_id' element={<ThreadPage/>}/>
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