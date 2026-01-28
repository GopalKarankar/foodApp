import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import "./../globals.css"


const RestaurantHeader = () => {

        const [details, setDetails] = useState();
        const router = useRouter();
        const pathName = usePathname();
        // console.log(pathName);

        useEffect(() => {
               const data = localStorage.getItem("restaurantUser");
               
               if (!data) {
                    router.push("/restaurant");  
            } else if(pathName == "/restaurant" ) {
                    router.push("/restaurant/dashboard");
               }else{
                    setDetails(JSON.parse(data));
               }
    
        }, []);
    
        const logout = () =>{

            try {
                localStorage.removeItem("restaurantUser");
                router.push("/restaurant");  
                
            } catch (error) {
                console.log(error);
            }
        }

        // console.log(details);

    return (
        <div className='header-wrapper' >

            <div className='logo'>
                <h1>Logo</h1>
            </div>

            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>

            { details && details.email ? ( 
                <>
                    <li>
                        <button onClick={logout} >Logout</button>
                    </li>
                    <li>
                        <Link href="/">Profile</Link>
                    </li>
                </>              
                ) 
                : (<li>
                    <Link href="/restaurant">Login / Signup</Link>
                </li>
            ) }

            </ul>

        </div>
    );
}

export default RestaurantHeader;
