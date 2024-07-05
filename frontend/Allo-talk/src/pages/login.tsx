import  { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logos.png";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/authRoute";
import { ToastPosition } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  
  const toastOptions: ToastOptions<unknown> =  {
    position: "top-right" as ToastPosition,
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  const handleChange = (event:any) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, email } = values;
    if (password.length ==0) {
      toast.error(
        "Password can not be empty.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, password } = values;
      const { data } = await axios.post(loginRoute, {
          email,
          password,
        })
        console.log(data);
      if (data.status === false) {
        toast.error(data.message, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };
//   return <div>Gll</div>

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#131324] gap-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 bg-black bg-opacity-50 p-12 rounded-2xl"
        >
          <div className="flex items-center justify-center gap-4">
            <img src={Logo} alt="logo" className="h-20" />
            <h1 className="text-white uppercase">Allo talk</h1>
          </div>
          
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            className="w-full p-4 text-white bg-transparent border border-solid rounded-lg border-[#4e0eff] focus:outline-none focus:border-[#997af0]"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="w-full p-4 text-white bg-transparent border border-solid rounded-lg border-[#4e0eff] focus:outline-none focus:border-[#997af0]"
          />
          <button
            type="submit"
            className="px-8 py-4 font-bold text-white uppercase bg-[#4e0eff] rounded-lg cursor-pointer hover:bg-[#3c0bcc]"
          >
            Login
          </button>
          <span className="text-white uppercase">
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold text-[#4e0eff]">
              Sign Up
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
