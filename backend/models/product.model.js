import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
    },
    price: {
        type: Number,
        min:0,
        required: [true, "Product price is required"],
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
    },
    image: {
        type: String,
        required: [true, "Product image is required"],
    },
    category:{
        type:String,
        required: [true, "Product category is required"],
    },
    isFeatured:{
        type: Boolean,
        default:false,
    }
},{timestamps:true})

const Product = mongoose.model("Product",productSchema)

export default Product;