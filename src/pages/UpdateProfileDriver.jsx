import React from 'react'
import { ArrowRight, Home, Trash, Upload } from "lucide-react"

const DriverProfileDashboard = () => {
  return (
    <div className="w-full font-sans p-4">
      {/* Header with back button and actions */}
      <div className="flex items-center justify-between mb-4">
        <button className="p-2 rounded-full bg-gray-200 flex items-center" onClick={() => window.location.href = "/new-drivers"}>
          <Home className="w-4 h-4 mr-2" /> Back
        </button>
        
        <div className="flex items-center">
          <div className="flex flex-col items-center mr-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              <img src="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-medium">Brink Janz</span>
            <span className="text-xs text-gray-500">Personal Profile</span>
            <span className="text-xs text-gray-500">Joined: 23 June, 2023</span>
          </div>
          
          <div className="flex space-x-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded">Activate</button>
            <button className="p-2 border border-gray-300 rounded flex items-center">
              <Upload className="w-4 h-4" />
            </button>
            <button className="p-2 border border-gray-300 rounded bg-red-100 text-red-600 flex items-center">
              <Trash className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-orange-100 rounded p-4">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm">IGSA 10% Charges</div>
            <div className="text-sm text-gray-500">₹0</div>
          </div>
          <div className="text-2xl font-bold">₹0</div>
        </div>
        
        <div className="bg-red-200 rounded p-4">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm">Penalty</div>
            <div className="text-sm text-gray-500">₹0</div>
          </div>
          <div className="text-2xl font-bold">₹0</div>
        </div>
        
        <div className="bg-black rounded p-4 text-white">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm">Total Due</div>
            <div className="text-sm text-gray-400">₹0</div>
          </div>
          <div className="text-2xl font-bold">₹0</div>
          <div className="text-xs text-gray-400">Due Date: 23 Dec, 2020</div>
          <button className="mt-2 bg-gray-600 text-white px-4 py-2 rounded">Notify Driver</button>
        </div>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded p-4 border border-gray-200">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm">Completed Trips</div>
            <div className="text-sm text-gray-500">0</div>
          </div>
          <div className="text-2xl font-bold">0</div>
        </div>
        
        <div className="bg-white rounded p-4 border border-gray-200">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm">Cancelled Trips</div>
            <div className="text-sm text-gray-500">0</div>
          </div>
          <div className="text-2xl font-bold">0</div>
        </div>
        
        <div className="bg-white rounded p-4 border border-gray-200">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm">Total Earnings</div>
            <div className="text-sm text-gray-500">₹0</div>
          </div>
          <div className="text-2xl font-bold">₹0</div>
        </div>
      </div>
      
      {/* Personal Details Section */}
      <div className="mb-6">
        <h3 className="text-red-500 text-sm font-medium mb-2">Personal Details</h3>
        <div className="bg-white rounded p-4 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-gray-500 block">DOB</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200">5 Oct, 1980</div>
            </div>
            <div>
              <label className="text-xs text-gray-500 block">Age</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200">36</div>
            </div>
            <div>
              <label className="text-xs text-gray-500 block">Gender</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200">Male</div>
            </div>
            
            <div>
              <label className="text-xs text-gray-500 block">Email</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200">example@gmail.com</div>
            </div>
            <div>
              <label className="text-xs text-gray-500 block">Language</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200">Hindi</div>
            </div>
            <div>
              <label className="text-xs text-gray-500 block">Address</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200">101, Pink Square Mall, Raja Park, Jaipur, Rajasthan - 302004</div>
            </div>
            
            <div>
              <label className="text-xs text-gray-500 block">Mobile</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200">8416481352</div>
            </div>
            <div>
              <label className="text-xs text-gray-500 block">City</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200">Jaipur</div>
            </div>
            
            <div>
              <label className="text-xs text-gray-500 block">Aadhar Number</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200">1234 5678 9012</div>
            </div>
            
            <div>
              <label className="text-xs text-gray-500 block">Aadhar Front Image</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200 flex items-center">
                <span className="mr-2">Aadhar Front</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </div>
            </div>
            
            <div>
              <label className="text-xs text-gray-500 block">Aadhar Back Image</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200 flex items-center">
                <span className="mr-2">Aadhar Back</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </div>
            </div>
            
            <div>
              <label className="text-xs text-gray-500 block">PAN Number</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200">ABCDE1234F</div>
            </div>
            
            <div>
              <label className="text-xs text-gray-500 block">PAN Front Image</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200 flex items-center">
                <span className="mr-2">PAN Front</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </div>
            </div>
            
            <div>
              <label className="text-xs text-gray-500 block">PAN Back Image</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200 flex items-center">
                <span className="mr-2">PAN Back</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Vehicle Details Section */}
      <div className="mb-6">
        <h3 className="text-red-500 text-sm font-medium mb-2">Vehicle Details</h3>
        <div className="bg-white rounded p-4 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-gray-500 block">Vehicle Name and Model</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200">O VXI 1983</div>
            </div>
            <div>
              <label className="text-xs text-gray-500 block">License Plate Number</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200">MH12 AB 1234</div>
            </div>
            <div>
              <label className="text-xs text-gray-500 block">Vehicle Registration Number</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200">MH12 2024 123456</div>
            </div>
            
            <div>
              <label className="text-xs text-gray-500 block">Vehicle Registration Date</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200">23 Oct, 2024</div>
            </div>
            <div>
              <label className="text-xs text-gray-500 block">Registration Validity</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200">23 Oct, 2025</div>
            </div>
            <div>
              <label className="text-xs text-gray-500 block">Vehicle Taxi Type</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200">Diesel</div>
            </div>
            
            <div>
              <label className="text-xs text-gray-500 block">RC Front Image</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200 flex items-center">
                <span className="mr-2">RC Front</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </div>
            </div>
            
            <div>
              <label className="text-xs text-gray-500 block">RC Back Image</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200 flex items-center">
                <span className="mr-2">RC Back</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </div>
            </div>
            
            <div>
              <label className="text-xs text-gray-500 block">Vehicle RC Side Image</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200 flex items-center">
                <span className="mr-2">RC Side</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bank Details Section */}
      <div>
        <h3 className="text-red-500 text-sm font-medium mb-2">Bank Details</h3>
        <div className="bg-white rounded p-4 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-gray-500 block">Bank Account Number</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200">12345678902</div>
            </div>
            <div>
              <label className="text-xs text-gray-500 block">IFSC Code</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200">SBIN0001234</div>
            </div>
            <div>
              <label className="text-xs text-gray-500 block">UPI ID</label>
              <div className="text-sm p-2 bg-gray-50 rounded border border-gray-200">dummy@7630#1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DriverProfileDashboard