import React from "react";

const Feed = () => {
  const dummyPosts = [
    {
      id: 1,
      name: "Sanjana Thakre",
      time: "2 hours ago",
      content: "Today I learned how to use React Router in my project!",
    },
    {
      id: 2,
      name: "Meghraj Thakre",
      time: "5 hours ago",
      content: "Working on my DevTinder project — added navbar & theme toggle!",
    },
  ];

  return (
    <div className="max-w-xl mx-auto pt-6 px-4 pb-20">
      <h2 className="text-2xl font-bold mb-4">Feed</h2>

      {/* POSTS LIST */}
      <div className="flex flex-col gap-4">
        {dummyPosts.map((post) => (
          <div
            key={post.id}
            className="bg-base-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            {/* TOP SECTION */}
            <div className="flex items-center justify-between">
              <span className="font-semibold">{post.name}</span>
              <span className="text-xs opacity-60">{post.time}</span>
            </div>

            {/* CONTENT */}
            <p className="mt-2 text-sm">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
