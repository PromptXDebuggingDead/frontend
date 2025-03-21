import React from "react";
import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";
import { LuMessageCircle } from "react-icons/lu";
import { LiaMedalSolid } from "react-icons/lia";
import { IoShareSocialOutline } from "react-icons/io5";

// Sample post data

const post = {
  title: "Pokémon TCG Pocket: Shining Revelry | Official Trailer",
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s",
  likes: 27,
  comments: 10,
};

const PostCard = () => {
  return (
    <div className="max-w-3xl w-full rounded-xl bg-white hover:bg-gray-100 border border-gray-300 py-5">
      <div className="flex items-center justify-between gap-2 p-4">
        <div className="flex items-center gap-2 text-gray-700 cursor-pointer">
          <img src={post.img} alt="" className="w-8 h-8 rounded-full" />
          <p className="text-sm">@community</p>
        </div>

        <button className="text-center cursor-pointer px-4 py-1 text-white bg-blue-500 rounded-full">
          Join
        </button>
      </div>

      <div className="px-5">
        <h1 className="text-gray-800 text-xl mb-2 font-semibold">
          {post.title}
        </h1>
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s"
            alt=""
            className="h-full w-full rounded-xl object-cover hover:scale-[0.99] transition-transform duration-300"
          />
        </div>
        <div className="flex items-center justify-start gap-3 mt-4 text-gray-700 overflow-x-auto">
          {/* Upvotes */}
          <div className="flex items-center justify-center gap-1 border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-200">
            <span className="flex items-center gap-1">
              <TbArrowBigUp className="hover:text-white cursor-pointer rounded-full hover:bg-gray-700" />
              27K
            </span>
            <span>
              <TbArrowBigDown className="hover:text-white cursor-pointer rounded-full hover:bg-gray-700" />
            </span>
          </div>
          {/* Comments Count */}
          <div className="flex items-center justify-center gap-1 border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-200 cursor-pointer">
            <LuMessageCircle />
            10K
          </div>
          <div className="flex items-center justify-center gap-1 border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-200 cursor-pointer text-2xl">
            <LiaMedalSolid />
          </div>
          <div className="flex items-center justify-center gap-1 border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-200 cursor-pointer">
            <IoShareSocialOutline />
            Share
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
