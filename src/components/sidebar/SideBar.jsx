// app/components/sidebar/SideBar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems, toggleIcons } from "./menu";
import { FaHome } from "react-icons/fa";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export function SideBar({ isCollapsed, toggleSidebar }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // if (!mounted) return null; // or a placeholder

  const pathname = usePathname();
  const { isSignedIn, user: clerkUser, isLoaded } = useUser();
  console.log(clerkUser, isSignedIn, isLoaded);

  // Example user data
  const user = {
    name: clerkUser?.fullName || "John Doe",
    email: clerkUser?.primaryEmailAddress.emailAddress || "john@example.com",
    image: clerkUser?.imageUrl || "", // Replace with your image path
  };

  if(!mounted) return <></>; // Ensure the component is mounted before rendering

  return (
    <aside
      className={`bg-white shadow-md transition-all duration-300 ease-in-out flex flex-col ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between border-b">
          <Link href="/" className="hover:text-primary transition-colors">
            <FaHome size={20} className="text-gray-700 hover:text-primary" />
            {!isCollapsed && <span className="sr-only">Home</span>}
          </Link>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? toggleIcons.collapsed : toggleIcons.expanded}
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 p-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    pathname === item.path
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  } ${isCollapsed ? "justify-center" : ""}`}
                >
                  <span className="flex items-center">{item.icon}</span>
                  {!isCollapsed && <span className="ml-3">{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Fixed User Profile Section at Bottom */}
      <div
        className={`border-t p-4 bg-white ${
          isCollapsed ? "flex justify-center" : ""
        }`}
      >
        {mounted ? (
          <Link href="/dashboard/account" className="flex items-center">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              {mounted && user?.image ? (
                <Image
                  src={user?.image}
                  alt="User profile"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <div className="bg-gray-200 w-[40px] h-[40px] rounded-full flex items-center justify-center uppercase font-bold">
                  {user?.name?.charAt(0)}
                </div>
              )}
            </div>

            {!isCollapsed && (
              <div className="ml-3 overflow-hidden">
                <p className="font-medium text-sm truncate">{user?.name}</p>
                <p className="text-gray-500 text-xs truncate">{user?.email}</p>
              </div>
            )}
          </Link>
        ) : null}
      </div>
    </aside>
  );
}
