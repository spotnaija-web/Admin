import { Link } from "react-router-dom"
import { usePosts } from "../hooks/usePosts"
import PostStatusText from "../components/PostStatusText"

export default function ViewAllPosts(){
    let { posts, postsLoading, postsStatus } = usePosts()
    let unpublished = posts?.filter((post, i)=>{
        return post.publishStatus === false
    })

    let postCards = posts?.map((post, i)=>(
        <PostCard 
            key={i} 
            title={post.title} 
            author={post.author_firstname + " " + post.author_surname} 
            postId={post.id}
            postStatus={post.publishStatus}
        />
    ))
    { /* <div className="flex flex-col md:flex-row flex-wrap"> */ }
    return(
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1">
            {postCards}
        </div>
    )
}

function PostCard({key, title, author, postId, postStatus}){
    return(
        <div className="w-full mb-2 mt-2">
            <div className="h-full m-1 p-4 bg-white">
                <h2 className="text-xl font-bold">
                    {title}
                </h2>
                <p>by <strong>{author}</strong></p>
                <div className="my-2">
                    <PostStatusText publishStatus={postStatus}></PostStatusText>
                </div>
                <div className="">
                    <Link to={`/post/${title.replace("?","")}?id=${postId}`} 
                    className="bg-orange-500 p-2 m-2 w-[50%] text-center font-medium rounded-md 
                    ml-auto mt-auto">
                        View
                    </Link>
                </div>
            </div>
        </div>
    )
}