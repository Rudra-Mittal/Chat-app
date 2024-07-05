import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    // console.log(event);
    let message = msg;
    message += event.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="grid items-center grid-cols-[5%_95%] bg-[#080420] p-8 md:p-4 gap-4">
      <div className="flex items-center text-white gap-4">
        <div className="relative">
          <BsEmojiSmileFill
            onMouseEnter={handleEmojiPickerhideShow}
            onClick={handleEmojiPickerhideShow}
            className="text-2xl text-yellow-400 cursor-pointer"
          />
          {showEmojiPicker && (
            <div onMouseLeave={handleEmojiPickerhideShow} className="absolute top-[-410px] bg-[#080420] shadow-md border border-purple-400">
              <Picker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
      <form
        className="flex items-center  w-full bg-[#ffffff34] rounded-2xl gap-4 mb-3 pb-3"
        onSubmit={sendChat}
      >
        <input
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          className="w-full h-10 bg-transparent text-white border-none px-4 text-lg placeholder-white focus:outline-none"
        />
        <button type="submit" className="flex items-center bg-purple-400 rounded-2xl px-4 py-2">
          <IoMdSend className="text-2xl text-white" />
        </button>
      </form>
    </div>
  );
}
