import './Home.css'
import { useState,useEffect } from 'react';
import Navbar from './Navbar';
function Home(){
    // const [isbn,setIsbn] = useState("");
    // const [title,setTitle] = useState("");
    // const [author,setauthor] = useState("");
    // async function findDets(isbn){
    //     const link = "https://openlibrary.org/api/books?bibkeys=ISBN:"+isbn+"&format=json&jscmd=data";
    //     const data = await fetch(link);
    //     const data2 = await data.json();
    //     console.log(data2);
    //     setauthor(data2['ISBN:'+isbn].authors[0].name);
    //     setTitle(data2['ISBN:'+isbn].title);
    // }
    const [PublishLogItems , setPublish] = useState([]);
    function DisplayItems(){
        CallPub();
        CallBook();
        
    }
    async function CallPub(){
        const response = await fetch("http://127.0.0.1:8000/getPubs");
        const data = await response.json();
        setPublish(data);
        if(data.length > 5){
            data.splice(5,data.length);
            setPublish(data);
            console.log(data);
        }else{
            setPublish(data);
        }

        console.log(data);
       
    }
    const [DataItems , SetItems] = useState([]);
    async function CallBook(){
        const response = await fetch("http://127.0.0.1:8000/getBooks");
        const data = await response.json();
        if(data.length > 5){
            data.splice(5,data.length);
            SetItems(data);
        }else{
            SetItems(data);
        }
    }
    useEffect(()=>{
       DisplayItems();

    },[]);
    return (
        <div className='Home-main'>
                <Navbar />
                <div className='book_pub_log'>
                    <div className='book_log'>
                        <div className='Book_log_heads'>
                            <h3 className='title_head'>Title</h3>
                            <h3 className='book_log_author_head'>Author</h3>
                        </div>
                        <div>
                            {DataItems.map((items,index) => {
                             return   <BookLogItem key={index} Title = {items.title} Author = {items.author} />
                            })
                            }
                        </div>
                        <div className='Log-btn'>
                            <button>View Full Book log</button>
                        </div>
                    </div>
                    <div className='pub_log'>
                        <div className='Book_log_heads'>
                            <h3 className='title_head'>Publisher ID</h3>
                            <h3 className='book_log_author_head'>Name</h3>
                        </div>
                        <div>
                            {PublishLogItems.map((items,index) => {
                             return   <PublishItems key={index} Pname = {items.name} PContact = {items.phone_number} />
                            })
                            }
                        </div>
                    </div>
                </div>
            {/* <div>
                    <input placeholder='Input ISBN of book' onChange={(e)=>{setIsbn(e.target.value)}}></input>
                    <button onClick={()=>findDets(isbn)}>Get Details</button>
                    <h2>{title}</h2>
                    <h2>{author}</h2>
            </div> */}
        </div>
    )
}
export const BookLogItem = (props) =>{
    return(
            <div className='Book_log_items'>
                <div className='title_div'>
                    <h4 className='book_log_title_item'>{props.Title}</h4>
                </div>
                <h4 className='book_log_author_item'>{props.Author}</h4>
            </div>
    )        
}

export const PublishItems = (props) => {
    return(
        <div className='Pub_Log_Item'>
                <div>
                    <h4>{props.Pname}</h4>
                </div>
                <h4>{props.PContact}</h4>
            </div>
    )
}

export default Home;