import { useState, useEffect, useRef } from "react";
import ChatInput from "./chatInput";
import Logout from "./logout"; // Corrected the path to the 'Logout' component
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessage, getMessage } from "../utils/authRoute";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("user")
    );
    axios.post(getMessage, {
      sender: data._id,
      receiver: currentChat._id,
    }).then((response)=>{
      console.log(response);
      setMessages(response.data.messages);
    })
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem("user")
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (message) => {
    const data = await JSON.parse(
      localStorage.getItem("user")
    );
    console.log(message);
    socket.current.emit("send-message", {
      receiver: currentChat._id,
      sender: data._id,
      message,
    });
    // console.log(data._id,currentChat._id)
    await axios.post(sendMessage, {
      sender: data._id,
      receiver: currentChat._id,
      message: message,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: message });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("receive-message", (message:any) => {
        console.log(message); 
        setArrivalMessage({ fromSelf: false, message });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="grid grid-rows-[10%,80%,10%] gap-[0.1rem] overflow-hidden">
      <div className="flex justify-between items-center px-8">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
              className="h-12"
            />
          </div>
          <div className="username">
            <h3 className="text-white">{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="p-4 flex flex-col gap-4 overflow-auto scrollbar-thin scrollbar-thumb-[#ffffff39] scrollbar-track-transparent scrollbar-thumb-rounded-md">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()} className="flex">
              <div
                className={`message flex items-center ${
                  message.fromSelf ? "justify-end" : "justify-start"
                } w-full`}
              >
                <div
                  className={`content max-w-[40%] p-4 text-lg rounded-lg text-[#d1d1d1] break-words ${
                    message.fromSelf ? "bg-[#4f04ff21]" : "bg-[#9900ff20]"
                  }`}
                >
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}
