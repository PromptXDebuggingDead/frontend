import ExploreCard from "../explore/ExploreCard";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../../utils/API";

const categories = [
  "All",
  "💻 Technology",
  "🎮 Gaming",
  "🎵 Music",
  "🎬 Movies",
  "📚 Books",
  "⚽ Sports",
  "🔬 Science",
  "🍔 Food",
  "✈️ Travel",
  "👗 Fashion",
];

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Get URL search parameters
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const keywordParam = urlParams.get("keyword");

  useEffect(() => {
    // Set search term from URL parameter if it exists
    if (keywordParam) {
      setSearchTerm(keywordParam);
    }
  }, [keywordParam]);

  const getCommunities = async () => {
    try {
      setLoading(true);
      const response = await API.get("/community/all/data");
      setData(response.data.communities);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCommunities();
  }, []);

  // Filter communities based on selected category and search term
  const filteredCommunities = data.filter((community) => {
    // Category filter
    const categoryMatch =
      selectedCategory === "All" ||
      community.categories.includes(selectedCategory.split(" ")[1]);

    // Search filter
    const searchMatch =
      !searchTerm ||
      community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.bio.toLowerCase().includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Explore Communities</h1>

      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search communities..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          )}
        </div>
        {keywordParam && (
          <div className="mt-2 flex items-center">
            <span className="text-sm text-gray-600">
              Showing results for: "{keywordParam}"
            </span>
            <button
              onClick={() => setSearchTerm("")}
              className="ml-2 text-sm text-blue-600 hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* Categories filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 border rounded-full whitespace-nowrap transition-colors duration-200 ${
              selectedCategory === category
                ? "bg-blue-100 border-blue-300 text-blue-800"
                : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">
        {searchTerm
          ? `Search results for "${searchTerm}"`
          : selectedCategory === "All"
          ? "Recommended for you"
          : `${selectedCategory} Communities`}
      </h2>

      {loading ? (
        <div className="flex justify-center py-10">
          <p>Loading communities...</p>
        </div>
      ) : filteredCommunities.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p>No communities found{searchTerm ? ` for "${searchTerm}"` : ""}.</p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchTerm("");
            }}
            className="mt-3 text-blue-600 hover:underline"
          >
            View all communities
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((item) => (
            <ExploreCard
              key={item._id}
              id={item._id}
              img={item.avatar || "https://via.placeholder.com/100"}
              name={item.name}
              member={item.users?.length || 0}
              description={item.bio}
              createdBy={item.createdBy}
              categories={item.categories}
              users={item.users}
            />
          ))}
        </div>
      )}
    </div>
  );
}
