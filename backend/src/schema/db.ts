import mongoose from "mongoose";

interface IUser extends mongoose.Document {
    username: string;
    password: string;
  }

const userschema :mongoose.Schema=new mongoose.Schema({
    username:String,
    password:String
})

export const usermodel=mongoose.model<IUser>("users",userschema);
export type Iuser = IUser;