"use client";

import React, { useEffect, useState } from 'react';
import CustomerHeader from '../_components/CustomerHeader';
import RestaurantFooter from '../_components/RestaurantFooter';

const Page = () => {

    const [userLoggedIn, setUserLoggedIn] = useState();
    const [orderDetails, setOrderDetails] = useState();


    useEffect(() => {
        loadLoggedInLS();
    }, []);


    useEffect(() => {
        getMyOrders();
    }, [userLoggedIn]);


    const loadLoggedInLS = () =>{

        try {
            const userData = JSON.parse(localStorage.getItem("normalUser"))
            setUserLoggedIn(userData);
            
        } catch (error) {
            console.log(error);
        }
        
    }

    const getMyOrders = async () =>{

        try {
            
            if (userLoggedIn) {

            const res = await fetch(`https://food-app-lg35.vercel.app/api/order?userId=${userLoggedIn?._id}`);
    
            const data = await res.json();
    
            localStorage.setItem("orderStore",JSON.stringify(data));

            setOrderDetails(
                data?.filter((order)=>{
                        return order.userId === userLoggedIn._id;
                    })
            );
                
            }
            
        } catch (error) {
            console.log(error);
        }
    }


    const cancelOrder = async (cancelObj) =>{

        if (cancelObj.type==="single") {

            // console.log(cancelObj.state.orderId,cancelObj.state.itemId);

            const res = await fetch(`https://food-app-lg35.vercel.app/api/order`,{
                method:"DELETE",
                body:JSON.stringify({ 
                                        state:cancelObj.type,
                                        orderId:cancelObj.state.orderId, 
                                        itemId:cancelObj.state.itemId 
                                    })
            });
    
            const data = await res.json();
    
            // console.log(data);

            if (data) {
                getMyOrders();
            }
            
        } else if(cancelObj.type==="complete"){

            const res = await fetch(`https://food-app-lg35.vercel.app/api/order`,{
                method:"DELETE",
                body:JSON.stringify({ 
                                        state:cancelObj.type,
                                        orderId:cancelObj.state, 

                                    })
            });
    
            const data = await res.json();
    
            console.log(data);

            if (data) {
                getMyOrders();
            }
            // console.log(cancelObj.state);
            
        }
        
    }

    // console.log(orderDetails);

    return (
        <div className='parent-page' >

        <CustomerHeader cartData2={orderDetails} />

        <br />
        <center>
            <h1 className='white-text' >My Orders</h1>
        </center>
        <br />
        
        <div className=' flex justify-center  flex-row p-5 gap-10  ' >

                {orderDetails?.map((order, key)=>{
                    return   <div className=' w-[300px] flex justify-center flex-wrap gap-3 bg-[#f36c10] p-5 rounded-tr-2xl rounded-bl-2xl ' key={key}>
                                <div>Order Id : {order?._id}</div>     
                                <br />
                                                       
                                <div>User Id : {order?.userId}</div>   
                                <br />
                                
                                <div>Odered Items :</div>
                                <br />

                                {order?.items?.map((item, key)=>{
                                    return <div className='flex justify-center flex-wrap bg-[#2dcc70] gap-3 p-5 rounded-tr-2xl rounded-bl-2xl ' key={key}>
                                                <div>{item.itemName}</div>
                                                <div>Rs {item.price}</div>
                                                <div>{item.description}</div>
                                                <br />
                                                <button
                                                    className=' bg-[#2ECC71] w-[150px] rounded-2xl border-[#2ECC71] hover:bg-white hover:border-white '
                                                    style={{color:"black"}}  
                                                    onClick={()=>{
                                                        cancelOrder({state:{ 
                                                                        itemId:item?._id, 
                                                                        orderId:order?._id 
                                                                        },
                                                                    type:"single"
                                                                    })
                                                        }} >
                                                    Cancel Order
                                                </button>        
                                        </div>
                                })}

                                <div>Total : Rs {order.amount}</div>
                                <div>Status : {order.status}</div>              
                                                <br />
                                                <button
                                                    className=' bg-[#2ECC71] w-[150px] rounded-2xl border-[#2ECC71] hover:bg-white hover:border-white '
                                                    style={{color:"black"}}  
                                                    onClick={()=>{cancelOrder({state:order?._id ,type:"complete"})}} >
                                                    Cancel Complete Order
                                                </button>        
                                
                            </div>
                })}


            </div>

            <RestaurantFooter/>

        </div>

    );
}

export default Page;
