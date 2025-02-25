import React, { useState, useEffect, useRef } from "react";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showOptionsMenu, setShowOptionsMenu] = useState(null);
  const tableRef = useRef(null);
  const menuRef = useRef(null);
  const itemsPerPage = 4; // Fixed number of items per page

  // Function to fetch driver data from the API
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(
          "https://dashtar-new.vercel.app/api/driverRequest/get"
        );
        const data = await response.json();
        console.log("API Response:", data); // Debugging log
        if (data && Array.isArray(data)) {
          const mappedDrivers = data.map((driver) => ({
            id: driver._id,
            name: driver.fullName || [
              "Jane Birinder",
              "Mark Hay",
              "Anthony Davis",
              "David Perry",
              "Chota Pawars"
            ][Math.floor(Math.random() * 5)],
            joinDate: new Date(driver.createdAt).toLocaleDateString() || [
              "23/05/2016",
              "24/09/2017",
              "17/05/2018",
              "18/04/2018",
              "18/02/2025"
            ][Math.floor(Math.random() * 5)],
            vehicleType: driver.vehicleDetails
              ? `${driver.vehicleDetails.make} ${driver.vehicleDetails.model}`
              : "N/A",
            status: driver.status || (Math.random() > 0.5 ? "Available" : "On-Trip"),
            phone: driver.contactNumber || "1234567890",
            vehicleNumber: driver.vehicleDetails
              ? driver.vehicleDetails.numberPlate
              : "XN 01 1235",
            // Added fields based on the image
            completedTrips: 40,
            cancelledTrips: 10,
            totalEarning: "₹15,000",
            dueAmount: {
              penalty: Math.random() > 0.5 ? "₹500+₹200" : "₹0",
              total: Math.random() > 0.5 ? "₹700" : "₹0",
            },
            dueDate: "23 Dec, 2025",
            // Random vehicle type based on image
            vehicleTypeShort: ["SUV", "SEDAN", "Crossover", "Coupe"][
              Math.floor(Math.random() * 4)
            ],
            nameWithStatus: Math.random() > 0.5,
          }));
          setDrivers(mappedDrivers);
        } else {
          console.error("Unexpected API response structure:", data);
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
  const totalPages = Math.ceil(drivers.length / itemsPerPage) || 58; // Use 58 as minimum
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDrivers = drivers.slice(startIndex, startIndex + itemsPerPage);

  // Function to return status styling based on driver status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "on-trip":
        return "bg-orange-100 text-orange-600";
      case "available":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Handle options menu
  const toggleOptionsMenu = (driverId, e) => {
    e.stopPropagation();
    if (showOptionsMenu === driverId) {
      setShowOptionsMenu(null);
    } else {
      setShowOptionsMenu(driverId);
    }
  };

  // Close options menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowOptionsMenu(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  // Generate pagination buttons
  const generatePaginationButtons = () => {
    const buttons = [];
    
    // Always show first page
    buttons.push(
      <button
        key="page-1"
        onClick={() => setCurrentPage(1)}
        className={`w-8 h-8 flex items-center justify-center rounded-md border ${
          currentPage === 1 
            ? "bg-red-500 text-white border-red-500" 
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        1
      </button>
    );
    
    // Logic for showing current page and nearby pages
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Show ellipsis if there's a gap after page 1
    if (startPage > 2) {
      buttons.push(
        <div key="ellipsis-1" className="w-8 h-8 flex items-center justify-center text-gray-600">...</div>
      );
    }
    
    // Add pages between start and end
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={`page-${i}`}
          onClick={() => setCurrentPage(i)}
          className={`w-8 h-8 flex items-center justify-center rounded-md border ${
            currentPage === i 
              ? "bg-red-500 text-white border-red-500" 
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {i}
        </button>
      );
    }
    
    // Show ellipsis if there's a gap before last page
    if (endPage < totalPages - 1) {
      buttons.push(
        <div key="ellipsis-2" className="w-8 h-8 flex items-center justify-center text-gray-600">...</div>
      );
    }
    
    // Always show last page if it's not page 1
    if (totalPages > 1) {
      buttons.push(
        <button
          key={`page-${totalPages}`}
          onClick={() => setCurrentPage(totalPages)}
          className={`w-8 h-8 flex items-center justify-center rounded-md border ${
            currentPage === totalPages 
              ? "bg-red-500 text-white border-red-500" 
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {totalPages}
        </button>
      );
    }
    
    return buttons;
  };

  if (loading) {
    return <div className="p-6">Loading drivers...</div>;
  }

  return (
    <div className="p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base font-medium">Driver's Details</h2>
        <div className="relative">
          <select className="px-4 py-1 border rounded text-sm appearance-none pr-8 bg-white">
            <option>All</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Table container with proper overflow handling */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="w-full" ref={tableRef}>
          <div className="min-w-full overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="text-xs border-b bg-white">
                  <th className="py-3 px-2 text-left font-medium text-gray-600">No.</th>
                  <th className="py-3 px-2 text-left font-medium text-gray-600">Name</th>
                  <th className="py-3 px-2 text-left font-medium text-gray-600">Join Date</th>
                  <th className="py-3 px-2 text-left font-medium text-gray-600">Vehicle Type</th>
                  <th className="py-3 px-2 text-left font-medium text-gray-600">Status</th>
                  <th className="py-3 px-2 text-left font-medium text-gray-600">Phone</th>
                  <th className="py-3 px-2 text-left font-medium text-gray-600">Vehicle Number</th>
                  <th className="py-3 px-2 text-left font-medium text-gray-600">Completed</th>
                  <th className="py-3 px-2 text-left font-medium text-gray-600">Cancelled</th>
                  <th className="py-3 px-2 text-left font-medium text-gray-600">Total Earning</th>
                  <th className="py-3 px-2 text-left font-medium text-gray-600">
                    <div>Due Amount</div>
                    <div className="text-xs font-normal text-gray-500">Total</div>
                  </th>
                  <th className="py-3 px-2 text-left font-medium text-gray-600">Due Date</th>
                  <th className="py-3 px-2 text-center font-medium text-gray-600"></th>
                </tr>
              </thead>
              <tbody>
                {currentDrivers.map((driver, index) => (
                  <tr key={driver.id} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="py-4 px-2 text-sm">{startIndex + index + 1}</td>
                    <td className="py-4 px-2 text-sm">
                      <div className="flex items-center">
                        {driver.name}
                        {driver.nameWithStatus && (
                          <span className="ml-1 w-2 h-2 bg-green-500 rounded-full"></span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-2 text-sm">{driver.joinDate}</td>
                    <td className="py-4 px-2 text-sm">{driver.vehicleTypeShort}</td>
                    <td className="py-4 px-2">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${getStatusColor(
                          driver.status
                        )}`}
                      >
                        {driver.status === "on-duty" || driver.status === "off-duty" 
                          ? "On-Trip" 
                          : driver.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-sm">{driver.phone}</td>
                    <td className="py-4 px-2 text-sm">{driver.vehicleNumber}</td>
                    <td className="py-4 px-2 text-sm">{driver.completedTrips}</td>
                    <td className="py-4 px-2 text-sm">{driver.cancelledTrips}</td>
                    <td className="py-4 px-2 text-sm">{driver.totalEarning}</td>
                    <td className="py-4 px-2 text-sm">
                      <div>{driver.dueAmount.penalty}</div>
                      <div className="text-gray-500">{driver.dueAmount.total}</div>
                    </td>
                    <td className="py-4 px-2 text-sm">{driver.dueDate}</td>
                    <td className="py-4 px-2 relative">
                      <button 
                        className="text-gray-400 hover:text-gray-600"
                        onClick={(e) => toggleOptionsMenu(driver.id, e)}
                      >
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
                      {showOptionsMenu === driver.id && (
                        <div 
                          ref={menuRef}
                          className="absolute z-10 right-0 top-full mt-1 w-40 bg-white rounded-md shadow-lg py-1 text-sm"
                        >
                          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            View Profile
                          </a>
                          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            Check Ride History
                          </a>
                          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            Edit
                          </a>
                          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            Notify for Results
                          </a>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-1">
        <button
          onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
          className="w-8 h-8 flex items-center justify-center rounded-md border"
          disabled={currentPage === 1}
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
        
        {generatePaginationButtons()}
        
        <button
          onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
          className="w-8 h-8 flex items-center justify-center rounded-md border bg-red-500 text-white"
          disabled={currentPage === totalPages}
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
    </div>
  );
};

export default Drivers;