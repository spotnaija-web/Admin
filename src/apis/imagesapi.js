import axios from "axios"

import { baseurl } from "./apiconfig";

async function uploadImageApi(payload, filename, accessToken){

    console.log("filename",filename, "paload", payload, "token", accessToken)
//

let data = new FormData();
data.append('photo', payload);

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: `${baseurl}/api/photo`,
  headers: { 
    'Authorization': `Bearer ${accessToken}`
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