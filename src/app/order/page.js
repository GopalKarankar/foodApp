
"use client";
import React, { useEffect, useState } from 'react';
import CustomerHeader from '../_components/CustomerHeader';
import { DELIVERY_CHARGES, TAX } from '../models/constant';
import { useRouter } from 'next/navigation';


const Page = () => {

    const [userLoggedIn, setUserLoggedIn] = useState();
    const [cartStorage, setCartStorage] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const router = useRouter();


    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCartStorage(JSON.parse(localStorage.getItem("cartStore")));
            setUserLoggedIn(JSON.parse(localStorage.getItem("normalUser")));
        }
    }, []);
    

    useEffect(() => {
        
        const pricelist = cartStorage?.reduce((acc, item)=>{
            return Number(acc) + Number(item.price);
        },0);

        setTotalPrice(pricelist);

    }, [cartStorage]);

    // console.log(userLoggedIn);

    const placeOrder = async (totalAMT) =>{

        try {
            // console.log(totalAMT);
            
            const totalAmount = totalPrice + totalPrice*TAX/100 + DELIVERY_CHARGES;
    
            // console.log(userLoggedIn?.city);

            let resDelivery = await fetch("https://food-app-lg35.vercel.app/api/deliverypartner/"+userLoggedIn?.city);
                
            resDelivery = await resDelivery.json();
    
            // console.log(resDelivery);
    
            const resDeliveryIds = resDelivery.map((dboy)=>{
                    return dboy._id;
                });
    
            const selectedDeliveryId = resDeliveryIds[Math.floor(Math.random() * resDeliveryIds?.length)];
    
            // console.log(selectedDeliveryId);
            
            if (!selectedDeliveryId) {
                alert("DeleveryBoy not selected.");
            }
    
    
            const body = {
                userId: userLoggedIn?._id,
                address: userLoggedIn?.address,
                items: cartStorage,
                amount: totalAmount,
                status: 'pending',
                deliveryBoyId:selectedDeliveryId,
            }
    
            // console.log(body);
    
            const res = await fetch("https://food-app-lg35.vercel.app/api/order",{
                method:"POST",
                body:JSON.stringify(body),
            });
    
            const data = await res.json();
            // console.log(data);
            router.push(`/myprofile`);
            
        } catch (error) {
            console.log(error);
        }

    }

    
    return (
        <div className='parent-page' >
                    <CustomerHeader cartData2={cartStorage} />

                         <center>
                            <h1 className='white-text' >Cart page</h1>
                         </center>
                       <br />

<div className='flex justify-center items-center flex-wrap '>


                <div className=' flex justify-center items-center flex-wrap flex-col p-4 rounded-tr-2xl  rounded-bl-2xl w-[200px] gap-2 bg-[#2ECC71] '  >

                        <h1>User details</h1>
                        
                            <span>Name : {userLoggedIn?.username}</span>
                            <span></span>
                       

                            <span>Address : {userLoggedIn?.address}</span>
                            <span></span>
                        

                            <span>Moile no : {userLoggedIn?.mobileNo}</span>
                            <span></span>
                        
                        <br /><br />

                        <h1 className='text-center' >Order details</h1>
                        <div className='row' >
                            <span>Food charges : </span>
                            <span>Rs {totalPrice}</span>
                        </div>

                        <div className='row'>
                            <span>Tax : </span>
                            <span>Rs {totalPrice*TAX/100}</span>
                        </div>

                        <div className='row' >
                            <span>Delivery charges : </span>
                            <span>Rs {DELIVERY_CHARGES}</span>
                        </div>
                        
                        <div className='row' >
                            <span>Total amount : </span>
                            <span>Rs {totalPrice + totalPrice*TAX/100 + DELIVERY_CHARGES}</span>
                        </div>

                        <button className=' bg-[#2ECC71] px-3 rounded-lg hover:bg-white hover:text-black border border-[#32ECC71] ' onClick={()=>{placeOrder(totalPrice)}} >Place order</button>
                    </div>            

    </div>

</div>
            
    );
}

export default Page;
