"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


const FoodItemList = () => {

    const [foodItems, setFoodItems] = useState([]);

    const router = useRouter();

    useEffect(() => {
        loadFoodItems();
    },[]);


    const loadFoodItems = async () =>{

        try {
            
            const restaurantUser = JSON.parse(localStorage.getItem("restaurantUser")); 
    
            const resto_id = restaurantUser?._id;
    
            const res = await fetch(`https://food-app-lg35.vercel.app/api/foods/${resto_id}`);
    
            const data = await res?.json();
    
            // console.log(data);
    
            setFoodItems(data);
        } catch (error) {
            console.log(error);
        }

    }


    
    const deleteFoodItem = async (id) =>{

        try {
            
            // console.log(id);
    
            if (window.confirm("Are you sure you want to delete this ?")) {
    
                const res = await fetch(`https://food-app-lg35.vercel.app/api/foods/${id}`,{
                    method:"delete"
                });
    
                const data = await res.json();
    
                // console.log(data);
    
                loadFoodItems();
                
            } 
            
        } catch (error) {
            console.log(error);
        }
        

    }

    return (
        <div className='flex flex-wrap'>

        {foodItems.length > 0 ? (<table>
        
            <thead>
                <tr>
                    <td>S.N.</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Image</td>
                    <td>Description</td>
                    <td>Operations</td>
                </tr>
            </thead>

            <tbody>
            {foodItems.map((item,key)=>{
                return   <tr key={key} >
                            <td>{key + 1}</td>
                            <td>{item.itemName}</td>
                            <td>Rs {item.price}</td>
                            <td className='relative' > 
                                <img src={item.imgLink} className='centerize' width="74px" height="74px" alt={`${item.itemName} image`}  />
                            </td>
                            <td>{item.description}</td>
                            <td className=' flex justify-center items-center flex-col '>
                                <button className=' bg-gray-700 text-white rounded-lg px-3 hover:bg-white hover:text-black ' onClick={()=>{router.push(`/restaurant/dashboard/${item._id}`)}} >Edit</button>
                                <button className=' bg-red-700 text-white rounded-lg px-3 hover:bg-white  hover:text-black ' onClick={()=>{deleteFoodItem(item._id)}} >Delete</button>
                            </td>
                    </tr>
            })}

            </tbody>

        </table>) : <center><h1 style={{color:"white"}} >No items found</h1></center> }
        

        </div>
    );
}

export default FoodItemList;
