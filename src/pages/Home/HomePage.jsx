import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";
import { toast } from "react-toastify";
import Trending from "./Trending";
import PostCard from "../../components/global/PostCard";
import Popular from "./Popular";
import API from "../../utils/API";

const community = {
  _id: "67de13764472efa5dd5cf51a",

  name: "Tech Community",
  bio: "THis is a tech community",
  avatar:
    "https://res.cloudinary.com/dzpnhvtws/image/upload/v1742607221/social/fnf0lkld1taaroro3rs0.png",
  users: ["67de033659a81daba7eafd1b"],
  moderators: ["67de033659a81daba7eafd1b"],
  createdBy: "67de033659a81daba7eafd1b",
  guidelines: ["First Guideline", "Second Guideline"],
  categories: ["Technology", "Gaming"],
  createdAt: "2025-03-22T01:33:42.655Z",

  updatedAt: "2025-03-22T01:33:42.655Z",
};

const HomePage = () => {
  const [isOpen, setIsOpen] = useState();
  const [posts, setPosts] = useState([]);
  const [community, setCommunity] = useState({
    _id: "67de13764472efa5dd5cf51a",

    name: "Tech Community",
    bio: "THis is a tech community",
    avatar:
      "https://res.cloudinary.com/dzpnhvtws/image/upload/v1742607221/social/fnf0lkld1taaroro3rs0.png",
    users: ["67de033659a81daba7eafd1b"],
    moderators: ["67de033659a81daba7eafd1b"],
    createdBy: "67de033659a81daba7eafd1b",
    guidelines: ["First Guideline", "Second Guideline"],
    categories: ["Technology", "Gaming"],
    createdAt: "2025-03-22T01:33:42.655Z",

    updatedAt: "2025-03-22T01:33:42.655Z",
  });
  const navigate = useNavigate();
  const getAllPosts = async () => {
    try {
      const { data } = await API.get("/post/all/data");
      setPosts(data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch posts");
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 relative">
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
        <Trending data={posts} community={community} />
        <div className="grid grid-cols-7 mt-10 p-4">
          <div className="px-4 col-span-full lg:col-span-5 md:px-10 flex flex-col gap-4">
            {posts &&
              posts.map((post) => (
                <PostCard key={post._id} post={post} community={community} />
              ))}
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
