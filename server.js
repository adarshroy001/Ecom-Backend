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


const app = express()  ; 

//MiddleWares Connection 
app.use(express.json()) ; 

// Use CORS middleware
app.use(
       cors({
         origin: "http://localhost:5173", // Allow your frontend origin
         methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
         credentials: true, // Allow cookies if needed
       })
     );


//Using Routes 
app.use('/api/auth',authRoutes)
app.use('/api/cart',cartRoutes)
app.use("/api/products", productRoutes);


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