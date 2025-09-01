"use client";

import { useState, useEffect } from "react";
import { LogOut, Users, FolderOpen, Award } from "lucide-react";
import Adminlogin from "@/Components/layout/Admin/AdminLogin";
import UserManagement from "@/Components/layout/Admin/UserManagement";
import Categorymanagement from "@/Components/layout/Admin/categoryManagement";
import Programmanagement from "@/Components/layout/Admin/programManagement";
import AllProgramResult from "@/Components/layout/Admin/AllProgramResult";

const AdminHomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("adminToken", token);
    setToken(token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Adminlogin onLogin={handleLogin} />
      </div>
    );
  }

  // Define tabs with keys, labels, and icons
  const tabs = [
    { key: "users", label: "Users", icon: <Users className="h-4 w-4" /> },
    { key: "categories", label: "Categories", icon: <FolderOpen className="h-4 w-4" /> },
    { key: "programs", label: "Programs", icon: <Award className="h-4 w-4" /> },
    { key: "AllProgramsResult", label: "All Programs Result", icon: <Award className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1 hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="overflow-x-auto border-b border-gray-200 mb-4">
          <div className="flex flex-nowrap md:flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`flex items-center gap-2 px-4 py-2 whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab.key
                    ? "border-blue-500 text-blue-500 font-medium"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "users" && <UserManagement token={token} />}
          {activeTab === "categories" && <Categorymanagement token={token} />}
          {activeTab === "programs" && <Programmanagement token={token} />}
          {activeTab === "AllProgramsResult" && <AllProgramResult token={token} />}
        </div>
      </main>
    </div>
  );
};

export default AdminHomePage;






