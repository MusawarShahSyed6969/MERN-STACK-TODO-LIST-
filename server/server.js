require("dotenv").config()

const express = require("express");
const app = express();
const cors = require("cors")
const {router} = require("./routes/TodoList")
require("./DB/db")


app.use(cors())
app.use(express.json())
app.use(router)

// app.listen(process.env.PORT , () => {
//     console.log('Server is Running');
    
// })

module.exports = app;