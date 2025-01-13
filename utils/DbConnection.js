const { default: mongoose } = require("mongoose")

const DbConnection=async ()=>{
    try {
        const conn=await mongoose.connect(process.env.DATABASE_URI);
        return conn
        
    } catch (error) {
        console.log("database is not connected ",error)
    }
}

export default DbConnection