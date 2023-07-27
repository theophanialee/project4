import { useEffect, useState } from "react";
import sendRequest from "../utilities/send-request";

export default function Trends() {
  const [trends, setTrends] = useState();

  async function getTrends() {
    console.log("highest trend counts");
    try {
      const trendingTags = await sendRequest(`/api/hashtags/getTrends`);
      console.log("trends", trendingTags);
      setTrends(trendingTags);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getTrends();
  }, []);

  return (
    <div className="w-1/4 fixed top-0 right-0 pt-5 px-5 flex justify-center mt-24">
      <div className="w-full bg-neutral-700 rounded-2xl">
        <h2 className="px-6 py-2 text-2xl">Hot topics</h2>
        <div className="">
          {trends.map((trend, index) => (
            <div key={index} className="px-6 py-2 border-b border-neutral-800">
              {trend}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
