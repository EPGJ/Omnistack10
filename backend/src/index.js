const express = require("express")
const mongoose = require ("mongoose")
const dotenv = require("dotenv")
const routes = require("./routes")
const app = express();


dotenv.config()
mongoose.connect(process.env.DB_CONNECT,{useUnifiedTopology: true,useNewUrlParser: true },()=>{
    console.log("connected to db!")
})
mongoose.set('useCreateIndex', true);
app.use(express.json());
app.use(routes);


app.listen(3333,()=> console.log("Server running"))    