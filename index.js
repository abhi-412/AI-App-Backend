const express = require('express');
const dbConnect = require("./utils/dbConnect");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes")
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const session = require("express-session");

const PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));

const sessionConfig = {
    name: "_blob",
    secret: "Abhi",
    saveUninitialized: true,
    resave: false,
    cookie: {
        httpOnly: process.env.NODE_ENV === "production",
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

dbConnect();

app.use(session(sessionConfig));

app.get("/", (req, res) => { res.send("Welcome to the Server"); })


app.use("/api/user",userRoutes)



app.listen(PORT,()=>{
    console.log(`Server runnning at port ${PORT}`)
})


