import mongoose from "mongoose";

const {Schema} = mongoose;

const cursoSchema = new Schema({
    title:{
        type:String,
        require:true,
        trim: true
    } ,
    description:{
        type: String,
        require: true
    },
    pricing:{
        type:Number,
        require: true
    },
    path:{type:String}
})

module.exports= mongoose.model('curso',cursoSchema);
