import   {game } from './game';
import {user} from "./user";
import {nanoid} from 'nanoid';
import { usermodel,Iuser } from "../schema/db";
import WebSocket from 'ws';
import { Square } from 'chess.js';


 export class gamemanger{
    games : game[]
    waiting: Iuser | null;
    waitingSocket: WebSocket | null;

    constructor()
    {
        this.games=[];
        this.waiting=null;
        this.waitingSocket=null;
    }

    adduser(player : Iuser,socket: WebSocket)
    {
        //if waiting is null
        if(this.waiting==null && this.waitingSocket==null)
        {
            this.waiting=player;
            console.log("Player " + player.username + " is waiting for another player");
            this.waitingSocket=socket;
            console.log("Waiting for player 2");
            socket.send(JSON.stringify({ type: "waiting", message: "Waiting for player 2" }));
        }
        else
        {   let gameid =nanoid (5);
            this.games.push(new game(this.waiting!,player,gameid,this.waitingSocket!,socket));
            const name = this.waiting!.username;
            this.waiting=null;
           
            console.log("Game started between " + name + " and " + player.username);
            this.waitingSocket!.send(JSON.stringify({ type: "start", message:{ message:[name,player.username,gameid],color: "w" }}));
             this.waitingSocket=null;
            socket.send(JSON.stringify({ type: "start", message: {message:[player.username,name,gameid],color: "b"}}));
        }
    }


     


     //making new move
  makemove(socket: WebSocket, from: string, to: string) {
  const currentgame = this.games.find(
    game => game.socket1 === socket || game.socket2 === socket
  );

  if (
    currentgame &&
    (
      (currentgame.socket1 === socket && currentgame.currentmove === true) ||
      (currentgame.socket2 === socket && currentgame.currentmove === false)
    )
  ) {
    const move = { from, to };
    let moveresult=null;

    try {
      moveresult = currentgame.board.move(move);
    } catch (e) {
      socket.send(JSON.stringify({ type: "move", message: "Illegal move" }));
      return;
    }

    // If move is illegal (e.g. undefined returned)
    if (!moveresult) {
      socket.send(JSON.stringify({ type: "move", message: "Illegal move" }));
      return;
    }

    // Append move to history
    currentgame.moves.push(`${from}-${to}`);

    // Toggle turn
    currentgame.currentmove = !currentgame.currentmove;


const message1 = {
      
      message:{
        move: currentgame.board.history({ verbose: true }),
      fen: currentgame.board.fen()
      }
     
    };

    currentgame.socket1.send(JSON.stringify({
       type: "move",
        message: message1
      }));
    currentgame.socket2.send(JSON.stringify({
        type: "move",
        message: message1
      }));

    // Optional: log current board
    console.log(currentgame.board.ascii());
  

    // Checkmate
    if (currentgame.board.isGameOver() && currentgame.board.isCheckmate()) {
      console.log("checkmate is conditionally rendered");
      const winner = currentgame.socket1 === socket ? { username: currentgame.player1.username, color: "w" } : { username: currentgame.player2.username, color: "b" };

      // Notify both players
      currentgame.socket1.send(JSON.stringify({
        type: "result",
         message: {
          message: `Checkmate! ${winner.username} wins`,
          color: winner.color
        }
      }));
      currentgame.socket2.send(JSON.stringify({
        type: "result",
        message: {
          message: `Checkmate! ${winner.username} wins`,
          color: winner.color
        }
      }));

      // Optionally remove game
      // this.games.splice(this.games.indexOf(currentgame), 1);
 
    }

     
    if (currentgame.board.isStalemate()) {
      currentgame.socket1.send(JSON.stringify({
        type: "result",
        message: "Stalemate — Draw"
      }));
      currentgame.socket2.send(JSON.stringify({
        type: "result",
        message: "Stalemate — Draw"
      }));
      return;
    }

    if (currentgame.board.inCheck()) {
      if(socket === currentgame.socket1) {
         currentgame.socket2.send(JSON.stringify({
        type: "result",
        message: "Check — Your turn"
      }));
      currentgame.socket1.send(JSON.stringify({
        type: "result",
        message: "Check — Opponent's turn"
      }));
        
     
    }
  
    else
    {
        currentgame.socket2.send(JSON.stringify({
        type: "result",
        message: "Check — Opponent's turn"
      }));
      currentgame.socket1.send(JSON.stringify({
        type: "result",
        message: "Check — Yours turn"
      }));
    }
  }

    // Normal move: notify both players

}}

getmoves(socket: WebSocket,from:Square) {
  const currentgame = this.games.find(
    game => game.socket1 === socket || game.socket2 === socket
  );

  if (currentgame) {
    socket.send(JSON.stringify({
      type: "valid_moves",
      message: currentgame.board.moves({ square:from, verbose: true })
    }));
  }
}

updatewaiting(socket: WebSocket, status: boolean) {
   if(socket == this.waitingSocket)
   {
      this.waitingSocket = status ? socket : null;
   }
}
 }
 

