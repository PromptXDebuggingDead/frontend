import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayDate } from "../../utils/helper";
import { Link } from "react-router-dom";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdOutlineInfo } from "react-icons/md";
import { openAuthModal } from "../../redux/features/modalSlice";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("overview");

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Profile Header */}
      <div className="w-full bg-white border-b shadow-md">
        <div className="relative w-full h-32 bg-gray-200">
          <img
            src="https://salinaka-ecommerce.web.app/images/defaultBanner.accdc757f2c48d61f24c4fbcef2742fd.jpg"
            alt="Profile banner"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center px-6 py-4 space-x-4 relative">
          <div className="w-16 h-16 -mt-10 rounded-full border-4 border-white bg-white flex items-center justify-center shadow-md overflow-hidden">
            <img
              src={user?.avatar}
              alt={`${user?.name}'s profile`}
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-sm text-gray-500">
              Member since {displayDate(user?.createdAt)}
            </p>
          </div>

          <div className="ml-auto flex space-x-2">
            <Link
              to="/profile/edit"
              className="px-4 py-2 border cursor-pointer rounded-full text-gray-700 hover:bg-gray-200 flex items-center"
            >
              <CiEdit className="h-4 w-4 mr-1" />
              Edit Profile
            </Link>
            <div className="relative group">
              <button className="p-2 text-gray-500 rounded-full hover:bg-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  Account Settings
                </button>
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  Privacy Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Navigation */}
        <div className="border-t border-gray-200">
          <div className="flex px-6 py-2 text-sm">
            <button
              className={`mr-4 py-2 ${
                activeTab === "overview"
                  ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`mr-4 py-2 ${
                activeTab === "posts"
                  ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("posts")}
            >
              Posts
            </button>
            <button
              className={`mr-4 py-2 ${
                activeTab === "comments"
                  ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("comments")}
            >
              Comments
            </button>
            <button
              className={`mr-4 py-2 ${
                activeTab === "saved"
                  ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("saved")}
            >
              Saved
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto py-4 px-4 flex">
        {/* Main Content */}
        <div className="w-full lg:w-2/3">
          {activeTab === "overview" && (
            <>
              {/* Create Post Card */}
              <div className="bg-white rounded-md shadow mb-4 p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src={user?.avatar}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Create Post"
                    className="flex-grow bg-gray-100 text-gray-500 rounded-md px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    readOnly
                  />
                  <button className="text-gray-500 p-2 rounded-full hover:bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  <button className="text-gray-500 p-2 rounded-full hover:bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Empty State */}
              <div className="bg-white rounded-md shadow p-10 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Hmm... looks like you haven't posted anything yet
                </h3>
                <p className="mt-1 text-gray-500">
                  Recent posts you've made will show up here
                </p>
                <div className="mt-6">
                  <Link
                    to="/post/create"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Create a Post
                  </Link>
                </div>
              </div>
            </>
          )}

          {activeTab === "posts" && (
            <div className="bg-white rounded-md shadow p-10 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No Posts Yet
              </h3>
              <p className="mt-1 text-gray-500">
                You haven't made any posts yet. Posts you make will show up
                here.
              </p>
            </div>
          )}

          {activeTab === "comments" && (
            <div className="bg-white rounded-md shadow p-10 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No Comments Yet
              </h3>
              <p className="mt-1 text-gray-500">
                You haven't made any comments yet. Comments you make will show
                up here.
              </p>
            </div>
          )}

          {activeTab === "saved" && (
            <div className="bg-white rounded-md shadow p-10 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No Saved Items
              </h3>
              <p className="mt-1 text-gray-500">
                You haven't saved any posts or comments yet. Items you save will
                show up here.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block lg:w-1/3 lg:pl-6">
          {/* Account Info Card */}
          <div className="bg-white rounded-md shadow mb-4">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Account Information</h2>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Email</h3>
                  <button
                    onClick={() => dispatch(openAuthModal("email"))}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Update
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  {user?.email || "No Email Provided"}
                </p>

                {user?.isVerified && user?.authType === "phone" ? (
                  <p className="text-xs text-green-700 flex items-center mt-1">
                    <IoIosCheckmarkCircleOutline className="text-green-700 mr-1" />
                    Verified
                  </p>
                ) : (
                  <p className="text-xs text-red-600 flex items-center mt-1">
                    <MdOutlineInfo className="text-red-600 mr-1" />
                    Not verified
                    <button
                      onClick={() => dispatch(openAuthModal("phone"))}
                      className="ml-2 text-xs text-blue-600 hover:text-blue-800"
                    >
                      Verify now
                    </button>
                  </p>
                )}
              </div>

              <div className="mb-4 pt-2 border-t">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Phone</h3>
                  <button
                    onClick={() => dispatch(openAuthModal("phone"))}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Update
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  {user?.phone || "No Phone Provided"}
                </p>

                {user?.isVerified || user?.authType === "phone" ? (
                  <p className="text-xs text-green-700 flex items-center mt-1">
                    <IoIosCheckmarkCircleOutline className="text-green-700 mr-1" />
                    Verified
                  </p>
                ) : (
                  <p className="text-xs text-red-600 flex items-center mt-1">
                    <MdOutlineInfo className="text-red-600 mr-1" />
                    Not verified
                    <button
                      onClick={() => dispatch(openAuthModal("phone"))}
                      className="ml-2 text-xs text-blue-600 hover:text-blue-800"
                    >
                      Verify now
                    </button>
                  </p>
                )}
              </div>

              <div className="mb-4 pt-2 border-t">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Password</h3>
                  <button
                    onClick={() => dispatch(openAuthModal("password"))}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    {user?.isPasswordSet ? "Update" : "Set Password"}
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  {user?.isPasswordSet ? "Password is set" : "No password set"}
                </p>

                {!user?.isPasswordSet && (
                  <p className="text-xs text-red-600 flex items-center mt-1">
                    <MdOutlineInfo className="text-red-600 mr-1" />
                    Secure your account
                  </p>
                )}
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Address</h3>
                  <button
                    onClick={() => dispatch(openAuthModal("address"))}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    {user?.address ? "Update" : "Add Address"}
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  {user?.address || "No address provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-md shadow mb-4">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Profile Stats</h2>
            </div>
            <div className="p-4">
              <div className="flex justify-between mb-2 pb-2 border-b">
                <span className="text-sm text-gray-600">Member since</span>
                <span className="text-sm font-medium">
                  {displayDate(user?.createdAt)}
                </span>
              </div>
              <div className="flex justify-between mb-2 pb-2 border-b">
                <span className="text-sm text-gray-600">Karma</span>
                <span className="text-sm font-medium">0</span>
              </div>
              <div className="flex justify-between mb-2 pb-2 border-b">
                <span className="text-sm text-gray-600">Posts</span>
                <span className="text-sm font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Comments</span>
                <span className="text-sm font-medium">0</span>
              </div>
            </div>
          </div>

          {/* Communities Card */}
          <div className="bg-white rounded-md shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Communities</h2>
            </div>
            <div className="p-6 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No communities yet
              </h3>
              <p className="mt-1 text-gray-500">
                Communities you join will appear here
              </p>
              <div className="mt-6">
                <Link
                  to="/communities"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Explore Communities
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
