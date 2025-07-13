import mongoose from "mongoose";
let schema = mongoose.Schema;

const personSchema = new schema({
    name : String,
    age : Number,
    email : {type:String, required:true},
});

export default mongoose.model('Person',personSchema);