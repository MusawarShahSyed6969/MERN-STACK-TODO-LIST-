import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'

import Home from './pages/Home';
import MainLayout from './pages/MainLayout.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Don't forget CSS

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,   // Layout with navbar
    children: [
      { index: true, element: <Home /> },          
      // { path: 'register', element: <Register /> }, 
      // { path: 'login', element: <Login /> },       
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <>
    <RouterProvider router={router} />
    <ToastContainer />
    </>
  // </StrictMode>
)
