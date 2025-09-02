  import { Square } from "chess.js";
  
  interface joinmessage{
    type:"join";
    message:string;
   
}
interface movemessage{
    type:"move";
     from:string;
    to:string;
}

interface authmessage{
    type:"auth";
    token:string;
}

interface getmovesmessage{
    type:"getmoves";
    from:Square;
}
interface waitingnullmessage{
    type:"waitingnull";
    message:string;
}

export type servermessage=joinmessage |movemessage |authmessage |getmovesmessage |waitingnullmessage;
