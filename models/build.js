//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require("./connection")

// pull schema and model from mongoose
const { Schema, model } = mongoose

// make builds schema
// make builds schema
const buildsSchema = new Schema({
  name: String,
  item1: String,
  boots: String,
  item3: String,
  item4: String,
  item5: String,
  item6: String,
})
// make fruit model
const Build = model("Build", buildsSchema)

module.exports = Build
