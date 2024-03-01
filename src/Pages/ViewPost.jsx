import { useSearchParams, useNavigate } from "react-router-dom"
import usePost from "../hooks/usePost"
import DOMPurify from "isomorphic-dompurify"
// import ReactHtmlParser from "react-html-parser"
import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

export default function ViewPost(){
    let { accessToken } = useLogin()
    let [searchParams, setSearchParams] = useSearchParams()
    let id = searchParams.get("id")
    let {post, updatePost } = usePost(id)
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
        let result = await updatePost(payload, accessToken)
        if(result.success){
            navigate("/all-posts")
        }else{
            setStatus(result)
        }
    }

    return(
        <div className="prose">
            <div className="flex flex-col items-center p-2">
            {!status?.success && <div className="text-xl text-red-500 font-medium">{status?.message}</div>}
                <div className="w-[60%]">
                    <img src={post?.cover_photo} className="w-[100%]" />
                </div>
                <div className="my-4">
                    <h3 className="text-2xl font-bold">{post?.title}</h3>
                    <p>by <strong>{post?.author_firstname + " " + post?.author_surname}</strong></p>
                </div>
                <div dangerouslySetInnerHTML={{ __html: cleanContent }} />
                <div onClick={approvePost} className="bg-green-500 m-5 font-medium p-2 rounded-md cursor-pointer">
                    Approve
                </div>
            </div>
        </div>
    )
}

