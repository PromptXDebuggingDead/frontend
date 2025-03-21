import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";
import { toast } from "react-toastify";
import Trending from "./Trending";
import PostCard from "../../components/global/PostCard";
import Popular from "./Popular";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <h1 className="text-center text-2xl">Welcome, User</h1>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => navigate("/my/chats")}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          <FaCommentDots size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="py-10 min-h-screen grainy-light">
        <Trending />
        <div className="grid grid-cols-7 mt-10 p-4">
          <div className="px-4 col-span-full lg:col-span-5 md:px-10 flex flex-col gap-4">
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
          <div className="col-span-2 hidden md:block">
            <Popular />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
