const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')

dotenv.config()
app.use(cors())

const nroute=require('./Rrouter/auth')

mongoose.connect(process.env.Mongodb_Url).then(()=>{
    console.log("database connected");
}).catch((err)=>{
    console.log('error',err);

})
app.use(express.json())
app.use('/api/sub',nroute)

app.listen(5000,()=>{
    console.log('port 5000 is connected');
})
