import axios from "axios"
import {baseurl} from "./apiconfig"

async function loginapi(payload){
    try{
        let result = await axios.post(`${baseurl}/auth/adminlogin`, payload, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        console.log(result)
        return result
    }catch(err){
        return err
    }
}

export { loginapi }