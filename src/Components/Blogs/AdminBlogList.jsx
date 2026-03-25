



// import React, { useState, useRef, useMemo, useEffect } from "react";
// import JoditEditor from "jodit-react";
// import Swal from "sweetalert2";
// import BASE_URL from "../../ApiBaseUrl/BaseUrl";
// import ImageBaseurl from "../../ApiBaseUrl/ImageBaseurl";

// const AdminBlogList = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Edit form states
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [slug, setSlug] = useState("");
//   const [title, setTitle] = useState("");
//   const [excerpt, setExcerpt] = useState("");
//   const [author, setAuthor] = useState("");
//   const [date, setDate] = useState("");
//   const [tag, setTag] = useState("");
//   const [content, setContent] = useState("");
//   const [metaTitle, setMetaTitle] = useState("");
//   const [metaDescription, setMetaDescription] = useState("");
//   const [existingImage, setExistingImage] = useState(null);
//   const [imageFile, setImageFile] = useState(null);

//   const editor = useRef(null);

//   const joditConfig = useMemo(
//     () => ({
//       readonly: false,
//       placeholder: "Write blog content here...",
//     }),
//     []
//   );

//   // Fetch blogs
//   const fetchBlogs = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}blogs`);
//       if (!res.ok) throw new Error("Failed to fetch blogs");
//       const data = await res.json();
//       setBlogs(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   // Delete blog
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This blog will be permanently deleted!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const res = await fetch(`${BASE_URL}blogs/${id}`, {
//             method: "DELETE",
//           });
//           if (!res.ok) throw new Error("Failed to delete blog");
//           const data = await res.json();
//           Swal.fire("Deleted!", data.message, "success");
//           setBlogs(blogs.filter((b) => b.id !== id));
//           if (isEditing && editId === id) {
//             resetForm();
//           }
//         } catch (err) {
//           Swal.fire("Error", err.message, "error");
//         }
//       }
//     });
//   };

//   // Load blog data into form for editing
//   const handleEditClick = (blog) => {
//     setIsEditing(true);
//     setEditId(blog.id);
//     setSlug(blog.slug);
//     setTitle(blog.title);
//     setExcerpt(blog.excerpt);
//     setAuthor(blog.author);
//     setDate(blog.date);
//     setTag(blog.tag);
//     setContent(blog.content);
//     setMetaTitle(blog.meta_title || "");
//     setMetaDescription(blog.meta_description || "");
//     setExistingImage(blog.image);
//     setImageFile(null);
//   };

//   // Reset form and edit mode
//   const resetForm = () => {
//     setIsEditing(false);
//     setEditId(null);
//     setSlug("");
//     setTitle("");
//     setExcerpt("");
//     setAuthor("");
//     setDate("");
//     setTag("");
//     setContent("");
//     setMetaTitle("");
//     setMetaDescription("");
//     setExistingImage(null);
//     setImageFile(null);
//   };

//   // Handle image input change
//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setImageFile(e.target.files[0]);
//     }
//   };

//   // Submit updated blog
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!slug || !title || !excerpt || !author || !date || !tag || !content) {
//       Swal.fire("Error", "Please fill all fields", "error");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("slug", slug);
//     formData.append("title", title);
//     formData.append("excerpt", excerpt);
//     formData.append("author", author);
//     formData.append("date", date);
//     formData.append("tag", tag);
//     formData.append("content", content);
//     formData.append("meta_title", metaTitle || "");
//     formData.append("meta_description", metaDescription || "");
//     formData.append("existingImage", existingImage || "");
//     if (imageFile) {
//       formData.append("image", imageFile);
//     }

//     try {
//       // Use POST instead of PUT
//       const res = await fetch(`${BASE_URL}blogs/${editId}`, {
//         method: "POST", // Changed from PUT to POST
//         body: formData,
//       });
      
//       if (!res.ok) throw new Error("Failed to update blog");

//       const data = await res.json();
//       Swal.fire("Success", data.message, "success");
      
//       // Update the blog in the local list
//       setBlogs((prev) =>
//         prev.map((b) =>
//           b.id === editId
//             ? {
//                 ...b,
//                 slug,
//                 title,
//                 excerpt,
//                 author,
//                 date,
//                 tag,
//                 content,
//                 meta_title: metaTitle,
//                 meta_description: metaDescription,
//                 image: imageFile ? `/uploads/${imageFile.name}` : existingImage,
//               }
//             : b
//         )
//       );
//       resetForm();
//     } catch (err) {
//       Swal.fire("Error", err.message, "error");
//     }
//   };

//   const handleContentChange = (newContent) => {
//     setContent(newContent);
//   };

//   if (loading) return <div className="text-center py-8">Loading...</div>;
//   if (error)
//     return <div className="text-center py-8 text-red-500">Error: {error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       {/* Blog List */}
//       <div className="overflow-x-auto rounded-lg border border-gray-200 mb-10">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Image
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Title
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Author
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Tag
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {blogs.map((blog) => (
//               <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {blog.image ? (
//                     <img
//                       src={`${ImageBaseurl}${
//                         blog.image.startsWith("/")
//                           ? blog.image.substring(1)
//                           : blog.image
//                       }`}
//                       alt={blog.title}
//                       className="w-16 h-16 object-cover rounded"
//                       onError={(e) => {
//                         e.target.src =
//                           "https://via.placeholder.com/80?text=No+Image";
//                         e.target.onerror = null;
//                       }}
//                     />
//                   ) : (
//                     <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
//                       <span className="text-xs text-gray-400">No Image</span>
//                     </div>
//                   )}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {blog.title}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {blog.author}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {blog.date}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                     {blog.tag}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
//                   <button
//                     onClick={() => handleEditClick(blog)}
//                     className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(blog.id)}
//                     className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Edit Form */}
//       {isEditing && (
//         <div className="p-6 bg-white rounded shadow">
//           <h2 className="text-2xl font-bold mb-6">Edit Blog</h2>
//           <form onSubmit={handleSubmit} encType="multipart/form-data">
//             <label className="block mb-2 font-medium">Slug</label>
//             <input
//               type="text"
//               value={slug}
//               onChange={(e) => setSlug(e.target.value)}
//               className="w-full mb-4 px-3 py-2 border rounded"
//               required
//             />

//             <label className="block mb-2 font-medium">Title</label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full mb-4 px-3 py-2 border rounded"
//               required
//             />

//             <label className="block mb-2 font-medium">Excerpt</label>
//             <textarea
//               value={excerpt}
//               onChange={(e) => setExcerpt(e.target.value)}
//               className="w-full mb-4 px-3 py-2 border rounded"
//               rows={3}
//               required
//             />

//             <label className="block mb-2 font-medium">Author</label>
//             <input
//               type="text"
//               value={author}
//               onChange={(e) => setAuthor(e.target.value)}
//               className="w-full mb-4 px-3 py-2 border rounded"
//               required
//             />

//             <label className="block mb-2 font-medium">Date</label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="w-full mb-4 px-3 py-2 border rounded"
//               required
//             />

//             <label className="block mb-2 font-medium">Tag</label>
//             <input
//               type="text"
//               value={tag}
//               onChange={(e) => setTag(e.target.value)}
//               className="w-full mb-4 px-3 py-2 border rounded"
//               required
//             />

//             <label className="block mb-2 font-medium">Content</label>
//             <JoditEditor
//               ref={editor}
//               value={content}
//               config={joditConfig}
//               onBlur={handleContentChange}
//               onChange={() => {}}
//             />

//             {/* Meta Title */}
//             <div className="mt-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Meta Title
//               </label>
//               <input
//                 type="text"
//                 value={metaTitle}
//                 onChange={(e) => setMetaTitle(e.target.value)}
//                 placeholder="Enter meta title"
//                 className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Meta Description */}
//             <div className="mt-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Meta Description
//               </label>
//               <textarea
//                 value={metaDescription}
//                 onChange={(e) => setMetaDescription(e.target.value)}
//                 rows={3}
//                 placeholder="Enter meta description"
//                 className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <label className="block mb-2 font-medium mt-4">Image</label>
//             {existingImage && !imageFile && (
//               <img
//                 src={`${ImageBaseurl}${
//                   existingImage.startsWith("/")
//                     ? existingImage.substring(1)
//                     : existingImage
//                 }`}
//                 alt="Current"
//                 className="w-32 h-32 object-cover mb-4 rounded"
//               />
//             )}
//             <input type="file" accept="image/*" onChange={handleImageChange} />

//             <div className="flex space-x-4 mt-6">
//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//               >
//                 Update Blog
//               </button>
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminBlogList;




import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import BASE_URL from "../../ApiBaseUrl/BaseUrl";
import ImageBaseurl from "../../ApiBaseUrl/ImageBaseurl";

const AdminBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit form states
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [existingImage, setExistingImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // ==================== CHANGE 1: ADDED previewImage STATE ====================

  const editor = useRef(null);

  const joditConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Write blog content here...",
    }),
    []
  );

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${BASE_URL}blogs`);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Delete blog
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This blog will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${BASE_URL}blogs/${id}`, {
            method: "DELETE",
          });
          if (!res.ok) throw new Error("Failed to delete blog");
          const data = await res.json();
          Swal.fire("Deleted!", data.message, "success");
          setBlogs(blogs.filter((b) => b.id !== id));
          if (isEditing && editId === id) {
            resetForm();
          }
        } catch (err) {
          Swal.fire("Error", err.message, "error");
        }
      }
    });
  };

  // ==================== CHANGE 2: UPDATED handleEditClick FUNCTION ====================
  const handleEditClick = (blog) => {
    setIsEditing(true);
    setEditId(blog.id);
    setSlug(blog.slug);
    setTitle(blog.title);
    setExcerpt(blog.excerpt);
    setAuthor(blog.author);
    setDate(blog.date);
    setTag(blog.tag);
    setContent(blog.content);
    setMetaTitle(blog.meta_title || "");
    setMetaDescription(blog.meta_description || "");
    setExistingImage(blog.image);
    
    // FIXED: Handle image URL exactly like AccountingEditDelete
    if (blog.image) {
      const imageUrl = blog.image.startsWith("/")
        ? blog.image
        : `/${blog.image}`;
      setPreviewImage(`${ImageBaseurl}${imageUrl}`);
    }
    setImageFile(null);
  };
  // ==================== END OF CHANGE 2 ====================

  // Reset form and edit mode
  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setSlug("");
    setTitle("");
    setExcerpt("");
    setAuthor("");
    setDate("");
    setTag("");
    setContent("");
    setMetaTitle("");
    setMetaDescription("");
    setExistingImage(null);
    setImageFile(null);
    setPreviewImage(null); // ==================== CHANGE 3: CLEAR previewImage ON RESET ====================
  };

  // ==================== CHANGE 4: UPDATED handleImageChange FUNCTION ====================
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  // ==================== END OF CHANGE 4 ====================

  // Submit updated blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!slug || !title || !excerpt || !author || !date || !tag || !content) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }

    const formData = new FormData();
    formData.append("slug", slug);
    formData.append("title", title);
    formData.append("excerpt", excerpt);
    formData.append("author", author);
    formData.append("date", date);
    formData.append("tag", tag);
    formData.append("content", content);
    formData.append("meta_title", metaTitle || "");
    formData.append("meta_description", metaDescription || "");
    formData.append("existingImage", existingImage || "");
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      // Use POST instead of PUT
      const res = await fetch(`${BASE_URL}blogs/${editId}`, {
        method: "POST", // Changed from PUT to POST
        body: formData,
      });
      
      if (!res.ok) throw new Error("Failed to update blog");

      const data = await res.json();
      Swal.fire("Success", data.message, "success");
      
      // Update the blog in the local list
      setBlogs((prev) =>
        prev.map((b) =>
          b.id === editId
            ? {
                ...b,
                slug,
                title,
                excerpt,
                author,
                date,
                tag,
                content,
                meta_title: metaTitle,
                meta_description: metaDescription,
                image: imageFile ? `/uploads/${imageFile.name}` : existingImage,
              }
            : b
        )
      );
      resetForm();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Blog List */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 mb-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tag
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* ==================== CHANGE 5: UPDATED IMAGE DISPLAY IN TABLE ==================== */}
                  {blog.image ? (
                    <img
                      src={`${ImageBaseurl}${
                        blog.image.startsWith("/")
                          ? blog.image
                          : `/${blog.image}`
                      }`}
                      alt={blog.title}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/80?text=No+Image";
                        e.target.onerror = null;
                      }}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-400">No Image</span>
                    </div>
                  )}
                  {/* ==================== END OF CHANGE 5 ==================== */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {blog.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {blog.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {blog.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {blog.tag}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleEditClick(blog)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-bold mb-6">Edit Blog</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label className="block mb-2 font-medium">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded"
              required
            />

            <label className="block mb-2 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded"
              required
            />

            <label className="block mb-2 font-medium">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded"
              rows={3}
              required
            />

            <label className="block mb-2 font-medium">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded"
              required
            />

            <label className="block mb-2 font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded"
              required
            />

            <label className="block mb-2 font-medium">Tag</label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded"
              required
            />

            <label className="block mb-2 font-medium">Content</label>
            <JoditEditor
              ref={editor}
              value={content}
              config={joditConfig}
              onBlur={handleContentChange}
              onChange={() => {}}
            />

            {/* Meta Title */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Enter meta title"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Meta Description */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description
              </label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={3}
                placeholder="Enter meta description"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <label className="block mb-2 font-medium mt-4">Image</label>
            {/* ==================== CHANGE 6: UPDATED IMAGE DISPLAY WITH previewImage ==================== */}
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-32 h-32 object-cover mb-4 rounded"
                onError={(e) => {
                  console.error("Preview image failed to load:", previewImage);
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/128?text=Invalid+Image";
                }}
              />
            )}
            {!previewImage && existingImage && (
              <img
                src={`${ImageBaseurl}${
                  existingImage.startsWith("/")
                    ? existingImage
                    : `/${existingImage}`
                }`}
                alt="Current"
                className="w-32 h-32 object-cover mb-4 rounded"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/128?text=No+Image";
                }}
              />
            )}
            {/* ==================== END OF CHANGE 6 ==================== */}
            <input type="file" accept="image/*" onChange={handleImageChange} />

            <div className="flex space-x-4 mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Update Blog
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminBlogList;