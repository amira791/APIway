import React from 'react';
import { createRoot } from 'react-dom/client';// Import createRoot instead of ReactDOM
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import ForumPage from './components/pages/ForumPage';
import ThreadPage from './components/pages/ThreadPage';
import ProviderHomePage from './components/pages/ProviderHome';
import HomeSection from './components/global_components/home_section';

function Root() {
  return (
    <div id="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomeSection />} />
          <Route path="/forum" element={<ForumPage />}/>
          <Route path="/forum/threads/:thread_id" element={<ThreadPage />} />
          <Route path='/fournisseur' element={<ProviderHomePage/>} />
        </Routes>
      </Router>
    </div>
  );
}

// Use createRoot instead of ReactDOM.render
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
