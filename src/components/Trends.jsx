import { useEffect } from "react";
import sendRequest from "../utilities/send-request";

export default function Trends() {
  async function getTrends() {
    console.log("highest trend counts");
    try {
      const trendingTags = await sendRequest(`/getTrends`);
      console.log(trendingTags);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getTrends();
  }, []);

  return (
    <div className="w-1/4 h-5/6 fixed bottom-0 right-0 pt-5 px-5 flex justify-center">
      <div className="w-full h-10 px-6 py-2 bg-neutral-700 rounded-3xl">
        <h2>Hot topics</h2>
      </div>
    </div>
  );
}
