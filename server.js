// Import and configure dotenv
import dotenv  from 'dotenv' ; 
dotenv.config() ; 

import express from 'express' ;
import mongoose from 'mongoose' ; 
//importing routes 
import authRoutes from './src/routes/authRoutes.js'

const app = express()  ; 

//MiddleWares Connection 
app.use(express.json()) ; 


//Using Routes 
app.use('/api/auth',authRoutes)

//Connecting Database 
mongoose
       .connect(process.env.MONGO_URI)
       .then(()=>{console.log('MongoDB Connected Successfully');})
       .catch((err)=>{console.log('Error is connecting Database : ',err);
       })

//Starting server 
const PORT = process.env.PORT || 4000 ; 
app.listen(PORT , ()=>{console.log(`Server is Running on Port : ${PORT}`);
})