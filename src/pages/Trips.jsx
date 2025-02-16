import React, { useState, useEffect } from "react";

const Trips = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Fetch rides from the API on component mount
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await fetch(
          "http://localhost:5055/api/rideRequest/getAllRides"
        );
        const data = await response.json();
        if (data.success) {
          // Map the API response to the structure needed by your component
          const mappedRides = data.rides.map((ride, index) => ({
            id: ride._id, // using _id as a unique identifier
            pickup: ride.pickupAddress,
            drop: ride.dropoffAddress,
            date: new Date(ride.requestTime).toLocaleDateString(),
            vehicleType: ride.rideType || "N/A",
            driverName: ride.name || "N/A",
            phone: ride.phone || "N/A", // if phone is not available, set a default
            fare: `₹${ride.fare}`,
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

  // Pagination button component
  const PaginationButton = ({ children, active, onClick }) => (
    <button
      onClick={onClick}
      className={`w-8 h-8 flex items-center justify-center rounded ${
        active ? "bg-red-600 text-white" : "hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );

  // Mobile card view for each trip
  const MobileCard = ({ trip }) => (
    <div className="bg-white p-4 rounded-lg border mb-4 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <span className="font-semibold">#{trip.id}</span>
        <button className="p-1 hover:bg-gray-100 rounded">
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
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="text-sm">{trip.pickup}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span className="text-sm">{trip.drop}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-gray-500">Date</p>
          <p>{trip.date}</p>
        </div>
        <div>
          <p className="text-gray-500">Vehicle</p>
          <p>{trip.vehicleType}</p>
        </div>
        <div>
          <p className="text-gray-500">Driver</p>
          <p>{trip.driverName}</p>
        </div>
        <div>
          <p className="text-gray-500">Phone</p>
          <p>{trip.phone}</p>
        </div>
        <div>
          <p className="text-gray-500">Fare</p>
          <p>{trip.fare}</p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <div className="p-4">Loading rides...</div>;
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
        <h2 className="text-xl font-semibold">Trip's Details</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <select className="px-3 py-1 border rounded text-sm flex-1 sm:flex-none">
            <option>January</option>
          </select>
          <select className="px-3 py-1 border rounded text-sm flex-1 sm:flex-none">
            <option>2024</option>
          </select>
        </div>
      </div>

      {/* Table for medium and large screens */}
      <div className="hidden md:block overflow-x-auto shadow-md rounded-lg bg-white p-3">
        <div className="min-w-[800px]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-4 px-2 text-left font-semibold">No.</th>
                <th className="py-4 px-4 text-left font-semibold">Trip</th>
                <th className="py-4 px-4 text-left font-semibold">Trip Date</th>
                <th className="py-4 px-4 text-left font-semibold">
                  Vehicle Type
                </th>
                <th className="py-4 px-4 text-left font-semibold">
                  Driver Name
                </th>
                <th className="py-4 px-4 text-left font-semibold">Phone</th>
                <th className="py-4 px-4 text-left font-semibold">Trip Fare</th>
                <th className="py-4 px-2 text-left font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {currentRides.map((trip, idx) => (
                <tr key={trip.id} className="border-b">
                  <td className="py-4 px-2">
                    {(currentPage - 1) * itemsPerPage + idx + 1}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span>{trip.pickup}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span>{trip.drop}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">{trip.date}</td>
                  <td className="py-4 px-4">{trip.vehicleType}</td>
                  <td className="py-4 px-4">{trip.driverName}</td>
                  <td className="py-4 px-4">{trip.phone}</td>
                  <td className="py-4 px-4">{trip.fare}</td>
                  <td className="py-4 px-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden">
        {currentRides.map((trip) => (
          <MobileCard key={trip.id} trip={trip} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1 sm:gap-2 mt-6 overflow-x-auto py-2">
          <button
            onClick={() =>
              setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
            }
            className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-50"
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
            className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-50"
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

export default Trips;
