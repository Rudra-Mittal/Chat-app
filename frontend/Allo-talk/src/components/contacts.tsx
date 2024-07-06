import  { useState, useEffect } from "react";
import Logo from "../assets/logos.png";
// @ts-ignore
export default function Contacts({ contacts, changeChat}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const data = JSON.parse(
      // @ts-ignore
      localStorage.getItem("user")
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.profilePic);
  }, []);
// @ts-ignore
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <div className="grid grid-rows-[10%_75%_15%] overflow-hidden bg-[#080420] ">
          <div className="flex items-center justify-center gap-4 brand">
            <img src={Logo} alt="logo" className="h-8" />
            <h3 className="text-white uppercase">Allo talk</h3>
          </div>
          <div className="flex flex-col items-center gap-3.5 overflow-auto contacts">
            {contacts.map((contact:any, index:any) => (
              <div
                key={contact._id}
                className={`contact flex items-center gap-4 p-2.5 w-[90%] min-h-[5rem] cursor-pointer rounded transition-all duration-500 ${
                  index === currentSelected ? "bg-[#9a86f3]" : "bg-[#ffffff34]"
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`${contact.profilePic}`}
                    alt=""
                    className="h-12"
                  />
                </div>
                <div className="username">
                  <h3 className="text-white">{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-8 p-2.5 current-user bg-[#0d0d30]">
            <div className="avatar">
              <img
                src={`${currentUserImage}`}
                alt="avatar"
                className="h-16 w-auto"
              />
            </div>
            <div className="username">
              <h2 className="text-white text-lg">{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
