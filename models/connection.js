/////////////////////////////////
// import dependencies
/////////////////////////////////
require("dotenv").config()
const mongoose = require("mongoose")

/////////////////////////////////
// database connection
/////////////////////////////////
// here we are setting up inputs for our connect function
const MONGODB_URI = process.env.MONGODB_URI
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
mongoose.connection.on("connected", () => {
  console.log(
    `Mongoose connected to ${mongoose.connection.host}:${mongoose.connection.port}`
  )
})

mongoose.connection.on("error", (err) => {
  console.log("Could not connect to MongoDB!", err)
})
// establish connection
mongoose.connect(MONGODB_URI, CONFIG)

// events for when our connection opens/closes/errors
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error))

/////////////////////////////////
// export our connection
/////////////////////////////////
module.exports = mongoose
