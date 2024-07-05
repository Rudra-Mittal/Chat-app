import  { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { host } from "../utils/authRoute";
import ChatContainer from "../components/chatContainer";
import Contacts from "../components/contacts";
import Welcome from "../components/welcome";
import { getUsers } from "../utils/authRoute";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      return navigate("/login");
    } else {
      setCurrentUser(
        JSON.parse(
          // @ts-ignore
          localStorage.getItem("user")
        )
      );
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      // @ts-ignore
      socket.current = io(host);
      // @ts-ignore
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect( () => {
    if (currentUser) {
      // @ts-ignore
      if (currentUser.isProfileSet) {
        axios.get(`${getUsers}`).then((data)=>{
          // console.log(data);
          setContacts(data.data.users);
        });
      } else {
        navigate("/logo");
      }
    }
  }, [currentUser]);

  const handleChatChange = (chat:any) => {
    setCurrentChat(chat);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center gap-4 items-center bg-[#131324]">
      <div className="h-[85vh] w-[85vw] bg-[#00000076] grid grid-cols-[25%,75%] md:grid-cols-[35%,65%]">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {currentChat === undefined ? (
          <Welcome /> 
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
          
        )}
      </div>
    </div>
  );
}
