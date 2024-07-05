import { BrowserRouter,Routes,Route } from "react-router-dom"
import Login from "./pages/login.tsx"
import Signup from "./pages/signup.tsx"
import SetLogo from "./pages/logo.tsx"
import Chat from "./pages/chat.tsx"
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logo" element={<SetLogo />} />
      <Route path="/"  element={<Chat />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
