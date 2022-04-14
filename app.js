require('dotenv').config()
const mongoose=require('mongoose')
const express =require("express") 
const app= express()
mongoose.connect(process.env.MONGO_DB)





app.use(express.json())
app.use('/producto',require('./src/routes/producto'))

app.listen(process.env.PORT,(res=>console.log(`Server on port ${process.env.PORT}`)))