import React from 'react'
import './Orders.css'
import Navbar from './Navbar'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router'

function Orders() {
    const navigate = useNavigate();
    const [dataItems , setDataItems] = useState([]);
    async function OrderPick(){
        setDataItems([]);
        const response = await fetch("http://127.0.0.1:8000/getOrders");
        const data = await response.json();
        console.log(data);
        setDataItems(data);
    }
    useEffect(()=>{
        OrderPick();
    },[])
  return (
     <div className='OrdersMain'>
        <Navbar />
        <button className='back-dash' onClick={()=>{navigate("/Admin/Dashboard")}}>Back To Dashboard</button>
        <h1 className='Pending-Head'>Pending Orders</h1>
        <div className='Orders'>
           {dataItems&&dataItems.map((items)=>{
            return <ItemOrder key={items.order_id} title={items.title} address={items.address} user={items.username}
            payment={items.payment_id} order_no = {items.order_id} order_func = {OrderPick}/>
           })}
        </div>
     </div>
  )
}

export const ItemOrder = (props)=>{
    const navigate = useNavigate();
    const [pay,setPay] = useState("");
    const [id,setId] = useState(0);
    async function OrderFulfil(){
        const response = await fetch("http://127.0.0.1:8000/Order/UpdateStatus",{
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id})
            });
        const data = await response.json();
        props.order_func();
    }
    useEffect(()=>{
        if(props.payment === 1){
            setPay("COD")
        }else{
            setPay("Done")
        }
        setId(props.order_no);
    },[])
    return(
        <div className='SingleOrder'>
            <div>
                <h4>Book Title: {props.title}</h4>
                <h4>Address: {props.address}</h4>
            </div>
            <div>
                <h4>Order By : {props.user}</h4>
                <h4>Payment: {pay}</h4>
            </div>
            <button className='Comp-Order' onClick={OrderFulfil}>Mark As Complete</button>
        </div>
    )
}

export default Orders