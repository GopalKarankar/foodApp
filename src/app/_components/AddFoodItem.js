import React, { useState } from 'react';
import "./../restaurant/style.css";
import "./../globals.css";
import { useRouter } from 'next/navigation';

const AddFoodItem = ({setAddItem}) => {

    const [itemDetails, setItemDetails] = useState({
        itemName:"",
        price:"",
        imgLink:"",
        desc:"",
    });
    
    const router = useRouter();


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

    const handleFoodUpload = async () =>{

        try {
            
            // console.log(itemDetails);
    
            let resto_id;
    
            const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
    
            if (restaurantData) {
                resto_id = restaurantData._id;
            }
    
            // console.log(resto_id);
    
            const res = await fetch("https://food-app-lg35.vercel.app/api/foods",{
                method:"POST",
                body:JSON.stringify({itemName:itemDetails.itemName , price:itemDetails.price, imgLink:itemDetails.imgLink, description:itemDetails.desc, resto_id }),
            });

            const data = await res.json();

            // console.log(data);
    
            if (data) {

                setItemDetails({...itemDetails,        
                    itemName:"",
                    price:"",
                    imgLink:"",
                    desc:"",
                });

                setAddItem(false);
            }

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className=' w-[300px] bg-[#2ECC71] p-4 flex justify-center items-center flex-col gap-3 rounded-tr-2xl rounded-bl-2xl ' >
            <h1 style={{color:"white"}} >Add food item</h1>

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
                <button className='button px-3 rounded-lg bg-[#2ECC71]' onClick={handleFoodUpload}  >Add</button>
            </div>

        </div>
    );
}

export default AddFoodItem;
