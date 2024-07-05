import React, { useState, useEffect } from "react";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(
      JSON.parse(
        localStorage.getItem("user")
      ).username
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-white h-full">
      {/* <img src={Robot} alt="" className="h-80" /> */}
      <h1 className="text-2xl">
        Welcome, <span className="text-[#4e0eff]">{userName}!</span>
      </h1>
      <h3 className="text-lg mt-2">Please select a chat to start messaging.</h3>
    </div>
  );
}
