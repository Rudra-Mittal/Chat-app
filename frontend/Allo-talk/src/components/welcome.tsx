import { useState, useEffect } from "react";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(
      JSON.parse(
        // @ts-ignore
        localStorage.getItem("user")
      ).username
    );
  }, []);

  return (
    <div className=" -z-50 flex flex-col items-center justify-center text-white h-full">
      {/* <img src={Robot} alt="" className="h-80" /> */}
      <h1 className="text-2xl -z-50">
        Welcome, <span className="text-[#4e0eff]">{userName}!</span>
      </h1>
      <h3 className="text-lg mt-2">Please select a chat to start messaging.</h3>
    </div>
  );
}
