"use client";
import CustomerHeader from "@/app/_components/CustomerHeader";
import Preloader from "@/app/_components/Preloader";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  // path parameter
  let foodparam = useParams();
  foodparam = decodeURI(foodparam.name);

  // query parameter
  const searchParams = useSearchParams();
  const restoQuery = searchParams.get("id");

  // restaurant details
  const [restaurantDetails, setRestaurantDetails] = useState({});

  // food items list from restaurant
  const [foodItems, setFoodItems] = useState([]);

  // cart items (IMPORTANT: cart items use itemId, NOT _id)
  const [cartInfo, setCartInfo] = useState([]);

  // ids present in cart (list of itemId values)
  const [cartIDList, setCartIDList] = useState([]);

  // user info
  const [userStorage, setUserStorage] = useState(null);

  const [IsLoadingResto, setIsLoadingResto] = useState(false);

  const [isLoadingCart, setIsLoadingCart] = useState(false);

  const [cartChange, setCartChange] = useState();

  
  useEffect(() => {
    loadRestaurantDetails();
    loadUserLS();
    loadCartLS();
  }, [restoQuery]);

  // keep cartIDList synced (based on itemId)
  useEffect(() => {
    setCartIDList((cartInfo || []).map((item) => item.itemId));
  }, [cartInfo]);

  const loadRestaurantDetails = async () => {
    try {
      if (!restoQuery) return;
      
      setIsLoadingResto(true);

      const res = await fetch("https://food-app-lg35.vercel.app/api/customer/" + restoQuery,{
                    cache:"no-store",
                });
      const data = await res.json();

      // console.log(data);
      
      setRestaurantDetails(data.restaurantData || {});
      setFoodItems(data.foodData || []);

      setIsLoadingResto(false);

    } catch (error) {
      console.log(error);
    }
  };

  const loadCartLS = () => {
    try {
      const cartData = JSON.parse(localStorage.getItem("cartStore"));
      // const cartData = JSON.parse(localStorage.getItem("cartStore")) || [];
      setCartInfo(cartData);
    } catch (error) {
      console.log(error);
      setCartInfo([]);
    }
  };

  const loadUserLS = () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("normalUser")) || null;
      setUserStorage(userInfo);
    } catch (error) {
      console.log(error);
      setUserStorage(null);
    }
  };

  // Add to cart
  const addToCart = async (item) => {
    try {

      if (!userStorage?._id) {
        alert("Login required.");
        return;
      }

      const isPresent = cartInfo.some((cartItem) => cartItem.itemId === item._id);

      if (isPresent) {
        alert("Already added to cart");
        return;
      }

      // move food _id into itemId (do NOT keep _id in payload)
      const { _id, ...itemTmp } = item;

      const payload = {
        ...itemTmp,
        itemId: _id,
        userId: userStorage._id,
      };

      const updatedCart = [...cartInfo, payload];

      setCartInfo(updatedCart);
      
      localStorage.setItem("cartStore", JSON.stringify(updatedCart));

      setIsLoadingCart(true);

    const data =  await fetch("https://food-app-lg35.vercel.app/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // ✅ no _id sent
        cache:"no-store",
      });

      setCartChange(data);

      setIsLoadingCart(false);

    } catch (error) {
      console.log(error);
    }
  };

  // console.log(cartInfo);

  // Remove from cart (remove by itemId)
//   const removeFromCart = async (id) => {
// console.log(id)
//     try {
//       const updatedCart = cartInfo.filter((item) => item.itemId !== id);

//       setCartInfo(updatedCart);

//       localStorage.setItem("cartStore", JSON.stringify(updatedCart));

//       const data = await fetch(`https://food-app-lg35.vercel.app/api/cart/${id}`, {
//         method: "DELETE",
//       });

//       // setCartChange(data);

//     } catch (error) {
//       console.log(error);
//     }
//   };

  return (
    <div className="parent-page" >

      <CustomerHeader cartData2={cartChange} />

        {/* <center>
          <h1 className="white-text" >{foodparam}</h1>
        </center>
        <br /> */}

      <br />

      {IsLoadingResto ? <Preloader/> :(
        
        <div className="align-flex flex justify-center flex-col items-center " >

          <div className="restaurant-wrapper  w-[200px] bg-[#2ECC71] p-[20px] rounded-tr-2xl  rounded-bl-2xl break-words">
            <h3>{restaurantDetails?.rName}</h3>
            <br />

            <h3>{restaurantDetails?.contact}</h3>
            <br />

            <h3>{restaurantDetails?.city}</h3>
            <br />
            
            <h3>{restaurantDetails?.address}</h3>
            <br />

            <h3>{restaurantDetails?.email}</h3>
            <br />
          </div>
          <br />

          <div className="food-item-wrapper  flex justify-center flex-wrap gap-[20px] ">
            {foodItems.length > 0 ? (
              foodItems.map((item, key) => {
                const inCart = cartIDList.includes(item._id); // food _id compared to cart itemId list

                return (
                  <div className=" flex justify-center flex-row max-w-[400px] bg-[#2ECC71] [&>*]:text-white p-4  rounded-tr-2xl    gap-[20px]  rounded-bl-2xl break-words " key={key}>
                  
                    <div className=" flex justify-center items-center" >
                      <img src={item.imgLink} alt="item-Image" className="imgDim "  />                    
                    </div>

                    <div className="flex flex-col justify-around gap-2" >
                      <div>{item.itemName}</div>
                      <div>Rs {item.price}</div>
                      <div className="description">{item.description}</div>
                      <br />
                    
                        <button className="relative text-white bg-[#2ECC71] border border-white rounded-[10px] w-[200px] h-[30px] hover:bg-white hover:text-[#2ECC71] " onClick={() => addToCart(item)}>{isLoadingCart ? <Preloader/> : "Add to Cart" }</button>
                    

                      {/* {inCart ? (
                        <button className="text-white bg-[#2ECC71] border border-white rounded-[10px] w-[200px] h-[30px] hover:bg-white hover:text-[#2ECC71] " onClick={() => removeFromCart(item._id)}>
                          Remove from cart
                        </button>
                      ) : (
                        <button className="text-white bg-[#2ECC71] border border-white rounded-[10px] w-[200px] h-[30px] hover:bg-white hover:text-[#2ECC71] " onClick={() => addToCart(item)}>Add to Cart</button>
                      )} */}

                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className="text-white" >No items available</h1>
            )}
          </div>

        </div>

      )}

    </div>
  );

};

export default Page;
