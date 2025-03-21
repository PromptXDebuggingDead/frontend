import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Trending from "./Trending";
import PostCard from "../../components/global/PostCard";
import Popular from "./Popular";

const HomePage = () => {
  return (
    <div className="py-10 min-h-screen grainy-light">
      <Trending />
      <div className="grid grid-cols-7 mt-10 p-4 ">
        <div className="px-4 col-span-full lg:col-span-5 md:px-10 flex flex-col gap-4 ">
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
  );
};

export default HomePage;
