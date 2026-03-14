


import React, { useEffect, useState } from "react";
import BASE_URL from "../../ApiBaseUrl/BaseUrl";
import Swal from "sweetalert2";

const CountryList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}countryregister`);
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This registration will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1e40af",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const response = await fetch(`${BASE_URL}countryregister/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete user");

        setUsers((prev) => prev.filter((user) => user.id !== id));

        Swal.fire({
          title: "Deleted!",
          text: "Registration deleted successfully.",
          icon: "success",
          confirmButtonColor: "#1e40af",
        });
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete registration.",
          icon: "error",
          confirmButtonColor: "#1e40af",
        });
      }
    }
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = users.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-600 text-center">Error: {error}</div>;

  return (
    <div className="p-10 font-poppins">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-4xl font-semibold text-[#f16f22] pl-5">
          Country Register List
        </h3>
      </div>

      <table className="min-w-full border border-gray-300 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Country</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Universities</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500 italic">
                No registrations found.
              </td>
            </tr>
          ) : (
            currentItems.map((user, index) => (
              <tr key={user.id} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{startIndex + index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.country}</td>
                <td className="border border-gray-300 px-4 py-2">{user.universities}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-[#1e40af] hover:bg-blue-800 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === i + 1
                  ? "bg-[#f16f22] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryList;


