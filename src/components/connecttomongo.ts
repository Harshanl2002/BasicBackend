import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri=process.env.URI!;
console.log(uri);
function connecttoMongo()
{
    mongoose.connect(uri).then(()=>{
        console.log("connected to DB");
    });
}

export default connecttoMongo;

