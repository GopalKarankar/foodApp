"use client";
import { useState } from "react";
import  './style.css';
import RestaurantSignUp from "../_components/RestaurantSignUp";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantFooter from "../_components/RestaurantFooter";
import CustomerHeader from "../_components/CustomerHeader";

const Page = () => {
  const [login, setLogin] = useState(true);

  return (

    <div className="parent-page">

      <CustomerHeader />

        <br />

        <h1 className="white-text" >Restaurant {login ? "login" : "signup" } page</h1>
        <br />

      <div className=" flex justify-center flex-col flex-wrap items-center " >

            <div className=" bg-[#2ECC71] w-[300px] py-[20px] flex justify-center flex-col items-center rounded-tr-2xl rounded-bl-2xl " >
              
              {login ? <RestaurantLogin /> : <RestaurantSignUp />}

              <button
                className=" bg-[#2ECC71] rounded-2xl px-3 border-[#2ECC71] "
                onClick={() => {
                  setLogin(!login);
                }}
              >
                {login ? "New user ? Sign up" : "Already have an account ? Log in"}
              </button>

            </div>


      </div>

      <RestaurantFooter />

    </div>
  );
};

export default Page;
