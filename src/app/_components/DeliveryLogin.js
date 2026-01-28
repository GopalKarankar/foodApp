'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const DeliveryLogin = () => {

    
    const router = useRouter();
    
    const orderBool =  useSearchParams();
    
    const isOrder= orderBool.get("order");
    

    const [userInfo, setUserInfo] = useState({
        mobileNo:"",
        password:"",
    });

    
    const handleLogin = (e) =>{
     
    try {
        
        const {name, value} = e.target;

        setUserInfo({
            ...userInfo,
            [name]:value.trim(),
        });

     } catch (error) {
        console.log(error)
     }

    }

    const handleUpload = async () =>{

        try {
            
            const res = await fetch("https://food-app-lg35.vercel.app/api/deliverypartner/login",{
                method:"POST",
                body:JSON.stringify(userInfo),
            });
    
            // const {password, ...data} = await res.json();
    
            const data =  await res.json();
    
            // console.log(data);
    
            if (data) {
                localStorage.setItem("deliveryUser",JSON.stringify(data));
        
                router.push("/deliverydashboard");                
            }
    
            // if (isOrder) {
            //     router.push("/order");
                
            // } else {
            //     router.push("/");            
            // }
            
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className=' flex justify-center flex-col items-center gap-5 ' >
            
                <input type="text"  className=''  name='mobileNo' value={userInfo.mobileNo} onChange={(e)=>handleLogin(e)} placeholder='Enter Mobile number'  autoComplete='off' required />

                <input type="password" className=''  name='password' value={userInfo.password} onChange={(e)=>handleLogin(e)} placeholder='Enter password'  autoComplete='off' required />
                
                <button className='bg-[#2ECC71] px-4 rounded-lg hover:bg-white ' onClick={handleUpload} >Login</button>
                
        </div>
    );
}

export default DeliveryLogin;
