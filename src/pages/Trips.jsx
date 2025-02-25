import React, { useState, useEffect } from "react";

const Trips = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(null);
  const itemsPerPage = 4;

  // Fetch rides from the API on component mount
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await fetch(
          "https://dashtar-new.vercel.app/api/rideRequest/getAllRides"
        );
        const data = await response.json();
        if (data.success) {
          // Map the API response to the structure needed by your component
          const mappedRides = data.rides.map((ride) => ({
            id: ride._id, // using _id as a unique identifier
            pickup: ride.pickupAddress,
            drop: ride.dropoffAddress,
            date: new Date(ride.requestTime).toLocaleDateString(),
            vehicleType: ride.rideType || "SUV", // Default to SUV if not provided
            driverName: ride.name || "John Brinkley", // Default value
            phone: ride.phone || "1234567890", // Default value
            fare: `₹${ride.fare || "236"}`,
            paymentMethod: "Cash",
            gst: `₹${(ride.fare * 0.1).toFixed(1) || "23.6"}`, // Calculate GST as 10% of fare
            dueDate: "25 July, 2025", // Default value
          }));
          setRides(mappedRides);
        }
      } catch (error) {
        console.error("Error fetching rides:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  // Calculate pagination details
  const totalPages = Math.ceil(rides.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRides = rides.slice(startIndex, startIndex + itemsPerPage);

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = () => setMenuOpen(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Action menu component
  const ActionMenu = ({ id }) => (
    <div 
      className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="py-1">
        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Details
          </span>
        </button>
        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 15v2m0 0v2m0-2h2m-2 0H6" strokeLinecap="round" />
              <path d="M9 6v2m0 0v2m0-2h2m-2 0H4" strokeLinecap="round" />
              <path d="M12 19H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-3" />
            </svg>
            Edit Trip
          </span>
        </button>
        <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Delete Trip
          </span>
        </button>
      </div>
    </div>
  );

  // Pagination button component
  const PaginationButton = ({ children, active, onClick, disabled }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
        active 
          ? "bg-red-500 text-white" 
          : disabled 
            ? "border text-gray-300 cursor-not-allowed" 
            : "border text-gray-500 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );

  // Mobile card view for each trip
  const MobileCard = ({ trip, index }) => (
    <div className="bg-white p-4 rounded-lg border mb-4 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <span className="flex items-center justify-center w-6 h-6 mr-2 bg-gray-100 rounded-full text-xs font-medium text-gray-700">{index}</span>
          <span className="font-medium text-gray-800 text-sm">{trip.id.slice(0, 8)}...</span>
        </div>
        <div className="relative">
          <button 
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu(trip.id);
            }}
          >
            <svg
              className="w-5 h-5 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="6" r="1" />
              <circle cx="12" cy="18" r="1" />
            </svg>
          </button>
          {menuOpen === trip.id && <ActionMenu id={trip.id} />}
        </div>
      </div>

      <div className="space-y-3 mb-4 bg-gray-50 p-3 rounded-lg">
        <div className="flex items-start gap-2">
          <div className="mt-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Pickup Location</p>
            <p className="text-sm font-medium">{trip.pickup}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="mt-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Drop Location</p>
            <p className="text-sm font-medium">{trip.drop}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        <div>
          <p className="text-xs text-gray-500 mb-1">Date</p>
          <p className="font-medium">{trip.date}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Vehicle Type</p>
          <p className="font-medium">{trip.vehicleType}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Driver Name</p>
          <p className="font-medium">{trip.driverName}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Phone</p>
          <p className="font-medium">{trip.phone}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Trip Fare</p>
          <p className="font-medium text-green-600">{trip.fare}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Payment Method</p>
          <p className="font-medium">{trip.paymentMethod}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">GST/TAX Charges</p>
          <p className="font-medium">{trip.gst}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Due Date</p>
          <p className="font-medium">{trip.dueDate}</p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
          <p className="mt-3 text-gray-600">Loading trips data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-800">Trip's Details</h2>
          <div className="flex gap-3 w-full sm:w-auto">
            <select className="px-3 py-2 border rounded-lg text-sm flex-1 sm:flex-none bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all">
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
            </select>
            <select className="px-3 py-2 border rounded-lg text-sm flex-1 sm:flex-none bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all">
              <option>2024</option>
              <option>2025</option>
            </select>
          </div>
        </div>

        {/* Table for medium and large screens */}
        <div className="hidden md:block overflow-hidden rounded-lg bg-white shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50 border-b">
                <tr className="text-xs uppercase">
                  <th className="py-3 px-4 text-left font-medium text-gray-500">No.</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">Trip</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">Trip Date</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">Vehicle Type</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">Driver Name</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">Phone</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">Trip Fare</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">Payment Method</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">GST/TAX</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">Due Date</th>
                  <th className="py-3 px-4 text-center font-medium text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRides.map((trip, idx) => (
                  <tr key={trip.id} className="border-t hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium">
                      <span className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full text-xs">{idx + startIndex + 1}</span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start gap-2">
                          <div className="mt-1">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Pickup</p>
                            <p className="text-xs font-medium">{trip.pickup}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="mt-1">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Drop</p>
                            <p className="text-xs font-medium">{trip.drop}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium">{trip.date}</td>
                    <td className="py-3 px-4 text-sm font-medium">{trip.vehicleType}</td>
                    <td className="py-3 px-4 text-sm font-medium">{trip.driverName}</td>
                    <td className="py-3 px-4 text-sm font-medium">{trip.phone}</td>
                    <td className="py-3 px-4 text-sm font-medium text-green-600">{trip.fare}</td>
                    <td className="py-3 px-4 text-sm font-medium">{trip.paymentMethod}</td>
                    <td className="py-3 px-4 text-sm font-medium">{trip.gst}</td>
                    <td className="py-3 px-4 text-sm font-medium">{trip.dueDate}</td>
                    <td className="py-3 px-4 text-sm text-center relative">
                      <button
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMenu(trip.id);
                        }}
                      >
                        <svg
                          className="w-5 h-5 text-gray-500 inline-block"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="12" cy="6" r="1" />
                          <circle cx="12" cy="18" r="1" />
                        </svg>
                      </button>
                      {menuOpen === trip.id && <ActionMenu id={trip.id} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile card view */}
        <div className="md:hidden space-y-4">
          {currentRides.map((trip, idx) => (
            <MobileCard key={trip.id} trip={trip} index={idx + startIndex + 1} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-6 py-4">
          <PaginationButton
            onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
            disabled={currentPage === 1}
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </PaginationButton>
          
          {/* First page button */}
          <PaginationButton
            active={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            1
          </PaginationButton>
          
          {/* Middle pages */}
          {totalPages > 1 && (
            <>
              {currentPage > 3 && <span className="text-gray-500">...</span>}
              
              {Array.from(
                { length: Math.min(totalPages - 2, 3) },
                (_, i) => {
                  const pageNum = currentPage > 3 
                    ? currentPage - 1 + i 
                    : i + 2;
                  return pageNum <= totalPages && pageNum > 1 ? pageNum : null;
                }
              )
                .filter(Boolean)
                .map((num) => (
                  <PaginationButton
                    key={num}
                    active={currentPage === num}
                    onClick={() => setCurrentPage(num)}
                  >
                    {num}
                  </PaginationButton>
                ))}
              
              {currentPage < totalPages - 2 && <span className="text-gray-500">...</span>}
            </>
          )}
          
          {/* Last page button */}
          {totalPages > 1 && (
            <PaginationButton
              active={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </PaginationButton>
          )}
          
          <PaginationButton
            onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
            disabled={currentPage === totalPages}
            className={currentPage === totalPages ? "" : "bg-red-500 text-white"}
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </PaginationButton>
        </div>
      </div>
    </div>
  );
};

export default Trips;