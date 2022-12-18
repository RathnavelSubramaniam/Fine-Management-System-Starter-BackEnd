import mongoose from "mongoose";

const config=async()=>{
   try {`1`
    await  mongoose.connect('mongodb://localhost:27017/fineMangement')
  // await mongoose.connect("mongodb+srv://kumar:kumar@cluster0.mp19l.mongodb.net/?retryWrites=true&w=majority")
    console.log("DBconected");
    
   } catch (error) {
    console.log("error",error);
   }
}

export default config;
