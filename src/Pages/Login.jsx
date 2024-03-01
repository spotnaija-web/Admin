import { useEffect, useState } from "react";
import AuthInputComponent from "../components/AuthInputComponent";
import { Button } from "../components/Button";
import { Line } from "../components/Line";
import { Text } from "../components/Text";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

export default function Login(){
    let navigate = useNavigate()
    let { login, loginLoading, isLoggedIn, errorStatus  } = useLogin()

    let [formData, setFormData] = useState({username: "", password: ""})

    function handleChange(e){
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }
    function submit(e){
        e.preventDefault()
        login(formData)
    }

    useEffect(()=>{
        if(isLoggedIn === true){
            console.log("logged in")
            window.location.reload()
        }
    },[isLoggedIn])
    
    return(
    <>
      <div className="bg-white-A700 flex flex-col font-inter items-center justify-start mx-auto w-full">
        <div className="flex flex-col gap-2 items-center justify-center mt-[72px] md:px-5 w-auto sm:w-1/3">
          <Text
            className="text-2xl  md:text-[30px] text-gray-900 tracking-[0.24px] w-auto"
            size="txtInterSemiBold48"
          >
            Spot Naija Admin Login
          </Text>
          
          {errorStatus.error && <div className="text-red-500 font-bold">{errorStatus.message}</div>}
        </div>
        <div className="bg-white-A700 border border-gray-200 border-solid flex flex-col gap-12 items-center justify-center mt-16 p-5 md:px-5 rounded-[16px] w-auto sm:w-1/3.5">
          <form onSubmit={submit} className="flex flex-col items-start justify-start w-auto sm:w-full">
            <div className="flex flex-col items-start justify-start w-auto sm:w-full">
              <div className="flex flex-col gap-10 items-start justify-start w-auto sm:w-full">
                <AuthInputComponent name="username" type={"email"} label="Email Address/Username" value={formData.username} onChange={handleChange} required />
                <div className="flex flex-col gap-2.5 items-end justify-end w-auto sm:w-full">
                  <AuthInputComponent label="Password" type={"password"} placeholder="Enter your password" name="password" value={formData.password} onChange={handleChange} required />
                  <a
                    href="javascript:"
                    className="text-green-900 text-sm tracking-[0.07px] w-auto"
                  >
                    <Text size="txtInterMedium14">Forgot Password?</Text>
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-[500px] sm:w-full">
              <Button
                className="cursor-pointer font-semibold h-16 leading-[normal] text-center text-lg tracking-[0.09px] w-full"
                shape="round"
                color="green_900"
                size="lg"
                variant="fill"
                type="submit"
                disabled={loginLoading}
              >
                {loginLoading ? "loading..." : "Sign In"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
    )
}