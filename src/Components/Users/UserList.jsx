









import { useState, useEffect } from "react";
import BASE_URL from "../../ApiBaseUrl/BaseUrl";
import Swal from "sweetalert2";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);

  const itemsPerPage = 5;

  // Fetch initial data
  const fetchInitialUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}registrations`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to load initial data");
      const data = await response.json();
      setUsers(data);
      setTotalUsers(data.length);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch search results
  const fetchSearchResults = async (page = 1) => {
    setLoading(true);
    try {
      const url = new URL(`${BASE_URL}registrationssearch/search`);
      
      // Determine search type automatically
      if (searchQuery.includes("@")) {
        url.searchParams.append("email", searchQuery);
      } else if (/^[0-9+]+$/.test(searchQuery)) {
        url.searchParams.append("phone", searchQuery);
      } else {
        url.searchParams.append("name", searchQuery);
      }
      
      url.searchParams.append("page", page);
      url.searchParams.append("limit", itemsPerPage);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Search failed");
      
      const data = await response.json();
      setUsers(data.data || []);
      setTotalUsers(data.total || 0);
      setCurrentPage(page);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Main fetch function
  const fetchUsers = (page = 1) => {
    searchQuery ? fetchSearchResults(page) : fetchInitialUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchUsers(1);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery("");
    fetchInitialUsers();
  };

  // Delete user
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1e40af",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        // Using the correct delete URL from routes
        const response = await fetch(`${BASE_URL}registrationsdelete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Deletion failed");
        
        fetchUsers(currentPage);
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error!", "Failed to delete user.", "error");
      }
    }
  };

  // Pagination
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const currentItems = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="p-10 font-poppins">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-4xl font-semibold text-[#f16f22] pl-5">Register List</h3>
        <form onSubmit={handleSearchSubmit} className="max-w-md w-full pr-5">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by name, email or phone"
              className="flex-1 p-2 border rounded"
            />
            <button type="submit" className="bg-[#f16f22] text-white px-4 py-2 rounded">
              Search
            </button>
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </div>

      <table className="min-w-full border rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Phone</th>
            <th className="border p-2 text-left">Office</th>
            <th className="border p-2 text-left">Destination</th>
            <th className="border p-2 text-left">Test Status</th>
            <th className="border p-2 text-left">Funding</th>
            <th className="border p-2 text-left">Terms</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border p-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="border p-2">{`${user.first_name} ${user.last_name}`}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.phone}</td>
                <td className="border p-2">{user.nearest_office}</td>
                <td className="border p-2">{user.preferred_destination}</td>
                <td className="border p-2">{user.test_status}</td>
                <td className="border p-2">{user.funding_plan}</td>
                <td className="border p-2 text-center">
                  {user.agreed_to_terms ? "✔️" : "❌"}
                </td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-[#1e40af] text-white px-3 py-1 rounded hover:bg-blue-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center p-4 text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentPage(i + 1);
                fetchUsers(i + 1);
              }}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === i + 1
                  ? "bg-[#f16f22] text-white"
                  : "bg-gray-200 hover:bg-gray-300"
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

export default UserList;








