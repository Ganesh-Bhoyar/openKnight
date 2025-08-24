import { Chess } from "chess.js"
import {user} from "./user"
import { Iuser } from "../schema/db"
import WebSocket from 'ws';


export class game{
    gameid: string
    player1: Iuser
    player2:Iuser
    board: Chess
    moves:string[];
    currentmove:boolean;
    starttime: Date
    socket1:WebSocket;  
    socket2:WebSocket;

    constructor(player1:Iuser,player2 : Iuser, gameid:string,socket1:WebSocket,socket2:WebSocket)
    {
        this.player1=player1;
        this.player2=player2;
        this.board=new Chess();
        this.moves=[];
        this.currentmove=true;
         
        this.starttime= new Date();
        this.gameid=gameid;

        this.socket1=socket1;
        this.socket2=socket2;
        
    }

}