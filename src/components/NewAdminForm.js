import React from 'react';
import { useState } from 'react';
import './NewAdminForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';

function NewAdminForm() {
    const navigate = useNavigate();
    const [UN,setUN] = useState("");
    const [Pass,setPass] = useState("");
    const [Pass2,setPass2] = useState("");
    async function Authorize(){
        const response = await fetch("http://127.0.0.1:8000/auth/Admin",{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({UN , Pass})
        });
        const data =  await response.json();
        if(UN === ""){
            toast.error("Please Enter Username",{
                position:toast.POSITION.TOP_RIGHT,
            })
        }else if(Pass === "" || Pass2 === ""){
            toast.error("Please Enter Password",{
                position:toast.POSITION.TOP_RIGHT,
            })
        }else{
            if(data.length != 0){
                toast.error("UserName Already exsists", {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }else if(Pass != Pass2){
                toast.error("Both Passwords doesnot match", {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }else{
                const response2 = await fetch("http://127.0.0.1:8000/RegisterAdmin",{
                    method:'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({UN , Pass})
                });
                const data2 = await response2.json();
                if(data2 === "Successfull"){
                    toast.success("Admin Successfully register", {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                }
            }
        }
        
    }
  return (
    <div>
        <div className="main-container">
            <ToastContainer />
            <div className="Mid-Box">
                <img src="/images/login-cover2.jpeg" className="cover"/>
                <div className="Right-Mid">
                    <h2 className="Head-Text">Admin Register</h2>
                    <input placeholder="Username" className="Name" onChange={(e)=>{setUN(e.target.value)}}/>
                    <input placeholder="Password" className="Pass" type="password" onChange={(e)=>{setPass(e.target.value)}}/>
                    <input placeholder="ReEnter Password" className="Pass" type="password" onChange={(e)=>{setPass2(e.target.value)}}/>
                    <button className="SBtn" onClick={Authorize}>Register</button>
                    <button className='SBtn'onClick={()=>{navigate("/Admin/Dashboard")}}>Admin Dashboard</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewAdminForm