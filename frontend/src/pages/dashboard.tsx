
import logo from "../assets/board.jpeg";
import playlogo from "../assets/playlogo.svg";
import {Button} from "../components/ui/button";
import bot from "../assets/device-bot.svg"
const Dashboard = () => {
  return (
    <div className="flex  items-center justify-center h-screen bg-zinc-800 w-full">
      <div className="bg-neutral-900 flex flex-col items-center justify-center w-48  h-full fixed left-0 ">
        navbar
      </div>

      <div className="flex  items-center justify-center w-full h-full grow- gap- mt-8 ml-56">
             <div className="flex flex-col items-center justify-center w-full h-full mb-24 rounded-3xl">
               <img src={logo} alt="logo" className="w-[500px] h-[500px]"/>
             </div>
             <div className="flex flex-col items-center justify-start mt-55 w-full h-full gap-10">
                <div className="text-5xl font-weight-300 font-bold text-center text-white mb-10">Play Chess Online<br></br> on #2  Site!</div>
                <div><Button className="bg-gd-100 flex hover:bg-emerald-400 ol items-center justify-center w-sm h-[80px]">
                  <div className="mr-7"><img src={playlogo} alt="logo" className="w-14 h-14"/></div>
                  <div className="flex  flex-col justify-center items-start"> <div className="text-[30px] text-white font-bold">Play Online</div>
                      <div>Play with someone at your level</div></div></Button></div> 
                
                <div><Button className="bg-zinc-500 hover:bg-zinc-400 flex  ol items-center justify-center w-sm h-[80px]">
                  <div className="mr-7"><img src={bot} alt="logo" className="w-14 h-14"/></div>
                  <div className="flex  flex-col justify-center items-start"> <div className="text-[30px] text-white font-bold">Play Bots</div>
                      <div>Play with cutmizable bots</div></div></Button></div>
                 </div>
                  </div>
             </div>
       
   
  )
}

export default Dashboard