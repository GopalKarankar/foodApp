"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const DeliverySignUp = () => {

    const [details, setDetails] = useState({
        username:"",
        mobileNo:"",
        password:"",
        cPassword:"",
        city:"",
        address:"",
    });

    const router =  useRouter();

    const [userStorage, setUserStorage] = useState(null);

    const handleUpload = (e) =>{

        try {
            
            const {name, value} = e.target;

            setDetails({
                ...details,
                [name]:value.trim(),
            });

        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async () =>{

        try {
            
            const {cPassword, ...toUpload} = details;
    
            // console.log(toUpload);
    
            const res = await fetch("http://localhost:3000/api/deliverypartner/signup",{
                method:"POST",
                body:JSON.stringify(details),
            });
    
            const {password, ...data} = await res.json();
    
            localStorage.setItem("deliveryUser",JSON.stringify(data));
    
    
            router.push("/deliverydashboard");
            
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='container-panel' >


                <div className='input-wrapper'>

                    <input type="text" className='input-field' name='username' value={details.username}  onChange={(e)=>{handleUpload(e)}}  placeholder='Enter username' required/>
                    <br /><br />

                    <input type="text" className='input-field' name='mobileNo' value={details.mobileNo}  onChange={(e)=>{handleUpload(e)}}  placeholder='Enter Mobile number'  required/>
                    <br /><br />

                    <input type="text" className='input-field' name='password' value={details.password}  onChange={(e)=>{handleUpload(e)}}  placeholder='Enter password'  required/>
                    <br /><br />

                    <input type="text" className='input-field' name='cPassword' value={details.cPassword}  onChange={(e)=>{handleUpload(e)}}  placeholder='Confirm password'  required/>
                    <br /><br />

                    <input type="text" className='input-field' name='city' value={details.city}  onChange={(e)=>{handleUpload(e)}}  placeholder='Enter city'  required/>
                    <br /><br />

                    <input type="text" className='input-field' name='address' value={details.address}  onChange={(e)=>{handleUpload(e)}}  placeholder='Enter address'  required/>
                    <br /><br />
                    
                    <button className='bg-[#2ECC71] w-[150px] rounded-lg hover:bg-white ' onClick={handleSubmit} >Sign up</button>
            
                </div>

        </div>
    );
}

export default DeliverySignUp;
