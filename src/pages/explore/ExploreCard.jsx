function ExploreCard({ img, name, member, description }) {
    return (
      <div className="flex items-center p-4 border rounded-lg shadow-md w-96">
        <img src={img} className="w-12 h-12 rounded-full mr-3" alt="community" />
        <div className="flex-1">
          <h2 className="font-semibold text-lg">{name}</h2>
          <p className="text-sm text-gray-600">{member}</p>
        </div>
        <div>
          <p>{description}</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-1 rounded-md">Join</button>
      </div>
    );
  }

  export default ExploreCard