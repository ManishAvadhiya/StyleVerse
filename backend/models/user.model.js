import mongoose from "mongoose";
import brcypt from "bcryptjs"
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
  },
  cartItems: [
    {
      quantity: {
        type: Number,
        default:1,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        
      },
    },
  ],
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
  
},{timestamps:true});

userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    try{
        const salt = await brcypt.genSalt(10);
        this.password = await brcypt.hash(this.password,salt);
        next();
    }catch(err){
        next(err);
    }
})

userSchema.methods.comparePassword = async function(password){
    return await brcypt.compare(password,this.password);
}
const User = mongoose.model("User",userSchema)

export default User;