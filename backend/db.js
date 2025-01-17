const mongoose = require('mongoose');

mongoose.connect(
    "mongodb+srv://keven3605y:3lBAaYlLnrMGqXNw@cluster0.ld2av.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(()=>{
    console.log("connectd to mongodb");
})
.catch((err)=>{
    console.log("Error connecting to mongodb" , err);  
});

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true,
        trim : true,
        lowercase : true,
        minLength : 3,
        maxLength : 30,
    },
    password : {
        type : String,
        required : true,
        minLength : 6,
    },
    firstName: {
        type : String,
        required : true,
        trim : true,
        maxLength : 50,
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50,
    },
});

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId, // ref to ser model 
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true
    },
});


const User = mongoose.model("User",userSchema);
const Account = mongoose.model("Account",accountSchema);
module.exports = {
    User,
    Account
};