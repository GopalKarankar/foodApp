"use client";
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const UserLogin = () => {

    const router = useRouter();
    
    const orderBool =  useSearchParams();

    const [userStorage, setUserStorage] = useState(null);

    const isOrder= orderBool.get("order");
    
    const [userInfo, setUserInfo] = useState({
        email:"",
        password:"",
    });


    useEffect(() => {
        
        setCartLS();
        setOrderLS();

    }, [userStorage]);
    

    const handleLogin = (e) =>{
        try {
            const {name, value} = e.target;
    
            setUserInfo({
                ...userInfo,
                [name]:value.trim(),
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpload = async () =>{
        try {
            
            const res = await fetch("http://localhost:3000/api/user/login",{
                method:"POST",
                body:JSON.stringify(userInfo),
            });
    
            const data = await res.json();

            setUserStorage(data);

            if (data) {
                
                localStorage.setItem("normalUser",JSON.stringify(data));

            } else {
                alert("Login failed.");                
            }
            
            if (isOrder) {
                router.push("/order");
                
            } 
            
        } catch (error) {
            console.log(error);
        }

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
                    
                    // const { city, address, mobileNo} = userStorage;

                    // if (city === "NA" && address === "NA" && mobileNo === "NA") {
                    //     router.push("/completeProfile");            
                    // } else {
                    //     router.push("/");                                    
                    // }

                        router.push("/");                                    
            
                } else {
                    
                    alert("Couldn`t retrive order data.");

                }
                
            } 

    }


    return (
        <div>
            
            <div className='' >

                <input type="text" name='email' className='input-field'  value={userInfo.email} onChange={(e)=>handleLogin(e)} placeholder='Enter email' autoComplete='off' required />
                <br /><br />

                <input type="password" name='password'  className='input-field'  value={userInfo.password} onChange={(e)=>handleLogin(e)} placeholder='Enter password' autoComplete='off' required />
                <br /><br />
                
                <button onClick={handleUpload} >Login</button>
            </div>
        </div>
    );
}

export default UserLogin;
