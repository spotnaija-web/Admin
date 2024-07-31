import { useEffect, useState } from "react";
import { loginapi } from "../apis/loginapi";
import { jwtDecode } from 'jwt-decode';

const JWT_SECRET = import.meta.env.VITE_JWT_SECRET;

let accessTokenKey = "spot9AdminAccessToken";

export function useLogin(){
    let [isLoggedIn, setIsLoggedIn] = useState(false)
    let [accessToken, setAccessToken] = useState("")
    let [loginLoading, setLoginLoading] = useState(false)
    let [errorStatus, setErrorStatus] = useState({error: false, message: ""})


/*    useEffect(()=>{
        let token = localStorage.getItem(accessTokenKey)
        if(token){
            setIsLoggedIn(true)
            setAccessToken(token)
        }
    },[])   */


// ... rest of your code

    useEffect(() => {
    const token = localStorage.getItem(accessTokenKey);

    if (token) {
        try {
        const decodedToken = jwtDecode(token);
        // Check for expiration or other claims here
        if (decodedToken.exp < Date.now() / 1000) {
            // Handle token expiration
            console.log('Token expired');
            setIsLoggedIn(false);
            localStorage.removeItem(accessTokenKey);
        } else {
            setIsLoggedIn(true);
            setAccessToken(token);
        }
        } catch (error) {
        console.error('Error decoding token:', error);
        setIsLoggedIn(false);
        localStorage.removeItem(accessTokenKey);
        }
    }
    }, []);



    async function login(payload){
        setLoginLoading(true)
        let result = await loginapi(payload)
        if(!result.status){
            setErrorStatus({error: true, message: result.message})
            setLoginLoading(false)
        }else{
            localStorage.setItem(accessTokenKey, result.data.accessToken)
            setIsLoggedIn(true)
            setAccessToken(result.data.accessToken)
            setLoginLoading(false)
        }

    }

    async function logout(){
        localStorage.removeItem(accessTokenKey)
        setIsLoggedIn(false)
        setAccessToken("")
    }

    return{ isLoggedIn, login, logout, errorStatus, loginLoading, accessToken}
}