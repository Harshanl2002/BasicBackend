import express  from "express";
import dotenv from "dotenv";
import connecttoMongo from "./components/connecttomongo";
import router from "./routes/index";
import bodyParser from "body-parser";

dotenv.config();

const App=express();
const port=process.env.PORT!;
//routes and imports from other packages
App.use(bodyParser.json());
App.use("/api",router);


App.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
connecttoMongo();
App.get("/",(req,res)=>{
    res.send("Hello world !!!");
})
App.listen(parseInt(port),()=>{
    console.log("App was running on http://localhost:"+port);
})