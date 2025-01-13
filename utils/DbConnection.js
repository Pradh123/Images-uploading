import mongoose from "mongoose";
const DbConnection=async ()=>{
    try {
//   console.log("databse uri",process.env.NEXT_PUBLIC_DATABASE_URI);
        const conn=await mongoose.connect("mongodb+srv://vermapradhumn32:Pradhumn123@foursteps1.5nlmp.mongodb.net/fourstep?retryWrites=true&w=majority");
        
        return conn
        
    } catch (error) {
        console.log("database is not connected ",error)
    }
}

export default DbConnection