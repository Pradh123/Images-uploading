import User from "@/Models/User";
import DbConnection from "../../../utils/DbConnection";
const getUserApi=async (req,res)=>{
DbConnection();
    try {

        const data=await User.find({});
        if(data&& data.length===0){
            return res.status(500).json({message:"something went wrong"})
        }
        return res.status(200).json({message:"data found successfully",data});
        
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }

}
export default getUserApi;