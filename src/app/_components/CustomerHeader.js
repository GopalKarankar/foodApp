"use client";
import Link from 'next/link';
import "./../globals.css"
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import GoogleLoginButton from './GoogleLoginButton';
import { PowerIcon } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../models/firebase';
import { TextAlignJustify } from 'lucide-react';

const CustomerHeader = ({cartData2}) => {
    
    // console.log(cartData2);
    // console.log(cartInfo2);

    const [cartInfo, setCartInfo] = useState();
    const [userStorage, setUserStorage] = useState();
    const [orderStorage, setOrderStorage] = useState();

    const [rotateD, setRotateD] = useState("rotate(0deg)");

    const location = usePathname();


    const [open, setOpen] = useState({
        left:"-100%",
    });

    const router = useRouter();

    useEffect(() => {
            loadUserLS();
            loadOrderLS();
            loadCartLS();
    }, [cartData2]);


       
    const setCartLS = async () =>{

            if (userStorage && typeof window !== 'undefined') {

                // console.log(userStorage?._id);

                const res = await fetch("https://food-app-lg35.vercel.app/api/cart/"+userStorage?._id,{
                    cache:"no-store",
                });

                const cartData = await res.json();

                // console.log("cartData",cartData);

                if (cartData) {

                    localStorage.setItem("cartStore",JSON.stringify(cartData));  
                    // console.log("setcartls");    

                } else {
                    
                    alert("Couldn`t retrive cart data.");

                }                
            } 
    }


    // Load  cart local storage
    const loadCartLS = async () =>{

        try {
            
            if (typeof window !== 'undefined') {
                // setCartInfo(JSON.parse(localStorage.getItem("cartStore")) || []);            
            
                        // console.log("loadCartLS");    


                if (localStorage.getItem("normalUser")) {

                    setUserStorage(JSON.parse(localStorage.getItem("normalUser")));  

                }else if(localStorage.getItem("deliveryUser")){

                    setUserStorage(JSON.parse(localStorage.getItem("deliveryUser")));  

                }else if(localStorage.getItem("restaurantUser")){

                    setUserStorage(JSON.parse(localStorage.getItem("restaurantUser")));  

                }
                
                setCartLS();
            }

        } catch (error) {
            console.log(error);
        }
       
    }


    // Load  cart local storage
    const loadUserLS =  () =>{

                    // console.log("loadUserLS");    

        try {
            if (typeof window !== 'undefined') {
                // const cartInfoTmp = JSON.parse(localStorage.getItem("cartStore")) || [];
                const cartInfoTmp = JSON.parse(localStorage.getItem("cartStore"));

                setCartInfo(cartInfoTmp);
            }       
                 
        } catch (error) {
            console.log(error);
        }
       
    }


    // Load  cart local storage
    const loadOrderLS =  () =>{

        try {
            if (typeof window !== 'undefined') {
                const ordersInfo = JSON.parse(localStorage.getItem("orderStore")) || [];

                setOrderStorage(ordersInfo);
            }       
                 
        } catch (error) {
            console.log(error);
        }
       
    }



    // Logout 
    const logout = async () =>{

        try {
            
            if (typeof window !== 'undefined' && localStorage.getItem("normalUser")) {

                localStorage.removeItem("normalUser");
                localStorage.removeItem("cartStore");
                setCartInfo([]);

                localStorage.removeItem("orderStore");
                setOrderStorage([]);

                setUserStorage(null);
            
                await signOut(auth);
            
                router.push("/userAuth");
                
            }else if(typeof window !== 'undefined' && localStorage.getItem("deliveryUser")){

                localStorage.removeItem("deliveryUser");
                localStorage.removeItem("cartStore");
                setCartInfo([]);

                localStorage.removeItem("orderStore");
                setOrderStorage([]);

                setUserStorage(null);
            
                router.push("/deliverypartner");

            }else if(typeof window !== 'undefined' && localStorage.getItem("restaurantUser")){

                localStorage.removeItem("restaurantUser");
                localStorage.removeItem("cartStore");
                setCartInfo([]);

                localStorage.removeItem("orderStore");
                setOrderStorage([]);

                setUserStorage(null);
            
                router.push("/restaurant");

            }
        
        } catch (error) {
            console.log(error);
        }
    }


    // Rotate arrow down
    const rotateDown = () => {
        
        if (rotateD === 'rotate(0deg)') {
             setRotateD("rotate(90deg)")
        } else if(rotateD === 'rotate(90deg)'){
            setRotateD("rotate(0deg)");            
        }

    }

    const handleSidebar = () => {
        
        if (open.left === "-100%") {

            setOpen({
                ...open,
                left:"0%",
            });
            

        } else if((open.left === "0%")) {

            setOpen({
                ...open,
                left:"-100%",
            });

            
        }

    }


    return (
        <div className='header-wrapper bg-[#2ECC71] text-black flex justify-between items-center  px-5 py-2' >

            <div className='logo' >
                <Link href="/" >
                    <Image src="/restroLogo.png" alt='Restro-logo' width="120" height="50"  />
                </Link>
            </div>

                <TextAlignJustify onClick={handleSidebar} className='hamburger text-white size-10 p-2  hover:bg-white hover:text-black  ' />

            <ul 
                style={{
                    left:`${open.left || 0}`,
                    transition:"1s",
                    justifyContent:"start",
                }} 

                className=' child-nav flex justify-center items-center gap-7 flex-row flex-wrap'>

                <li className='align-arrow  flex justify-center items-center  ' >
                    <Link className={`${location === "/" ?  "active" : ""} no-underline text-white`} href="/">Home</Link>
                </li>
                
                {userStorage?.userType === "user" && <>

                    <li className='align-arrow flex justify-center items-center ' >
                        <Link className={`${location === "/cart" ?  "active" : ""} no-underline text-white`}  href="/cart">Cart ({cartInfo?.length})</Link>
                    </li>

                    <li className='align-arrow flex justify-center items-center ' >
                        <Link className={`${location === "/myprofile" ?  "active" : ""} no-underline text-white`}  href="/myprofile">Orders ({orderStorage?.length})</Link>
                    </li>

                </>}

                {userStorage ? (            
                    <>
                        {/* <li className='align-arrow' >
                            {userStorage?.username}
                        </li> */}

                        <li  className='  flex justify-center items-center  text-black-500 ' >

                            {userStorage?.email || userStorage?.username &&                         
                                    <span>{userStorage?.email || userStorage?.username}</span>
                            }

    
                                {/* <img src={userStorage?.image} className='rounded-2xl'  width="25" height="25" alt="Profile-image" /> */}
                               <PowerIcon  onClick={logout} className=' ml-1 text-white cursor-pointer' /> 
                        </li>
                    </>        
                        
                    ) : (<>

                        <li className=' relative text-white flex justify-center items-center transition duration-1000 '  onClick={rotateDown} >
                            Login
                            
                            <ChevronRightIcon  style={{transform:rotateD}} /> 

                            {rotateD === "rotate(90deg)" && <div className='loginSignUp rounded-lg flex flex-col justify-center items-center  absolute z-[999]  w-[200px] bg-[#2ECC71] top-[45px] right-[5px] [&>*]:p-2  [&>*]:' >
                                {/* <GoogleLoginButton /> */}
                                <Link className={`${location === "/userAuth" ?  "active" : ""} no-underline text-white hover:bg-white hover:text-black rounded-lg`}  href="/userAuth" >User login</Link>
                                <Link className={`${location === "/restaurant" ?  "active" : ""} no-underline text-white hover:bg-white hover:text-black rounded-lg`}   href="/restaurant" >Restaurant login/signup</Link>
                                <Link className={`${location === "/deliverypartner" ?  "active" : ""} no-underline text-white hover:bg-white hover:text-black rounded-lg`}   href="/deliverypartner" >Delivery agent login/signup</Link>
                            </div> }
                        </li>

                </>)}

            </ul>

        </div>
    );
}

export default CustomerHeader;
