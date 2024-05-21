import React from 'react';
import { createRoot } from 'react-dom/client';// Import createRoot instead of ReactDOM
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,Navigate
} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
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
import Ticket from './components/tickets/Ticket';

import { AuthProvider} from './context/authContext';
import SignUpPage from './components/auth_components/SignUpPage';
import AddAPIPage from './components/provider_componants/AddApi';
import Details from './components/provider_componants/Details';
import {useAuthContext} from './context/authContext'

import { loadStripe } from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import Subscrib from './components/Subscrib/Subscrib';
import Payment from './components/Payment/Payment'
function Root() {

  const { authState } = useAuthContext();
  const stripe = loadStripe("pk_test_51OygXvLDzFR9kcMzeb7UST3IEa8SXi7CD3pXxIcTSQFunxMWcnaKqIJiCHZWO7fLFvnpgauFm9XArtMtZ9xjBJGl00FHM5TiPB");

  return (
    <div id="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomeSection />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignUpPage/>}/>


          <Route exact path="/adminhome" element={authState.isAdmin ? <AdminHome /> : <Navigate to="/login"/>} />
          <Route exact path='/fourAccounts' element={authState.isAdmin ?<FourAccountManag /> : <Navigate to="/login"/>} />
          <Route exact path='/consomAccounts' element={authState.isAdmin ? <ConsomAccountManag /> : <Navigate to="/login"/>} />
          <Route exact path="/searchApi" element={authState.isConsommateur ? <SearchApi /> : <Navigate to="/login"/>} />
          
          {/* <Route path='/ApiDetail/:api_id' element={<ApiDetails />}></Route> */}
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/forum/threads/:thread_id" element={<ThreadPage />} />
          <Route path="/tickets/new/:api_id" element={<TicketForm />} />
          <Route path='/tickets' element={authState.isConsommateur ||  authState.isFournisseur ? <TicketsPage/> : <Navigate to="/login"/>} />
          <Route path='/ticket/:ticket_id' element={authState.isConsommateur ||  authState.isFournisseur ? <Ticket/> : <Navigate to="/login"/>} />
          
          {/* <Route exact path="/addAPI" element={<AddAPIPage />} /> */}
          <Route exact path="/details/:id" element={authState.isConsommateur ||  authState.isFournisseur ?  <Details /> :<Navigate to="/login"/> }/>
          <Route exact path="/provider_home" element={authState.isFournisseur ? <ProviderHomePage /> : <Navigate to="/login"/>}/>

          <Route exact path="/payment/:id" 
          element={authState.isConsommateur ?  
            <Elements stripe={stripe}>
              <Payment/>
            </Elements>
            : <Navigate to="/login"/>} 
          />

          <Route exact path="/subscrib" element={authState.isConsommateur ?  <Subscrib/> : <Navigate to="/login"/>} />

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
