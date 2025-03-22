import React, { useEffect } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";

// community list with name, image and total members

// const data = [
//   {
//     avatar:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s",
//     name: "Community 1",
//     members: 1000,
//     username: "community1",
//   },
//   {
//     avatar:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s",
//     name: "Community 1",
//     members: 1000,
//     username: "community1",
//   },
//   {
//     avatar:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s",
//     name: "Community 1",
//     members: 1000,
//     username: "community1",
//   },
//   {
//     avatar:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s",
//     name: "Community 1",
//     members: 1000,
//     username: "community1",
//   },
//   {
//     avatar:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s",
//     name: "Community 1",
//     members: 1000,
//     username: "community1",
//   },
//   {
//     avatar:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s",
//     name: "Community 1",
//     members: 1000,
//     username: "community1",
//   },
//   {
//     avatar:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s",
//     name: "Community 1",
//     members: 1000,
//     username: "community1",
//   },
// ];

const Popular = () => {
  const [data, setData] = React.useState([]);
  const getCommunities = async () => {
    try {
      const { data } = await API.get("/community/all/data");
      setData(data.communities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCommunities();
  }, []);
  return (
    <div className="hidden md:block max-w-xl border rounded-xl p-4">
      <h4>Popular Communities</h4>

      <div className="flex flex-col gap-2">
        {data.map((community, index) => (
          <Link
            to={`/community/${community._id}`}
            key={index}
            className="flex items-center gap-2 p-2"
          >
            <img
              src={community.avatar}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="text-sm">
              <h5>{community.name}</h5>
              <p>{community.members} members</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Popular;
