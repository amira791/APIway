import React from 'react';
import { createRoot } from 'react-dom/client';// Import createRoot instead of ReactDOM
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import ForumPage from './components/pages/ForumPage';
import ThreadPage from './components/pages/ThreadPage';
import ProviderHomePage from './components/provider_componants/ProviderHome';
import HomeSection from './components/global_components/home_section';
import FourAccountManag from "./components/admin/fourAccountManag";
import ConsomAccountManag from "./components/admin/consAccountManag";
import SearchApi from "./components/RechercherAPI";
import AdminHome from "./components/admin/adminHomePage";
import ApiDetails from './components/ApiDetails'
import LoginPage from './components/auth_components/LoginPage';
import TicketForm from './components/tickets/TicketForm';
import TicketsPage from './components/pages/TicketsPage';
import {  AuthProvider} from './context/authContext';
import SignUpPage from './components/auth_components/SignUpPage';
import AddAPIPage from './components/provider_componants/AddApi';
import Details from './components/provider_componants/Details';
import Payment from './components/Payment/Payment';

import { loadStripe } from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

function Root() {
  const stripe = loadStripe("pk_test_51OygXvLDzFR9kcMzeb7UST3IEa8SXi7CD3pXxIcTSQFunxMWcnaKqIJiCHZWO7fLFvnpgauFm9XArtMtZ9xjBJGl00FHM5TiPB");

  
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
          {/* <Route path='/ApiDetail/:api_id' element={<ApiDetails />}></Route> */}
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/forum/threads/:thread_id" element={<ThreadPage />} />
          <Route path="/tickets/new" element={<TicketForm />} />
          <Route path='/tickets' element={<TicketsPage/>} />
          <Route exact path="/addAPI" element={<AddAPIPage />} />
          <Route exact path="/details/:id" element={<Details />} />
          <Route exact path="/provider_home" element={<ProviderHomePage/>} />
          <Route exact path="/payment" element={
          <Elements stripe={stripe}>
            <Payment/>
          </Elements>} />
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
