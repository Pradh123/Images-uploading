import mongoose from "mongoose"
const UserSchema=new mongoose.Schema({
    name:{
        type:String
    },
    age:{
        type:String
    },
    title:{
        type:String
    },
    path:{
        type:String
    }
},{timestamps:true})

const User=mongoose.models.User||mongoose.model("User",UserSchema)

export default User