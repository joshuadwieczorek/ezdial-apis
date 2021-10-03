const express = require("express");
const path = require("path");
var morgan = require('morgan')
const cors = require("cors");
require("dotenv").config();
require("./db/mongoose");
const userRouter = require("./routers/userRouter");
const contactRouter = require("./routers/contactRouter");
const globalContactRouter = require("./routers/globalContactRouter");

const app = express();
app.use(cors({
  credentials: true,
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    'http://192.168.100.227:5000'
  ]
}
));

app.use(express.json());
// morgan(':method :url :status :res[content-length] - :response-time ms');
app.use(morgan('tiny'));

// const publicDirectoryPath = path.join(__dirname, "../client/build");
// app.use(express.static(publicDirectoryPath));
app.use(express.static(path.join(__dirname, '../client/build')));

//import routes from routers folder
app.use(userRouter);
app.use(contactRouter);
app.use("/global", globalContactRouter);


app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});



module.exports = app;
