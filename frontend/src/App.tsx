import "./App.css";
import { ToastContainer } from "react-toastify";
import Battle from "./pages/game";
import{Routes, Route, BrowserRouter} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import {Signup} from "./pages/signup";
import {Signin} from "./pages/signin";
 
import  OpenKnightHomepage  from "./pages/homepage";
import LearnPage from "./pages/learn";


 



const App=()=>{



  return (
    <div className="w-full h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/battle" element={<Battle />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/" element={ <OpenKnightHomepage/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learn" element={<LearnPage />} />

        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  )
}
export default App;