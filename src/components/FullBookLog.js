import React from 'react'
import Navbar from './Navbar'
import './FullBookLog.css'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router'

function FullBookLog() {
    const navigate = useNavigate();
    const [BooksItems , setBookItems] = useState([]);
    async function FindBooks(){
        const response = await fetch("https://bookish-treasures-backend.onrender.com/getBooks");
        const data = await response.json();
        setBookItems(data);
    }
    useEffect(()=>{
        FindBooks();
    },[])
  return (
    <div className='Book-Log-Main'>
        <Navbar />
        <button className='back-dash' onClick={()=>{navigate("/Admin/Dashboard")}}>Back To Dashboard</button>
        <div className='All-Books'>
            {BooksItems&&BooksItems.map((items,index)=>{
                return <BookItem key={index} isbn={items.book_isbn} title={items.title} author={items.author}
                genre={items.genre} price={items.price} qty={items.quantity}/>
            })}
        </div>
    </div>
  )
}

export const BookItem = (props)=>{
    return(
        <div className='single-book-item'>
            <div>
                <h4>ISBN: {props.isbn}</h4>
                <h4>Title: {props.title}</h4>
            </div>
            <div>
                <h4>Author: {props.author}</h4>
                <h4>Genre: {props.genre}</h4>
            </div>
            <div>
                <h4>Price: {props.price}</h4>
                <h4>Quantity Available: {props.qty}</h4>
            </div>
        </div>
    )
}

export default FullBookLog