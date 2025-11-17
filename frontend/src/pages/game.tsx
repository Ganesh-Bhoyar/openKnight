import { useState, useEffect ,useRef} from "react";
import { useLocation } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Rocketicon from "@/components/ui/rocketicon"
import { TimerIcon, UserCircle2, ZapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import pieces from "@/components/ui/pieces";
import { toast } from "react-toastify";
import GameInfo from "@/components/ui/gameinfo";
import { getSquareColor } from "@/utils/getsquareColor";
import ChessWaitingPage from "./waitingplayer";
 import ChessResultsPage, { GameOverTimeout, LossPage } from "./result";
import Timer from "@/utils/timerlogic";
 
 
 




const Battle = () => {
  const [gamestarted, setGameStarted] = useState<boolean>(false);
  const [board, setBoard] = useState<string>("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  const [move, setMove] = useState<string>("w");
  const [color, setColor] = useState<string>("w");
  const [boardarr, setBoardArr] = useState<string[]>([]);
  const [from, setFrom] = useState<string>("");
  const [, setTo] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [validmoves, setValidMoves] = useState<string[]>([]);
  const [username, setUsername] = useState<string>("");
  const [opponent, setOpponent] = useState<string>("");
  const [history, setHistory] = useState<history[]>([]);
  const [gameid, setGameid] = useState<string>("");
  const [waiting, setWaiting] = useState<boolean>(false);
  const [gameover, setGameover] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>("");
  const [playertimeleft, setPlayertimeleft] = useState<number>(0);
  const [opponenttimeleft, setOpponenttimeleft] = useState<number>(0);
  const [timeup, setTimeup] = useState<boolean>(false); 
  const  timerA = useRef<NodeJS.Timeout | null>(null);
  const  timerB = useRef<NodeJS.Timeout | null>(null);
  const [timechosen, settimechosen] = useState<string>("");
  const [time, settime] = useState<Date>(new Date());
  const location = useLocation();
  const bot =useRef<boolean>(location.state?.bot || false);
  
 


  interface history {
    before: string;
    after: string;
    color: string;
    piece: string;
    from: string;
    to: string;
    san: string;
    lan: string;
    flags: string;
  }

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
      } else {
        boardStr += char;
      }
    });

    move = movePart;

    return { boardstr: boardStr.split(""), move };
  };
  
  useEffect(() => {

    const socket = new WebSocket("wss://openknight-backend.onrender.com");
    setSocket(socket);
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'auth', token: localStorage.getItem("token") }));
    };

    
    socket.onmessage = (event) => {
      const { type, message } = JSON.parse(event.data);
      if (type == "welcome") {
       //console.log(message);
        //this should be in toast coninter later
      }
      if (type == "start") {
        setWaiting(false);
        setColor(message.color);
      // console.log(message);//this should be in toast coninter later
        setUsername(message.message[0]);
        setOpponent(message.message[1]);
        setGameid(message.message[2]);
        setGameStarted(true);
         
        settime( new Date())
      }
      if (type == "authenticated") {
        if (message === "Ready to play") {
         // console.log("You are authenticated and ready to play");
          toast(message, {
            position: "top-center",
            autoClose: 2000,
              style: {  color: '#1F2937'}
          });
          // Set gamestarted to true or perform any other action
          
        }
        else if (message === "Please Signin First") {
         // console.log("You are not authenticated");
          // Set gamestarted to false or perform any other action
          setGameStarted(false);
          toast(
            "Please Sign In First",
            {
              // any valid toast options here (e.g., position)
              position: "top-center",
              autoClose: 2000,
                style: {  color: '#1F2937'}
            }
          );
          setTimeout(() => {window.location.href="/login"}, 2000);
          
        }
        else if (message === "Unauthorized") {
          //console.log("Unauthorized");
          // Set gamestarted to false or perform any other action
          setGameStarted(false);
          toast(
            "Unauthorized",
            {
               
              position: "top-center",
              autoClose: 2000,
              style: {  color: '#1F2937'}
            }
          );
          setTimeout(() => {window.location.href="/login"}, 2000);
        }
      }
      if (type == "waiting") {
        setWaiting(true);
      }
      if (type == "valid_moves") {
        setValidMoves((message as Move[]).map((m) => m.to));
        //console.log("Valid moves:", message);
        //console.log("Current valid moves:", validmoves[0]);
      }
      if (type == "move") {
        setBoard(message.message.fen);
        setHistory((message.message.move as history[]).map((m) => m));
        //console.log("Move made:", message.message.move);
      }
      if (type == "result") {

        //console.log("Game over:", message);
        if (message.message.toLowerCase().includes("checkmate")) {
          setGameover(true);
          setWinner(message.color == "w" ? "w" : "b");
          socket.close();
        }
        else if (message.message.toLowerCase().includes("stalemate")) {
          setGameover(true);
          setWinner("draw");
          socket.close();
        }
        else {
          //console.log(message.message);
          toast(
            <div>
              <div></div>
              <pre className="mt-2 w-[700px] rounded-md bg-neutral-950 p-4 overflow-auto">
                {message.message}
              </pre>
            </div>,
            {
              // any valid toast options here (e.g., position)
              position: "top-center",
              autoClose: 5000,
            }
          );
        }


      }
 
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
  }, [board, validmoves])

  useEffect(() => {
    if(move ==color && gamestarted)
    {
        Timer(setPlayertimeleft, false,  setTimeup,timerA);
        Timer(setOpponenttimeleft, true,  setTimeup,timerB);
    }
    else if(move != color && gamestarted)
    {
         Timer(setPlayertimeleft, true,  setTimeup,timerA);
        Timer(setOpponenttimeleft, false,  setTimeup,timerB);
    }
  },[move,gamestarted])

  const resultProps = {
    player: {
      name: username,
      rating: 1450,
      avatar: "👤",
      color: color==="w"?"white":"black"
    },
    opponent: {
      name: opponent,
      rating: 1380,
      avatar: "👤",
      color: color==="w"?"black":"white"
    },
    gameStats: {
      duration: "12:34",
      moves: history.length || 0,
      winType: "Checkmate",
      timeControl: "10+0"
    },
    ratingChange: "+18"
  };

  return (
    <div className="flex  items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-950 w-full overflow-hidden">
      <div className="bg-neutral-900 flex flex-col items-center justify-center w-48  h-12 fixed left-0 top-6 text-white">
       <div className="flex items-center gap-2 font-bold text-xl cursor-pointer" onClick={() => {window.location.href = "/"}}>
            <span className="text-yellow-400 text-2xl">♘</span>
            <span className="text-yellow-400">OpenKnight</span>
          </div>
      </div>

      <div className="flex flex-col  md:flex-row items-center justify-center w-full h-full grow- gap- mt-8 md:ml-56 noscroll">
        <div className="flex flex-col items-center justify-center w-full h-full mb-16 rounded-3xl pt-68  pl-12 md:pl-0 pr-12 md:pr-0 md:pt-0">
          
          
           <div className=" text-white  flex  flex-row justify-center align-center mr-28 md:mr-12   mb-2 ml-36 md:ml-12 gap-2">{gamestarted ? <><span className="text-xl flex justify-center items-end gap-2 mt-5 md:mt-0"><UserCircle2 className=""></UserCircle2>{opponent}</span><span className="ml-50 md:ml-84"><Button className="bg-slate-100 text-gray-700 h-8 text-xl w-24 hover:text-white" ><TimerIcon className="size-md"></TimerIcon>{playertimeleft}</Button></span></> : null}   </div>

          <div className="grid grid-cols-8 grid-rows-8 w-[350px] h-[350px] md:w-[500px] md:h-[500px] relative">

            {Array.from({ length: 64 }, (_, i) => {
              const row = Math.floor(i / 8);
              const col = i % 8;
              const file = 'abcdefgh'[col];
              const rank = `${color == "w" ? 8 - row : row + 1}`;
              const square = `${file}${rank}`;
              const isDark = (row + col) % 2 === 1; // Classic chessboard pattern
              // const fromselect = square === from;
              const prevmove = history.length === 0 ? false : history[history.length - 1].lan.includes(square);
              const piece = `${color == "w" ? boardarr[i] : boardarr[(7 - row) * 8 + col]}`;
              let validmove = validmoves.includes(square);
              // console.log("Current piece:", square);
              // console.log("Current valid move:", validmove);
              // console.log("previous move: ", prevmove);

              const squareColor = getSquareColor({
                isPrevMove: prevmove,
                isValidMove: validmove,
                isLight: !isDark,
              });

              return (
                <div
                  key={i}
                  className={`w-full h-full flex justify-center align-center   ${squareColor} relative `}
                  onClick={() => {
                    if (move === "b" && move == color && boardarr[(7 - row) * 8 + col] !== " " && piece.toLowerCase() === piece) {
                      setFrom(square);
                      socket?.send(JSON.stringify({ type: "getmoves", from: square }));
                    }
                    else if (move === "w" && move == color && boardarr[i] !== " " && piece.toUpperCase() === piece) {
                      setFrom(square);
                      socket?.send(JSON.stringify({ type: "getmoves", from: square }));
                    }
                    else if (move === "b" && move == color && from !== "" && validmove) {
                      setTo(square);
                      //console.log(to)
                     // console.log("Sending move:", from, "to:", square);
                      setValidMoves([]);
                      socket?.send(JSON.stringify({ type: "move", from, to: square }));
                      //console.log("Sending move:", from, "to:", square);
                       

 
                    }
                    else if (move === "w" && move == color && from !== "" && validmove) {
                      setTo(square);
                     // console.log("Sending move:", from, "to:", square);
                    //  console.log("Sending move:", from, "to:", square);
                      setValidMoves([]);
                      socket?.send(JSON.stringify({ type: "move", from, to: square }));
                     // console.log("Sending move:", from, "to:", square);
                     
                    }
                  }}
                ><span className="absolute top-0 left-0 p-1">{(col == 0) ? <span className={`${isDark ? "text-zinc-300" : "text-zinc-500"} text-sm`}>{rank}</span> : ""}
                  </span><span className=" pt-2.5 p-1.5">{(piece != " ") ? <img src={pieces.find(p => p[piece])?.[piece]} alt="" className="w-full h-full" /> : null}</span>
                  <span className="absolute bottom-0 right-0 p-0.5">{(row == 7) ? <span className={`${isDark ? "text-zinc-300" : "text-zinc-500"}`}>{file}</span> : ""}</span></div>
              );
            })}
          </div>
         <div className=" text-white  flex justify-center align-center mr-28 md:mr-12 mt-2 ml-36 md:ml-12 gap-2">{gamestarted ? <><span className="text-xl flex justify-center items-start gap-2 "><UserCircle2 className=""></UserCircle2>{username}</span><span className="ml-42 md:ml-84 mt-4 md:mt-0"><Button className="bg-slate-100 text-gray-700 h-8 text-xl w-24 hover:text-white" ><TimerIcon className="size-md"></TimerIcon>{opponenttimeleft}</Button></span></> : null}   </div>
          {/* <div className=" text-white  flex  flex-row justify-center align-center mr-28 md:mr-12   mb-2 ml-36 md:ml-12 gap-2">{gamestarted ? <><span className="text-xl flex justify-center items-end gap-2 mt-5 md:mt-0"><UserCircle2 className=""></UserCircle2>{opponent}</span><span className="ml-50 md:ml-84"><Button className="bg-slate-100 text-gray-700 h-8 text-xl w-24 hover:text-white" ><TimerIcon className="size-md"></TimerIcon>{playertimeleft}</Button></span></> : null}   </div> */}

        </div>
        <div className="flex flex-col items-center justify-start mt-0 md:mt-35 w-full h-full gap-10">
  {gameover ? (
    <div className="fixed inset-0 w-full bg-opacity-50 flex items-center justify-center">
      {winner === "draw" ? (
        <div>It's a draw!</div>
      ) : winner === color ? (
        <ChessResultsPage {...resultProps} />
      ) : (
        <LossPage {...resultProps} />
      )}
    </div>
  ) :timeup ?(
    <div className="fixed inset-0 w-full h-screen py-10 bg-opacity-50 flex items-center justify-center my-10">
      <GameOverTimeout {...resultProps}  playerTimeLeft={opponenttimeleft.toString()}  opponentTimeLeft={playertimeleft.toString()} onPlayAgain={()=>{window.location.href="/battle"}} onReturnHome={()=>{window.location.href="/"}}/>
    </div>
  ): waiting ? (
    <div className="fixed inset-0 w-full bg-opacity-50 flex items-center justify-center">
      <ChessWaitingPage socket={socket} timechoosen={parseInt(timechosen)}/>
    </div>
  ) : !gamestarted ? (
    <div className="md:mr-30 rounded-md w-[200px] md:w-[350px] flex flex-col gap-10 md:gap-20 items-center justify-center mt-2 md:mt-30 mr-5">
      <Select onValueChange={(value) => settimechosen(value)}>
        <SelectTrigger className="w-[200px] md:w-[350px] h-[70px] bg-slate-200 font-white rounded-lg">
          <SelectValue placeholder="Select Time" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="60">
            1 min <Rocketicon />
          </SelectItem>
          <SelectItem value="180">
            3 min <ZapIcon />
          </SelectItem>
          <SelectItem value="600">
            10 min <TimerIcon />
          </SelectItem>
        </SelectContent>
      </Select>

      <Button
        onClick={() => {
          if(bot.current == false && timechosen!=""){socket?.send(
            JSON.stringify({ type: "join", messsage: "wants to join", time: parseInt(timechosen)})
          );}
          else if(bot.current == true && timechosen!="")
          {
            socket?.send(
            JSON.stringify({ type: "botadding", time: parseInt(timechosen)})
          );
          }
          setPlayertimeleft(parseInt(timechosen));
          setOpponenttimeleft(parseInt(timechosen));
        }}
        className="bg-gd-100 flex hover:bg-emerald-400 items-center justify-center text-center w-[200px] md:w-[350px] h-[50px]"
      >
        Start Game
      </Button>
    </div>
  ) : (
    <div className="pb-68 md:pb-100">
      <GameInfo
        history={history}
        gameinfo={{
          name1: username,
          name2: opponent,
          gameid: gameid,
          gamestarted: time,
        }}
      />
    </div>
  )}
</div>

      </div>
    </div>
              


  );
}

export default Battle;