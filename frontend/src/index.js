import React from 'react';
import { createRoot } from 'react-dom/client';// Import createRoot instead of ReactDOM
import './index.css';
import './styles/tailwind.css';
import './styles/SearchApi.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
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
import LoginPage from './components/auth_components/LoginPage';
import TicketForm from './components/tickets/TicketForm';
import TicketsPage from './components/pages/TicketsPage';
import { useAuthContext , AuthProvider} from './context/authContext';
import SignUpPage from './components/auth_components/SignUpPage';
import AddAPIPage from './components/provider_componants/AddApi';

function Root() {
  const { authState } = useAuthContext();
  
  return (
    <div id="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomeSection />} />
          <Route exact path="/adminhome" element={<AdminHome />} />
          <Route exact path='/fourAccounts' element={<FourAccountManag />} />
          <Route exact path='/consomAccounts' element={<ConsomAccountManag />} />
          <Route exact path="/searchApi" element={<SearchApi />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignUpPage/>}/>
          <Route path='/ApiDetail/:api_id' element={<ApiDetails />}></Route>
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/forum/threads/:thread_id" element={<ThreadPage />} />
          <Route path="/tickets/new" element={<TicketForm />} />
          <Route path='/tickets' element={<TicketsPage/>} />
          <Route path='/fournisseur' element={<ProviderHomePage />} />
          <Route exact path="/addAPI" element={<AddAPIPage />} />
        </Routes>
      </Router>
    </div>
  );

}

// Use createRoot instead of ReactDOM.render
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
     <Root />
    </AuthProvider>
   
  </React.StrictMode>
);
