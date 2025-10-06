import { useNavigate } from "react-router";
import { useState } from "react";
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login(){
    const [UN,setUN] = useState("");
    const [Pass,setPass] = useState("");
    const navigate = useNavigate();
    async function Authorize(){
        const response = await fetch("https://bookish-treasures-backend.onrender.com/auth/Admin",{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({UN , Pass})
        })
        const data = await response.json();
        console.log(data.length);
        if(UN === ""){
            toast.error("Please Enter UserName", {
                position: toast.POSITION.TOP_RIGHT,
              });
        }else if(Pass === ""){
            toast.error("Please Enter Password", {
                position: toast.POSITION.TOP_RIGHT,
              });
        }else{
            if(data.length > 0){
                if(data[0].Password === Pass){
                    navigate("/Admin/Dashboard");
                }else{
                    toast.warning("Incorrect Password", {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                }
            }
            else{
                toast.error("Incorrect Username", {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }
        }
    }
    return(
        <div className="main-container">
            <ToastContainer />
            <div className="Mid-Box">
                <img src="images/login-cover2.jpeg" className="cover" alt="Login cover"/>
                <div className="Right-Mid">
                    <h2 className="Head-Text">Admin Login</h2>
                    <input placeholder="Username" className="Name" onChange={(e)=>{setUN(e.target.value)}}/>
                    <input placeholder="Password" className="Pass" type="password" onChange={(e)=>{setPass(e.target.value)}}/>
                    <button className="SBtn" onClick={Authorize}>SignIn</button>
                </div>
            </div>
        </div>
    )
}

export default Login;