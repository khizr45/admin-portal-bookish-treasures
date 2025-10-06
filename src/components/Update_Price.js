import React from 'react'
import Navbar from './Navbar'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';
import './Update_Price.css'

function UpdatePrice() {
    const navigate = useNavigate();
    const [isbn,setIsbn] = useState("")
    const [Title,setTitle] = useState("")
    const [Price,setPrice] = useState(0);
    const [UpdatePrice , setUpdatePrice] = useState(0);
    async function FindBook(){
        if(isbn === ""){
            toast.error("Please Enter ISBN",{
                position:toast.POSITION.TOP_RIGHT,
            });
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
                setPrice(0);
            }else{
                setTitle(data[0].title);
                setPrice(data[0].price);
            }
        }
    }
    async function Update(){
        if(UpdatePrice === 0){
            toast.error("Please Enter Updated Price",{
                position:toast.POSITION.TOP_RIGHT,
            });
        }else{
            const UserRes = prompt("Confirm Update (ok to confirm)");
            if(UserRes === "ok" || UserRes === "OK" || UserRes === "oK" || UserRes === "Ok"){
                const response = await fetch("https://bookish-treasures-backend.onrender.com/Book/UpdatePrice",{
                    method:'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({isbn,UpdatePrice})
                });
               const data =  await response.json();
                if(data === "successfull"){
                    toast.success("Price Updated Successfully",{
                        position:toast.POSITION.TOP_RIGHT,
                    });
                }    
            }
        }
    }
  return (
    <div className='main-con'>
        <ToastContainer />
        <Navbar />
        <h1 className='head'>Update Price</h1>
        <div className='Update-form'>
            <input placeholder='Enter ISBN to update price' onChange={(e)=>{setIsbn(e.target.value)}}/>
            <h4>Title: {Title}</h4>
            <h4>Current Price: {Price}</h4>
            <input placeholder='New Price' onChange={(e)=>{setUpdatePrice(e.target.value)}}/>
            <div className='btns'>
                <button onClick={FindBook}>Find Book</button>
                <button onClick={Update}>Update Price</button>
            </div>
        </div>
        <button className='back-btn' onClick={()=>{navigate('/Admin/Dashboard')}}>Back To Dashboard</button>
    </div>
  )
}

export default UpdatePrice