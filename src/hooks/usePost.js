import { useEffect, useState } from "react";
import { getOnePost, updatePostApi, updatePostPublishStatusApi } from "../apis/postsapi";

export default function usePost(id){
    let [post, setPost] = useState({})
    let [postLoading, setPostLoading] = useState(false)
    let [postStatus, setPostStatus] = useState({error: false, message: ""})

    async function fetchPost(id){
        setPostLoading(true)
        let result = await getOnePost(id)
        console.log(result)
        if(result?.status === 200){
            setPost(result.data.post)
            setPostLoading(false)
        }else{
            setPostStatus({error: true, message: result.message})
            setPostLoading(false)
        }
    }

    async function updatePost(payload, token){
        let result = await updatePostApi(payload, token)
        if(result?.data?.status){
            setPost(result)
            return {success: true, message: "post updated successfully"}
        }else{
            return {success: false, message: "An Error occured, failed to update post"}
        }
    }

    async function updatePostPublishStatus(payload, token){
        let result = await updatePostPublishStatusApi(payload, token)
        if(result?.data?.status){
            setPost(result)
            return {success: true, message: "post publish status updated successfully"}
        }else{
            return {success: false, message: "An Error occured, failed to update post publish status "}
        }
    }

    useEffect(()=>{
        fetchPost(id)
    },[])

    return {post, postLoading, updatePost, updatePostPublishStatus, postStatus}
}