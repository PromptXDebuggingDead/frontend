import React, { useEffect, useState } from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { LiaMedalSolid } from "react-icons/lia";
import { LuMessageCircle } from "react-icons/lu";
import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import { IoFlagOutline } from "react-icons/io5";
import Comments from "./Comments";
import API from "../../utils/API";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const relatedCommunities = [
  {
    name: "Community 1",
    username: "community1",
    bio: "Welcome to r/Formula1, the best independent online Formula 1 community!",
    createdAt: "2021-09-01T00:00:00.000Z",
    _id: 1,
  },
  {
    name: "Community 1",
    username: "community1",
    bio: "Welcome to r/Formula1, the best independent online Formula 1 community!",
    createdAt: "2021-09-01T00:00:00.000Z",
    _id: 2,
  },
  {
    name: "Community 1",
    username: "community1",
    bio: "Welcome to r/Formula1, the best independent online Formula 1 community!",
    createdAt: "2021-09-01T00:00:00.000Z",
    _id: 3,
  },
  {
    name: "Community 1",
    username: "community1",
    bio: "Welcome to r/Formula1, the best independent online Formula 1 community!",
    createdAt: "2021-09-01T00:00:00.000Z",
    _id: 4,
  },
];

const PostDetailsCard = ({ post, community }) => {
  const giveLike = async () => {
    try {
      const { data } = await API.put(`/post/like/${post._id}`);
      window.location.reload();
      toast.success("liked");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-3xl w-full rounded-xl bg-white hover:bg-gray-100 border border-gray-300 py-5">
      <div className="flex items-center justify-between gap-2 p-4">
        <Link
          to={`/community/${community._id}`}
          className="flex items-center gap-2 text-gray-700 cursor-pointer"
        >
          <img
            src={community.avatar}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p>{community.name}</p>
            <p className="text-sm">@r/{community.name}</p>
          </div>
        </Link>

        <button className="text-center cursor-pointer flex items-center gap-1 px-4 py-1 border border-red-500 text-red-500 rounded-full">
          <IoFlagOutline /> <span> Report</span>
        </button>
      </div>

      <div className="px-5">
        <h1 className="text-gray-800 text-xl mb-2 font-semibold">
          {post.title}
        </h1>
        <div>
          <img
            src={post && post.images ? post?.images[0] : ""}
            alt=""
            className="h-full w-full rounded-xl object-cover hover:scale-[0.99] transition-transform duration-300"
          />
        </div>
        <div className="flex items-center justify-start gap-3 mt-4 text-gray-700 overflow-x-auto">
          {/* Upvotes */}
          <div className="flex items-center justify-center gap-1 border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-200">
            <span className="flex items-center gap-1">
              <TbArrowBigUp
                onClick={giveLike}
                className="hover:text-white cursor-pointer rounded-full hover:bg-gray-700"
              />
              {post?.likes?.length || "0"}
            </span>
          </div>
          {/* Comments Count */}
          <div className="flex items-center justify-center gap-1 border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-200 cursor-pointer">
            <LuMessageCircle />
            {post.commentsCount}
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

const PostDetails = () => {
  const [isTextFieldVisible, setIsTextFieldVisible] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const { id, community } = useParams();
  const [communityData, setCommunity] = useState({});

  const [post, setPost] = React.useState({});
  // const [relatedCommunities, setRelatedCommunities] = React.useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const { user } = useSelector((state) => state.user);

  const fetchPost = async () => {
    try {
      const { data } = await API.get(`/post/single/${id}`);
      setPost(data.data);
      fetchCommunity();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCommunity = async () => {
    try {
      const { data } = await API.get(`/community/${community}`);
      setCommunity(data.community);
      console.log(data);

      if (data.community.users.includes(user._id)) {
        setIsJoined(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCommunity();
    fetchPost();
  }, [id]);
  return (
    <div>
      <div className="max-w-6xl lg:grid lg:grid-cols-7 pt-3 p-4 grainy-light">
        <div className="px-4 col-span-full lg:col-span-5 flex flex-col gap-4 ">
          {post && communityData && (
            <PostDetailsCard post={post} community={communityData} />
          )}
          <div>
            {isTextFieldVisible ? (
              <div>
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  rows={5}
                  className="!w-full border border-gray-400 rounded-lg p-4"
                  placeholder="Join the conversation"
                />
                <button
                  onClick={() => {
                    // Handle submit
                    console.log("Comment submitted:", comment);
                    setIsTextFieldVisible(false);
                    setComment("");
                  }}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-full"
                >
                  Submit
                </button>
              </div>
            ) : (
              <p
                className="border border-gray-400 rounded-full px-4 py-2 text-gray-700 cursor-pointer"
                onClick={() => setIsTextFieldVisible(true)}
              >
                Join the conversation
              </p>
            )}
          </div>
          <Comments id={id} />
        </div>
        {/* right */}
        <div className="lg:col-span-2 block grainy-light">
          {/* Details about the community */}
          <div>
            <div className="p-4 border-b border-gray-400">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 mt-4">
                  <img
                    src={communityData?.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h1 className="text-lg text-gray-800 font-semibold">
                      {communityData?.name}
                    </h1>
                    <p className="text-gray-700">@r/{communityData?.name}</p>
                  </div>
                </div>
                {isJoined ? (
                  <button className="w-fit border border-blue-500 text-black rounded-full p-1 px-4">
                    Joined
                  </button>
                ) : (
                  <button className="w-fit bg-blue-500 text-white rounded-full p-1 px-4">
                    Join
                  </button>
                )}
              </div>
              <p>{communityData?.bio}</p>
              <div className="mt-4">
                <button className="w-full text-gray-700 border border-gray-400 cursor-pointer hover:bg-gray-100 rounded-full p-2">
                  Community Guide
                </button>
              </div>
            </div>

            {/* Related communities */}
            <div className="p-4">
              <h1 className="text-lg text-gray-800 font-semibold">
                Related Communities
              </h1>
              {relatedCommunities.map((community) => (
                <div key={community._id} className="border-gray-400">
                  <div className="flex items-center gap-4 mt-6">
                    <div className="flex items-center gap-2">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s"
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h1 className="text-base text-gray-800 font-semibold">
                          {community.name}
                        </h1>
                        <p className="text-gray-700 text-sm">
                          @{community.username}
                        </p>
                      </div>
                    </div>
                    <button className="w-fit bg-blue-500 text-white rounded-full p-1 px-4">
                      Join
                    </button>
                  </div>
                  <p className="text-gray-700 mt-1 text-[0.8rem] pl-2">
                    {community.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
