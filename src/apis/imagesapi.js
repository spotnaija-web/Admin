import axios from "axios"

import { baseurl } from "./apiconfig";

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwOTE1MDQxMSwiZXhwIjoxNzEwMDE0NDExfQ.F0oCDp-O98eM5CusuKiLZ7Mwmo4D8MINtbKO_tPfcVw"

async function uploadImageApi(payload, filename, accessToken){

    console.log("filename",filename, "paload", payload, "token", accessToken)


let data = new FormData();
data.append('photo', payload);

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: `${baseurl}/api/photo`,
  headers: { 
    'Authorization': `Bearer ${token}`
  },
  data : data
};

try{
    let result = await axios.request(config)

    console.log(result.data)
    return result.data
}catch(err){
    console.log(err)
    return err
}





   /* try{
        let result = await axios.post(`${base_url}/api/photo`, formdata,{
                headers:{
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${accessToken}`
                }
            })

            console.log(result)
            return result
    }catch(err){
        return err
    }*/

}

export { uploadImageApi }