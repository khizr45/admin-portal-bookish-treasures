import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {createBrowserRouter , RouterProvider} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import NewAdminForm from './components/NewAdminForm';
import AddNewBook from './components/AddNewBook';
import DeleteBook from './components/DeleteBook';
import Update_Price from './components/Update_Price';
import Orders from './components/Orders';
import BooksToReorder from './components/BooksToReorder';
import FullBookLog from './components/FullBookLog';
import PublisherLog from './components/PublisherLog';

const router = createBrowserRouter([{
  path: '/',
  element: <Login />
},
{
  path: '/Admin/Dashboard',
  element:<Home />
},
{
  path:'/Admin/Register',
  element: <NewAdminForm />
},
{
  path:'/Admin/AddNewBook',
  element:<AddNewBook />
},
{
  path:'/Admin/DeleteBook',
  element:<DeleteBook />
},
{
  path:'/Admin/UpdatePrice',
  element:<Update_Price />
},
{
  path:'/Admin/Orders',
  element:<Orders />
},
{
  path:"/Admin/BooksToReOrder",
  element: <BooksToReorder />
},
{
  path:"/Admin/BookLog",
  element:<FullBookLog />
},
{
  path:"/Admin/PublisherLog",
  element:<PublisherLog />
}
])
function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
    // <Home />
  );
}

export default App;
