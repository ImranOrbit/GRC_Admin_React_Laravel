
// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import BASE_URL from "../../ApiBaseUrl/BaseUrl";
// import ImageBaseurl from "../../ApiBaseUrl/ImageBaseurl";

// const SuccessReviewPost = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     review_text: "",
//     rating: "",
//     meta_title: "",
//     meta_description: "",
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [formVisible, setFormVisible] = useState(false);

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   const fetchReviews = async () => {
//     try {
//       // Use reviewget instead of reviews
//       const res = await fetch(`${BASE_URL}reviewget`);
//       const data = await res.json();
//       setReviews(data);
//     } catch (err) {
//       console.error("Fetch error:", err);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImageFile(file);
//     if (file) {
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.review_text || !formData.rating || (!imageFile && !editId)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Please fill all fields!",
//         confirmButtonColor: "#3085d6",
//       });
//       return;
//     }

//     const formDataObj = new FormData();
//     formDataObj.append("name", formData.name);
//     formDataObj.append("review_text", formData.review_text);
//     formDataObj.append("rating", formData.rating);
//     formDataObj.append("meta_title", formData.meta_title || "");
//     formDataObj.append("meta_description", formData.meta_description || "");
//     if (imageFile) formDataObj.append("image", imageFile);

//     // Use correct endpoints
//     const url = editId 
//       ? `${BASE_URL}reviewupdate/${editId}`  // For updates
//       : `${BASE_URL}reviewpost`;              // For new posts
  
//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         body: formDataObj,
//       });

//       const result = await response.json();
      
//       if (response.ok) {
//         Swal.fire({
//           icon: "success",
//           title: `Review ${editId ? "updated" : "submitted"} successfully!`,
//           showConfirmButton: false,
//           timer: 1800,
//         });

//         setFormData({
//           name: "",
//           review_text: "",
//           rating: "",
//           meta_title: "",
//           meta_description: "",
//         });
//         setImageFile(null);
//         setPreviewImage(null);
//         setEditId(null);
//         setFormVisible(false);
//         fetchReviews();
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: result.message || "Something went wrong",
//           confirmButtonColor: "#d33",
//         });
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Failed to submit review.",
//         confirmButtonColor: "#d33",
//       });
//     }
//   };

//   const handleEdit = (review) => {
//     setEditId(review.id);
//     setFormData({
//       name: review.name,
//       review_text: review.review_text,
//       rating: review.rating,
//       meta_title: review.meta_title || "",
//       meta_description: review.meta_description || "",
//     });
    
//     if (review.image_url) {
//       setPreviewImage(`${ImageBaseurl}${review.image_url}`);
//     }
    
//     setImageFile(null);
//     setFormVisible(true);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirm.isConfirmed) {
//       try {
//         // Use reviewdelete instead of reviews
//         const res = await fetch(`${BASE_URL}reviewdelete/${id}`, {
//           method: "DELETE",
//         });
//         const result = await res.json();
//         if (res.ok) {
//           Swal.fire("Deleted!", result.message, "success");
//           fetchReviews();
//         } else {
//           Swal.fire("Error!", result.message || "Failed to delete.", "error");
//         }
//       } catch (err) {
//         Swal.fire("Error!", "Failed to delete.", "error");
//       }
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
//       <h2 className="text-3xl font-semibold mb-6 text-gray-800">
//         {editId ? "Edit Review" : "Edit & Delete Success Review"}
//       </h2>

//       {/* Add New Review Button */}
//       {!formVisible && (
//         <button
//           onClick={() => {
//             setFormVisible(true);
//             setEditId(null);
//             setFormData({
//               name: "",
//               review_text: "",
//               rating: "",
//               meta_title: "",
//               meta_description: "",
//             });
//             setPreviewImage(null);
//           }}
//           className="mb-6 bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700"
//         >
//           Add New Review
//         </button>
//       )}

//       {formVisible && (
//         <form onSubmit={handleSubmit} className="space-y-6 border-b pb-8 mb-8">
//           {/* Form fields - same as before */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter your name"
//               className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Review
//             </label>
//             <textarea
//               name="review_text"
//               value={formData.review_text}
//               onChange={handleChange}
//               placeholder="Write your review..."
//               rows={4}
//               className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Rating (1 to 5)
//             </label>
//             <input
//               type="number"
//               name="rating"
//               value={formData.rating}
//               onChange={handleChange}
//               min="1"
//               max="5"
//               placeholder="5"
//               className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Upload Image
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
//               file:rounded-xl file:border-0
//               file:text-sm file:font-semibold
//               file:bg-blue-50 file:text-blue-700
//               hover:file:bg-blue-100"
//             />
//             {previewImage && (
//               <img
//                 src={previewImage}
//                 alt="preview"
//                 className="w-32 h-32 mt-2 rounded object-cover border"
//               />
//             )}
//           </div>

//           {/* Meta Title */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Meta Title
//             </label>
//             <input
//               type="text"
//               name="meta_title"
//               value={formData.meta_title}
//               onChange={handleChange}
//               placeholder="Enter meta title"
//               className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Meta Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Meta Description
//             </label>
//             <textarea
//               name="meta_description"
//               value={formData.meta_description}
//               onChange={handleChange}
//               rows={3}
//               placeholder="Enter meta description"
//               className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="flex gap-4">
//             <button
//               type="submit"
//               className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition duration-200"
//             >
//               {editId ? "Update Review" : "Submit Review"}
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setFormVisible(false);
//                 setEditId(null);
//                 setFormData({
//                   name: "",
//                   review_text: "",
//                   rating: "",
//                   meta_title: "",
//                   meta_description: "",
//                 });
//                 setPreviewImage(null);
//                 setImageFile(null);
//               }}
//               className="px-6 bg-gray-500 text-white font-semibold py-3 rounded-xl hover:bg-gray-600 transition duration-200"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       )}

//       {/* Review List */}
//       <div className="mt-10">
//         <h3 className="text-2xl font-semibold mb-4">All Reviews</h3>
//         {reviews.map((review) => (
//           <div
//             key={review.id}
//             className="border rounded-xl p-4 mb-4 flex justify-between items-center"
//           >
//             <div className="flex items-center gap-4">
//               {review.image_url && (
//                 <img
//                   src={`${ImageBaseurl}${review.image_url}`}
//                   alt={review.name}
//                   className="w-16 h-16 rounded-full object-cover"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = "https://via.placeholder.com/64?text=No+Image";
//                   }}
//                 />
//               )}
//               <div>
//                 <h4 className="font-semibold text-lg">{review.name}</h4>
//                 <p className="text-sm text-gray-600">{review.review_text}</p>
//                 <p className="text-sm">Rating: {review.rating}/5</p>
//                 {review.meta_title && (
//                   <p className="text-xs text-gray-500">Meta: {review.meta_title}</p>
//                 )}
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => handleEdit(review)}
//                 className="px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(review.id)}
//                 className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//         {reviews.length === 0 && (
//           <p className="text-center text-gray-500">No reviews found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SuccessReviewPost;


import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import BASE_URL from "../../ApiBaseUrl/BaseUrl";
import ImageBaseurl from "../../ApiBaseUrl/ImageBaseurl";

const SuccessReviewPost = () => {
  const [formData, setFormData] = useState({
    name: "",
    review_text: "",
    rating: "",
    meta_title: "",
    meta_description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      // Use reviewget instead of reviews
      const res = await fetch(`${BASE_URL}reviewget`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.review_text || !formData.rating || (!imageFile && !editId)) {
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
    if (imageFile) formDataObj.append("image", imageFile);

    // Use correct endpoints
    const url = editId 
      ? `${BASE_URL}reviewupdate/${editId}`  // For updates
      : `${BASE_URL}reviewpost`;              // For new posts
  
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formDataObj,
      });

      const result = await response.json();
      
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: `Review ${editId ? "updated" : "submitted"} successfully!`,
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
        setPreviewImage(null);
        setEditId(null);
        setFormVisible(false);
        fetchReviews();
      } else {
        Swal.fire({
          icon: "error",
          title: result.message || "Something went wrong",
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

  // ==================== CHANGE 1: UPDATED handleEdit FUNCTION ====================
  const handleEdit = (review) => {
    setEditId(review.id);
    setFormData({
      name: review.name,
      review_text: review.review_text,
      rating: review.rating,
      meta_title: review.meta_title || "",
      meta_description: review.meta_description || "",
    });
    
    // FIXED: Handle image URL exactly like AccountingEditDelete
    if (review.image_url) {
      const imageUrl = review.image_url.startsWith("/")
        ? review.image_url
        : `/${review.image_url}`;
      setPreviewImage(`${ImageBaseurl}${imageUrl}`);
    }
    
    setImageFile(null);
    setFormVisible(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // ==================== END OF CHANGE 1 ====================

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        // Use reviewdelete instead of reviews
        const res = await fetch(`${BASE_URL}reviewdelete/${id}`, {
          method: "DELETE",
        });
        const result = await res.json();
        if (res.ok) {
          Swal.fire("Deleted!", result.message, "success");
          fetchReviews();
        } else {
          Swal.fire("Error!", result.message || "Failed to delete.", "error");
        }
      } catch (err) {
        Swal.fire("Error!", "Failed to delete.", "error");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        {editId ? "Edit Review" : "Edit & Delete Success Review"}
      </h2>

      {/* Add New Review Button */}
      {!formVisible && (
        <button
          onClick={() => {
            setFormVisible(true);
            setEditId(null);
            setFormData({
              name: "",
              review_text: "",
              rating: "",
              meta_title: "",
              meta_description: "",
            });
            setPreviewImage(null);
            setImageFile(null);
          }}
          className="mb-6 bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700"
        >
          Add New Review
        </button>
      )}

      {formVisible && (
        <form onSubmit={handleSubmit} className="space-y-6 border-b pb-8 mb-8">
          {/* Form fields - same as before */}
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-xl file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            />
            {/* ==================== CHANGE 2: ADDED ERROR HANDLING FOR PREVIEW IMAGE ==================== */}
            {previewImage && (
              <img
                src={previewImage}
                alt="preview"
                className="w-32 h-32 mt-2 rounded object-cover border"
                onError={(e) => {
                  console.error("Preview image failed to load:", previewImage);
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/128?text=Invalid+Image";
                }}
              />
            )}
            {/* ==================== END OF CHANGE 2 ==================== */}
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
              className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition duration-200"
            >
              {editId ? "Update Review" : "Submit Review"}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormVisible(false);
                setEditId(null);
                setFormData({
                  name: "",
                  review_text: "",
                  rating: "",
                  meta_title: "",
                  meta_description: "",
                });
                setPreviewImage(null);
                setImageFile(null);
              }}
              className="px-6 bg-gray-500 text-white font-semibold py-3 rounded-xl hover:bg-gray-600 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Review List */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">All Reviews</h3>
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border rounded-xl p-4 mb-4 flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              {/* ==================== CHANGE 3: UPDATED IMAGE DISPLAY IN TABLE ==================== */}
              {review.image_url && (
                <img
                  src={`${ImageBaseurl}${review.image_url.startsWith("/") ? review.image_url : `/${review.image_url}`}`}
                  alt={review.name}
                  className="w-16 h-16 rounded-full object-cover"
                  onError={(e) => {
                    console.error("Failed to load image:", `${ImageBaseurl}${review.image_url}`);
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/64?text=No+Image";
                  }}
                />
              )}
              {/* ==================== END OF CHANGE 3 ==================== */}
              <div>
                <h4 className="font-semibold text-lg">{review.name}</h4>
                <p className="text-sm text-gray-600">{review.review_text}</p>
                <p className="text-sm">Rating: {review.rating}/5</p>
                {review.meta_title && (
                  <p className="text-xs text-gray-500">Meta: {review.meta_title}</p>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(review)}
                className="px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(review.id)}
                className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
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

export default SuccessReviewPost;