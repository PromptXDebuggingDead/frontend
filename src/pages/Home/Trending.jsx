import React from "react";

const TrendingCard = ({ post, community }) => {
  return (
    <>
      <div className="relative flex flex-col items-center justify-end min-w-[20rem] max-w-[20rem] h-32 md:min-w-[22rem] w-full md:h-52 bg-gray-200 rounded-xl">
        <img
          src={post?.images[0]}
          alt="title"
          className="absolute rounded-xl h-full w-full bg-cover inset-0"
        />
        <div className="absolute rounded-xl bg-gradient-to-t from-black/70 via-black/30 to-transparent  w-full h-full"></div>
        <div className="z-10 flex flex-col gap-1 p-5">
          <h1 className="text-xl font-bold text-white">{post.title}</h1>
          <p className="text-white text-base truncate ">{post?.content}...</p>
          <div className="flex items-center gap-2 text-white cursor-pointer">
            <img
              src={community.avatar}
              alt=""
              className="w-6 h-6 rounded-full"
            />
            <p className="text-sm">@r/{community?.name}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const Trending = ({ data, community }) => {
  return (
    <div>
      <div className="px-4 md:px-10 flex w-full gap-4 overflow-x-auto small-scroll">
        {data.map((item, index) => (
          <TrendingCard key={index} post={item} community={community} />
        ))}
      </div>
    </div>
  );
};

export default Trending;
