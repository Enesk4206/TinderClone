import mongoose from "mongoose";
import bcryptjs from "bcryptjs"


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password: {
        type:String,
        required:true
    },
    age:{
        type:Number,
        required: true,
    },
    gender:{
        type:String,
        required:true,
        enum: ['male', 'female'],
    },
    genderPreference:{
        type:String,
        required:true,
        enum: ['male', 'female', "both"]

    },
    bio:{
        type:String,
        default:"",
    },
    image: {
        type:String,
        default:"",
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    dislikes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    matches:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],

},{timestamps:true});

//before save user password we gone do hashed
userSchema.pre("save", async function(next){
    this.password = bcryptjs.hash(this.password , 10);
    next();
});

//compare and check pass method
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcryptjs.compare(enteredPassword, this.password);
}


const User =mongoose.model("User", userSchema);
export default User;