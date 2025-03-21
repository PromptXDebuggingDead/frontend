import ExploreCard from '../explore/ExploreCard'
import { Data } from '../../assets/Data';
import { useState } from "react";

const categories = [
  "All",
  "😀 Internet Culture",
  "🎮 Games",
  "💬 Q&As & Stories",
  "🎬 Movies & TV",
  "💻 Technology",
  "✈️ Places & Travel",
  "🌟 Pop Culture",
  "📈 Business & Finance",
];

export default function Explore({ img, name, member, description}) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Explore Communities</h1>
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 border rounded-full ${selectedCategory === category ? "bg-gray-200" : "bg-white"}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <h2 className="text-xl font-semibold mb-4">Recommended for you</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Data.map((item, index) => (
          <ExploreCard key={index} img={item.img} name={item.name} member={item.member} description={item.description}/>
        ))}
      </div>
    </div>
  );
}



