import React, { useState } from "react";
import Card from "./Card";
import axios from "axios";

export default function Expenditure(data = { parsedData }) {
  const [isCaption, setIsCaption] = useState(false);
  const [caption, setcaption] = useState("");
  const categorized_data = data["data"];
  const insight = "";
  const handleInsight = async () => {
    try {
      const insights = await axios.post(
        "https://fheag1an4f.execute-api.ap-south-1.amazonaws.com/dev/insight",
        { categorized_data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("inights here", insights);
      setcaption(insights.data.insight_data);
      setIsCaption(true);
      alert("Got the insights");
    } catch (error) {
      alert("oops  didn't get insights");
    }
  };
  const categories = [
    {
      title: "Food",
      amount: data.data["food"],
      icon: "🍔",
      bgColor: "bg-pink-100",
    },
    {
      title: "Travel",
      amount: data.data["travelling"],
      icon: "✈️",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Subscription",
      amount: data.data["entertainment"],
      icon: "📺",
      bgColor: "bg-blue-100",
    },
    {
      title: "EMI",
      amount: data.data["EMI"],
      icon: "💡",
      bgColor: "bg-green-100",
    },
    {
      title: "Shopping",
      amount: data.data["shopping"],
      icon: "🛍️",
      bgColor: "bg-purple-100",
    },
    {
      title: "Health",
      amount: data.data["health"],
      icon: "💊",
      bgColor: "bg-red-100",
    },
  ];

  let totalSpent = 0;
  for (let i = 0; i < categories.length; i++) {
    if (categories[i]["amount"] < 0) {
      totalSpent += Math.abs(categories[i]["amount"]);
    }
  }
  let topCategory = "";
  let m = Math.abs(categories[0]["amount"]);
  for (let i = 0; i < categories.length; i++) {
    if (Math.abs(categories[i]["amount"]) > m) {
      m = Math.abs(categories[i]["amount"]);
      topCategory = categories[i]["title"];
    }
  }

  return (
    <div className="flex flex-col w-[100%] h-[100%] p-[3%] ">
      <div className=" flex flex-col p-[5%] h-[20%]  justify-between Items-center bg-gray-200 shadow-lg shadow-black overflow-hidden">
        <h2 className="ml-[30%] lg:text-xl md:text-base sm:text-sm text-gray-700 font-semibold">
          You spend ₹{totalSpent} this month{" "}
        </h2>
        <h2 className="ml-[30%] lg:text-xl md:text-base sm:text-sm text-gray-700 font-semibold">
          Top Category : {topCategory}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-[5%] lg:h-[50%] sm:h-[75%] sm:w-full gap-4">
        {categories.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            amount={item.amount}
            icon={item.icon}
            bgColor={item.bgColor}
          />
        ))}
      </div>
      <div className=" flex flex-col mt-[5%] p-[3%] h-[20%] justify-between Items-center bg-yellow-600  shadow-lg  shadow-black">
        <button
          onClick={handleInsight}
          className="text-lg  text-white hover:from-white hover:to-black"
        >
          💡 Get Suggestions
        </button>

        <p
          className={`lg:text-xl md:text-sm sm:text-sm text-gray-700 font-semibold transition-opacity duration-700 ease-in-out ${
            isCaption ? "opacity-100" : "opacity-0"
          }`}
        >
          {caption}
        </p>
      </div>
    </div>
  );
}
