import React, { useState } from "react";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("likes");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="flex">
        <div
          className={`cursor-pointer flex-1 text-center py-5 ${
            activeTab === "likes"
              ? "text-purple-500 bg-neutral-900"
              : "text-neutral-600 "
          }`}
          onClick={() => handleTabClick("likes")}
        >
          Likes
        </div>
        <div
          className={`cursor-pointer flex-1 text-center  py-5 ${
            activeTab === "mentions"
              ? "text-purple-500 bg-neutral-900"
              : "text-neutral-600"
          }`}
          onClick={() => handleTabClick("mentions")}
        >
          Mentions
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col h-5/6 p-4">
        {activeTab === "likes" && (
          /* Likes Content */
          <div className="flex-1 p-4">Likes Notifications</div>
        )}
        {activeTab === "mentions" && (
          /* Mentions Content */
          <div className="flex-1 p-4">Mentions Notifications</div>
        )}
      </div>
    </>
  );
}
