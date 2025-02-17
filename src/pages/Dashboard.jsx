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

// StatCard component for displaying individual metrics
const StatCard = ({
  title,
  value,
  unit,
  period,
  data,
  chartColor,
  chartType,
  percentage,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
            <span className="text-gray-500 text-sm ml-1">{unit}</span>
            {percentage && (
              <span
                className={`ml-2 text-sm font-medium ${
                  percentage.startsWith("+") ? "text-green-500" : "text-red-500"
                }`}
              >
                {percentage}
              </span>
            )}
          </div>
        </div>
        <select className="text-sm border rounded-md px-2 py-1 bg-white text-gray-600">
          <option>{period}</option>
        </select>
      </div>
      {data && data.length > 0 && (
        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <LineChart data={data}>
                <defs>
                  <linearGradient
                    id={`gradient-${title}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={chartColor}
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="100%"
                      stopColor={chartColor}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={chartColor}
                  strokeWidth={2}
                  dot={false}
                  fill={`url(#gradient-${title})`}
                />
              </LineChart>
            ) : (
              <BarChart data={data}>
                <Bar
                  dataKey="value"
                  fill={chartColor}
                  radius={[4, 4, 0, 0]}
                  fillOpacity={0.8}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

// RevenueChart component
const RevenueChart = ({ revenueData }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-800 font-semibold">Total Revenue</h3>
        <select className="text-sm border rounded-md px-2 py-1 bg-white text-gray-600">
          <option>This Month</option>
        </select>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={revenueData} barGap={8}>
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `₹${value}`} />
            <Tooltip formatter={(value) => `₹${value}`} />
            <Bar dataKey="Previous" fill="#E0E7FF" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Current" fill="#6366F1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#6366F1] rounded"></div>
          <span className="text-sm text-gray-600">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#E0E7FF] rounded"></div>
          <span className="text-sm text-gray-600">Previous</span>
        </div>
      </div>
    </div>
  );
};


// OngoingTrips component
const OngoingTrips = ({ ongoingTripsData }) => {
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

// SalaryStatus component

const SalaryStatus = ({ salaryStatus }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm w-full overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center">
        <h3 className="text-gray-800 font-semibold">Salary Status</h3>
      </div>
      <div className="p-4 overflow-x-auto">
        {/* Responsive Wrapper */}
        <div className="min-w-[600px] md:min-w-full">
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-5 gap-4 px-4 py-2 text-sm text-gray-500 border-b font-medium">
            <div>Name</div>
            <div>Transaction ID</div>
            <div>Amount</div>
            <div>Status</div>
            <div>Action</div>
          </div>

          <div className="space-y-2">
            {salaryStatus && salaryStatus.length > 0 ? (
              salaryStatus.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-5 gap-4 px-4 py-3 text-sm items-center hover:bg-gray-50 rounded-lg border md:border-none"
                >
                  {/* Mobile Layout */}
                  <div className="md:hidden text-gray-500">Name:</div>
                  <div className="text-gray-900 capitalize">{item.name}</div>

                  <div className="md:hidden text-gray-500">Transaction ID:</div>
                  <div className="text-gray-900">{item.transactionId}</div>

                  <div className="md:hidden text-gray-500">Amount:</div>
                  <div className="text-gray-900">
                    {item.amount !== undefined ? `₹${item.amount}` : "N/A"}
                  </div>

                  <div className="md:hidden text-gray-500">Status:</div>
                  <div className="text-gray-900 capitalize">{item.status}</div>

                  <div className="md:hidden text-gray-500">Action:</div>
                  <div className="flex space-x-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center py-4">No salary data</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};







// Main Dashboard component that fetches dynamic data
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const finishedTripsChart = generateChartData(dashboardData?.finishedTrips);
  const newUsersChart = generateChartData(dashboardData?.newUsers?.length);
  const totalEarningsChart = generateChartData(dashboardData?.totalEarnings);
  const cancelledTripsChart = generateChartData(dashboardData?.cancelledTrips);

  // Revenue dummy data (using totalRevenue from API)
  const revenueData = Array.from({ length: 6 }, (_, i) => ({
    name: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i],
    Previous: 0,
    Current:  dashboardData?.totalRevenue,
  }));

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
    name: driver.fullName,
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

  return (
    
    <div className="p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Stats Grid */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Taxi Live Location
          </h2>
          <select className="border rounded-md px-4 py-2 bg-white text-gray-600">
            <option>Active drivers</option>
          </select>
        </div>
        <div className="bg-white rounded-xl shadow-sm h-[300px] overflow-hidden">
          <GoogleMapFinder
            lattitude={defaultLocation.latitude}
            longitude={defaultLocation.longitude}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Finished Trips"
          value={dashboardData?.finishedTrips}
          unit="trips"
          period="Monthly"
          data={finishedTripsChart}
          chartColor="#3B82F6"
          chartType="line"
          percentage="+25%"
        />
        <StatCard
          title="New Users"
          value={dashboardData?.newUsers?.length}
          unit="users"
          period="Monthly"
          data={newUsersChart}
          chartColor="#10B981"
          chartType="line"
          percentage="+15%"
        />
        <StatCard
          title="Total Earnings"
          value={dashboardData?.totalEarnings}
          unit="USD"
          period="Weekly"
          data={totalEarningsChart}
          chartColor="#F59E0B"
          chartType="bar"
          percentage="+20%"
        />
        <StatCard
          title="Cancelled Trips"
          value={dashboardData?.cancelledTrips}
          unit="trips"
          period="Monthly"
          data={cancelledTripsChart}
          chartColor="#EF4444"
          chartType="line"
          percentage="-8%"
        />
      </div>

      {/* Revenue, Trips, and Salary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <RevenueChart revenueData={revenueData} />
        </div>
        <div className="space-y-6">
          <OngoingTrips ongoingTripsData={ongoingTripsData} />
        </div>
        <div className="lg:col-span-4">
          <SalaryStatus salaryStatus={dashboardData?.salaryStatus} />
        </div>
      </div>

      {/* Drivers Table */}
      <div className="bg-white rounded-xl shadow-sm">
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
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
