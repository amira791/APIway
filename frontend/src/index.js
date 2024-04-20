import React from 'react';
import { createRoot } from 'react-dom/client';// Import createRoot instead of ReactDOM
import './index.css';
import './styles/tailwind.css';
import './styles/SearchApi.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import ForumPage from './components/pages/ForumPage';
import ThreadPage from './components/pages/ThreadPage';
import ProviderHomePage from './components/pages/ProviderHome';
import HomeSection from './components/global_components/home_section';
import FourAccountManag from "./components/admin/fourAccountManag";
import ConsomAccountManag from "./components/admin/consAccountManag";
import SearchApi from "./components/RechercherAPI";
import AdminHome from "./components/admin/adminHomePage";
import ApiDetails from './components/ApiDetails'
import LoginPage from './components/auth_components/login';

function Root() {
  return (
    <div id="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomeSection />} />
            <Route exact path="/adminhome" element={<AdminHome />} />
            <Route exact path='/fourAccounts' element = {<FourAccountManag />} />
            <Route exact path='/consomAccounts' element = {<ConsomAccountManag />} />
            <Route exact path="/searchApi" element={<SearchApi  />} />
            <Route exact path="/login" element={<LoginPage  />} />
            <Route path='/ApiDetail' element={<ApiDetails/>}></Route>
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
