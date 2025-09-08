import postModel from "../models/postSchema.js";

const createPost = async(req, res) => {

  const { text } = req.body
  
  try {
    const post = await postModel.create({
       user: req.user,
       text,
       image: req.file?.path
    })

    res.status(200).json({ success: true, message: "Post uploaded Successfully", post})

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error"})
  }
}

const getPost = async(req, res) => {
  try {
    const posts = await postModel.find().populate('user', 'username avatar').sort({ createdAt: -1})

    res.status(200).json({ success: true, posts})
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error"})
  }
}

const getPostsByUser = async(req, res) => {
  try {
    const userId = req.user

    if(!userId){
      return res.status(400).json({ success: false, message: "User is not authenticated"})
    }

    const posts = await postModel.find({ user: userId})

    if(!posts || posts.length === 0){
      return res.status(404).json({ success: false, message: "No post found"})
    }

    return res.status(200).json({ success: true, message: "post retrived successfully", posts})

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error"})
  }
}

const updatePost = async(req, res) => {
  const { text } = req.body;
const postId = req.params.id;


  try {
   const post = await postModel.findById(postId)
   if(!post){
    return res.status(404).json({ success: false, message: "Page not found"})
   } 

   if (post.user.toString() !== req.user.toString()) {
    return res.status(403).json({ success: false, message: "You are not authorized to update this post" });
  }
 

   const updatedPost = await postModel.findByIdAndUpdate(
    postId,
    { text: text || post.text, image: req.file?.path || post.image },
    { new: true }
  );
  
  return res.status(200).json({ success: true, updatedPost });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error"})
  }
}

const deletePost = async(req, res) => {
  try {
    const post = await postModel.findById(req.params?.id)

    if(!post){
      return res.status(404).json({ success: false, message: "Page Not Found"})
    }

    if(post.user.toString() !== req.user){
      return res.status(403).json({ success: false, message: "You are not authorized to Delete this post"})
    }
    await post.deleteOne()

    return res.status(200).json({ success: true, message: "Post deleted successfully"})

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error"})
  }
}

const toggleLike = async(req, res) => {
  const postId = req.params.id
  const userId = req.user

  try {
    
    const post = await postModel.findById(postId)

    if(!post){
      return res.status(404).json({ success: false, message: "Post not found"})
    }

    const alreadyLiked = post.likes.includes(userId)

    if(alreadyLiked){
      post.likes = post.likes.filter(id => id.toString() !== userId.toString())
    } else {
      post.likes.push(userId)
    }

    await post.save()
    return res.status(200).json({ 
      success: true, 
      message: alreadyLiked ? "Post Unliked" : "Post Liked",
      likes: post.likes.length
  })

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error"})
  }
}

const addComment = async(req, res) => {
  const { id: postId} = req.params;
  const { text } = req.body
  const userId = req.user

  try {
    
    const post = await postModel.findById(postId)

    if(!post){
      return res.status(404).json({ success: false, message: "Post not found"})
    }

    post.comments.push({ user: userId, text });

    await post.save()
    return res.status(200).json({ 
      success: true, 
      message: "Comment added Successfully",
      comment: post.comments[post.comments.length - 1]
  })

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error"})
  }
} 


export { createPost, getPost, getPostsByUser, updatePost, deletePost, toggleLike, addComment}