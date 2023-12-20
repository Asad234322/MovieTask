const express = require("express");
const app = express()
const env = require('dotenv')
const ConnectDB = require("./APi/Connection/Connection")
const MovieRoute = require ('./APi/Controller/Auth')
const mongoose = require('mongoose');
const cors = require("cors")
app.use(express.json());
app.use(
  cors({
    origin: '*'
})
);

app.use('/Movie',MovieRoute);

ConnectDB();
const PORT = 5002;

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });


app.listen(PORT,()=>{
  console.log(`app is listen at ${PORT}`)
})