import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostsContext";
import Sidebar from "../components/SideBar";
import { FaThumbsUp, FaCommentDots } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { Profile } from "../components/Profile";

export const PostsPage = () => {
  const { user } = useContext(AuthContext);
  const { Allposts, likePosts, postsComments } = useContext(PostContext);

  const [comments, setComments] = useState({ text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComments((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    if (comments.text.trim()) {
      postsComments(id, comments.text);
      setComments({ text: "" });
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
    <div className="hidden md:block p-3 border-r border-gray-700">
      <Sidebar />
    </div>

    <div className="flex-1 p-4 md:p-6 overflow-y-auto h-full">
      <div className="mx-auto space-y-6 max-w-full sm:max-w-screen-sm">
        {Allposts.slice().reverse().map((post, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-blue-600 to-[#3f2182] rounded-lg shadow p-4 md:p-6"
          >
            <div className="flex items-center space-x-4 mb-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src={post.user.avatar}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-sm md:text-lg font-bold">{post.user.username}</h4>
            </div>
  
            <p className="text-sm md:text-base mb-3">{post.text}</p>
  
            {post.image && (
              <div className="w-full mb-3">
                <img
                  src={post.image}
                  alt="post"
                  className="w-full max-h-96 md:max-h-[500px] object-cover rounded-lg"
                />
              </div>
            )}
  
            <div className="flex flex-wrap gap-6 text-sm md:text-base items-center mb-3">
              <div
                onClick={() => likePosts(post._id)}
                className="flex items-center gap-2 cursor-pointer hover:text-blue-400"
              >
                <FaThumbsUp className="text-lg md:text-xl" />
                <span>{post.likes.length} Likes</span>
              </div>
  
              <div className="flex items-center gap-2 cursor-pointer hover:text-green-400">
                <FaCommentDots className="text-lg md:text-xl" />
                <span>{post.comments.length} Comments</span>
              </div>
            </div>
  
            <div className="mb-3">
              <p className="font-bold text-sm md:text-base mb-1">Comments:</p>
              <div className="max-h-20 overflow-y-auto space-y-1 text-sm md:text-base">
                {post.comments.slice(0, 3).map((Comment, idx) => (
                  <p key={idx} className="text-sm md:text-base">
                    {Comment.text}
                  </p>
                ))}
              </div>
            </div>
  
            <form
              onSubmit={(e) => handleSubmit(e, post._id)}
              className="flex items-center space-x-2"
            >
              <div className="hidden md:block w-8 h-8 rounded-full overflow-hidden">
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
                placeholder="Write a comment..."
                className="flex-1 px-4 py-2 rounded-full text-sm md:text-base bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="p-2 md:p-3 text-xl md:text-2xl rounded-full hover:bg-gray-800"
              >
                <IoSend />
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  
    <div className="w-full md:w-1/4 p-4 md:p-6 border-t md:border-t-0 md:border-l border-gray-700">
      <Profile />
    </div>
  </div>
  
  );
};
