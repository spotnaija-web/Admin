import axios from "axios"
import { baseurl } from "./apiconfig"

async function createPostApi(payload, accessToken){
    try{
        let result = await axios.post(`${baseurl}/api/posts`, payload, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })

        return result.data
    }catch(err){
        return err
    }
}

async function updatePostApi(payload, accessToken){
    try{
        let result = await axios.patch(`${baseurl}/api/posts`, payload, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })
        console.log("edit post", result)
        return result
    }catch(err){
        return err
    }
}

async function getAllPosts(){
    try{
        let result = await axios.get(`${baseurl}/api/posts`)
        console.log("getallposts:", result)
        return result
    }catch(err){
        return err
    }
}

async function getOnePost(id){
    try{
        let result = await axios.get(`${baseurl}/api/posts/${id}`)
        console.log("getOnePost", result)
        return result
    }catch(err){
        return err
    }
}

async function updatePostPublishStatusApi(payload, accessToken){
    try{
        let result = await axios.patch(`${baseurl}/api/posts/status`, payload, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })
        console.log("update post status", result)
        return result
    }catch(err){
        return err
    }
}

export { getAllPosts, getOnePost, createPostApi, updatePostApi, updatePostPublishStatusApi }