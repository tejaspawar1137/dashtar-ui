import React, { useContext, useState } from "react";
import { Menu, Search, Bell } from "lucide-react";
import { SidebarContext } from "@/context/SidebarContext";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toggleSidebar } = useContext(SidebarContext);
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://s3-alpha-sig.figma.com/img/458f/cf69/7ebbf5216334db17ee5d543d365444df?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iD4CTjXliBbD-GB0b8bEyDNKGd8JUpmZnOmAlzxU~PTKYbm1SjjvCzprrhzFpSMbcEzNpCC54jFtt5p~nchqrziBqZJHypEok5x-W4WYZZxpo2-4MQaxrAb2weAIapHjVEVtqQnJpY2l42I24~Ql1LCuEtyBRizABNGLifhyP6re1KaeYEIT4T1hIbQsuqUTLRMwpwBKhMYCIA9WjpM7abTEqH1fbze8DeJRdZN7RY98QZhG71s-U5Z-6xePLojn-kc87AOUZOPGE2Z2XMAv4wNeqROczcOPAvtNSxCz0LcJGm93BwqyfgAbTLMmkoSJdq46PprjY8e2R-yqzTCDEQ__"
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />
          </div>

          {/* Menu Button */}
          <button
            className="p-2 hover:bg-gray-100 rounded-lg block md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="w-7 h-7 text-gray-700" />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-72 py-2.5 px-5 bg-gray-50 rounded-full text-base border-none focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2">
              <Search className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Notifications */}
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <Bell className="w-7 h-7 text-gray-700" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <button className="flex items-center">
            <img
              src="https://s3-alpha-sig.figma.com/img/1cd0/344c/9c94dc7b82f01ca03ff3ff2081edf1cf?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=e86IUCQHhTL1uGCMDRUw-IQDxM-Z2xAVmf6Wuw2Yq4mpfYoJMmfzsFSHFFglDcl67LGC-VX6zJBK64KA65h-V1-IQ3SCM9PnQLq~04mXFgquWv6RYC56rsOT9SGX7U3VBVayyI8wiBwp7b5Gm4zSGjA1jp0ATKP0-XGxV6PfO2E8pwTtSZ86i53shMEw1RG3vXlmjYERCIK02sWbSpy5031j4JKeY1N0VXe0rXi56k9EduZgPvOHaTY0GGm7OMghXD5DGu2EESmRtDsjUmZ9wxnEh2m-rHsjZAFE55d3oxTdRdc68lEqkMOevoAuYDAzdoJW1jKAxX-SFvN7agMy5w__"
              alt="Profile"
              className="w-9 h-9 rounded-full border border-gray-200"
            />
          </button>

          {/* More Options */}
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg
              className="w-7 h-7 text-gray-700"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
