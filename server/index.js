let express = require("express")
let app = express()
let mongoose = require("mongoose")
const enquiryRoutes = require("./App/routers/enquiryRoutes")
let cors = require("cors")
require("dotenv").config()

app.use(express.json())
app.use(cors())
app.use("/api/enquiry",enquiryRoutes)


//MONGOOSE CONNECTION
mongoose.connect(process.env.DBURL).then(()=>{
    console.log("db is connected")
  
}).catch((err)=>{
    console.log(err)
})
module.exports = app;