
"use client";
import React, { useEffect, useState } from 'react';
import CustomerHeader from '../_components/CustomerHeader';
import { DELIVERY_CHARGES, TAX } from '../models/constant';
import { useRouter } from 'next/navigation';


const Page = () => {

    const [cartStorage, setCartStorage] = useState();
    const [userStorage, setUserStorage] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [cartChange, setCartChange] = useState();
    const router = useRouter();


    useEffect(() => {

        loadCartMDBsetLS();
        setCartStorage(JSON.parse(localStorage.getItem("cartStore")));
        setUserStorage(JSON.parse(localStorage.getItem("normalUser")));
    
    }, []);

    useEffect(() => {
        
        const pricelist = cartStorage?.reduce((acc, item)=>{
            return Number(acc) + Number(item.price);
        },0);

        setTotalPrice(pricelist);

    }, [cartStorage]);



    // Load from mongoDB and update cart LS
    const loadCartMDBsetLS = async () =>{
        
        if (userStorage?._id) {

            const res = await fetch("https://food-app-lg35.vercel.app/api/cart/"+userStorage?._id);

            const data = await res.json();

            setCartChange(data);
            // console.log("cartData",cartData);

            localStorage.setItem("cartStore",JSON.stringify(data));                        
        }

    }   
    

    // Removes from from on clicking
    const removeFromCart = async (id) =>{

        try {
            const updatedCart = cartStorage.filter((item)=>{
                return item._id !== id;
            });
    
            setCartStorage(updatedCart);

            localStorage.setItem("cartStore",JSON.stringify(updatedCart));  
                            
            const res = await fetch(`https://food-app-lg35.vercel.app/api/cart/${id}`,{
                method:"DELETE"
            });

            const data = await res.json();

            setCartChange(data);
            // console.log(data);
            
        } catch (error) {
            console.log(error);
        }
        

    }

    const orderNow = () =>{
        
        try {
            
            if (JSON.parse(localStorage.getItem("normalUser"))) {
                router.push("/order");            
            }else{
                router.push("/userAuth?order=true");            
            }
            
        } catch (error) {
            console.log(error);
        }
        
        
    }

    return (
        <div className='parent-page ' >
        
        <CustomerHeader cartData2={cartChange} />

            <div className='flex justify-center items-center  flex-col gap-5'>

                    <h1 className='white-text'>Cart page</h1>
                       
                    <div className='food-item-wrapper flex justify-center flex-wrap gap-5  '>

                        { cartStorage?.length > 0 ? cartStorage.map((item,key)=>{
                            return <div className=' bg-[#2ECC71] text-white p-5 flex flex-row justify-center rounded-tr-2xl rounded-bl-2xl'  key={key}>
                                         
                                            <div className='item-block-1 flex justify-center flex-col items-center  '>
                                                <img src={item.imgLink}  alt="Image" className="imgDim" />
                                            </div>
            
                                            <div className='item-block-2 flex justify-center flex-col flex-wrap gap-4 p-5 '>
                                                <div>{item.itemName}</div> 
                                                <div className='description'>{item.description}</div>
                                                <button  className=' bg-[#2ECC71] px-3 rounded-lg border-[#2ECC71] inline w-[150px] hover:bg-white hover:border-white '  onClick={()=>{removeFromCart(item._id)}} >Remove from cart</button>                                                                                                
                                                <div>Rs {item.price}</div>
                                            </div>

                                    </div>                    
                        }): <h1 className='text-white' >No items added to cart</h1>
                        
                        }
            
                    </div>

                         
                {cartStorage?.length > 0 && <div className='total-wrapper bg-[#2ECC71] w-[200px] flex justify-center flex-col gap-4 p-5 [&>*]:text-white rounded-tr-2xl rounded-bl-2xl'>

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

                                        <button className=' bg-[#2ECC71] px-3 rounded-lg border-[#2ECC71] inline w-[150px] hover:bg-white hover:border-white hover:text-black ' onClick={orderNow} >Order Now</button>

                                    </div>                                    
                        }

                </div>
                        
            </div>
            
    );
}

export default Page;
