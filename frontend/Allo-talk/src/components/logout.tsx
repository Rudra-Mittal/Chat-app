import { useNavigate } from "react-router-dom";


export default function Logout() {
  const navigate = useNavigate();
  
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem("user")
    )._id;
    
    // const { status } = await axios.get(`${logout}/${id}`);
      localStorage.clear();
      navigate("/login");
    
  };
  
  return (
    <button
      onClick={handleClick}
      className="flex justify-center items-center p-2 rounded-md bg-purple-400 border-none cursor-pointer"
    >
     Logout
    </button>
  );
}