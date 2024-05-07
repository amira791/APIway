import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import AddAPIPage from './Componants/provider_componants/AddApi';


function Router() {
  // const { isAuthenticated } = useAuthContext();
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AddAPIPage/>} />
    )
  );
  return (

    <RouterProvider router={router} />

  );
}

export default Router;