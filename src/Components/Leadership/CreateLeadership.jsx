





import React, { useState, useRef } from "react";
import BASE_URL from "../../ApiBaseUrl/BaseUrl";
import Swal from "sweetalert2";
import JoditEditor from "jodit-react";

const CreateLeadership = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    meta_title: "",
    meta_description: "",
  });
  const editor = useRef(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, title, description, meta_title, meta_description } = formData;

    if (!name.trim() || !title.trim() || !description.trim() || !image) {
      Swal.fire("Warning", "Please fill all fields and upload an image", "warning");
      return;
    }

    setLoading(true);
    const payload = new FormData();
    payload.append("name", name);
    payload.append("title", title);
    payload.append("description", description);
    payload.append("image", image);
    payload.append("meta_title", meta_title || "");
    payload.append("meta_description", meta_description || "");

    try {
      const res = await fetch(`${BASE_URL}leadership`, {
        method: "POST",
        body: payload,
      });

      const result = await res.json();

      if (res.ok) {
        Swal.fire("Success", "Leadership profile created", "success");
        setFormData({ 
          name: "", 
          title: "", 
          description: "",
          meta_title: "",
          meta_description: ""
        });
        setImage(null);
      } else {
        Swal.fire("Error", result.message || "Something went wrong", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-12 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Create Leadership Member
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Description</label>
          <JoditEditor
            ref={editor}
            value={formData.description}
            onChange={(newContent) =>
              setFormData({ ...formData, description: newContent })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
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
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateLeadership;