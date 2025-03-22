import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import API from "../../utils/API";

function ExploreCard({ img, name, member, description, users, id }) {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleJoinCommunity = async () => {
    try {
      const { data } = await API.post(`/community/${id}/join`);
      toast.success("Joined Successfully");
      navigate(`/community/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/community/${id}`} className="p-4 flex items-center">
        <img
          src={img}
          className="w-14 h-14 rounded-full object-cover mr-3 border-2 border-gray-100"
          alt={`${name} community`}
        />
        <div className="flex-1">
          <h2 className="font-semibold text-lg">{name}</h2>
          <p className="text-sm text-gray-600">{member} members</p>
        </div>

        {users.includes(user._id) ? (
          <button className="text-blue-600  border border-blue-600 px-4 py-1.5 rounded-md transition-colors duration-200">
            Joined
          </button>
        ) : (
          <button
            onClick={handleJoinCommunity}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md transition-colors duration-200"
          >
            Join
          </button>
        )}
      </Link>

      {description && (
        <div className="px-4 pb-4 mt-1">
          <p className="text-sm text-gray-700 line-clamp-2">{description}</p>
        </div>
      )}
    </div>
  );
}

export default ExploreCard;
