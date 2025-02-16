import React, { useState, useEffect } from "react";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Function to fetch driver data from the API
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(
          "https://dashtar-new.vercel.app/api/driverRequest/get"
        );
        const data = await response.json();
        if (data.success) {
          // Map the API response to the structure used in the table
          const mappedDrivers = data.data.map((driver) => ({
            id: driver._id,
            name: driver.fullName,
            joinDate: new Date(driver.createdAt).toLocaleDateString(),
            vehicleType: driver.vehicleDetails
              ? `${driver.vehicleDetails.make} ${driver.vehicleDetails.model}`
              : "N/A",
            status: driver.status,
            phone: driver.contactNumber,
            vehicleNumber: driver.vehicleDetails
              ? driver.vehicleDetails.numberPlate
              : "N/A",
          }));
          setDrivers(mappedDrivers);
        }
      } catch (error) {
        console.error("Error fetching drivers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  // Calculate pagination details
  const totalPages = Math.ceil(drivers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDrivers = drivers.slice(startIndex, startIndex + itemsPerPage);

  // Function to return status styling based on driver status
  const getStatusColor = (status) => {
    switch (status) {
      case "on-duty":
        return "bg-green-100 text-green-600";
      case "off-duty":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Pagination button component
  const PaginationButton = ({ children, active, onClick }) => (
    <button
      onClick={onClick}
      className={`w-8 h-8 flex items-center justify-center rounded ${
        active ? "bg-red-500 text-white" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );

  if (loading) {
    return <div className="p-6">Loading drivers...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base font-normal">Driver's Details</h2>
        <select className="px-4 py-1 border rounded text-sm">
          <option>All</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-sm border-b">
                <th className="py-4 px-6 text-left font-semibold">No.</th>
                <th className="py-4 px-6 text-left font-semibold">Name</th>
                <th className="py-4 px-6 text-left font-semibold">Join Date</th>
                <th className="py-4 px-6 text-left font-semibold">
                  Vehicle Type
                </th>
                <th className="py-4 px-6 text-left font-semibold">Status</th>
                <th className="py-4 px-6 text-left font-semibold">Phone</th>
                <th className="py-4 px-6 text-left font-semibold">
                  Vehicle Number
                </th>
                <th className="py-4 px-6 text-left font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {currentDrivers.map((driver, index) => (
                <tr key={driver.id} className="border-b last:border-b-0">
                  <td className="py-4 px-6 text-sm">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="py-4 px-6 text-sm">{driver.name}</td>
                  <td className="py-4 px-6 text-sm">{driver.joinDate}</td>
                  <td className="py-4 px-6 text-sm">{driver.vehicleType}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${getStatusColor(
                        driver.status
                      )}`}
                    >
                      {driver.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm">{driver.phone}</td>
                  <td className="py-4 px-6 text-sm">{driver.vehicleNumber}</td>
                  <td className="py-4 px-6">
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <circle cx="8" cy="2" r="1.5" />
                        <circle cx="8" cy="8" r="1.5" />
                        <circle cx="8" cy="14" r="1.5" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1 mt-6">
          <button
            onClick={() =>
              setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
            }
            className="w-8 h-8 flex items-center justify-center text-gray-600"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <PaginationButton
              key={num}
              active={currentPage === num}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </PaginationButton>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
            className="w-8 h-8 flex items-center justify-center text-gray-600"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Drivers;
