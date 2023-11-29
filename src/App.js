import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {createBrowserRouter , RouterProvider} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import NewAdminForm from './components/NewAdminForm';
import AddNewBook from './components/AddNewBook';

const router = createBrowserRouter([{
  path: '/',
  element: <Login/>
},
{
  path: '/Admin/Dashboard',
  element:<Home />
},
{
  path:'/Admin/Register',
  element: <NewAdminForm />
}
])
function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
    // <Home />
  );
}

export default App;
