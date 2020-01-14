const express = require("express");
const mongoose = require ("mongoose");
const routes = require("./routes")
const app = express();
mongoose.connect("mongodb+srv://epgj:paralax@cluster0-8scer.mongodb.net/week10?retryWrites=true&w=majority",{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
mongoose.set('useCreateIndex', true);
app.use(express.json());
app.use(routes);



app.listen(3333)    