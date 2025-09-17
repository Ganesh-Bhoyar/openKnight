  import { Square } from "chess.js";
  
  interface joinmessage{
    type:"join";
    message:string;
    time:number;
   
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
    time:  number ;
}

interface botaddingmessage{
    type:"botadding";
    time:number;
}

export type servermessage=joinmessage |movemessage |authmessage |getmovesmessage |waitingnullmessage | botaddingmessage;
