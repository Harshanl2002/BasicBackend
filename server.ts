import express  from "express";

const App=express();

App.listen(3000,()=>{
    console.log("App was running on http://localhost:3000");
})