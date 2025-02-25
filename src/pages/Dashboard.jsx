import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Edit2, Trash2, MoreVertical } from "lucide-react";
import GoogleMapFinder from "@/components/dashboard/GoogleMapFinder";

const UpdateDriverModal = ({ isOpen, onClose, driver, onUpdate }) => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    salary: "",
    transactionId: "",
    vehicleDetails: {
      make: "",
      model: "",
      year: "",
      color: "",
      RC: "",
      numberPlate: "",
      insuranceExpiry: "",
    },
  });

  useEffect(() => {
    const fetchDriverDetails = async () => {
      if (driver) {
        try {
          const response = await fetch(
            `https://dashtar-new.vercel.app/api/admin/getDriver/${driver}`
          );
          const result = await response.json();

          if (result.success) {
            const { data } = result;
            setFormData({
              fullName: data.fullName || "",
              contactNumber: data.contactNumber || "",
              email: data.email || "",
              salary: data.salary || "",
              transactionId: data.transactionId || "",
              vehicleDetails: {
                make: data.vehicleDetails?.make || "",
                model: data.vehicleDetails?.model || "",
                year: data.vehicleDetails?.year || "",
                color: data.vehicleDetails?.color || "",
                RC: data.vehicleDetails?.RC || "",
                numberPlate: data.vehicleDetails?.numberPlate || "",
                insuranceExpiry: data.vehicleDetails?.insuranceExpiry
                  ? data.vehicleDetails.insuranceExpiry.split("T")[0]
                  : "",
              },
            });
          }
        } catch (error) {
          console.error("Error fetching driver details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDriverDetails();
  }, [driver, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://dashtar-new.vercel.app/api/admin/updateDriver/${driver}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating driver:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Update Driver Details
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {/* X icon would go here */}
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="text-gray-500">Loading driver details...</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    value={formData.contactNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contactNumber: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salary
                  </label>
                  <input
                    type="number"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transaction ID
                  </label>
                  <input
                    type="text"
                    value={formData.transactionId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        transactionId: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">
                  Vehicle Details
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Make
                    </label>
                    <input
                      type="text"
                      value={formData.vehicleDetails.make}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          vehicleDetails: {
                            ...formData.vehicleDetails,
                            make: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {/* Other vehicle fields here (unchanged) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Model
                    </label>
                    <input
                      type="text"
                      value={formData.vehicleDetails.model}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          vehicleDetails: {
                            ...formData.vehicleDetails,
                            model: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year
                    </label>
                    <input
                      type="number"
                      value={formData.vehicleDetails.year}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          vehicleDetails: {
                            ...formData.vehicleDetails,
                            year: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color
                    </label>
                    <input
                      type="text"
                      value={formData.vehicleDetails.color}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          vehicleDetails: {
                            ...formData.vehicleDetails,
                            color: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      RC Number
                    </label>
                    <input
                      type="text"
                      value={formData.vehicleDetails.RC}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          vehicleDetails: {
                            ...formData.vehicleDetails,
                            RC: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number Plate
                    </label>
                    <input
                      type="text"
                      value={formData.vehicleDetails.numberPlate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          vehicleDetails: {
                            ...formData.vehicleDetails,
                            numberPlate: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Insurance Expiry
                    </label>
                    <input
                      type="date"
                      value={formData.vehicleDetails.insuranceExpiry}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          vehicleDetails: {
                            ...formData.vehicleDetails,
                            insuranceExpiry: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Update
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// StatCard component for displaying individual metrics
const StatCard = ({ title, value, unit, icon, percentage, color }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className={`w-8 h-8 ${color} rounded-full flex items-center justify-center`}>
          {icon}
        </div>
        <span className={`text-xs font-medium ${percentage.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
          {percentage}
        </span>
      </div>
      <div className="mt-2">
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs text-gray-500">{title}</div>
      </div>
    </div>
  );
};

// RevenueChart component
const RevenueChart = ({ revenueData }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-800">Revenue: ₹40,000</h3>
        <div className="flex gap-2">
          <select className="text-xs border rounded-md px-2 py-1 bg-white text-gray-600">
            <option>Month</option>
          </select>
          <button className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md">See All</button>
        </div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={revenueData} barGap={8}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Bar dataKey="value" fill="#4299E1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// DriversApplications component
const DriversApplications = ({ drivers }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-800">Drivers new applications</h3>
        <button className="text-xs text-blue-600">View All</button>
      </div>
      <div className="divide-y">
        <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 pb-2">
          <div>Profile</div>
          <div>Joined Date</div>
          <div>Status</div>
        </div>
        {drivers?.map((driver, index) => (
          <div key={index} className="grid grid-cols-3 gap-2 py-2 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                <img src="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png" alt={driver.name} />
              </div>
              <div>
                <div className="text-xs font-medium">{driver.name}</div>
                <div className="text-xs text-gray-500">{driver.phone}</div>
              </div>
            </div>
            <div className="text-xs text-gray-600">{driver.joinDate}</div>
            <div className="flex justify-between items-center">
              <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                {driver.status}
              </span>
              <button className="text-gray-400">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// DueCharges component
const DueCharges = ({ charges }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-800">Due Charges from drivers</h3>
        <button className="text-xs text-blue-600">View All</button>
      </div>
      <div className="divide-y">
        <div className="grid grid-cols-4 gap-2 text-xs text-gray-500 pb-2">
          <div>Profile</div>
          <div>Due Date</div>
          <div>Due Amount</div>
          <div>Total</div>
        </div>
        {charges.map((charge, index) => (
          <div key={index} className="grid grid-cols-4 gap-2 py-2 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                <img src="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png" alt={charge.name} />
              </div>
              <div>
                <div className="text-xs font-medium">{charge.name}</div>
                <div className="text-xs text-gray-500">{charge.phone}</div>
              </div>
            </div>
            <div className="text-xs text-gray-600">{charge.dueDate}</div>
            <div className="text-xs text-red-600">₹{charge.amount}</div>
            <div className="text-xs">{charge.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// TaxiLocationMap component
const TaxiLocationMap = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-800">Taxi Live Location</h3>
        <select className="text-xs border rounded-md px-2 py-1 bg-white text-gray-600">
          <option>Active drivers</option>
        </select>
      </div>
      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
       <GoogleMapFinder />
      </div>
    </div>
  );
};

// DriversDetails component
const DriversDetails = ({ drivers,setSelectedDriver,setIsUpdateModalOpen,handleDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-sm font-medium text-gray-800">Driver's Details</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left text-gray-500 font-medium">No.</th>
              <th className="px-4 py-2 text-left text-gray-500 font-medium">Name</th>
              <th className="px-4 py-2 text-left text-gray-500 font-medium">Join Date</th>
              <th className="px-4 py-2 text-left text-gray-500 font-medium">Vehicle Type</th>
              <th className="px-4 py-2 text-left text-gray-500 font-medium">Status</th>
              <th className="px-4 py-2 text-left text-gray-500 font-medium">Phone</th>
              <th className="px-4 py-2 text-left text-gray-500 font-medium">Vehicle Number</th>
              <th className="px-4 py-2 text-left text-gray-500 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {drivers?.map((driver, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{driver.no}</td>
                <td className="px-4 py-2 font-medium">{driver.name}</td>
                <td className="px-4 py-2 text-gray-500">{driver.joinDate}</td>
                <td className="px-4 py-2 text-gray-500">{driver.vehicleType}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs text-white ${
                    driver.status === "On Duty" ? "bg-green-500" : "bg-orange-500"
                  }`}>
                    {driver.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-500">{driver.phone}</td>
                <td className="px-4 py-2 text-gray-500">{driver.vehicleNumber}</td>
                <td className="px-4 py-2">
                 
                <div className="flex space-x-4">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit2
                      className="w-5 h-5"
                      onClick={() => {
                        setSelectedDriver(driver?.userId);
                        setIsUpdateModalOpen(true);
                      }}
                    />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-5 h-5" onClick={() => handleDelete(driver?.userId)} />
                  </button>
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};const OngoingTrips = ({ ongoingTripsData }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Ongoing":
        return "text-green-500";
      case "Booked":
        return "text-blue-500";
      case "Payment":
        return "text-orange-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b flex justify-between items-center">
        <h3 className="text-gray-800 font-semibold">Ongoing Trips</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <span className="text-gray-600">Payment pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-gray-600">Payment Paid</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-4 gap-4 px-4 py-2 text-sm text-gray-500">
          <div>Trip Id</div>
          <div>Trip Status</div>
          <div>Ride Type</div>
          <div>Fare</div>
        </div>
        <div className="space-y-2">
          {ongoingTripsData && ongoingTripsData.length > 0 ? (
            ongoingTripsData?.map((trip) => (
              <div
                key={trip.tripId}
                className="grid grid-cols-4 gap-4 px-4 py-3 text-sm items-center hover:bg-gray-50 rounded-lg"
              >
                <div className="font-medium text-gray-900">{trip.tripId}</div>
                <div className={getStatusColor(trip.tripStatus)}>
                  {trip.tripStatus}
                </div>
                <div className="text-gray-600">{trip.rideType}</div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{trip.fair}</span>
                  <button className="p-1 hover:bg-gray-100 rounded-full">
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center py-4">
              No ongoing trips
            </div>
          )}
        </div>
        <button className="w-full mt-4 text-center text-sm text-gray-600 hover:text-gray-900 py-2">
          See More
        </button>
      </div>
    </div>
  );
};
const SalaryStatus = ({
  setSelectedDriver,
  salaryStatus,
  setIsUpdateModalOpen,
  handleDelete
}) => {
  return (
    <div className="w-full bg-white">
      <table className="w-full min-w-full table-auto">
        <thead>
          <tr className="border-b">
            <th className="text-left py-4 px-6 text-gray-500 font-medium">
              Name
            </th>
            <th className="text-left py-4 px-6 text-gray-500 font-medium">
              Transaction ID
            </th>
            <th className="text-left py-4 px-6 text-gray-500 font-medium">
              Amount
            </th>
            <th className="text-left py-4 px-6 text-gray-500 font-medium">
              Status
            </th>
            <th className="text-left py-4 px-6 text-gray-500 font-medium">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {salaryStatus?.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="py-4 px-6 text-gray-900">{item.name}</td>
              <td className="py-4 px-6 text-gray-900">{item.transactionId}</td>
              <td className="py-4 px-6 text-gray-900">
                {item.amount !== undefined ? `₹${item.amount}` : ""}
              </td>
              <td className="py-4 px-6 text-gray-900">
                <span
                  className={`${
                    item.status === "On-Duty"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="py-4 px-6">
                <div className="flex space-x-4">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit2
                      className="w-5 h-5"
                      onClick={() => {
                        setSelectedDriver(item?.userId);
                        setIsUpdateModalOpen(true);
                      }}
                    />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-5 h-5" onClick={() => handleDelete(item?.userId)} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main Dashboard component
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  console.log(isUpdateModalOpen,'isUpdateModalOpen')
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sample data
  const statsData = [
    { 
      title: "Finished Trips", 
      value: "158", 
      unit: "trips", 
      icon: "🚕", 
      percentage: "+25%",
      color: "bg-blue-100" 
    },
    { 
      title: "New Users", 
      value: "237", 
      unit: "users", 
      icon: "👥", 
      percentage: "+15%",
      color: "bg-green-100" 
    },
    { 
      title: "Total Earnings", 
      value: "₹28,957", 
      unit: "", 
      icon: "💰", 
      percentage: "+20%",
      color: "bg-orange-100" 
    },
    { 
      title: "Cancelled Trips", 
      value: "17", 
      unit: "trips", 
      icon: "❌", 
      percentage: "-8%",
      color: "bg-red-100" 
    },
  ];



 // ... rest of your Dashboard code remains the same ...

  const fetchDashboard = async () => {
    try {
      const response = await fetch(
        "https://dashtar-new.vercel.app/api/admin/dashboard"
      );
      const data = await response.json();

      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };
 const handleDelete = async (id) => {
   if (window.confirm("Are you sure you want to delete this driver?")) {
     try {
       const response = await fetch(
         `https://dashtar-new.vercel.app/api/admin/deleteDriver/${id}`,
         {
           method: "DELETE",
         }
       );

       if (response.ok) {
       
         fetchDashboard();
         handleDriverUpdate();
       }
     } catch (error) {
       console.error("Error deleting driver:", error);
     }
   }
 };
  // Fetch the dashboard data from API
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          "https://dashtar-new.vercel.app/api/admin/dashboard"
        );
        const data = await response.json();

        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }



  // Generate dummy chart arrays based on API metrics (for demo purposes)
  const generateChartData = (value) => {
    return Array.from({ length: 12 }, (_, i) => ({
      name: `Week ${i + 1}`,
      value: value,
    }));
  };

  

  // Revenue dummy data (using totalRevenue from API)
  const revenueData = [
    { name: "Jan", value: 40 },
    { name: "Feb", value: 20 },
    { name: "Mar", value: 40 },
    { name: "Apr", value: 15 },
    { name: "May", value: 15 },
    { name: "Jun", value: 20 },
    { name: "Jul", value: 35 },
    { name: "Aug", value: 20 },
    { name: "Sep", value: 40 },
    { name: "Oct", value: 20 },
    { name: "Nov", value: 15 },
    { name: "Dec", value: 40 },
  ];

  // Ongoing Trips dummy data (if ongoingTrips > 0, create one dummy trip)
  const ongoingTripsData =
    dashboardData?.ongoingTrips > 0
      ? [
          {
            tripId: "#12345",
            tripStatus: "Ongoing",
            rideType: "Single",
            fair: `₹${dashboardData.totalEarnings}`,
          },
        ]
      : [];

  // Map driverDetails to table rows data
  const driversData = dashboardData?.driverDetails.map((driver, index) => ({
    no: index + 1,
    userId: driver?.userId,
    name: driver.name,
    joinDate: new Date(driver.createdAt).toLocaleDateString(),
    vehicleType: driver.vehicleDetails
      ? `${driver.vehicleDetails.make} ${driver.vehicleDetails.model}`
      : "N/A",
    status: driver.status === "on-duty" ? "Available" : "On Trip",
    phone: driver.contactNumber,
    vehicleNumber: driver.vehicleDetails
      ? driver.vehicleDetails.numberPlate
      : "N/A",
  }));

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    const colorClass =
      status === "Available"
        ? "bg-green-500"
        : status === "On Trip"
        ? "bg-orange-500"
        : "bg-gray-500";
    return `${baseClasses} ${colorClass} text-white`;
  };
    const defaultLocation = {
      latitude: 40.7128,
      longitude: -74.006,
    };

    const finishedTripsChart = generateChartData(dashboardData?.finishedTrips);
  const newUsersChart = generateChartData(dashboardData?.newUsers?.length);
  const totalEarningsChart = generateChartData(dashboardData?.totalEarnings);
  const cancelledTripsChart = generateChartData(dashboardData?.cancelledTrips);
  const handleDriverUpdate = () => {
    // Logic to handle driver update
    console.log("Driver updated");
  };  const chargesData = [
    { 
      name: "John Brickley", 
      phone: "+1 (234) 567-890", 
      dueDate: "21 June, 2023", 
      amount: "3,000", 
      status: "Partly Done" 
    },
  
  ];

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-xl font-medium mb-2">Dashboard</h1>
        <div className="flex justify-end mb-4">
          <div className="bg-white rounded-full px-3 py-1 text-xs flex items-center gap-2 shadow-sm">
            <span>Total Trip Changes: 703</span>
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            unit={stat.unit}
            icon={stat.icon}
            percentage={stat.percentage}
            color={stat.color}
          />
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="mb-6">
        <RevenueChart revenueData={revenueData} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
  <div className="space-y-12 w-full">
    <OngoingTrips ongoingTripsData={ongoingTripsData} />
  </div>
</div>


          {/* Drivers Table */}
          <div className="bg-white rounded-xl shadow-sm mb-4">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Driver's Details
            </h2>
            <button className="text-blue-600 text-sm font-medium">
              View all
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  No.
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Join Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Vehicle Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Vehicle Number
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {driversData?.map((driver) => (
                <tr key={driver.no} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {driver.no}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {driver.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {driver.joinDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {driver.vehicleType}
                  </td>
                  <td className="px-6 py-4">
                    <span className={getStatusBadge(driver.status)}>
                      {driver.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {driver.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {driver.vehicleNumber}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-3">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit2
                          className="w-5 h-5"
                          onClick={() => {
                            setSelectedDriver(driver?.userId);
                            setIsUpdateModalOpen(true);
                          }}
                        />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2
                          className="w-5 h-5"
                          onClick={() => handleDelete(driver?.userId)}
                        />
                        {console.log(driver, "driverrrrr")}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Applications and Charges Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DriversApplications drivers={driversData} />
        <DueCharges charges={chargesData} />
      </div>

      {/* Map */}
      <div className="mb-6">
        <TaxiLocationMap />
      </div>

      {/* Drivers Table */}
      <div className="mb-6">
        <DriversDetails drivers={driversData} setSelectedDriver={setSelectedDriver} setIsUpdateModalOpen={setIsUpdateModalOpen} handleDelete={handleDelete} />
      </div>

      {/* Update Driver Modal */}
      <UpdateDriverModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        driver={selectedDriver}
        onUpdate={handleDriverUpdate}
        setSelectedDriver={setSelectedDriver}
      />
    </div>
  );
};

export default Dashboard;