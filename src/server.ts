import express  from "express";
import dotenv from "dotenv";
import connecttoMongo from "./components/connecttomongo";
import router from "./routes/index";
import bodyParser from "body-parser";
import { errorhandlermiddleware } from "./middleware/errorhandler";

dotenv.config();

const App=express();
const port=process.env.PORT!;
//routes, imports from other packages and error handellers
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


App.use(errorhandlermiddleware);
