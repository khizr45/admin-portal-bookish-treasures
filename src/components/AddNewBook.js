import React from 'react';
import { useState } from 'react';
import './AddNewBook.css';

function AddNewBook() {
    const [title , setTitle] = useState("");
    const [author,setAuthor] = useState("");
    const [isbn,setIsbn] = useState("");
    async function findDets(){
        const link = "https://openlibrary.org/api/books?bibkeys=ISBN:"+isbn+"&format=json&jscmd=data";
        const data = await fetch(link);
        const data2 = await data.json();
        console.log(data2);
        console.log(data2['ISBN:'+isbn].authors[0].name);
        console.log(data2['ISBN:'+isbn].title);
        setTitle(data2['ISBN:'+isbn].title);
        setAuthor(data2['ISBN:'+isbn].authors[0].name)
        const imageLink = "https://covers.openlibrary.org/b/isbn/"+isbn+"-M.jpg"
        window.open(imageLink);
    }
  return (
    <div className='Main-container'>
        <h1>Add New Book</h1>
        <input placeholder='Enter ISBN 13 of Book' className='Isbn' onChange={(e)=>{setIsbn(e.target.value)}}></input>
        <button className='Find-Btn' onClick={findDets}>Find Details</button>
        <div>
            <h4>{title}</h4>
            <h4>{author}</h4>
        </div>
        <input placeholder='Enter Genre'></input>
    </div>
  )
}

export default AddNewBook