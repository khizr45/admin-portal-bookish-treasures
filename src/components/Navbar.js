import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router';
import { useState } from 'react';

function Navbar() {
  function MoveTO(e){
    const value = e.target.value;
    if(value === "Add Book"){
      navigate("/Admin/AddNewBook");
    }else if( value === "Delete Book"){
      navigate("/Admin/DeleteBook");
    }else if(value === "Update Book Price"){
      navigate('/Admin/UpdatePrice')
    }
  }
  const navigate = useNavigate();
  return (
    <div className='main-Nav'>
        <select onChange={MoveTO}>
            <option>Books</option>
            <option>Add Book</option>
            <option>Delete Book</option>
            <option>Update Book Price</option>
        </select>

        <button onClick={()=>{navigate("/Admin/Register")}}>Add New Admin</button>
        <button onClick={()=>{navigate("/Admin/Orders")}}>Orders</button>
        <button onClick={()=>{navigate("/Admin/BooksToReOrder")}}>Books To Reorder</button>
    </div>
  )
}

export default Navbar