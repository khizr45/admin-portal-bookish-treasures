import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {createBrowserRouter , RouterProvider} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

const router = createBrowserRouter([{
  path: '/',
  element: <Login />
},
{
  path: '/Home',
  element:<Home />
}
])
function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
