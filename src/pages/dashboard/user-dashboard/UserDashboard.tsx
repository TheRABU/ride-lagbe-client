import React from "react";
import { Link } from "react-router";

const UserDashboard = () => {
  return (
    <>
      <div className="dashboard flex h-screen bg-[#000000] text-[#FFFFFF]">
        <div className="w-64 bg-[#1A1A1A] shadow-lg p-5">
          <h2 className="text-2xl font-bold mb-8 text-[#66CC00]">Adiman</h2>
          <div className="space-y-4">
            <div className="menu-item flex items-center space-x-3 p-3 rounded bg-[#66CC00] text-[#000000]">
              <i className="fas fa-home"></i>
              <span>Dashboard</span>
            </div>
            <div className="menu-item flex items-center space-x-3 p-3 rounded hover:bg-[#99FF33] hover:text-[#000000] cursor-pointer">
              <i className="fas fa-chart-line"></i>
              <span>Analytics</span>
            </div>
            <div className="menu-item flex items-center space-x-3 p-3 rounded hover:bg-[#99FF33] hover:text-[#000000] cursor-pointer">
              <i className="fas fa-users"></i>
              <span>User Management</span>
            </div>
            <div className="menu-item flex items-center space-x-3 p-3 rounded hover:bg-[#99FF33] hover:text-[#000000] cursor-pointer">
              <i className="fas fa-file-alt"></i>
              <span>Content</span>
            </div>
            <div className="menu-item flex items-center space-x-3 p-3 rounded hover:bg-[#99FF33] hover:text-[#000000] cursor-pointer">
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </div>
            <div className="menu-item flex items-center space-x-3 p-3 rounded hover:bg-[#99FF33] hover:text-[#000000] cursor-pointer">
              <i className="fas fa-question-circle"></i>
              <span>Help</span>
            </div>
            <Link
              to={"/"}
              className="menu-item flex items-center space-x-3 p-3 rounded hover:bg-[#99FF33] hover:text-[#000000] cursor-pointer"
            >
              <i className="fas fa-question-circle"></i>

              <span>Home</span>
            </Link>
          </div>
        </div>

        <div className="flex-1 p-6 bg-[#000000]">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center bg-[#1A1A1A] px-4 py-2 rounded shadow-inner w-1/3">
              <i className="fas fa-search text-[#CCCCCC] mr-2"></i>
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent w-full outline-none text-[#FFFFFF] placeholder-[#999999]"
              />
            </div>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <i className="fas fa-bell text-[#66CC00] text-xl"></i>
                <span className="absolute -top-2 -right-2 bg-[#FF3366] text-xs px-1 rounded-full">
                  3
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-[#1A1A1A] px-3 py-1 rounded cursor-pointer hover:bg-[#99FF33] hover:text-[#000000]">
                <div className="bg-[#66CC00] text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  AD
                </div>
                <span>Admin User</span>
                <i className="fas fa-chevron-down ml-1"></i>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-[#1A1A1A] rounded shadow-md flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">1,248</div>
                <div className="text-[#CCCCCC]">Total Users</div>
              </div>
              <div className="bg-[#66CC00] p-3 rounded-full text-black">
                <i className="fas fa-users"></i>
              </div>
            </div>
            <div className="p-4 bg-[#1A1A1A] rounded shadow-md flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">342</div>
                <div className="text-[#CCCCCC]">Active Sessions</div>
              </div>
              <div className="bg-[#00FF00] p-3 rounded-full text-black">
                <i className="fas fa-signal"></i>
              </div>
            </div>
            <div className="p-4 bg-[#1A1A1A] rounded shadow-md flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">98%</div>
                <div className="text-[#CCCCCC]">System Health</div>
              </div>
              <div className="bg-[#99FF33] p-3 rounded-full text-black">
                <i className="fas fa-heartbeat"></i>
              </div>
            </div>
            <div className="p-4 bg-[#1A1A1A] rounded shadow-md flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">5</div>
                <div className="text-[#CCCCCC]">Recent Alerts</div>
              </div>
              <div className="bg-[#FF3366] p-3 rounded-full text-white">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div className="bg-[#1A1A1A] rounded shadow-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Activity Overview</h3>
                  <select className="bg-transparent border border-[#CCCCCC] px-2 py-1 rounded text-[#FFFFFF]">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last 90 Days</option>
                  </select>
                </div>
                <div className="text-center text-[#999999] py-12">
                  [Activity Chart Will Appear Here]
                </div>
              </div>

              <div className="bg-[#1A1A1A] rounded shadow-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Recent Actions</h3>
                  <button className="text-[#66CC00] hover:underline">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <i className="fas fa-user-plus text-[#66CC00]"></i>
                    <div>
                      <div>New user registered</div>
                      <div className="text-sm text-[#999999]">
                        2 minutes ago
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <i className="fas fa-file-upload text-[#66CC00]"></i>
                    <div>
                      <div>Document uploaded</div>
                      <div className="text-sm text-[#999999]">
                        15 minutes ago
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <i className="fas fa-cog text-[#66CC00]"></i>
                    <div>
                      <div>System settings updated</div>
                      <div className="text-sm text-[#999999]">1 hour ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <i className="fas fa-shield-alt text-[#66CC00]"></i>
                    <div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
