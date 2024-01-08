import express  from "express";
import dotenv from "dotenv";
import connecttoMongo from "./components/connecttomongo";
import Userrouter from "./routes/user.routes";

dotenv.config();

const App=express();
const port=process.env.PORT!;

connecttoMongo();
App.use('/user',Userrouter);
App.get("/",(req,res)=>{
    res.send("Hello world !!!");
})
App.listen(parseInt(port),()=>{
    console.log("App was running on http://localhost:"+port);
})