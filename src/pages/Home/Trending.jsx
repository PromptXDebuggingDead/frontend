import React from "react";

const data = [
  {
    title: "Title 1",
    content: "Some tlhdf lakhf lksahf lkajflha khflak hflkaj ",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s",
  },
  {
    title: "Title 2",
    content: "Some tlhdf lakhf lksahf lkajflha khflak hflkaj ",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s",
  },
  {
    title: "Title 3",
    content: "Some tlhdf lakhf lksahf lkajflha khflak hflkaj ",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s",
  },
  {
    title: "Title 1",
    content: "Some tlhdf lakhf lksahf lkajflha khflak hflkaj ",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s",
  },
  {
    title: "Title 2",
    content: "Some tlhdf lakhf lksahf lkajflha khflak hflkaj ",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s",
  },
  {
    title: "Title 3",
    content: "Some tlhdf lakhf lksahf lkajflha khflak hflkaj ",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s",
  },
];
const TrendingCard = ({ title, content, img }) => {
  return (
    <>
      <div className="relative flex flex-col items-center justify-end min-w-[20rem] h-32 md:min-w-[22rem] w-full md:h-52 bg-gray-200 rounded-xl">
        <img
          src={img}
          alt="title"
          className="absolute rounded-xl h-full w-full bg-cover inset-0"
        />
        <div className="absolute rounded-xl bg-gradient-to-t from-black/70 via-black/30 to-transparent  w-full h-full"></div>
        <div className="z-10 flex flex-col gap-1 p-5">
          <h1 className="text-xl font-bold text-white">{title}</h1>
          <p className="text-white text-base truncate ">{content}...</p>
          <div className="flex items-center gap-2 text-white cursor-pointer">
            <img src={img} alt="" className="w-6 h-6 rounded-full" />
            <p className="text-sm">@community</p>
          </div>
        </div>
      </div>
    </>
  );
};

const Trending = () => {
  return (
    <div>
      <div className="px-4 md:px-10 flex w-full gap-4 overflow-x-auto small-scroll">
        {data.map((item, index) => (
          <TrendingCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Trending;
