import React, {useState} from 'react'
import ReactPlayer from 'react-player'
import Heart from "react-heart"

function Post({post}) {
    const [liked, setLiked] = useState(false)

    return (
        <div className="post" onDoubleClick={_=>setLiked(true)}>
            <div className="heartContainer"><Heart onClick={()=>setLiked(!liked)} isActive={liked}/></div>
            {post.media_type==='video'?
            (
                <ReactPlayer className='player' url={post.url} />
                ):
            (<img src={post.url} alt=""/>)
        }
            
            <h2>{post.title}</h2>
            <h3>{post.date}</h3>
            <p>{post.explanation}</p>
            
        </div>
    )
}

const MemoizedPost = React.memo(Post)
export default MemoizedPost;