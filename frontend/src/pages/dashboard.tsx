import { useNavigate } from "react-router-dom";
import logo from "../assets/board.jpeg";
import playlogo from "../assets/playlogo.svg";
import {Button} from "../components/ui/button";
import bot from "../assets/device-bot.svg"
 
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    
    <div className="flex flex-col lg:flex-row items-start justify-start pt-6  min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-950 w-full overflow-hidden" >
      <div className="bg-neutral-900 flex flex-col lg:flex-col items-center justify-start  pt-4 lg:pt-8 w-full lg:w-48 h-auto lg:h-full lg:fixed lg:left-0 lg:top-1 gap-4 lg:gap-16 px-4 lg:px-0">
         <div className="flex items-center gap-2 font-bold text-lg lg:text-xl cursor-pointer" onClick={() => {window.location.href = "/"}}>
            <span className="text-yellow-400 text-xl lg:text-2xl">♘</span>
            <span className="text-yellow-400">OpenKnight</span>
          </div>
          
          <div className="flex flex-row lg:flex-col gap-2 lg:gap-0">
            <Button className="bg-gd-100 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mb-0 lg:mb-3 text-sm lg:text-base" onClick={() => {window.location.href = "/signup"}}>
             Sign Up
            </Button>
            <div className="text-white text-center mb-0 lg:mb-3 px-2 lg:px-0"> OR </div>
            <Button className="bg-gd-100 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mb-0 lg:mb-3 text-sm lg:text-base" onClick={() => {window.location.href = "/login"}}>
             Sign In
            </Button>
          </div>
          <div className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-950 text-center w-full h-[15px] hidden lg:block">


          </div>
          <div className="mb-4 lg:mb-8 w-full">
          <ul className="list-none gap-2 lg:gap-8 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible  ">
            <li><Button className="text-sm lg:text-md   bg-gray-800 w-full text-yellow-300 hover:bg-gradient-to-br from-gray-900 via-slate-800 to-gray-950 whitespace-nowrap" >Home</Button></li>
            <li><Button className="text-sm lg:text-md bg-gray-800 w-full text-yellow-300 hover:bg-gradient-to-br from-gray-900 via-slate-800 to-gray-950 whitespace-nowrap">Analysis</Button></li>
            <li><Button className="text-sm lg:text-md bg-gray-800 w-full text-yellow-300 hover:bg-gradient-to-br from-gray-900 via-slate-800 to-gray-950 whitespace-nowrap">Profile</Button></li>
            <li><Button className="text-sm lg:text-md bg-gray-800 w-full text-yellow-300 hover:bg-gradient-to-br from-gray-900 via-slate-800 to-gray-950 whitespace-nowrap">Leaderboard</Button></li>
          </ul>
          </div>
      </div>


      <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full grow- gap- mt-4 lg:mt-8 lg:ml-56 px-4 lg:px-0 lg:">
             <div className="flex flex-col items-center justify-center w-full h-full mb-8 lg:mb-24 rounded-3xl pt-10 md:pt-0">
               <img src={logo} alt="logo" className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[500px] lg:h-[500px]"/>
             </div>
             <div className="flex flex-col items-center justify-start mt-4 lg:mt-1 w-full h-full gap-6 lg:gap-10">
                <div className="text-2xl sm:text-3xl lg:text-5xl font-weight-300 font-bold text-center text-white mb-4 lg:mb-10 px-4" >Play Chess Online<br></br> on <span className="text-yellow-400">#2 </span> Site!</div>
                <div><Button className="bg-gd-100 flex hover:bg-emerald-400 ol items-center justify-center w-full sm:w-sm h-16 lg:h-[80px] mx-4 lg:mx-0" onClick={() => {navigate('/battle',{state:{bot:false}})}}>
                  <div className="mr-4 lg:mr-7"><img src={playlogo} alt="logo" className="w-10 h-10 lg:w-14 lg:h-14"/></div>
                  <div className="flex flex-col justify-center items-start"> <div className="text-xl lg:text-[30px] text-white font-bold">Play Online</div>
                      <div className="text-sm lg:text-base">Play with someone at your level</div></div></Button></div>


                <div><Button className="bg-zinc-500 hover:bg-zinc-400 flex ol items-center justify-center w-full sm:w-sm h-16 lg:h-[80px] mx-4 lg:mx-0" onClick={()=>{navigate('/battle',{state:{bot:true}})}}>
                  <div className="mr-4 lg:mr-7"><img src={bot} alt="logo" className="w-10 h-10 lg:w-14 lg:h-14"/></div>
                  <div className="flex flex-col justify-center items-start"> <div className="text-xl lg:text-[30px] text-white font-bold">Play Bots</div>
                      <div className="text-sm lg:text-base">Play with cutmizable bots</div></div></Button></div>
                 </div>
                  </div>
             </div>
       
   
  )
}


export default Dashboard
