import React, { useState, useEffect, useRef } from "react";

const NewDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showOptionsMenu, setShowOptionsMenu] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState("2024");
  const menuRef = useRef(null);
  const itemsPerPage = 4;

  // Function to fetch driver data from the API
  useEffect(() => {
    const fetchDrivers = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://dashtar-new.vercel.app/api/driverRequest/get"
        );
        
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("API Response:", data);
        
        if (data && Array.isArray(data)) {
          // Transform API data to match our UI requirements
          const transformedData = data.map((driver, index) => ({
            id: driver._id || `driver-${index}`,
            name: driver.fullName || [
              "Brijraj Jiya",
              "Tony niger",
              "Tyler Ingrali",
              "Gotham Tyres"
            ][index % 4],
            joinDate: driver.createdAt 
              ? new Date(driver.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric'
                }).replace(/\//g, '/')
              : [
                "1/9/2016",
                "24/05/2017",
                "17/05/2018",
                "18/04/2016"
              ][index % 4],
            city: "Jaipur",
            age: "36",
            gender: "Male",
            language: "Hindi",
            aadharNumber: driver.aadharNumber || [
              "1234 5678 9012",
              "9876 5432 1098",
              "4567 8901 2345",
              "8765 0123 4567"
            ][index % 4],
            vehicleType: driver.vehicleDetails?.type || [
              "SUV",
              "SEDAN",
              "Crossover",
              "Coupe"
            ][index % 4],
            dlNumber: driver.drivingLicense?.number || "DL-1234-56780",
            phone: driver.contactNumber || "1234567890",
            vehicleLicense: driver.vehicleDetails?.licensePlate || "MH12 AB 1234",
            registrationNumber: driver.vehicleDetails?.registrationNumber || "MH12 2024 123456",
            bankAccountNumber: driver.bankDetails?.accountNumber || "1234567890",
            status: driver.status || "Pending",
            verified: driver.verified || true,
            actionType: index % 3 === 1 ? "Activate Account" : "View Profile" // Alternating action types
          }));
          
          setDrivers(transformedData);
          setTotalPages(Math.ceil(transformedData.length / itemsPerPage) || 1);
        } else {
          console.error("Unexpected API response structure:", data);
          // Fallback to sample data if API response is not as expected
          setDrivers(getSampleDrivers());
        }
      } catch (error) {
        console.error("Error fetching drivers:", error);
        // Fallback to sample data on error
        setDrivers(getSampleDrivers());
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, [selectedMonth, selectedYear]); // Refetch when month or year changes

  // Sample data function for fallback
  const getSampleDrivers = () => {
    return [
      {
        id: "driver-1",
        name: "Brijraj Jiya",
        joinDate: "1/9/2016",
        city: "Jaipur",
        age: "36",
        gender: "Male",
        language: "Hindi",
        aadharNumber: "1234 5678 9012",
        vehicleType: "SUV",
        dlNumber: "DL-1234-56780",
        phone: "1234567890",
        vehicleLicense: "MH12 AB 1234",
        registrationNumber: "MH12 2024 123456",
        bankAccountNumber: "1234567890",
        status: "Pending",
        verified: true,
        actionType: "View Profile"
      },
      {
        id: "driver-2",
        name: "Tony niger",
        joinDate: "24/05/2017",
        city: "Jaipur",
        age: "36",
        gender: "Male",
        language: "Hindi",
        aadharNumber: "9876 5432 1098",
        vehicleType: "SEDAN",
        dlNumber: "DL-1234-56780",
        phone: "1234567890",
        vehicleLicense: "MH12 AB 1234",
        registrationNumber: "MH12 2024 123456",
        bankAccountNumber: "1234567890",
        status: "Pending",
        verified: true,
        actionType: "Activate Account"
      },
      {
        id: "driver-3",
        name: "Tyler Ingrali",
        joinDate: "17/05/2018",
        city: "Jaipur",
        age: "36",
        gender: "Male",
        language: "Hindi",
        aadharNumber: "4567 8901 2345",
        vehicleType: "Crossover",
        dlNumber: "DL-1234-56780",
        phone: "1234567890",
        vehicleLicense: "MH12 AB 1234",
        registrationNumber: "MH12 2024 123456",
        bankAccountNumber: "1234567890",
        status: "Pending",
        verified: true,
        actionType: "View Profile"
      },
      {
        id: "driver-4",
        name: "Gotham Tyres",
        joinDate: "18/04/2016",
        city: "Jaipur",
        age: "36",
        gender: "Male",
        language: "Hindi",
        aadharNumber: "8765 0123 4567",
        vehicleType: "Coupe",
        dlNumber: "DL-1234-56780",
        phone: "1234567890",
        vehicleLicense: "MH12 AB 1234",
        registrationNumber: "MH12 2024 123456",
        bankAccountNumber: "1234567890",
        status: "Pending",
        verified: true,
        actionType: "View Profile"
      }
    ];
  };

  // Calculate pagination details
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  // Filter drivers based on search text
  const filteredDrivers = drivers.filter(driver => 
    driver.name.toLowerCase().includes(searchText.toLowerCase()) ||
    driver.phone.includes(searchText) ||
    driver.vehicleLicense.toLowerCase().includes(searchText.toLowerCase())
  );
  
  const currentDrivers = filteredDrivers.slice(startIndex, endIndex);

  // Toggle options menu
  const toggleOptionsMenu = (driverId, e) => {
    e.stopPropagation();
    setShowOptionsMenu(showOptionsMenu === driverId ? null : driverId);
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

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handle month and year selection
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  // Generate pagination
  // const renderPagination = () => {
  //   return (
  //     <div className="flex items-center mt-4">
  //       <button 
  //         className="w-8 h-8 flex items-center justify-center border rounded text-sm text-gray-500"
  //         onClick={() => handlePageChange(currentPage - 1)}
  //         disabled={currentPage === 1}
  //       >
  //         &lt;
  //       </button>
  //       <div className="mx-1 px-4">
  //         <input 
  //           type="text" 
  //           className="w-36 h-8 text-sm text-center border rounded" 
  //           value={searchText}
  //           onChange={(e) => setSearchText(e.target.value)}
  //           placeholder="Search..." 
  //         />
  //       </div>
  //       <button 
  //         className="w-8 h-8 flex items-center justify-center border rounded text-sm text-gray-500"
  //         onClick={() => handlePageChange(currentPage + 1)}
  //         disabled={currentPage === totalPages}
  //       >
  //         &gt;
  //       </button>
  //     </div>
  //   );
  // };

  // Month options for dropdown
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Year options for dropdown
  const years = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016"];

  if (loading) {
    return <div className="p-4 flex justify-center items-center">Loading drivers...</div>;
  }

  return (
    <div className="p-4 bg-white">
      <h2 className="text-sm font-medium mb-4">New Driver's Applications</h2>
      
      <div className="bg-white rounded-lg mb-4">
        <div className="flex justify-between items-center mb-4 mt-2">
          <div className="text-xs font-medium">Driver's Details</div>
          <div className="flex">
            <div className="relative mr-2">
              <select 
                className="text-xs px-3 py-1 border rounded appearance-none bg-white"
                value={selectedMonth}
                onChange={handleMonthChange}
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-1 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <select 
                className="text-xs px-3 py-1 border rounded appearance-none bg-white"
                value={selectedYear}
                onChange={handleYearChange}
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-1 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto border-t border-b">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-2 text-left font-medium text-gray-600">No.</th>
                <th className="py-2 px-2 text-left font-medium text-gray-600">Name</th>
                <th className="py-2 px-2 text-left font-medium text-gray-600">Join Date</th>
                <th className="py-2 px-2 text-left font-medium text-gray-600">City</th>
                <th className="py-2 px-2 text-left font-medium text-gray-600">Age</th>
                <th className="py-2 px-2 text-left font-medium text-gray-600">Gender</th>
                <th className="py-2 px-2 text-left font-medium text-gray-600">Language</th>
                <th className="py-2 px-2 text-left font-medium text-gray-600">Aadhar Number</th>
                <th className="py-2 px-2 text-left font-medium text-gray-600">Vehicle Type</th>
                <th className="py-2 px-2 text-left font-medium text-gray-600">DL Number</th>
                <th className="py-2 px-2 text-left font-medium text-gray-600">Phone</th>
                <th className="py-2 px-2 text-left font-medium text-gray-600">Vehicle License plate number</th>
                <th className="py-2 px-2 text-left font-medium text-gray-600">Registration number</th>
                <th className="py-2 px-2 text-left font-medium text-gray-600">Bank Account Number</th>
                <th className="py-2 px-2 text-left font-medium text-gray-600">Status</th>
                <th className="py-2 px-2 text-center font-medium text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {currentDrivers.length > 0 ? (
                currentDrivers.map((driver, index) => (
                  <tr key={driver.id} className="border-b">
                    <td className="py-3 px-2">{startIndex + index + 1}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center">
                        {driver.name}
                        {driver.verified && (
                          <span className="ml-1 w-2 h-2 bg-orange-500 rounded-full"></span>
                        )}
                      </div>
                      <div className="text-xs text-blue-500">{driver.actionType}</div>
                    </td>
                    <td className="py-3 px-2">{driver.joinDate}</td>
                    <td className="py-3 px-2">{driver.city}</td>
                    <td className="py-3 px-2">{driver.age}</td>
                    <td className="py-3 px-2">{driver.gender}</td>
                    <td className="py-3 px-2">{driver.language}</td>
                    <td className="py-3 px-2">{driver.aadharNumber}</td>
                    <td className="py-3 px-2">{driver.vehicleType}</td>
                    <td className="py-3 px-2">{driver.dlNumber}</td>
                    <td className="py-3 px-2">{driver.phone}</td>
                    <td className="py-3 px-2">{driver.vehicleLicense}</td>
                    <td className="py-3 px-2">{driver.registrationNumber}</td>
                    <td className="py-3 px-2">{driver.bankAccountNumber}</td>
                    <td className="py-3 px-2">
                      <span className="text-orange-500">
                        {driver.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 relative">
                      <button 
                        className="text-gray-400 hover:text-gray-600"
                        onClick={(e) => toggleOptionsMenu(driver.id, e)}
                      >
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                          <circle cx="2" cy="8" r="1.5" />
                          <circle cx="8" cy="8" r="1.5" />
                          <circle cx="14" cy="8" r="1.5" />
                        </svg>
                      </button>
                      {showOptionsMenu === driver.id && (
                        <div 
                          ref={menuRef}
                          className="absolute z-10 right-0 top-full mt-1 w-32 bg-white rounded-md shadow-lg py-1 text-xs"
                        >
                          <a href="/update-profile" className="block px-3 py-1 text-gray-700 hover:bg-gray-100">
                            View Profile
                          </a>
                          <a href="#" className="block px-3 py-1 text-gray-700 hover:bg-gray-100">
                            Activate Account
                          </a>
                          <a href="#" className="block px-3 py-1 text-gray-700 hover:bg-gray-100">
                            Delete Application
                          </a>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="16" className="py-4 text-center text-gray-500">
                    No drivers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* {renderPagination()} */}
    </div>
  );
};

export default NewDrivers;