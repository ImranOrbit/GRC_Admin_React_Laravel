



import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import BASE_URL from "../../ApiBaseUrl/BaseUrl";
import Swal from "sweetalert2";

const Engineering = () => {
  const [formData, setFormData] = useState({
    text: "",
    content: "",
    meta_title: "",
    meta_description: "",
  });
  const [image, setImage] = useState(null);

  const editor = useRef(null);

  const joditConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Write blog content here...",
    }),
    []
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (newContent) => {
    setFormData({ ...formData, content: newContent });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      Swal.fire("Error", "Please select an image", "error");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("text", formData.text);
    formPayload.append("image", image);
    formPayload.append("content", formData.content);
    formPayload.append("meta_title", formData.meta_title || "");
    formPayload.append("meta_description", formData.meta_description || "");

    try {
      const response = await fetch(`${BASE_URL}course-engineering`, {
        method: "POST",
        body: formPayload,
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire("Success", "Submitted successfully", "success");
        setFormData({ 
          text: "", 
          content: "",
          meta_title: "",
          meta_description: ""
        });
        setImage(null);
      } else {
        Swal.fire("Error", result.message || "Something went wrong", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "Failed to submit", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Engineering Content Create
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-12">
        <div>
          <label className="block mb-1 font-medium">Text</label>
          <input
            type="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Content</label>
          <JoditEditor
            ref={editor}
            value={formData.content}
            config={joditConfig}
            onBlur={handleContentChange}
            onChange={() => {}}
          />
        </div>

        {/* Meta Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meta Title
          </label>
          <input
            type="text"
            name="meta_title"
            value={formData.meta_title}
            onChange={handleChange}
            placeholder="Enter meta title"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Meta Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meta Description
          </label>
          <textarea
            name="meta_description"
            value={formData.meta_description}
            onChange={handleChange}
            rows={3}
            placeholder="Enter meta description"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Engineering;