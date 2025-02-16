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
    {id: 3, name: "e-Commerce", icon: ShoppingBag, path: "/ecommerce" },
  ];

  return (
    <div className="flex flex-col h-full w-60 bg-white border-r">
      {/* User Profile Section */}
      <div className="flex items-center space-x-3 p-4 mb-6">
        <img
          src="https://s3-alpha-sig.figma.com/img/458f/cf69/7ebbf5216334db17ee5d543d365444df?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iD4CTjXliBbD-GB0b8bEyDNKGd8JUpmZnOmAlzxU~PTKYbm1SjjvCzprrhzFpSMbcEzNpCC54jFtt5p~nchqrziBqZJHypEok5x-W4WYZZxpo2-4MQaxrAb2weAIapHjVEVtqQnJpY2l42I24~Ql1LCuEtyBRizABNGLifhyP6re1KaeYEIT4T1hIbQsuqUTLRMwpwBKhMYCIA9WjpM7abTEqH1fbze8DeJRdZN7RY98QZhG71s-U5Z-6xePLojn-kc87AOUZOPGE2Z2XMAv4wNeqROczcOPAvtNSxCz0LcJGm93BwqyfgAbTLMmkoSJdq46PprjY8e2R-yqzTCDEQ__"
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
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
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
