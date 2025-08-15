import { useState,useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Rocketicon from "@/components/ui/rocketicon"
import { TimerIcon, ZapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import pieces from "@/components/ui/pieces";
import { toast } from "react-toastify";
 

 
const Battle = () => {
  const [gamestarted, setGameStarted] = useState<boolean>(false);
  const [board, setBoard] = useState<string>("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  const [move, setMove] = useState<string>("w");
  const [color, setColor] = useState<string>("w");
  const [boardarr, setBoardArr] = useState<string[]>([]);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [validmoves, setValidMoves] = useState<string[]>([]); 


  
interface Move {
  color: 'w' | 'b';
  from: string;
  to: string;
  flags: string;
  piece: string;
  san: string;
  // and some optional fields like promotion
}


  const fentoboard = (fen: string) => {
  let boardStr = "";
  let move = "";

  const parts = fen.split(" ");
  const boardPart = parts[0];       
  const movePart = parts[1];        

  boardPart.split("").forEach(char => {
    if (char === "/") return;
    if (!isNaN(Number(char))) {
      boardStr += " ".repeat(Number(char));   
    } else 
    {
      boardStr += char;
    }
  });

  move = movePart;

  return { boardstr: boardStr.split(""), move };
};

useEffect(() => {

  const socket = new WebSocket("ws://localhost:3000");
  setSocket(socket);
  socket.onopen = () => {
    socket.send(JSON.stringify({ type: 'auth', token:  localStorage.getItem("token")}));
  };
  socket.onmessage = (event) => {
   const {type,message}=JSON.parse(event.data);
   if(type=="welcome")
   {
    console.log(message);
    //this should be in toast coninter later
   }
   if(type=="start")
   {
    setColor(message.color);
    console.log(message);//this should be in toast coninter later
    setGameStarted(true);
   }
   if(type=="authenticated")
   {
     if(message === "Ready to play") {
       console.log("You are authenticated and ready to play");
       // Set gamestarted to true or perform any other action
        
     }
     else if(message === "Please Signin First") {
       console.log("You are not authenticated");
       // Set gamestarted to false or perform any other action
       setGameStarted(false);
     }
     else if(message === "Unauthorized") 
    {
       console.log("Unauthorized");
       // Set gamestarted to false or perform any other action
     }
   }
   if(type == "waiting")
   {
     console.log(message);
   }
   if(type=="valid_moves")
   {
    setValidMoves((message as Move[]).map((m)  => m.to));
    console.log("Valid moves:", message);
    console.log("Current valid moves:", validmoves[0]);
   }
   if(type=="move")
   {
    setBoard(message.fen);
    console.log("Move made:", message.move);
   }
   if(type == "result")
   { 
     console.log(message);
     if(message.contains("checkmate"))
     {
        socket.close();
     }
     
   }
    
    //this should be in toast coninter later
     
  
  //  toast(
  //     <div>
  //       <div>Your Account is Succesfully created</div>
  //       <pre className="mt-2 w-[700px] rounded-md bg-neutral-950 p-4 overflow-auto">
  //         <code className="text-white">{JSON.stringify(`Successfully created account for ${message}  `, null, 2)}</code>
  //       </pre>
  //     </div>,
  //     {
  //       // any valid toast options here (e.g., position)
  //       position: "top-center",
  //       autoClose: 5000,
  //     }
  //   );
   
    
  };
  socket.onclose = () => {
    console.log("disconnected");
  };

  return () => {
    socket.close();
  };
}, []);

useEffect(() => {
      const { boardstr, move } = fentoboard(board);
      setBoardArr(boardstr);
      setMove(move);
},[board ,validmoves])

  return (
    <div className="flex  items-center justify-center h-screen bg-zinc-800 w-full">
      <div className="bg-neutral-900 flex flex-col items-center justify-center w-48  h-full fixed left-0 text-white">
        navbar  valid moves:{validmoves}
      </div>

      <div className="flex  items-center justify-center w-full h-full grow- gap- mt-8 ml-56">
             <div className="flex flex-col items-center justify-center w-full h-full mb-24 rounded-3xl">
           <div className="grid grid-cols-8 grid-rows-8 w-[500px] h-[500px] relative">
           
                    {Array.from({ length: 64 }, (_, i) => {
                        const row = Math.floor(i / 8);
                        const col = i % 8;
                        const file = 'abcdefgh'[col];
                        const rank = `${color == "w" ? 8 - row : row + 1}`;
                        const square = `${file}${rank}`;
                        const isDark = (row + col) % 2 === 1; // Classic chessboard pattern
                        const fromselect = square === from;

                        const piece =  `${ color == "w"? boardarr[i] : boardarr[(7 - row) * 8 + col]}`;
                        let validmove = validmoves.includes(square);
                        console.log("Current piece:", square);
                        console.log("Current valid move:", validmove);
                        return (
                        <div
                            key={i}
                            className={`w-full h-full flex justify-center align-center    ${validmove ?  `${isDark ?   "bg-emerald-200/60" : " bg-emerald-200/95" }` : `${isDark ?   " bg-zinc-500" : " bg-zinc-300" }`} relative `}
                            onClick={() => {
                                if(move === "b" && move==color  && boardarr[(7 - row) * 8 + col] !== " " && piece.toLowerCase() === piece  ) {
                                    setFrom(square);
                                    socket?.send(JSON.stringify({ type: "getmoves", from: square }));
                                }
                                else if(move === "w" && move==color  && boardarr[i] !== " " && piece.toUpperCase() === piece  ) {
                                    setFrom(square);
                                    socket?.send(JSON.stringify({ type: "getmoves", from: square }));
                                }
                                else if(move === "b"  && move==color  &&  from !== "" && validmove ) {
                                    setTo(square);
                                     console.log("Sending move:", from, "to:", square);
                                     setValidMoves([]);
                                    socket?.send(JSON.stringify({ type: "move", from, to: square }));


                                    //websocket to vaild move
                                    //check if move is valid
                                    //when from is set ,call websocket to get valid moves
                                    //if valid move then update board
                                }
                                else if(move === "w" && move==color &&  from !== "" && validmove ) {
                                    setTo(square);
                                    console.log("Sending move:", from, "to:", square);
                                    console.log("Sending move:", from, "to:", square);
                                    setValidMoves([]);
                                    socket?.send(JSON.stringify({ type: "move", from, to: square }));
                                    //websocket to vaild move
                                    //check if move is valid
                                    //when from is set ,call websocket to get valid moves
                                    //if valid move then update board
                                }
                            }}
                        ><span className="absolute top-0 left-0 p-1">{(col == 0 )?<span className={`${isDark ? "text-zinc-300" : "text-zinc-500"} text-sm`}>{rank}</span>:""}
                        </span><span className=" pt-2.5 p-1.5">{(piece !=" ")?<img src={pieces.find(p => p[piece])?.[piece]} alt="" className="w-full h-full"/>: null}</span>
                        <span className="absolute bottom-0 right-0 p-0.5">{(row == 7 )?<span className={`${isDark ? "text-zinc-300" : "text-zinc-500"}`}>{file}</span>:""}</span></div>
                        );
                    })}
                    </div>

             </div>
             <div className="flex flex-col items-center justify-start mt-100 w-full h-full gap-10">
                    {!gamestarted?<div className="mr-30 rounded-md w-[350px]  flex flex-col gap-20 items-center justify-center ">
                      <div>
                      <Select>
                      <SelectTrigger className="w-[350px] h-[70px]  bg-slate-200 font-white rounded-lg">
                        <SelectValue   placeholder="Select Time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">1 min  <Rocketicon/> </SelectItem>
                        <SelectItem value="dark">3 min <ZapIcon></ZapIcon></SelectItem>
                        <SelectItem value="system">10 min <TimerIcon></TimerIcon></SelectItem>
                      </SelectContent>
                    </Select>
                     </div>
                     <div>
                      <Button  onClick={() => {socket?.send(JSON.stringify({type:"join", messsage:"wants to join"}));}} className="bg-gd-100 flex hover:bg-emerald-400 ol items-center justify-center text-center w-[350px] h-[50px]">Start Game</Button>
                     </div>
                    </div>:
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    <div></div>}
                    <div></div>
                  </div>
             </div>

             </div>
 
       
       );
       }  

export default Battle;