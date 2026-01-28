"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Preloader from './Preloader';

const RestaurantSignUp = () => {

    const [details, setDetails] = useState({
        email:"",
        password:"",
        cPassword:"",
        rName:"",
        city:"",
        address:"",
        contact:"",
    });

    const [passwordError, setPasswordError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSignUp = (e) => {

        try {
            
            const {name, value} = e.target;
    
            // console.log(name,value);
    
            setDetails({
                ...details,
                [name]:value.trim(),
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    

    const handleUploadSignUp = async () =>{

        try {
            
            // console.log(details);
    
            if (details.password !== details.cPassword) {
            
                setPasswordError(true);
            
            }else{
    
                setPasswordError(false);
                setIsLoading(true);

                const resp = await fetch("https://food-app-lg35.vercel.app/api/restaurant",{
                    method:"POST",
                    body:JSON.stringify(details),
                });
    
                const {password, ...data} = await resp.json();
    
                localStorage.setItem("restaurantUser",JSON.stringify(data));
    
                console.log(data);

                if (data) {
                    setIsLoading(false);
                    router.push("/restaurant/dashboard");                                        
                }

            }
            
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div className='w-[200px] bg-[#2ECC71] flex justify-center flex-col items-center  gap-4' >
            
            <div className='input-wrapper' >
                <input type="text" placeholder='Enter email Id' name="email" value={details.email} onChange={(e)=>{handleSignUp(e)}} className="input-field"  />
            </div>

            <div className='input-wrapper' >
                <input type="password" placeholder='Enter password' name="password" value={details.password} onChange={(e)=>{handleSignUp(e)}} className="input-field" />
            </div>

            <div className='input-wrapper' >
                <input type="password" placeholder='confirm password' name="cPassword" value={details.cPassword} onChange={(e)=>{handleSignUp(e)}} className="input-field" />
            </div>
            { passwordError && <span className='input-error' >Password does not match.</span> }

            <div className='input-wrapper' >
                <input type="text" placeholder='Enter restaurant name' name="rName" value={details.rName} onChange={(e)=>{handleSignUp(e)}} className="input-field" />
            </div>

            <div className='input-wrapper' >
                <input type="text" placeholder='Enter city' name="city" value={details.city} onChange={(e)=>{handleSignUp(e)}} className="input-field" />
            </div>

            <div className='input-wrapper' >
                <input type="text" placeholder='Enter full address' name="address" value={details.address} onChange={(e)=>{handleSignUp(e)}} className="input-field" />
            </div>

            <div className='input-wrapper' >
                <input type="text" placeholder='Enter contact no. ' name="contact" value={details.contact} onChange={(e)=>{handleSignUp(e)}} className="input-field" />
            </div>

            <div className='input-wrapper' >
                <button className=' w-[150px] bg-[#2ECC71]  rounded-lg border-[#2ECC71]  ' onClick={handleUploadSignUp}   >{isLoading ? <Preloader/> : "Sign up"}</button>                
            </div>
            <br />

        </div>
    );
}

export default RestaurantSignUp;
