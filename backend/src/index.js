const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const http = require("http")
const routes = require("./routes")
const cors = require("cors")
const {setupWebsocket} = require("./websocket")

const app = express();
const server = http.Server(app)
setupWebsocket(server)

dotenv.config()
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log("connected to db!")
})
mongoose.set('useCreateIndex', true);
app.use(cors())
app.use(express.json());
app.use(routes);


server.listen(3333, () => console.log("Server running"))    