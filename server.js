/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
// Load ENV Variables
require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") //import morgan
const methodOverride = require("method-override")
const path = require("path")
const BuildRouter = require("./controllers/build")
const UserRouter = require("./controllers/users")
const session = require("express-session")
const MongoStore = require("connect-mongo")


/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express(), {
  root: [path.resolve(__dirname, "views/")],
})

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")) //logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically
// middleware to setup session
app.use(
  session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    saveUninitialized: true,
    resave: false,
  })
)

////////////////////////////////////////////
/////////////////Routes/////////////////////
////////////////////////////////////////////
app.use("/builds", BuildRouter)
app.use("/users", UserRouter) // send all "/users" routes to user router

app.get("/", (req, res) => {
  res.render("index.liquid")
})

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))
app.listen(process.env.PORT || 3000)

