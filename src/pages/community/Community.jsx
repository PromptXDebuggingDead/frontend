// import { Link, useParams } from "react-router-dom";
// import PostCard from "../../components/global/PostCard";
// import API from "../../utils/API";
// import { use, useEffect, useState } from "react";

// export default function RedditHeader() {
//   const { id } = useParams();
//   const [community, setCommunity] = useState({});
//   const [posts, setPosts] = useState([]);
//   const fetchCommunity = async () => {
//     try {
//       const { data } = await API.get(`/community/${id}`);
//       setCommunity(data.community);
//       await fetchCommunityPosts(data.community._id);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchCommunity();
//   }, []);

//   const fetchCommunityPosts = async (id) => {
//     try {
//       const { data } = await API.get(`/post/community/${id}`);
//       setPosts(data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div>
//       <div className="w-full bg-white border-b shadow-md">
//         <div className="relative w-full h-32 bg-gray-200">
//           <img
//             src="/images/comm_banner.jpg"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         <div className="flex items-center px-6 py-4 space-x-4 relative">
//           <div className="w-16 h-16 -mt-10 rounded-full border-4 border-white bg-yellow-400 flex items-center justify-center shadow-md">
//             <img
//               src={"/images/comm_profile.jpg"}
//               className="w-full h-full rounded-full"
//             />
//           </div>

//           <h1 className="text-2xl font-bold">r/indiasocial</h1>

//           <div className="ml-auto flex space-x-2">
//             <Link
//               to={"/post/create"}
//               className="px-4 py-2 border cursor-pointer rounded-full text-gray-700 hover:bg-gray-200"
//             >
//               + Create Post
//             </Link>
//             <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
//               Join
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="mt-5">
//         {posts && posts.length > 0 ? (
//           posts.map((post) => <PostCard key={post._id} post={post} />)
//         ) : (
//           <h1 className="text-center text-gray-700">No posts found</h1>
//         )}
//       </div>
//     </div>
//   );
// }

import { Link, useNavigate, useParams } from "react-router-dom";
import PostCard from "../../components/global/PostCard";
import API from "../../utils/API";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function RedditHeader() {
  const { id } = useParams();
  const [community, setCommunity] = useState({});
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("hot");
  const [isJoined, setIsJoined] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const fetchCommunity = async () => {
    setIsLoading(true);
    try {
      const { data } = await API.get(`/community/${id}`);
      setCommunity(data.community);
      if (data.community.users.includes(user._id)) {
        setIsJoined(true);
      }
      await fetchCommunityPosts(data.community._id);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunity();
  }, [id]);

  const fetchCommunityPosts = async (communityId) => {
    try {
      const { data } = await API.get(
        `/post/community/${communityId}?sort=${sortBy}`
      );
      setPosts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoinCommunity = async () => {
    setIsJoined(!isJoined);
    try {
      const { data } = await API.post(`/community/${id}/join`);
      toast.success("Joined Successfully");
      navigate(`/community/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    fetchCommunityPosts(community._id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Community Header */}
      <div className="w-full bg-white border-b shadow-md">
        <div className="relative w-full h-32 bg-gray-200">
          <img
            src={community.bannerImage || "/images/comm_banner.jpg"}
            alt={`${community.name} banner`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center px-6 py-4 space-x-4 relative">
          <div className="w-16 h-16 -mt-10 rounded-full border-4 border-white bg-yellow-400 flex items-center justify-center shadow-md overflow-hidden">
            <img
              src={community.avatar || "/images/comm_profile.jpg"}
              alt={`${community.name} profile`}
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">
              r/{community.name || "indiasocial"}
            </h1>
            <p className="text-sm text-gray-500">
              {community.memberCount || "0"} members •{" "}
              {community.activeCount || "0"} online
            </p>
          </div>

          <div className="ml-auto flex space-x-2">
            <Link
              to={`/post/create?community=${community._id}`}
              className="px-4 py-2 border cursor-pointer rounded-full text-gray-700 hover:bg-gray-200 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create Post
            </Link>
            <button
              onClick={handleJoinCommunity}
              className={`px-4 py-2 ${
                isJoined
                  ? "bg-white text-blue-600 border border-blue-600"
                  : "bg-blue-600 text-white"
              } rounded-full hover:bg-blue-700 hover:text-white transition-colors`}
            >
              {isJoined ? "Joined" : "Join"}
            </button>
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
                  Report Community
                </button>
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  Block Community
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Community Navigation */}
        <div className="border-t border-gray-200">
          <div className="flex px-6 py-2 text-sm">
            <button
              className={`mr-4 py-2 ${
                sortBy === "hot"
                  ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleSortChange("hot")}
            >
              Hot
            </button>
            <button
              className={`mr-4 py-2 ${
                sortBy === "new"
                  ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleSortChange("new")}
            >
              New
            </button>
            <button
              className={`mr-4 py-2 ${
                sortBy === "top"
                  ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleSortChange("top")}
            >
              Top
            </button>
            <button
              className={`mr-4 py-2 ${
                sortBy === "rising"
                  ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleSortChange("rising")}
            >
              Rising
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto py-4 px-4 flex">
        {/* Post List */}
        <div className="w-full lg:w-2/3">
          {/* Create Post Card */}
          <div className="bg-white rounded-md shadow mb-4 p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
              <Link
                to={`/post/create?community=${community._id}`}
                className="flex-grow bg-gray-100 text-gray-500 rounded-md px-4 py-2 hover:bg-gray-200"
              >
                Create Post
              </Link>
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

          {/* Posts */}
          <div className="space-y-4">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <PostCard
                  isJoined={isJoined}
                  community={community}
                  key={post._id}
                  post={post}
                />
              ))
            ) : (
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
                  No posts yet
                </h3>
                <p className="mt-1 text-gray-500">
                  Be the first to share something with this community!
                </p>
                <div className="mt-6">
                  <Link
                    to={`/post/create?community=${community._id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Create a Post
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block lg:w-1/3 lg:pl-6">
          {/* About Community Card */}
          <div className="bg-white rounded-md shadow mb-4">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">About Community</h2>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                {community.bio ||
                  "A place to discuss and share content related to this community."}
              </p>
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <span className="block font-medium">
                    {community.memberCount || "0"}
                  </span>
                  <span className="text-xs text-gray-500">Members</span>
                </div>
                <div>
                  <span className="block font-medium">
                    {community.activeCount || "0"}
                  </span>
                  <span className="text-xs text-gray-500">Online</span>
                </div>
              </div>
              <div className="border-t pt-4 text-sm text-gray-500">
                <p>
                  Created{" "}
                  {community.createdAt
                    ? new Date(community.createdAt).toLocaleDateString()
                    : "Jan 25, 2020"}
                </p>
              </div>
              <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Create Post
              </button>
            </div>
          </div>

          {/* Community Rules */}
          <div className="bg-white rounded-md shadow mb-4">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Community Rules</h2>
            </div>
            <div className="p-2">
              {community.guidelines && community.guidelines.length > 0 ? (
                community.guidelines.map((rule, index) => (
                  <div key={index} className="border-b py-2 px-2">
                    <p className="font-medium text-sm">
                      {index + 1}. {rule}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 p-2">
                  No rules have been set for this community yet.
                </p>
              )}

              {/* <div className="border-b py-2 px-2">
                <p className="font-medium text-sm">
                  2. No hate speech or bullying
                </p>
              </div>
              <div className="border-b py-2 px-2">
                <p className="font-medium text-sm">
                  3. No spamming or self-promotion
                </p>
              </div>
              <div className="py-2 px-2">
                <p className="font-medium text-sm">
                  4. Use appropriate flairs for posts
                </p>
              </div> */}
            </div>
          </div>

          {/* Moderators */}
          <div className="bg-white rounded-md shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Moderators</h2>
            </div>
            <div className="p-4">
              <button className="text-blue-600 text-sm">
                View All Moderators
              </button>
              <Link
                to="/message-moderators"
                className="block mt-4 text-sm text-blue-600"
              >
                Message the mods
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
