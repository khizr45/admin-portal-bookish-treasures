import React from 'react'
import './DeleteBook.css'
import Navbar from './Navbar'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';

function DeleteBook() {
    const navigate = useNavigate();
    const [isbn,setIsbn] = useState("")
    const [Title,setTitle] = useState("")
    const [Author,setAuthor] = useState("");
    async function FindBook(){
        if(isbn === ""){
            toast.error("Please Enter Isbn",{
                position:toast.POSITION.TOP_RIGHT,
            });
            setTitle("");
            setAuthor("");
        }else{
            const response = await fetch("https://bookish-treasures-backend.onrender.com/GetBook/Isbn",{
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({isbn})
            });
            const data =  await response.json();
            if(data.length === 0){
                alert("Book Not found");
                setTitle("");
                setAuthor("");
            }else{
                setTitle(data[0].title);
                setAuthor(data[0].author);
            }
        }
        
    }
    async function DelBook(){
        if(isbn === ""){
            toast.error("Please Enter Isbn",{
                position:toast.POSITION.TOP_RIGHT,
            });
            setTitle("");
            setAuthor("");
        }else{
            const userRes = prompt("Confirm Delete (ok to delete)");
            if(userRes === "ok" || userRes === "OK" || userRes === "oK" || userRes === "Ok"){
                const response = await fetch("https://bookish-treasures-backend.onrender.com/Book/Delete",{
                    method:'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({isbn})
                });
                const data =  await response.json();
                if(data === "successfull"){
                    toast.success("Book Deleted Successfully",{
                        position:toast.POSITION.TOP_RIGHT,
                    })
                }
                setAuthor("");
                setTitle("");
            }
        }
        
    }
  return (
    <div className='main-cont'>
        <ToastContainer />
        <Navbar />
        <h1 className='head'>Delete Book</h1>
        <div className='delete-form'>
            <input placeholder='Enter ISBN of book to delete' onChange={(e)=>{setIsbn(e.target.value)}}/>
            <h4>Title: {Title}</h4>
            <h4>Author: {Author}</h4>
            <div className='btns'>
                <button onClick={FindBook}>Find Book</button>
                <button onClick={DelBook}>Delete Book</button>
            </div>
        </div>
        <button className='back-btn' onClick={()=>{navigate('/Admin/Dashboard')}}>Back To Dashboard</button>
    </div>
  )
}

export default DeleteBook