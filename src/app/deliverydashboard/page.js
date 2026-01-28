"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomerHeader from '../_components/CustomerHeader';

const Page = () => {

    const [dboyStorage, setDboyStorage] = useState();
    const [ordersData, setOrdersData] = useState();
    const [statusStr, setStatusStr] = useState();

    const router = useRouter();

    useEffect(() => {
    
        loadDeliveryUser();
    
    }, []);


    useEffect(() => {
    
        loadOrders();
    
    }, [dboyStorage]);




    const loadDeliveryUser = () =>{

        const dboyStorageTmp = JSON.parse(localStorage.getItem("deliveryUser"));

        setDboyStorage(dboyStorageTmp);

    }

        // console.log(dboyStorage?._id);


    const loadOrders = async ()=>{

            // console.log(dboyStorage?._id);

            if (dboyStorage) {

                const res = await fetch("https://food-app-lg35.vercel.app/api/deliverypartner/orders/"+dboyStorage?._id);
                const data = await res.json();

                if (data) {
                    // console.log(data);
                    setOrdersData(data);                
                }
                
            }

    }

    const changeStatus = async (id)=>{

        try {
            
            // console.log(id);
    
                const res = await fetch("https://food-app-lg35.vercel.app/api/deliverypartner/orders/statusEdit/"+id,{
                    method:"PUT",
                    body:JSON.stringify({status:statusStr})
                });
    
                const data = await res.json();

                if (data) {
                    loadOrders();                    
                }
                // console.log(data);
                
        } catch (error) {
            console.log(error);
        }
        
    }

    // console.log(dboyStorage);
    // console.log(ordersData);

    return (
        <div className='parent-page' >

            <CustomerHeader/>
                
            <h1 className='text-white text-center' >Delivery task</h1>
            <br /><br />

            <div className='align-flex  flex justify-center flex-wrap items-center gap-4 ' >


            { ordersData?.length > 0 ? ordersData?.map((order, key)=>{
                return  <div className=' bg-[#2ECC71] p-5 rounded-tr-2xl rounded-bl-2xl flex justify-center flex-col gap-3 ' key={key}>
                            <div className=' text-center ' >Order Id : {order._id}</div>
                            <h1>Items list</h1>
                            {order.items.map((item, key)=>{
                                return  <div className='' key={key} >
                                                <div>Item name : {item.itemName}</div>
                                                <div>Price : {item.price}</div>
                                                <div>Description : {item.description}</div>
                                        </div>

                            })}
                            <div>Amount : {order.amount}</div>
                            <div>Address : {order.address}</div>
                            <div>Delivery status : <span className='text-white' >{order.status}</span>
                                    <br />
                                    <br />

                                    <select onChange={(e)=>{setStatusStr(e.target.value)}} name="" id="">
                                        <option value="Pending" >Pending</option>
                                        <option value="Confirm"  >Confirm</option>
                                        <option value="On The Way" >On the way</option>
                                        <option value="Delivererd" >Delivered</option>
                                        <option value="Failed" >Failed to deliver</option>
                                    </select>

                                    <button onClick={()=>{changeStatus(order._id)}} >Change status</button>
                            </div>
                        </div>

            }) : <div>No Task available.</div> }
                
            </div>

            
        </div>
    );
}

export default Page;
