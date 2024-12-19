import express from 'express';
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import productsRoutes from "./routes/products.route.js"
import cartRoutes from "./routes/cart.route.js"
import couponRoutes from "./routes/coupon.route.js"
import paymentRoutes from "./routes/payment.route.js"
import analyticRoutes from "./routes/analytics.route.js"
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Allow cookies to be sent
  }));
app.use(express.json({limit:"10mb"}));
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/products",productsRoutes);
app.use("/api/cart",cartRoutes)
app.use("/api/coupons",couponRoutes)
app.use("/api/payments",paymentRoutes)
app.use("/api/analytics",analyticRoutes)

app.listen(PORT,()=>{
    console.log(`server running at ${PORT} port`)
    connectDB();
})