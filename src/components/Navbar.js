import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router';
import { useState } from 'react';

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className='main-Nav'>
        <select>
            <option>Books</option>
            <option>Add Book</option>
            <option>Delete Book</option>
            <option>Update Book Price</option>
        </select>

        <button onClick={()=>{navigate("/Admin/Register")}}>Add New Admin</button>
        <button>Orders</button>
        <button>Books To Reorder</button>
    </div>
  )
}

export default Navbar