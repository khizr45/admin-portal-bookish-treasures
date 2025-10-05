import React from 'react';
import { useState,useEffect } from 'react';
import './AddNewBook.css';
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';

function AddNewBook() {
    const navigate = useNavigate();
    const [title , setTitle] = useState("");
    const [author,setAuthor] = useState("");
    const [isbn,setIsbn] = useState("");
    const [genre,setGenre] = useState([]);
    const [Publishers,setPublishers] = useState([]);
    const [Menu_New_Genre , SetNewGenre] = useState("Add New Genre");
    const [Menu_New_Publish , setNewPublish] = useState("Add New Publisher");
    const [ebookSource , setSource] = useState("");
    const [imgSource , setImgSource] = useState("");
    const [PublishDate,setDate] = useState("");
    const [BookPrice , setPrice] = useState(0);
    const [BookQuantity , setQuantity] = useState(0);
    const [BookGenre , setBookGenre] = useState("");
    const [BookPublisher, setBookPublisher] = useState("");
    async function findDets(){
        if(isbn === ""){
            toast.error("Please Enter ISBN 13",{
                position:toast.POSITION.TOP_RIGHT,
            })
        }else{
            const link = "https://openlibrary.org/api/books?bibkeys=ISBN:"+isbn+"&format=json&jscmd=data";
            const data = await fetch(link);
            const data2 = await data.json();
            setTitle(data2['ISBN:'+isbn].title);
            setAuthor(data2['ISBN:'+isbn].authors[0].name)
            const imageLink = "https://covers.openlibrary.org/b/isbn/"+isbn+"-M.jpg"
            window.open(imageLink);
            setImgSource(imageLink);
        }
    }
    async function FindGenreAndPublishers(){
        const response = await fetch("https://bookish-treasures-backend.onrender.com/book/genre");
        const data = await response.json();
        setGenre(data);
        const response2 = await fetch("https://bookish-treasures-backend.onrender.com/book/publishers");
        const data2 = await response2.json();
        setPublishers(data2);
    }
    function EnterGenre(e){
        const value = e.target.value;
        if(value === "Add New Genre"){
            const newGenre = prompt("Enter New Genre Here: ");
            SetNewGenre(newGenre);
            setBookGenre(newGenre);
        }else{
            setBookGenre(value);
        }
    }
    async function EnterPublisher(e){
        const value = e.target.value;
        if(value === "Add New Publisher"){
            const NewPubName = prompt("Enter Name of Publisher");
            const NewPubContact = prompt("Enter Phone Number Of Publisher");
            const NewPubEmail = prompt("Enter Email of New Pulisher");
            setNewPublish(NewPubName);
            setBookPublisher(NewPubName);
            const response = await fetch("https://bookish-treasures-backend.onrender.com/Admin/NewPublisher",{
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({NewPubName , NewPubContact,NewPubEmail})
            });
            const data =  await response.json();
            if(data === "successfull"){
                toast.success("New Publisher added successfully",{
                    position:toast.POSITION.TOP_RIGHT,
                })
            }
        }else{
            setBookPublisher(value);
        }
    }
    function openBook(){
        if(ebookSource === ""){
            toast.error("Please enter link first",{
                position:toast.POSITION.TOP_RIGHT,
            })
        }else{
            window.open(ebookSource);
        }
    }
    async function AddBook(){
        if(PublishDate === "" || BookPrice === 0 || BookQuantity === 0 || BookGenre === "Select Book Genre" || BookPublisher === "Select Publisher"){
            toast.error("Please Enter full details",{
                position:toast.POSITION.TOP_RIGHT,
            })
        }else{
            const response = await fetch("https://bookish-treasures-backend.onrender.com/Admin/AddBook",{
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({isbn,title,author,BookGenre,BookPrice,BookQuantity,imgSource,BookPublisher,ebookSource,PublishDate})
            });
            const data = await response.json();
            if(data === "successfull"){
                toast.success("Book Added Successfully",{
                    position:toast.POSITION.TOP_RIGHT,
                })
            }
        }

    }
    function BackToAdmin(){
        navigate("/Admin/Dashboard");
    }
    useEffect(()=>{
        FindGenreAndPublishers();
    },[])
  return (
    <div className='Main-container'>
        <ToastContainer />
        <div className='nav'> <Navbar /></div>
        <h1 className='heading'>Add New Book</h1>
        <div className='book-dets'>
            <div className='book-form'>
                <input placeholder='Enter ISBN 13 of Book' className='Isbn' onChange={(e)=>{setIsbn(e.target.value)}}></input>
                <h4>Title: {title}</h4>
                <h4>Author: {author}</h4>
                <select className='genre-menu' onChange={EnterGenre}>
                    <option>Select Book Genre</option>
                    <option>{Menu_New_Genre}</option>
                    {genre.map((items,index)=>{
                        return <option key={index}>{items.genre}</option>
                    })}
                </select>
                <select className='publisher-menu' onChange={EnterPublisher}>
                    <option>Select Publisher</option>
                    <option>{Menu_New_Publish}</option>
                    {Publishers.map((items,index)=>{
                        return <option key={index}>{items.name}</option>
                    })}
                </select>
                <button className='Find-Btn' onClick={findDets}>Find Details</button>
            </div>
            <div className='ebook-dets'>
                <p>Please upload the Pdf of book on your drive<br /> allow anyone to access it with the link.
                    Then input<br/> the link in the input box and for preview of<br/> pdf press view book button.
                </p>
                <input placeholder='ebook source' onChange={(e)=>{setSource(e.target.value)}}></input>
                <button onClick={openBook}>View Book</button>
            </div>
            <div className='Extra-dets'>
                <input placeholder='Publish date(YYYY-MM-DD)' onChange={(e)=>{setDate(e.target.value)}}></input>
                <input placeholder='Price' onChange={(e)=>{setPrice(parseInt(e.target.value))}}></input>
                <input placeholder='Qunatity in Stock' onChange={(e)=>{setQuantity(parseInt(e.target.value))}}></input>
                <button className='add-book-btn' onClick={AddBook}>Add Book</button>
                <button onClick={BackToAdmin}>Back To Dashboard</button>
            </div>
        </div>
    </div>
  )
}

export default AddNewBook