import React from "react";

// community list with name, image and total members

const data = [
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s",
    name: "Community 1",
    members: 1000,
    username: "community1",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s",
    name: "Community 1",
    members: 1000,
    username: "community1",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s",
    name: "Community 1",
    members: 1000,
    username: "community1",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s",
    name: "Community 1",
    members: 1000,
    username: "community1",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s",
    name: "Community 1",
    members: 1000,
    username: "community1",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s",
    name: "Community 1",
    members: 1000,
    username: "community1",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s",
    name: "Community 1",
    members: 1000,
    username: "community1",
  },
];

const Popular = () => {
  return (
    <div className="hidden md:block max-w-xl border rounded-xl p-4">
      <h4>Popular Communities</h4>

      <div className="flex flex-col gap-2">
        {data.map((community, index) => (
          <div key={index} className="flex items-center gap-2 p-2">
            <img
              src={community.avatar}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="text-sm">
              <h5>{community.name}</h5>
              <p>{community.members} members</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
