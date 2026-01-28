"use client";
import Link from 'next/link';
import "./../globals.css"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const DeliveryHeader = ({cartData2}) => {
    
    // console.log(cartData2);
    
    // const [cartInfo, setCartInfo] = useState();
    // const [deliveryStorage, setDeliveryStorage] = useState();
    // const router = useRouter();

    // useEffect(() => {
    //         loadCartLS();
    // }, [cartData2]);



    const loadCartLS = async () =>{

        try {
            
            // setCartInfo(JSON.parse(localStorage.getItem("cartStore")) || []);
            
            // if (localStorage.getItem("normalUser")) {

            //     setUserStorage(JSON.parse(localStorage.getItem("normalUser")));  

            // } else if(localStorage.getItem("userData")){
                
            //     setUserStorage(JSON.parse(localStorage.getItem("userData")));        
            // }

        } catch (error) {
            console.log(error);
        }

            
        }

    
    const logout = () =>{
            
        try {
            
            if (localStorage.getItem("deliveryUser")) {

                localStorage.removeItem("deliveryUser");

            } 

            // setDeliveryStorage(null);
        // router.push("/userAuth");
        
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='header-wrapper' >

            <div className='logo'>
                <h1>Logo</h1>
            </div>

            <ul>

                <li>
                    <Link href="/">Home</Link>
                </li>

                <li><button onClick={logout} >Logout</button></li>

            </ul>

        </div>
    );
}

export default DeliveryHeader;
