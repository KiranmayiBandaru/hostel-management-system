const express = require("express")
require('dotenv').config()
const connectDB = require("./config/db.js")
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoute')
const blockRoutes = require('./routes/blockRoute')
const roomRoutes = require('./routes/roomRoute')
const bedRoutes = require('./routes/bedRoute')
connectDB();

const app = express()

app.use(express.json())

app.get('/', (req, res)=>{
     res.send("the hostel backend is running")
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin', userRoutes)
app.use('/api/blocks', blockRoutes)
app.use('/api/rooms' , roomRoutes)
app.use('/api/beds' , bedRoutes)

const PORT = process.env.PORT
app.listen(PORT , ()=>{ 
    console.log(`the server is listening `)
})
