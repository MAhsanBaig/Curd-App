import mongoose from "mongoose";

 const curdSchema = new mongoose.Schema({
curd:{
    type:String,
    required:true
},
 },
 {timestamps:true}
) 
const Curd = mongoose.model("Curd",curdSchema)
export default Curd