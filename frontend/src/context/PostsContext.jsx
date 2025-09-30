import axios from "axios";
import cookie from "js-cookie";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AuthContext);

  const [Allposts, setAllPost] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  const utoken = cookie.get("token");

  const fetchAllPosts = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/posts/get-posts`);
      if (data.success) {
        setAllPost(data.posts);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchPostsofLoginUser = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/posts/user-posts`, {
        headers: { Authorization: `Bearer ${utoken}` },
      });
      if (data.success) {
        setUserPosts(data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const likePosts = async (id) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/posts/posts/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${utoken}` } }
      );
      if (data.success) {
        toast.success(data.message);
        fetchAllPosts();
      }
      console.log(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const postsComments = async (id, text) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/posts/posts/${id}/comment`,
        { text },
        { headers: { Authorization: `Bearer ${utoken}` } }
      );
      if (data.success) {
        toast.success(data.message);
        fetchAllPosts();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const createPost = async (text, image) => {
    const formData = new FormData();
    formData.append("text", text);
    if (image) {
      formData.append("image", image);
    }
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/posts/create`,
        formData,
        { headers: { Authorization: `Bearer ${utoken}` } }
      );
      if (data.success) {
        toast.success(data.message);
        fetchAllPosts();
        navigate("/posts");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deletePost = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/posts/posts/${id}`,  
        { headers: { Authorization: `Bearer ${utoken}` } }
      );
      if (data.success) {
        toast.success(data.message);
        fetchPostsofLoginUser();
        fetchAllPosts();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const values = {
    Allposts,
    userPosts,
    fetchAllPosts,
    fetchPostsofLoginUser,
    likePosts,
    postsComments,
    createPost,
    deletePost,
  };

  return <PostContext.Provider value={values}>{children}</PostContext.Provider>;
};

export default PostContextProvider;
