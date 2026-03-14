


import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import BASE_URL from "../../ApiBaseUrl/BaseUrl";
import ImageBaseurl from "../../ApiBaseUrl/ImageBaseurl";

const StudentsEditDelete = () => {
  const [formData, setFormData] = useState({
    name: "",
    review_text: "",
    meta_title: "",
    meta_description: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch existing reviews
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${BASE_URL}reviewtwoget`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.review_text || (!imageFile && !editingId)) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all fields!",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("review_text", formData.review_text);
    formDataObj.append("meta_title", formData.meta_title || "");
    formDataObj.append("meta_description", formData.meta_description || "");
    if (imageFile) formDataObj.append("image", imageFile);

    const url = editingId
      ? `${BASE_URL}reviewtwoupdate/${editingId}`
      : `${BASE_URL}reviewtwopost`;

    // Use POST for both
    const method = "POST";

    try {
      const response = await fetch(url, {
        method,
        body: formDataObj,
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: editingId ? "Review updated!" : "Review submitted!",
          showConfirmButton: false,
          timer: 1800,
        });

        setFormData({
          name: "",
          review_text: "",
          meta_title: "",
          meta_description: ""
        });
        setImageFile(null);
        setEditingId(null);
        setShowForm(false);

        fetchReviews();
      } else {
        Swal.fire({
          icon: "error",
          title: result.message || "Something went wrong.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong.",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleEdit = (review) => {
    setFormData({
      name: review.name,
      review_text: review.review_text,
      meta_title: review.meta_title || "",
      meta_description: review.meta_description || ""
    });
    setEditingId(review.id);
    setImageFile(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`${BASE_URL}reviewtwodelete/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          Swal.fire("Deleted!", "Review has been deleted.", "success");
          setReviews(reviews.filter((item) => item.id !== id));
        } else {
          Swal.fire("Error!", "Could not delete review.", "error");
        }
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error!", "Could not delete review.", "error");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      {/* Add New Review Button */}
      {!showForm && (
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData({
              name: "",
              review_text: "",
              meta_title: "",
              meta_description: ""
            });
          }}
          className="mb-6 bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700"
        >
          Add New Review
        </button>
      )}

      {showForm && (
        <>
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            {editingId ? "Edit Review" : "Submit a Review"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Review
              </label>
              <textarea
                name="review_text"
                value={formData.review_text}
                onChange={handleChange}
                placeholder="Write your review..."
                rows={4}
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                  file:rounded-xl file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
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

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700"
              >
                {editingId ? "Update Review" : "Submit Review"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    name: "",
                    review_text: "",
                    meta_title: "",
                    meta_description: ""
                  });
                  setImageFile(null);
                }}
                className="px-6 bg-gray-500 text-white font-semibold py-3 rounded-xl hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      )}

      {/* Review List */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">All Reviews</h3>
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border border-gray-200 rounded-xl p-4 mb-4 flex items-center justify-between"
          >
            <div>
              <p className="font-bold text-gray-800">{review.name}</p>
              <p className="text-gray-600">{review.review_text}</p>
              {review.image_url && (
                <img
                  src={`${ImageBaseurl}${review.image_url}`}
                  alt="review"
                  className="w-24 mt-2 rounded"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/96?text=No+Image";
                  }}
                />
              )}
              {review.meta_title && (
                <p className="text-xs text-gray-500 mt-1">Meta: {review.meta_title}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(review)}
                className="bg-yellow-400 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(review.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {reviews.length === 0 && (
          <p className="text-center text-gray-500">No reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default StudentsEditDelete;