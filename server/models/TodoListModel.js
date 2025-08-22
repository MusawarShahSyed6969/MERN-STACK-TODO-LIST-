const mongoose = require("mongoose")

const TodoSchema =  new mongoose.Schema
({
    Todo : {
        type:String,
        required:true,
    },
    isCompleted :{
        type:Boolean,
        default:false
    }
})


const TodoListModel = mongoose.model("TodoListModel",TodoSchema);


module.exports = TodoListModel