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
  };

  return (
    <div className="p-6 max-w-lg mt-12 h-1/2 mx-auto border border-gray-600 text-white bg-gradient-to-l from-[#13072e] to-[#3f2182] rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Caption</label>
          <textarea
            onChange={(e) => setText(e.target.value)}
            className="w-full mt-1 !text-white focus-outlind-none p-2 border rounded"
            row="4"
            value={text}
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Upload Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
          />

          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-h-64 object-cover rounded shadow"
              />
            </div>
          )}

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
