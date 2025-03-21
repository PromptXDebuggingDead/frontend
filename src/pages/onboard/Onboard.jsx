import React from "react";

const topics = [
  ["Tech innovations,", "Movies & Well-Being."],
  ["Fitness & Pop Culture,", "Travel Topics"],
  ["Taves Lussure", "Gamhine Lulture"]
];

const Onboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-6">
      <div className="text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold">Choose your interests</h1>
        <p className="text-lg text-gray-500 mt-2">
          Pick topics to personalize your experience.
        </p>
        <button className="mt-6 px-6 py-3 bg-black text-white rounded-full text-lg font-semibold hover:bg-gray-900 transition cursor-pointer">
          Start
        </button>
      </div>

      <div className="mt-10 w-full max-w-3xl bg-gray-100 p-6 rounded-3xl shadow-md">
        <h2 className="text-2xl font-semibold text-center">Trending Topics</h2>
        <p className="text-gray-500 text-center mt-1">
          Pick topics to personalize your experience.
        </p>
        
        <div className="mt-4 grid grid-cols-2 gap-4 ">
          {topics.map((row, rowIndex) => (
            row.map((topic, colIndex) => (
              <button 
                key={`${rowIndex}-${colIndex}`} 
                className="w-full flex items-center justify-center gap-2 bg-white shadow-md px-4 py-3 rounded-full text-lg font-medium hover:bg-gray-200 transition text-purple-600 cursor-pointer"
              >
                ➕ {topic}
              </button>
            ))
          ))}
        </div>
      </div>
    </div>
  );
};

export default Onboard;
