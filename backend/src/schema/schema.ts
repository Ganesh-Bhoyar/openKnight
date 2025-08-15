import { Schema, } from "mongoose";
import mongoose from "mongoose";


const user = new Schema({
    username: String,
    password: String,
    email: String,
});


const usermodel=mongoose.model("users",user);
export {usermodel};