import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/Home';
import { checkAuthLoader, tokenLoader } from './util/auth';
import RootLayout from './pages/Root';
import ProductPage,{ loader as productsLoader } from './pages/ProductPage';
import { action as logoutAction } from './pages/Logout';

import AuthenticationPage, {
  action as authAction,
} from './pages/Authentication';
import ProtectedRoute from './components/ProtectedRoute';
const router = createBrowserRouter([

  {
    path: '/',
    element: <RootLayout />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'Products',
        children: [
          {
            index: true,
            element: <ProtectedRoute><ProductPage /></ProtectedRoute>,
            loader: productsLoader
            
          },
        ]
      },
      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: 'logout',
        action: logoutAction,
      }
     
      
    ]
  },
]);
function App() {


  return <RouterProvider router={router} />;
}

export default App
