
import React, { useState } from "react";
import Swal from "sweetalert2";
import BASE_URL from "../../ApiBaseUrl/BaseUrl";

const AdminReviewForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    review_text: "",
    rating: "",
    meta_title: "",
    meta_description: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.review_text || !formData.rating || !imageFile) {
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
    formDataObj.append("rating", formData.rating);
    formDataObj.append("meta_title", formData.meta_title || "");
    formDataObj.append("meta_description", formData.meta_description || "");
    formDataObj.append("image", imageFile);

    try {
      // Use reviewpost instead of reviews
      const response = await fetch(`${BASE_URL}reviewpost`, {
        method: "POST",
        body: formDataObj,
      });

      const result = await response.json();
      
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Review submitted successfully!",
          showConfirmButton: false,
          timer: 1800,
        });

        setFormData({
          name: "",
          review_text: "",
          rating: "",
          meta_title: "",
          meta_description: "",
        });
        setImageFile(null);
      } else {
        Swal.fire({
          icon: "error",
          title: result.message || "Failed to submit review.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to submit review.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Submit a Review
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
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
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Review */}
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
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating (1 to 5)
          </label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            placeholder="5"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Image */}
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

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition duration-200"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminReviewForm;