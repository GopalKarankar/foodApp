"use client";

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import "./../../../globals.css";
import RestaurantHeader from '@/app/_components/RestaurantHeader';
import RestaurantFooter from '@/app/_components/RestaurantFooter';
import CustomerHeader from '@/app/_components/CustomerHeader';

const EditFoodItem = () => {

const argmt = useParams();

const router = useRouter();

// console.log("resto_id : ",argmt.id);

    const [itemDetails, setItemDetails] = useState({
        itemName:"",
        price:"",
        imgLink:"",
        desc:"",
    });


    const handleFood = (e) =>{

        try {
            
            const {name,value} = e.target;
    
            setItemDetails({
                ...itemDetails,
                [name]:value,
            });

        } catch (error) {
            console.log(error);
        }
        
    }


    useEffect(() => {
        viewFoodItem();
    }, []);


    const viewFoodItem = async () =>{

        try {
            
            const res = await fetch(`https://food-app-lg35.vercel.app/api/foods/edit/${argmt.id}`);
            
            const info = await res.json();
            
            setItemDetails({
                ...itemDetails,
                itemName:info.itemName || "",
                price:info.price || "",
                imgLink:info.imgLink || "",
                desc:info.description || "",
            });

        } catch (error) {
            console.log(error);
        }


    }

    const EditFoodUpload = async () =>{

        try {
            
            // console.log(itemDetails);
            
            const res = await fetch(`https://food-app-lg35.vercel.app/api/foods/edit/${argmt.id}`,{
                method:"PUT",
                body:JSON.stringify({itemName:itemDetails.itemName , price:itemDetails.price, imgLink:itemDetails.imgLink, description:itemDetails.desc }),
            });
    
            const data = await res.json();

            // console.log(data);

            if (data) {
                alert("Item updated successfully.");
            } else {
                alert("Failed updating item.");                
            }

        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div className='parent-page'>

        <CustomerHeader/>

<br />
<div className=' flex justify-center items-center flex-col ' >

        <div className=' w-[300px] bg-[#2ECC71] flex justify-center items-center flex-wrap flex-col gap-3 rounded-tr-2xl rounded-bl-2xl p-3 ' >

            <h1 style={{color:"white"}} >Edit food item</h1>

            <div className='input-wrapper' >
                <input type="text" className='input-field' name='itemName' value={itemDetails.itemName} placeholder='Enter food name' onChange={(e)=>{handleFood(e)}} />
            </div>

            <div className='input-wrapper' >
                <input type="text" className='input-field' name='price' value={itemDetails.price} placeholder='Enter item pice' onChange={(e)=>{handleFood(e)}}  />
            </div>

            <div className='input-wrapper' >
                <input type="text" className='input-field' name='imgLink' value={itemDetails.imgLink} placeholder='Enter image link' onChange={(e)=>{handleFood(e)}}  />
            </div>

            <div className='input-wrapper' >
                <input type="text" className='input-field' name='desc' value={itemDetails.desc} placeholder='Enter item description' onChange={(e)=>{handleFood(e)}}  />
            </div>
            
            <div className='input-wrapper' >
                <button className=' bg-[#2ECC71] px-3 hover:bg-white rounded-lg ' onClick={EditFoodUpload}  >Submit</button>
            </div>
            
            <div className='input-wrapper' >
                <button className=' bg-[#2ECC71] px-3 hover:bg-white rounded-lg ' onClick={()=>{router.push("/restaurant/dashboard")}}  >Back to List</button>
            </div>

        </div>

</div>

        <RestaurantFooter/>
        </div>
    );
}

export default EditFoodItem;
