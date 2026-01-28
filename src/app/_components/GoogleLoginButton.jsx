"use client";
import React, { useEffect, useState } from "react";
// import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../models/firebase";
import { useRouter } from "next/navigation";
import Preloader from "./Preloader";

export default function GoogleLoginButton() {

    // Stores user login data
    // const [user, setUser] = useState();
  
    // loading before login
    const [loading, setLoading] = useState(false);

    const [userStorage, setUserStorage] = useState(null);

    const router = useRouter();


    useEffect(() => {
        
        setCartLS();
        setOrderLS();

    }, [userStorage]);


    //login  
    const login = async () => {

        try {

            setLoading(true);

            const provider = new GoogleAuthProvider();

            const result = await signInWithPopup(auth, provider);

            if (result) {

                const body = {
                    username:result?.user?.displayName,
                    email:result?.user?.email,
                    image:result?.user?.photoURL
                }
                
                
                const res = await fetch("https://food-app-lg35.vercel.app/api/user",{
                    method:"POST",
                    body:JSON.stringify(body),
                });
        
                const data = await res?.json();
                
                // console.log(data);
           
                if (data) {
                
                    localStorage.setItem("normalUser",JSON.stringify(data));
                    
                    setUserStorage(data);
                    
                    setLoading(false);

                    router.push("/");

                }

            }

        
        } catch (err) {
        
            console.error(err);
            alert(err?.message || "Login failed");
        
        } finally {
        
            setLoading(false);
        
        }

    };


    
    const setCartLS = async () =>{

            if (userStorage) {

                // console.log(userStorage?._id);

                const res = await fetch("https://food-app-lg35.vercel.app/api/cart/"+userStorage?._id);

                const cartData = await res.json();

                // console.log(cartData);

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

                    const { city, address, mobileNo} = userStorage;

                    if (city === "NA" && address === "NA" && mobileNo === "NA") {
                        
                        // console.log("completeProfile");
                       
                        router.push("/completeProfile");            
                    } else {
                        // console.log("home")
                        
                        router.push("/");                                    
                    }

                    // router.push("/");            
            
                } else {
                    
                    alert("Couldn`t retrive order data.");

                }
                
            } 

    }
    


    // Logout
  const logout = async () => {
    
    await signOut(auth);
    localStorage.removeItem("normalUser");
    setUser(null);

  };


  return (

    <div className="centerize" >

            {loading ? <Preloader />: <button className="text-white bg-[#2ECC71] border border-white rounded-[10px] w-[200px] h-[30px] hover:bg-white hover:text-[#2ECC71] "  onClick={login}>
                                        Sign in with Google
                                    </button>}


    </div>
      

  )
    
}
