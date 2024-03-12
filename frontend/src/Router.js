import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Main from './pages/Main';

function Router() {
  // const { isAuthenticated } = useAuthContext();
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Main/>} />
    )
  );
  return (

    <RouterProvider router={router} />

  );
}

export default Router;