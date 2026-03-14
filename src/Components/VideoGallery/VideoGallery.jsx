



import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import BASE_URL from "../../ApiBaseUrl/BaseUrl";

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch videos from database
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch(`${BASE_URL}videos`);
      const data = await response.json();
      console.log("Fetched videos:", data);
      
      if (data && data.length > 0) {
        // Parse tags if they are stored as JSON strings
        const formattedVideos = data.map(video => ({
          ...video,
          tags: typeof video.tags === 'string' ? JSON.parse(video.tags) : (video.tags || [])
        }));
        setVideos(formattedVideos);
      } else {
        // If no videos in database, show empty array
        setVideos([]);
        Swal.fire("Info", "No videos found in database. Please add videos first.", "info");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      Swal.fire("Error", "Failed to fetch videos", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (index, field, value) => {
    const updatedVideos = [...videos];
    updatedVideos[index][field] = value;
    setVideos(updatedVideos);
  };

  const handleTagChange = (index, tagString) => {
    // Split by space and filter tags that start with #
    const tags = tagString.split(' ').filter(tag => tag.startsWith('#'));
    const updatedVideos = [...videos];
    updatedVideos[index].tags = tags;
    setVideos(updatedVideos);
  };

  const updateMultipleVideosAPI = async () => {
    try {
      console.log("Sending videos:", videos);
      
      const response = await fetch(`${BASE_URL}videos/multiple`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ videos: videos }),
      });

      const result = await response.json();
      console.log("Server response:", result);
      
      if (!response.ok) {
        throw new Error(result.message || "Failed to save");
      }
      
      return true;
    } catch (error) {
      console.error("Save error:", error);
      Swal.fire("Error", error.message, "error");
      return false;
    }
  };

  const handleSave = async () => {
    const success = await updateMultipleVideosAPI();
    if (success) {
      Swal.fire(
        "Saved!",
        "Changes saved successfully!",
        "success"
      );
      fetchVideos(); // Refresh data
    }
  };

  const handlePublish = async () => {
    const success = await updateMultipleVideosAPI();
    if (success) {
      Swal.fire(
        "Published!",
        "Changes published successfully!",
        "success"
      );
      fetchVideos(); // Refresh data
    }
  };

  const handleReset = () => {
    fetchVideos(); // Refetch from database
    Swal.fire(
      "Reset!",
      "Videos have been reset to original values.",
      "info"
    );
  };

  if (loading) {
    return <div className="text-center py-10">Loading videos...</div>;
  }

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <header className="bg-white shadow-md py-4 mb-8">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">
            Video Testimonials Admin
          </h1>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4">
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Manage Video URLs
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Update the video URLs below. Changes will be reflected immediately.
          </p>

          {videos.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No videos found. Please run the seeder first.
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  className="bg-slate-100 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all p-4"
                >
                  {/* Thumbnail */}
                  <div className="h-44 flex items-center justify-center text-slate-500 font-semibold bg-slate-200 rounded mb-4">
                    {video.thumbnail || "Video Thumbnail"}
                  </div>
                  
                  {/* Title */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={video.title || ""}
                      onChange={(e) => handleChange(index, "title", e.target.value)}
                      placeholder="Enter video title"
                    />
                  </div>

                  {/* Tags */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags (space separated, start with #)
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={video.tags ? video.tags.join(' ') : ""}
                      onChange={(e) => handleTagChange(index, e.target.value)}
                      placeholder="#studyabroad #UK #education"
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {video.tags && video.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Video URL */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Video URL
                    </label>
                    <input
                      type="url"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={video.url || ""}
                      onChange={(e) => handleChange(index, "url", e.target.value)}
                      placeholder="Enter video URL"
                    />
                  </div>

                  {/* Meta Title */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={video.meta_title || ""}
                      onChange={(e) => handleChange(index, "meta_title", e.target.value)}
                      placeholder="Enter meta title"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Meta Description */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meta Description
                    </label>
                    <textarea
                      value={video.meta_description || ""}
                      onChange={(e) => handleChange(index, "meta_description", e.target.value)}
                      rows={2}
                      placeholder="Enter meta description"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {videos.length > 0 && (
            <div className="flex justify-end gap-4 mt-8 pt-4 border-t">
              <button
                onClick={handleReset}
                className="bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded"
              >
                Reset
              </button>
              <button
                onClick={handlePublish}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                Publish Changes
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default VideoGallery;