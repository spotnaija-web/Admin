import { useEffect, useState } from "react";
import { getAllPosts } from "../apis/postsapi";

export function usePosts(){
    let [posts, setPosts] = useState([])
    let [postsStatus, setPostsStatus] = useState({error: false, message: ""})
    let [postsLoading, setPostsLoading] = useState(false)

    async function getPosts(){
        setPostsLoading(true)
        let result = await getAllPosts()
        console.log("posts:", result)
        if(result.status === 200){
            setPosts(result.data.posts)
            setPostsLoading(false)
        }else{
            setPostsStatus({error: true, message: result.message})
            setPostsLoading(false)
        }
    }

    useEffect(()=>{
        getPosts()
    }, [])

    return { posts, postsLoading, postsStatus }
}