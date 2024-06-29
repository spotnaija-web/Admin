import { useSearchParams, useNavigate } from "react-router-dom"
import usePost from "../hooks/usePost"
import DOMPurify from "isomorphic-dompurify"
// import ReactHtmlParser from "react-html-parser"
import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import PostStatusText from "../components/PostStatusText"
import { Img } from "../components/Img"

export default function ViewPost(){
    let { accessToken } = useLogin()
    let [searchParams] = useSearchParams()
    let id = searchParams.get("id")
    let {post, approveUserPost} = usePost(id)
    let navigate = useNavigate()

    let [status, setStatus] = useState({})
    const config = {
        ALLOWED_TAGS: ['iframe', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'ul', 'ol', 'li', 'strong', 'em', 'blockquote', 'hr', 'br'],
        ALLOWED_ATTR: ['src', 'width', 'height', 'allowfullscreen', 'href', 'target']
      };
    let cleanContent = DOMPurify.sanitize(post?.content_body, config)

    async function approvePost(){
        let payload = {
            post_id: id, 
            publish_status: true
        }
        let result = await approveUserPost(payload, accessToken)
        if(result.success){
            // navigate("/all-posts")
        //    window.location.reload();
        }else{
            setStatus(result)
        }
    }
    async function rejectPost(){
        let payload = {
            post_id: id, 
            publish_status: false
        }
        let result = await approveUserPost(payload, accessToken)
        if(result.success){
            navigate("/all-posts")
            window.location.reload();
        }else{
            setStatus(result)
        }
    }

    function goToEdit(){
        navigate(`/edit?id=${id}`)
    }

    return(
        <div className="prose">
            <div className="flex flex-col items-center p-2">
            {!status?.success && <div className="text-xl text-red-500 font-medium">{status?.message}</div>}
                <div className="flex items-center gap-3">
                    <div className="my-4">
                        <PostStatusText publishStatus={post.publishStatus}></PostStatusText>
                    </div>
                    <div onClick={goToEdit} className="my-4 border-2 p-[5px] border-green-500 rounded-[5px] cursor-pointer">
                        Edit post
                    </div>
                </div>
                
                <div className="w-[60%]">
                    <Img src={post?.cover_photo} source = "api" className="w-[100%]"></Img>
                </div>
                <div className="my-4">
                    <h3 className="text-2xl font-bold">{post?.title}</h3>
                    <p>by <strong>{post?.author_firstname + " " + post?.author_surname}</strong></p>
                </div>
                <div dangerouslySetInnerHTML={{ __html: cleanContent }} />
                <div onClick={approvePost} className="bg-green-500 m-5 font-medium p-2 rounded-md cursor-pointer">
                    Approve & Publish
                </div>
                <div onClick={rejectPost} className="bg-red-500 m-5 font-medium p-2 rounded-md cursor-pointer">
                    Disapprove & Unpublish
                </div>
            </div>
        </div>
    )
}

