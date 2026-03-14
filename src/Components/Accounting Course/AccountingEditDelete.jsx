
import React, { useState, useEffect, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import BASE_URL from "../../ApiBaseUrl/BaseUrl";
import ImageBaseurl from "../../ApiBaseUrl/ImageBaseurl";
import Swal from "sweetalert2";

const AccountingEditDelete = () => {
  const [formData, setFormData] = useState({
    text: "",
    content: "",
    meta_title: "",
    meta_description: "",
  });
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [AccountingData, setAccountingData] = useState([]);
  const [editId, setEditId] = useState(null);

  const editor = useRef(null);

  const joditConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Write blog content here...",
    }),
    [],
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}course-accounting-get`);
      const data = await response.json();
      setAccountingData(data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (newContent) => {
    setFormData({ ...formData, content: newContent });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image && !editId) {
      Swal.fire("Error", "Please select an image", "error");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("text", formData.text);
    if (image) formPayload.append("image", image);
    formPayload.append("content", formData.content);
    formPayload.append("meta_title", formData.meta_title || "");
    formPayload.append("meta_description", formData.meta_description || "");

    const url = editId
      ? `${BASE_URL}course-accounting-update/${editId}`
      : `${BASE_URL}course-accounting`;

    const method = "POST";

    try {
      const response = await fetch(url, {
        method,
        body: formPayload,
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire(
          "Success",
          editId ? "Updated successfully" : "Submitted successfully",
          "success",
        );
        setFormData({
          text: "",
          content: "",
          meta_title: "",
          meta_description: "",
        });
        setImage(null);
        setPreviewImage(null);
        setEditId(null);
        fetchData();
      } else {
        Swal.fire("Error", result.message || "Something went wrong", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "Request failed", "error");
    }
  };

  const handleEdit = (item) => {
    setFormData({ 
      text: item.text, 
      content: item.content,
      meta_title: item.meta_title || "",
      meta_description: item.meta_description || ""
    });
    setEditId(item.id);

    // Fix the image URL
    if (item.image) {
      // Remove any duplicate slashes and ensure proper URL
      const imageUrl = item.image.startsWith("/")
        ? item.image
        : `/${item.image}`;
      setPreviewImage(`${ImageBaseurl}${imageUrl}`);
    }
    setImage(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${BASE_URL}course-accounting-delete/${id}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();
      if (response.ok) {
        Swal.fire("Deleted!", "Your content has been deleted.", "success");
        fetchData();
      } else {
        Swal.fire("Error", result.message || "Delete failed", "error");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      Swal.fire("Error", "Delete request failed", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 shadow rounded-xl">
      {/* TABLE */}
      <h3 className="text-xl font-semibold mb-4">Accounting Data</h3>
      <div className="overflow-x-auto">
        <table className="w-full border text-left text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">ID</th>
              <th className="border px-3 py-2">Text</th>
              <th className="border px-3 py-2">Image</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {AccountingData.map((item) => (
              <tr key={item.id}>
                <td className="border px-3 py-2">{item.id}</td>
                <td className="border px-3 py-2">{item.text}</td>
                <td className="border px-3 py-2">
                  {item.image && (
                    <img
                      src={`${ImageBaseurl}${item.image.startsWith("/") ? item.image : `/${item.image}`}`}
                      alt="thumbnail"
                      className="w-16 h-16 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/64?text=No+Image";
                      }}
                    />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {AccountingData.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FORM - ONLY SHOW IF EDIT */}
      {editId && (
        <>
          <h2 className="text-2xl font-bold mt-10 mb-6 text-center">
            Update Accounting Blog
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 mb-12"
          >
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
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="preview"
                  className="w-32 h-32 mt-2 rounded object-cover border"
                />
              )}
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
                rows={3}
                value={formData.meta_description}
                onChange={handleChange}
                placeholder="Enter meta description"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setFormData({ 
                    text: "", 
                    content: "",
                    meta_title: "",
                    meta_description: ""
                  });
                  setImage(null);
                  setPreviewImage(null);
                }}
                className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default AccountingEditDelete;