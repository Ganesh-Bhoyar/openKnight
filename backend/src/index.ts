import { WebSocketServer  } from 'ws';
import WebSocket from 'ws';
import { gamemanger } from './db/gamemanger';
import express from 'express';
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import { servermessage } from './types/socket.types';
import http from 'http';
import userroute from './http-routes/userroutes';
import dotenv from 'dotenv';
import { usermodel,Iuser } from "./schema/db";
dotenv.config();
import cors from 'cors';


const  app=  express();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Welcome to the game server");
});
app.use("/api/v1/auth",userroute);

const server = http.createServer(app);
 let gm =new gamemanger();

const wss = new WebSocketServer({ server });
 const connect_db=async ()=>
        {    console.log(process.env.CONNECTION_STR!);   
           await mongoose.connect(process.env.CONNECTION_STR!);
          
        }
connect_db();

wss.on('connection',  async function connection(socket,req) {
    
  socket.send(JSON.stringify({type:"welcome",message:"welcome to the game"}));
  console.log("new connection established");
  socket.on('error', console.error);
  
  let player: Iuser ;
   socket.once('message',  async (msg :WebSocket.RawData) => {
    const { type, token } = JSON.parse(msg.toString());

    if (type == 'auth') {
      console.log("authenticating user");
      console.log(token);
      console.log(process.env.JWT_SECRET);
      try
      {const user =  await jwt.verify(token, process.env.JWT_SECRET!);
       if (user) {
          console.log("user authenticated");
          const username = (user as any).username;
          const info : Iuser | null  = await usermodel.findOne({ username });
          if (!info) {
            socket.send(JSON.stringify({type:"authenticated",message:"Please Signin First"}));
            socket.close();
          }else{
            socket.send(JSON.stringify({type:"authenticated",message:"Ready to play"}));
            player=info;
          }
       }
       else
       {
         console.log("unauth 1")
         socket.send(JSON.stringify({type:"authenticated",message:"Unauthorized"}));
          socket.close();
       }
    }
    catch(error) {
      console.log("unauth 2")
      console.error('Authentication error:', error);
      socket.send(JSON.stringify({type:"authenticated",message:"Unauthorized"}));
      socket.close();
    }
  } else {
    socket.send("Unauthorized");
    socket.close();
    }
  });
   
 

  socket.on('message', function message(data) {
  let message : servermessage = JSON.parse(data.toString());
  if(message.type=="join")
  {
     gm.adduser( player,socket);
  }
  if(message.type=="move")
  {
      gm.makemove(socket,message.from,message.to);
  }
  if(message.type=="getmoves")
  {
    gm.getmoves(socket,message.from);
  }
   
 
   
  })

   socket.on('close', () => {
      console.log('Connection closed');
      //gm.removeuser(player);
  });

 
});


  server.listen(process.env.PORT! || 3000, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
  });