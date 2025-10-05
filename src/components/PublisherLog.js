import React from 'react'
import './PublisherLog.css'
import Navbar from './Navbar'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router'

function PublisherLog() {
    const navigate = useNavigate();
    const [PubItems,setPubItems] = useState([]);
    async function GetPublishers(){
        const response = await fetch("https://bookish-treasures-backend.onrender.com/getPubs");
        const data = await response.json();
        setPubItems(data);
    }
    useEffect(()=>{
        GetPublishers();
    },[])
  return (
    <div className='Publisher-Log-Main'>
        <Navbar />
        <button className='back-dash'onClick={()=>{navigate("/Admin/Dashboard")}} >Back To Dashboard</button>
        <h1 className='Publish-Head'>All Publishers</h1>
        <div className='all-publishers'>
            {PubItems&&PubItems.map((items,index)=>{
                return <PublisherLogItem key={index} name={items.name}
                contact={items.phone_number} email={items.email}/>
            })}
        </div>
    </div>
  )
}

export const PublisherLogItem = (props) =>{
    return(
        <div className='Publisher-Log-Items'>
            <div>
                <h4>Name: {props.name}</h4>
                <h4>Contact: {props.contact}</h4>
            </div>
            <h4>Email: {props.email}</h4>
        </div>
    )
}

export default PublisherLog