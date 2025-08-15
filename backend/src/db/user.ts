import { usermodel,Iuser } from "../schema/db";

interface userinfo{
    username:string,
    password:string,
    prn:number,

}

export class user{
      Userdata: Iuser;
      joinedsockcet:WebSocket;

      constructor(socket : WebSocket,user:Iuser)
      {
        this.joinedsockcet=socket;
        this.Userdata=user;

      }

       
}