



import React, { useEffect, useState, useRef } from "react";
import BASE_URL from "../../ApiBaseUrl/BaseUrl";
import ImageBaseurl from "../../ApiBaseUrl/ImageBaseurl";
import Swal from "sweetalert2";
import JoditEditor from "jodit-react";

const EditDeleteLeadership = () => {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    meta_title: "",
    meta_description: ""
  });
  const [image, setImage] = useState(null);
  const editor = useRef(null);

  const fetchLeadership = async () => {
    try {
      const res = await fetch(`${BASE_URL}leadership`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      Swal.fire("Error", "Failed to fetch leadership data", "error");
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
        const res = await fetch(`${BASE_URL}leadership/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          Swal.fire("Deleted", "Leadership entry removed", "success");
          fetchLeadership();
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
      name: item.name,
      title: item.title,
      description: item.description,
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
    formDataObj.append("name", formData.name);
    formDataObj.append("title", formData.title);
    formDataObj.append("description", formData.description);
    formDataObj.append("meta_title", formData.meta_title || "");
    formDataObj.append("meta_description", formData.meta_description || "");
    if (image) formDataObj.append("image", image);

    try {
      // Use POST instead of PUT
      const res = await fetch(`${BASE_URL}leadership/${editItem.id}`, {
        method: "POST",
        body: formDataObj,
      });

      if (res.ok) {
        Swal.fire("Success", "Updated successfully", "success");
        fetchLeadership();
        setEditItem(null);
        setFormData({
          name: "",
          title: "",
          description: "",
          meta_title: "",
          meta_description: ""
        });
        setImage(null);
      } else {
        Swal.fire("Error", "Update failed", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  useEffect(() => {
    fetchLeadership();
  }, []);

  return (
    <div className="max-w-6xl mx-auto my-12 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">
        Manage Leadership
      </h2>

      {editItem && (
        <div className="bg-gray-50 border rounded-lg p-5 mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Edit Leadership (ID: {editItem.id})
          </h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block font-medium text-sm mb-1">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-sm mb-1">Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Description
              </label>
              <JoditEditor
                ref={editor}
                value={formData.description}
                onChange={(newContent) =>
                  setFormData({ ...formData, description: newContent })
                }
              />
            </div>

            <div>
              <label className="block font-medium text-sm mb-1">
                New Image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {editItem.image && (
                <img
                  src={`${ImageBaseurl}${editItem.image.startsWith("/") ? editItem.image.substring(1) : editItem.image}`}
                  alt="Current"
                  className="w-24 h-24 rounded mt-2 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/96?text=No+Image";
                  }}
                />
              )}
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
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 border">{item.id}</td>
                <td className="px-4 py-2 border">{item.name}</td>
                <td className="px-4 py-2 border">{item.title}</td>
                <td
                  className="px-4 py-2 border"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></td>
                <td className="px-4 py-2 border">
                  {item.image && (
                    <img
                      src={`${ImageBaseurl}${item.image.startsWith("/") ? item.image.substring(1) : item.image}`}
                      alt="Leadership"
                      className="w-16 h-16 object-cover rounded-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/64?text=No+Image";
                      }}
                    />
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
                <td colSpan="6" className="text-center py-5 text-gray-500">
                  No leadership data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditDeleteLeadership;