import PostCard from "../../components/global/PostCard";

export default function RedditHeader() {
  return (
   <div>
     <div className="w-full bg-white border-b shadow-md">
      <div className="relative w-full h-32 bg-gray-200">
        <img
          src="/images/comm_banner.jpg"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex items-center px-6 py-4 space-x-4 relative">
        <div className="w-16 h-16 -mt-10 rounded-full border-4 border-white bg-yellow-400 flex items-center justify-center shadow-md">
          <img
            src={'/images/comm_profile.jpg'}
            className="w-full h-full rounded-full"
          />
        </div>

        <h1 className="text-2xl font-bold">r/indiasocial</h1>

        <div className="ml-auto flex space-x-2">
          <button className=
    "px-4 py-2 border rounded-full text-gray-700 hover:bg-gray-200">
            + Create Post
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
            Join
          </button>
        </div>
      </div>
    </div>
    <div className="mt-5">
    <PostCard/>
    <PostCard/>
    <PostCard/>
          
    <PostCard/>
    </div>
   </div>
  );
}

