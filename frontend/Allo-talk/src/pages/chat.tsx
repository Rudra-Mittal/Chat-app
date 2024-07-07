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

  const [showContacts, setShowContacts] = useState(false);

  const toggleContacts = () => {
    setShowContacts(!showContacts);
  };
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
    // console.log(chat);
    toggleContacts();
    setCurrentChat(chat);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center gap-4 items-center bg-[#131324]">
    <div className={`md:hidden absolute top-4 left-4 z-50 transform ${showContacts ? 'rotate-90' : ''} transition duration-300 ease-in-out`} onClick={toggleContacts}>
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
    </div>
      <div className={`h-screen w-full bg-[#00000076] grid grid-cols-[0%,100%] transform transition duration-500 ease-in-out  ${(!showContacts)?"md:grid-cols-[35%,65%]":" grid-cols-[80%,0%] "}`}>
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
