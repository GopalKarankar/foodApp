"use client";
import React, { useEffect, useState, Suspense } from 'react';
import RestaurantFooter from '../_components/RestaurantFooter';
import DeliveryLogin from '../_components/DeliveryLogin';
import DeliverySignUp from '../_components/DeliverySignUp';
import { useRouter } from 'next/navigation';
import CustomerHeader from '../_components/CustomerHeader';
import Preloader from '../_components/Preloader';

const Page = () => {
    
    const [forloggedIn, setForloggedIn] = useState(true);
    const [loggedDelivery, setLoggedDelivery] = useState();
    const router = useRouter();

    useEffect(() => {
        const delivery = JSON.parse(localStorage.getItem("deliveryUser"));
        // if (delivery) {
        //     router.push("/deliverydashboard");
        // }
        setLoggedDelivery(delivery);
    }, []);

    // console.log(loggedDelivery);

    return (
        <Suspense fallback={<Preloader/>} >

            <div className='parent-page' >

                <CustomerHeader/>
                
                <div className='flex justify-center flex-col items-center ' >

                        <br />
                        <center>
                            <h1 className='white-text' >Delivery agent {forloggedIn ? "login": "Sign up" }</h1>
                        </center>
                        <br />
                        
                    <div className='w-[300px] p-4 bg-[#2ECC71] rounded-tr-2xl rounded-bl-2xl ' >
    

                        {forloggedIn ? (<DeliveryLogin/>) : (<DeliverySignUp/>)}

                        <br />
                        <center>
                        <button className=' bg-[#2ECC71] px-4 rounded-lg hover:bg-white '  onClick={()=>{setForloggedIn(!forloggedIn)}} >{forloggedIn ? "Do not have account ? Sign up" : "Already a user ? Login"}</button>
                        </center> 
                        
                    </div>

                </div>

                <RestaurantFooter />
            </div>

        </Suspense>
    );

}

export default Page;
