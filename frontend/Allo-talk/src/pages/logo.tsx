import  { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../assets/loader.tsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setLogoRoute } from "../utils/authRoute";
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
export default function SetLogo() {
  const navigate = useNavigate();
  const [Logos, setLogos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLogo, setSelectedLogo] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem("user"))
      navigate("/login");
    // @ts-ignore
    else if(JSON.parse(localStorage.getItem("user")).isProfileSet){
      navigate("/");
    }
  }, []);

  const setProfilePicture = async () => {
    if (selectedLogo === undefined) {
      // @ts-ignore
      toast.error("Please select an Logo", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem("user")||"{}"
      );
      // console.log("buror");
      const { data } = await axios.post(`${setLogoRoute}/${user._id}`, {
        image: Logos[selectedLogo],
      });

      if (data.isSet) {
        user.isProfileSet = true;
        user.profilePic = Logos[selectedLogo];
        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        // @ts-ignore
        toast.error("Error setting Logo. Please try again.", toastOptions);
      }
    }
  };

  const fetchLogos = async () => {
    const logos = [];
    for (let i = 0; i < 4; i++) {
      const randString = Math.floor(Math.random()*1000).toString()
      const res= createAvatar(lorelei,{
        seed:randString,
      })
      const svg=res.toDataUri();
      // console.log(typeof(svg));
      // console.log(svg); 
      logos.push(svg);
    }
    // @ts-ignore
    setLogos(logos);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchLogos();
  }, []);


  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen bg-[#131324]">
            <Loader />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen gap-12 bg-[#131324]">
          <div className="text-center text-white">
            <h1>Pick an Logo as your profile picture</h1>
          </div>
          <div className="flex gap-8 grid grid-cols-2 md:grid-cols-4">
            {Logos.map((Logo, index) => (
              <div
                key={index}
                className={`p-2 rounded-full transition-all duration-500 ${
                  selectedLogo === index ? "border-4 border-[#4e0eff]" : "border-4 border-transparent"
                }`}
                // @ts-ignore
                onClick={() => setSelectedLogo(index)}
              >
                <img
                  src={`${Logo}`}
                  alt="Logo"
                  className="h-24 transition-all duration-500 cursor-pointer"
                />
              </div>
            ))}
          </div>
          <button
            onClick={setProfilePicture}
            className="px-8 py-4 font-bold text-white uppercase bg-[#4e0eff] rounded-lg cursor-pointer hover:bg-[#3c0bcc]"
          >
            Set as Profile Picture
          </button>
          <button
            onClick={fetchLogos}
            className="px-8 py-4 font-bold text-white uppercase bg-[#4e0eff] rounded-lg cursor-pointer hover:bg-[#3c0bcc]"
          >
            Generate more Logos
          </button>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
