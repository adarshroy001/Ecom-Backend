// Import and configure dotenv
import dotenv  from 'dotenv' ; 
dotenv.config() ; 

import express from 'express' ;
import mongoose from 'mongoose' ; 

//Importing Cors 
import cors from 'cors'
//importing routes 
import authRoutes from './src/routes/authRoutes.js'
import cartRoutes from './src/routes/cartRoutes.js'
import productRoutes from "./src/routes/productRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
import cookieParser from 'cookie-parser';


const app = express()  ; 

//MiddleWares Connection 
app.use(express.json()) ; 
app.use(cookieParser());

// Use CORS middleware
app.use(
       cors({
         origin: "http://localhost:5173", // Allow your frontend origin
         credentials: true, // Allow cookies if needed
       })
     );


//Using Routes 
app.use('/api/auth',authRoutes)
app.use('/api/cart',cartRoutes)
app.use("/api/products", productRoutes);
// Use the payment routes
app.use("/api/payment", paymentRoutes);


//Connecting Database 
mongoose
       .connect(process.env.MONGO_URI)
       .then(()=>{console.log('MongoDB Connected Successfully');})
       .catch((err)=>{console.log('Error is connecting Database : ',err);
       })

//Starting server 
const PORT = process.env.PORT || 4000 ; 
app.listen(PORT , ()=>{console.log(`Server is Running on Port : ${PORT} ` );
})