

import React, { useEffect, useState } from "react";
import BASE_URL from "../../ApiBaseUrl/BaseUrl";
import ImageBaseurl from "../../ApiBaseUrl/ImageBaseurl";
import Swal from "sweetalert2";

const ManageCollaborations = () => {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({
    text: "",
    meta_title: "",
    meta_description: ""
  });
  const [image, setImage] = useState(null);

  const fetchCollaborations = async () => {
    try {
      const res = await fetch(`${BASE_URL}collaborations`);
      const data = await res.json();
      console.log("Raw data from API:", data);
      setItems(data);
    } catch (err) {
      Swal.fire("Error", "Failed to fetch data", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`${BASE_URL}collaborations/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          Swal.fire("Deleted", "Collaboration removed", "success");
          fetchCollaborations();
        } else {
          Swal.fire("Error", "Failed to delete", "error");
        }
      } catch (err) {
        Swal.fire("Error", "Delete failed", "error");
      }
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setFormData({
      text: item.text,
      meta_title: item.meta_title || "",
      meta_description: item.meta_description || ""
    });
    setImage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    const formDataObj = new FormData();
    formDataObj.append("text", formData.text);
    formDataObj.append("meta_title", formData.meta_title || "");
    formDataObj.append("meta_description", formData.meta_description || "");
    if (image) formDataObj.append("image", image);

    try {
      const res = await fetch(`${BASE_URL}collaborations/${editItem.id}`, {
        method: "POST",
        body: formDataObj,
      });

      if (res.ok) {
        Swal.fire("Success", "Updated successfully", "success");
        fetchCollaborations();
        setEditItem(null);
        setFormData({ text: "", meta_title: "", meta_description: "" });
        setImage(null);
      } else {
        Swal.fire("Error", "Update failed", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  useEffect(() => {
    fetchCollaborations();
  }, []);

  // 🔴 FIXED: Better image URL constructor
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    console.log("ImageBaseurl:", ImageBaseurl);
    console.log("Original image path:", imagePath);
    
    // Remove any leading slash from imagePath
    const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    
    // Ensure base URL doesn't have trailing slash
    const baseUrl = ImageBaseurl.endsWith('/') ? ImageBaseurl.slice(0, -1) : ImageBaseurl;
    
    // Construct full URL
    const fullUrl = `${baseUrl}/${cleanPath}`;
    console.log("Constructed image URL:", fullUrl);
    
    return fullUrl;
  };

  // 🔴 FIXED: Local fallback for broken images
  const handleImageError = (e) => {
    console.log("Image failed to load:", e.target.src);
    e.target.onerror = null;
    // Create a simple colored div as fallback
    const parent = e.target.parentElement;
    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-500 text-xs rounded-md';
    fallbackDiv.innerText = 'No Image';
    parent.innerHTML = '';
    parent.appendChild(fallbackDiv);
  };

  return (
    <div className="max-w-6xl mx-auto my-12 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">Manage Collaborations</h2>

      {editItem && (
        <div className="bg-gray-50 border rounded-lg p-5 mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Edit Collaboration (ID: {editItem.id})</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block font-medium text-sm mb-1">Text</label>
              <textarea
                name="text"
                value={formData.text}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-sm mb-1">New Image (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {editItem.image && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">Current Image:</p>
                  {/* 🔴 FIXED: Image with better error handling */}
                  <div className="relative">
                    <img
                      src={getImageUrl(editItem.image)}
                      alt="Current"
                      className="w-24 h-24 rounded object-cover border"
                      onError={handleImageError}
                    />
                  </div>
                </div>
              )}
            </div>

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
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Update
            </button>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border rounded-md">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Text</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 border">{item.id}</td>
                <td className="px-4 py-2 border">{item.text}</td>
                <td className="px-4 py-2 border">
                  {item.image ? (
                    <div>
                      {/* 🔴 FIXED: Table image with better error handling */}
                      <div className="relative">
                        <img
                          src={getImageUrl(item.image)}
                          alt="Collaboration"
                          className="w-16 h-16 object-cover rounded-md border"
                          onError={handleImageError}
                        />
                      </div>
                      {/* <p className="text-xs text-gray-400 mt-1">
                        Path: {item.image}
                      </p> */}
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-500 text-xs rounded-md">
                      No image
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-5 text-gray-500">
                  No collaborations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCollaborations;