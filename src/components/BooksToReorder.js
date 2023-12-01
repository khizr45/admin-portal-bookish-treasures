import React from 'react'
import './BooksToReorder.css'
import Navbar from './Navbar'
import { useState,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router';

function BooksToReorder() {
    const navigate = useNavigate()
    const [BooksRe , setBooksRe] = useState([]);
    async function BooksPick(){
        setBooksRe([]);
        const response = await fetch("http://127.0.0.1:8000/Book/ReOrder");
        const data = await response.json();
        setBooksRe(data);
    }
    useEffect(()=>{
        BooksPick();
    },[])
  return (
    <div className='Reorder-main'>
        <ToastContainer />
        <Navbar />
        <button className='back-dash' onClick={()=>{navigate("/Admin/Dashboard")}}>Back To Dashboard</button>
        <h1 className='reorder-head'>Books To ReOrder</h1>
        <div className='Books-List'>
            {BooksRe&&BooksRe.map((items,index)=>{
                return <ReOrder_Books key={index} isbn={items.book_isbn} title={items.title}
                price={items.price} qty={items.quantity} reload={BooksPick}/>
            })}
        </div>
    </div>
  )
}

export const ReOrder_Books = (props)=>{
    async function qtyUpdate(){
        const is = props.isbn;
        const q = prompt("Enter Quantity to add");
        const response = await fetch("http://127.0.0.1:8000/Book/UpdateQty",{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({is,q})
        });
        const data = await response.json();
        if(data === "successfull"){
            toast.success("Quantity Updated Successfully",{
                position:toast.POSITION.TOP_RIGHT,
            })
        }
        props.reload();
    }
    return(
        <div className='one-book'>
            <div>
                <h4>Book ISBN: {props.isbn}</h4>
                <h4>Book Title: {props.title}</h4>
            </div>
            <div>
                <h4>Price: {props.price}</h4>
                <h4>Quantity Presesnt: {props.qty}</h4>
            </div>
            <button className='Update-Qty' onClick={qtyUpdate}>Update Quantity</button>
        </div>
    )
}

export default BooksToReorder