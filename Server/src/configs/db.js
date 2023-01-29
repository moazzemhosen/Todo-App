const mongoose =require( "mongoose");

const connect=()=>{

    return mongoose.connect("mongodb+srv://moazzem:moazzem@cluster0.4g7svdo.mongodb.net/Todo?retryWrites=true&w=majority")
}
module.exports=connect;