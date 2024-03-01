import { useLogin } from "../hooks/useLogin";
import Login from "./Login";

export default function AuthWrapper({children}){
   let {isLoggedIn} = useLogin()

  return(
    <>
        {
            isLoggedIn
            ?
            children
            :
            <Login />
        }
    </>
  )
}