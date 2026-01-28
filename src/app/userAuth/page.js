"use client";
import React, { useState } from 'react';
import CustomerHeader from '../_components/CustomerHeader';
import RestaurantFooter from '../_components/RestaurantFooter';
import UserSignUp from '../_components/UserSignUp';
import UserLogin from '../_components/UserLogin';
import './../globals.css';
import GoogleLoginButton from '../_components/GoogleLoginButton';

const Page = () => {
    
    // const [forloggedIn, setForloggedIn] = useState(true);

    return (

        <div className='parent-page' >

            <CustomerHeader/>
            
                <div className='container-panel'>

                        {/* <h1 className='white-text' >User {forloggedIn ? "login": "Sign up" } </h1>
                        <br />

                        {forloggedIn ? (<UserLogin/>) : (<UserSignUp/>)}
 */}
                        <GoogleLoginButton />
                        
                        {/* <br />
                        <button onClick={()=>{setForloggedIn(!forloggedIn)}} >{forloggedIn ? "Do not have account ? Sign up" : "Already a user ? Login"}</button> */}

                </div>

            <RestaurantFooter />
            
        </div>
    );

}

export default Page;
