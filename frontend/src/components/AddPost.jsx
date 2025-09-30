import { useContext, useState } from "react";
import { PostContext } from "../context/PostsContext";

export const AddPost = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { createPost } = useContext(PostContext);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createPost(text, image);
    setText("");
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div className="p-4 sm:p-6 w-full max-w-md sm:max-w-lg lg:max-w-2xl mt-8 mx-auto border border-gray-600 text-white bg-gradient-to-l from-[#13072e] to-[#3f2182] rounded-xl shadow-md">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Create a New Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Caption Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Caption</label>
          <textarea
            onChange={(e) => setText(e.target.value)}
            className="w-full mt-1 p-2 sm:p-3 text-sm sm:text-base rounded bg-transparent border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-none"
            rows="4"
            value={text}
            placeholder="What's on your mind?"
            required
          ></textarea>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 sm:p-3 text-sm sm:text-base rounded bg-white text-black border border-gray-300"
          />

          {/* Preview */}
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-h-72 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold text-sm sm:text-base transition-colors duration-300"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};
