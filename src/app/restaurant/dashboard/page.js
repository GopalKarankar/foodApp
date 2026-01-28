"use client";

import RestaurantHeader from '@/app/_components/RestaurantHeader';
import  './../style.css';
import AddFoodItem from '@/app/_components/AddFoodItem';
import { useState } from 'react';
import FoodItemList from '@/app/_components/FoodItemList';
import RestaurantFooter from '@/app/_components/RestaurantFooter';
import CustomerHeader from '@/app/_components/CustomerHeader';


const Page = () => {

    const [addItem, setAddItem] = useState(false);

    return (
        <div className='parent-page' >
            <CustomerHeader />
            
            <br />
            <div className='flex justify-center gap-3'>
                <button className=' bg-[#2ECC71] p-3 hover:bg-white rounded-lg ' onClick={()=>{setAddItem(true)}} >Add food item</button>
                <button  className=' bg-[#2ECC71] p-3 hover:bg-white rounded-lg '  onClick={()=>{setAddItem(false)}} >Dashboard</button>
            </div>
            <br />

            <div className=' overflow-x-auto flex justify-center flex-col items-center ' >
                {addItem ? <AddFoodItem setAddItem={setAddItem} /> : <FoodItemList /> }
            </div>
            

            <RestaurantFooter/>
        </div>
    );
}

export default Page;
