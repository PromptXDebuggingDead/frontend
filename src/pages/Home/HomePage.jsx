import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";

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
    </div>
  );
};

export default HomePage;
