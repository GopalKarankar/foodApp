"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const CompleteProfile = () => {

    const [details, setDetails] = useState({
        city:"",
        address:"",
        mobileNo:"",
    });

    const router =  useRouter();

    const [userStorage, setUserStorage] = useState(null);

    useEffect(() => {
        setUserLS();
    }, []);


    useEffect(() => {
        
        setCartLS();
        setOrderLS();

    }, [userStorage]);
        

        const setUserLS = () =>{
            const userTmp = JSON.parse(localStorage.getItem("normalUser"));

            setUserStorage(userTmp);
        }

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

                    const res = await fetch("https://food-app-lg35.vercel.app/api/user",{
                        method:"PUT",
                        body:JSON.stringify({...details, _id:userStorage._id}),
                    });
            
                    const data = await res.json();

                    // console.log(data)

                    setUserStorage(data);

                    if (data) {                
                        console.log("normalUser");
                       localStorage.setItem("normalUser",JSON.stringify(data));
            
                    }

                    
            } catch (error) {

                    console.log(error);

            }
        // console.log(details);
    }


    
    const setCartLS = async () =>{

            if (userStorage) {

                // console.log(userStorage?._id);

                const res = await fetch("https://food-app-lg35.vercel.app/api/cart/"+userStorage?._id);

                const cartData = await res.json();

                if (cartData) {

                    localStorage.setItem("cartStore",JSON.stringify(cartData));      

                } else {
                    
                    alert("Couldn`t retrive cart data.");

                }
                
            } 

    }


    const setOrderLS = async () =>{

            if (userStorage) {

                // console.log(userStorage?._id);

                const res = await fetch("https://food-app-lg35.vercel.app/api/order/"+userStorage?._id);

                const orderData = await res.json();

                if (orderData) {

                    localStorage.setItem("orderStore",JSON.stringify(orderData));      
                    
                    // localStorage.setItem("normalUser",JSON.stringify(userStorage));
                    
                    console.log("Order LS");

                    router.push("/");            
            
                } else {
                    
                    alert("Couldn`t retrive order data.");

                }
                
            } 

    }

    return (

        <div className='container-panel' >
            
                <h1 className='white-text' >Complete Profile details</h1>
                <br />

                <div className=''>


                    <input type="text" className='input-field' name='city' value={details.city}  onChange={(e)=>{handleUpload(e)}}  placeholder='Enter city'  autoComplete='off' required />
                    <br /><br />

                    <input type="text" className='input-field' name='address' value={details.address}  onChange={(e)=>{handleUpload(e)}}  placeholder='Enter address'  autoComplete='off' required />
                    <br /><br />

                    <input type="text" className='input-field' name='mobileNo' value={details.mobileNo}  onChange={(e)=>{handleUpload(e)}}  placeholder='Enter Mobile number'  autoComplete='off' required />
                    <br /><br />
                    
                    <button onClick={handleSubmit} >Upload</button>
            
                </div>

        </div>
    );
}

export default CompleteProfile;
