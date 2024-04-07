import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './components/pages/home';
import ForumPage from './components/pages/ForumPage';
import ThreadPage from './components/pages/ThreadPage';

function Root() {
  return (
    <div id="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/forum/threads/:thread_id" element={<ThreadPage />} />
        </Routes>
      </Router>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
