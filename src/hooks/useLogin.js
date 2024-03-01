import { useEffect, useState } from "react";
import { loginapi } from "../apis/loginapi";

let accessTokenKey = "spot9AdminAccessToken"

export function useLogin(){
    let [isLoggedIn, setIsLoggedIn] = useState(false)
    let [accessToken, setAccessToken] = useState("")
    let [loginLoading, setLoginLoading] = useState(false)
    let [errorStatus, setErrorStatus] = useState({error: false, message: ""})


    useEffect(()=>{
        let token = localStorage.getItem(accessTokenKey)
        if(token){
            setIsLoggedIn(true)
            setAccessToken(token)
        }
    },[])

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