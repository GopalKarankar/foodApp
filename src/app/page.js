"use client";

import React, { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import "./globals.css";
import { useRouter } from "next/navigation";
import RestaurantFooter from "./_components/RestaurantFooter";
import Preloader from "./_components/Preloader";

const Page = () => {
  const [locations, setLocations] = useState([] || "");
  const [restaurants, setRestaurants] = useState([] || "");
  const [seletedInput, setSeletedInput] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState();
  const [isLoadingNames, setIsLoadingNames] = useState(false);
  const [isLoadingRests, setIsLoadingRests] = useState(false);
  const [cartInfo, setCartInfo] = useState();
  const router = useRouter();

  // Refresh the page
  useEffect(() => {
    loadLocations();
    loadRestaurants();
    loadCartLS();
  }, []);

  // Loads restaurant loactions
  const loadLocations = async () => {
    try {
      setIsLoadingNames(true);

      const res = await fetch("https://food-app-lg35.vercel.app/api/customer/locations");
      const data = await res.json();
      // console.log(data);
      setLocations(data);
      setIsLoadingNames(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Loads restaurant names
  const loadRestaurants = async (params) => {
    try {
      setIsLoadingRests(true);

      let url = "https://food-app-lg35.vercel.app/api/customer";

      if (params?.type === "locs") {
        url = url + "?location=" + params?.state;
      } else if (params?.type === "restrnt") {
        url = url + "?restrnt=" + params?.state;
      }

      const res = await fetch(url);
      const data = await res.json();

      // console.log(data);

      setRestaurants(data);

      if (typeof window !== 'undefined') {
        setUserLoggedIn(JSON.parse(localStorage.getItem("normalUser")));
      }

      setIsLoadingRests(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Load  cart local storage
  const loadCartLS = () => {
    try {
      if (typeof window !== 'undefined') {
        setCartInfo(JSON.parse(localStorage.getItem("cartStore")) || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(cartInfo);

  return (
    <div className="parent-page">
      <CustomerHeader cartData2={userLoggedIn} />

      <div className="flex justify-center items-center p-[30px] flex-col  ">
        
        <h1 className=" text-white text-center  ">Search by place or Restaurant</h1>
        <br />

        <div className="input-wrapper flex justify-center items-center flex-wrap ">
          <div className="location-wrapper">
            {/* Search locations field */}
            <input
              type="text"
              className="input-field"
              value={seletedInput}
              onChange={(e) => {
                setIsLoadingNames(true);
                setSeletedInput(e.target.value);
                setShowLocation(true);
                e.target.value === "" && setShowLocation(false);
                setIsLoadingNames(false);
              }}
              placeholder="Search by place"
            />

            {/* Locations output field */}
            <ul className="location-options-wrapper">
              {showLocation &&
                locations.map((locs, key) => {
                  return (
                    <li
                      className="location-options"
                      key={key}
                      onClick={() => {
                        setSeletedInput(locs);
                        setShowLocation(false);
                        loadRestaurants({ state: locs, type: "locs" });
                      }}
                    >
                      {!isLoadingNames ? locs : "Loading..."}
                    </li>
                  );
                })}
            </ul>
          </div>

          <input
            type="text"
            className="input-field"
            onChange={(e) => {
              loadRestaurants({ state: e.target.value, type: "restrnt" });
            }}
            placeholder="Search by Food Restaurant"
          />
        </div>
      </div>

      <div className="restaurant-list-container flex justify-center flex-wrap gap-[20px] ">
        {!isLoadingRests ? (
          restaurants.map((item, key) => {
            return (
              <div className="restaurant-wrapper w-[200px] bg-[#2ECC71] p-[20px] rounded-tr-2xl  rounded-bl-2xl break-words" key={key}>
                <div className="heading-wrapper">
                  <h3 className=" text-xl ">{item.rName}</h3>
                  <br />

                  <h4> {item.contact}</h4>
                  <br />
                </div>

                <div>
                  <div>{item.city}</div>
                  <br />

                  <div> {item.address}</div>
                  <br />

                  <div>{item.email}</div>
                  <br />

                  <div className="exploreBtn"
                    onClick={() => {
                      router.push("explore/" + item.rName + "?id=" + item._id);
                    }}

                    
                  >
                    Explore restaurant
                  </div>
                  <br />

                </div>
              </div>
            );
          })
        ) : (
          <Preloader />
        )}
      </div>

      <RestaurantFooter />
    </div>
  );
};

export default Page;
