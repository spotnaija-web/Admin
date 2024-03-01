import { Link } from "react-router-dom"
import { usePosts } from "../hooks/usePosts"

export default function ViewAllPosts(){
    let { posts, postsLoading, postsStatus } = usePosts()
    let unpublished = posts?.filter((post, i)=>{
        return post.publishStatus === false
    })

    let postCards = unpublished?.map((post, i)=>(
        <PostCard 
            key={i} 
            title={post.title} 
            author={post.author_firstname + " " + post.author_surname} 
            postId={post.id}
        />
    ))
    return(
        <div className="flex flex-col md:flex-row flex-wrap">
            {postCards}
        </div>
    )
}

function PostCard({title, author, postId}){
    return(
        <div className="bg-white p-2 m-2 w-[25%]">
            <h2 className="text-xl font-bold">
                {title}
            </h2>
            <p>by <strong>{author}</strong></p>
            <div className="bg-orange-500 p-2 m-2 w-[50%] text-center font-medium rounded-md ml-auto mt-auto">
                <Link to={`/post/${title.replace("?","")}?id=${postId}`}>
                    View
                </Link>
            </div>
        </div>
    )
}