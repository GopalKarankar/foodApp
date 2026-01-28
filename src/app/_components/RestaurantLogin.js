"use client";
import React, { useState } from 'react';
import "./../globals.css";
import { useRouter } from 'next/navigation';

const RestaurantLogin = () => {

    const [info, setInfo] = useState({
        email:"",
        password:"",
    });

    const handleinfo = (e) => {
        try {
            
            const {name, value} = e.target; 
    
            setInfo({
                ...info,
                [name]:value.trim(),
            });

        } catch (error) {
            console.log(error);
        }
    }

    // console.log(info);

    const router = useRouter();

    const handleLogin = async () =>{

        try {
            
            const res = await fetch("http://localhost:3000/api/restaurant",{
                method:"POST",
                body:JSON.stringify({
                    email:info.email,
                    password:info.password,
                    login:true
                })
            });
    
            const data = await res.json();
    
            // console.log(data);
            
            if (data) {
                localStorage.setItem("restaurantUser",JSON.stringify(data));                
                router.push("/restaurant/dashboard");                    
            }

        } catch (error) {
            console.log(error);
        }
    }
    

    return (
        <div className=' w-[200px] bg-[#2ECC71] flex justify-center flex-col items-center  '  >
            
                <input type="text" className=''   placeholder='Enter email Id' name='email' value={info.email}  onChange={(e)=>{handleinfo(e)}}  autoComplete='off' required />
<br /><br />

                <input type="password" className=''   placeholder='Enter password' name='password' value={info.password}   onChange={(e)=>{handleinfo(e)}}  autoComplete='off' required />
<br /><br />

                <button className=' bg-[#2ECC71] rounded-2xl px-3 border-[#2ECC71] ' onClick={handleLogin} >Login</button>
<br /><br />

        </div>
    );
}

export default RestaurantLogin;
