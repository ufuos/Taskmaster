const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title:{type:String, required:true},
    description: {type:String},
    status: {type: String, enum: ["pending","in-progress","completed"],default: "pending"},
    priority: {type: String ,enum:["Low", "Medium", "High"], default:"Medium"},
    deadline: {type: Date},
    completed: {type: Boolean, default: false},
    userId : {type: mongoose.Schema.Types.ObjectId, ref: "User", requred: true},
});
module.exports = mongoose.model("Task",taskSchema);