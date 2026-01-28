"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const UserSignUp = () => {

    const [details, setDetails] = useState({
        name:"",
        email:"",
        password:"",
        cPassword:"",
        city:"",
        address:"",
        mobileNo:"",
    });

    const router =  useRouter();

    const [userStorage, setUserStorage] = useState(null);
    
        useEffect(() => {
            
            setCartLS();
            setOrderLS();
    
        }, [userStorage]);
        

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
            
            
                    const res = await fetch("http://localhost:3000/api/user",{
                        method:"POST",
                        body:JSON.stringify({...details, username:details.name}),
                    });
            
                    // const {password , ...data} = await res.json();

                    const data = await res.json();
            
                    setUserStorage(data);

                    if (data) {                
            
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

                const res = await fetch("http://localhost:3000/api/cart/"+userStorage?._id);

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

                const res = await fetch("http://localhost:3000/api/order/"+userStorage?._id);

                const orderData = await res.json();

                if (orderData) {

                    localStorage.setItem("orderStore",JSON.stringify(orderData));      

                    router.push("/");            
            
                } else {
                    
                    alert("Couldn`t retrive order data.");

                }
                
            } 

    }

    return (
        <div className='input-wrapper'>

            <input type="text" className='input-field' name='name' value={details.name}  onChange={(e)=>{handleUpload(e)}}  placeholder='Enter username'  autoComplete='off' required />
            <br /><br />

            <input type="text" className='input-field' name='email' value={details.email}  onChange={(e)=>{handleUpload(e)}}  placeholder='Enter email'  autoComplete='off' required />
            <br /><br />

            <input type="password" className='input-field' name='password' value={details.password}  onChange={(e)=>{handleUpload(e)}}  placeholder='Enter password'  autoComplete='off' required />
            <br /><br />

            <input type="password" className='input-field' name='cPassword' value={details.cPassword}  onChange={(e)=>{handleUpload(e)}}  placeholder='Confirm password'  autoComplete='off' required />
            <br /><br />

            <input type="text" className='input-field' name='city' value={details.city}  onChange={(e)=>{handleUpload(e)}}  placeholder='Enter city'  autoComplete='off' required />
            <br /><br />

            <input type="text" className='input-field' name='address' value={details.address}  onChange={(e)=>{handleUpload(e)}}  placeholder='Enter address'  autoComplete='off' required />
            <br /><br />

            <input type="text" className='input-field' name='mobileNo' value={details.mobileNo}  onChange={(e)=>{handleUpload(e)}}  placeholder='Enter Mobile number'  autoComplete='off' required />
            <br /><br />
            
            <button onClick={handleSubmit} >Sign up</button>
       
        </div>
    );
}

export default UserSignUp;
