/////////////////////////////////////////////////
// Depencdencies
////////////////////////////////////////////////

require("dotenv").config() 
const express = require("express") 
const morgan = require("morgan") 
const methodOverride = require("method-override")
const path = require("path")
const BuildRouter = require("./controllers/fruit")
const UserRouter = require("./controllers/users")
const session = require("express-session")
const MongoStore = require("connect-mongo")

/////////////////////////////////////////////////
// Object
////////////////////////////////////////////////

const app = require("liquid-express-views")(express(), {
    root: [path.resolve(__dirname, "views/")],
  })

//////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////

app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically
// middleware to setup session
app.use(
  session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    saveUninitialized: true,
    resave: false,
  })
);

////////////////////////////////////////////
// Routes
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