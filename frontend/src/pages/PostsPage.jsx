import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { PostContext } from "../context/PostsContext"
import Sidebar from "../components/SideBar"
import { FaThumbsUp, FaCommentDots } from "react-icons/fa"
import { IoIosAttach } from "react-icons/io"
import { IoSend } from 'react-icons/io5'
import { Profile } from "../components/Profile"


export const PostsPage = () => {

  const { user } = useContext(AuthContext)
  const { Allposts, likePosts, postsComments } = useContext(PostContext)

  const [comments, setComments] = useState({ text: "" });


  const handleChange = (e) => {
    const {name, value} = e.target;
    setComments((prev) => ({ ...prev, [name]: value}));
  }

  const handleSubmit = (e,id) => {
    e.preventDefault();
    if(comments.text.trim()){
      postsComments(id, comments.text)
      setComments({ text: ""})
    }
  }

  return (
    <div className="flex flex-col md:flex-row overflow-auto">
      <div className="hidden md:block p-3">
        <Sidebar/>
      </div>

      <div className="flex-1 p-4">
         <div className="container text-white h-[87vh] mx-auto max-w-screen-sm spacr-y-6 overflow-auto">
            {Allposts.slice().reverse().map((post, index) => (
              <div key={index} className="bg-gradient-to-r from=blue to-[#3f2182] rounded-lg shadow p-4 space-x-4">
                  <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center text-lg font-bold text-gray-600">
                      <img 
                      src={post.user.avatar} 
                      alt="User Avatar"
                      className="w-full h-full object-cover rounded-full"
                      />
                     </div>
                     <div>
                      <h4 className="text-lg font-bold">{post.user.username}</h4>
                     </div>
                  </div>

                  <p className="text-white">{post.text}</p>

                  <img 
                  src={post.image} 
                  alt="post"
                  className="w-full rounded-lg object-cover"
                  />
                  <div className="flex justify-start gap-4 text-white text-sm items-center">
                    <div onClick={() => likePosts(post._id)} className="flex items-center gap-1">
                      <FaThumbsUp className="text-xl hover:text-blue-500 cursor-pointer" />
                      <span>{post.likes.length} Likes</span>
                    </div>
                    <div className=""flex items-center gap-1>
                      <FaCommentDots className="text-xl " />
                      <span>{post.likes.length} Comments</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="font-bold text-white ">Comments:</p>
                    <div className="max-h-20 overflow-y-scroll space-y-1">
                      {post.comments.slice(0, 3).map((Comment, index) => (
                        <p key={index} className="text-white rounded p-2 flex flex-row justify-start items-start gap-2">
                            {Comment.text}
                        </p>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={(e) => handleSubmit(e, post._id)} className="flex text-black items-center space-x-2 mt-4">
                    <div className="w-8 h-8 hidden md:block rounded-full bg-gray-700 overflow-hidden">
                      <img 
                      src={user.avatar}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                      />
                    </div>

                    <input 
                    type="text"
                    value={comments.text} 
                    name="text"
                    onChange={handleChange}
                    placeholder="Write your comment...."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <div className="flex space-x-2">
                      <button type="button" className="p-2 text-2xl rounded-full text-white" titel="Attach File">
                        <IoIosAttach/>
                      </button>
                      <button type="button" className="p-2 text-2xl hover:bg-[#13072e] rounded-full text-white" title="Post Comment File">
                        <IoSend/>
                      </button>
                    </div>
                  </form>
              </div>
            ))}
         </div>
      </div>

      <div className="w-1/3">
          <Profile />
      </div>
    </div>
  )
}
