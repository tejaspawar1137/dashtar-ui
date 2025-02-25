import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Grid, Car, Users, ShoppingBag } from "lucide-react";

const SidebarContent = () => {
  const { t } = useTranslation();
const [index, setIndex] = useState(0)
  const sidebarItems = [
    {id: 0, name: "Dashboard", icon: Grid, path: "/dashboard" },
    {id: 1, name: "Trips", icon: Car, path: "/trips" },
    {id: 2, name: "Drivers", icon: Users, path: "/drivers" },
    {id: 3, name: "New Drivers", icon: Users, path: "/new-drivers" },
    {id: 4, name: "e-Commerce", icon: ShoppingBag, path: "/ecommerce" },
  ];

  return (
    <div className="flex flex-col h-full w-60 bg-white border-r">
      {/* User Profile Section */}
      <div className="flex items-center space-x-3 p-4 mb-6">
        <img
          src="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-gray-700  font-medium text-lg ">Marria</span>
          <span className="text-gray-500 text-lg">View profile</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1">
        <ul className="space-y-3 py-2">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <NavLink
                onClick={() => setIndex(item.id)}
                to={item.path}
                className={`flex items-center px-6 py-3 text-sm transition-colors ${
                  index === item.id
                    ? "text-white" // Keep text white for better contrast
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                style={{
                  backgroundColor: index === item.id ? "rgba(219, 64, 60, 1)" : "transparent",
                }}
                
              >
                <item.icon className="w-5 h-5 mr-4 text-lg" />
                <span className="text-lg">{t(item.name)}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SidebarContent;
