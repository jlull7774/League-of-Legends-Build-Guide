////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Build = require("../models/build")

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
router.use((req, res, next) => {
  if (req.session.loggedIn) {
    next()
  } else {
    res.redirect("/users/login")
  }
})

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// index route

router.get("/", (req, res) => {
  // find all the builds
  Fruit.find({ username: req.session.username })
    // render the template after they are found
    .then((builds) => {
      console.log(builds)
      res.render("builds/index.liquid", { builds })
    })
    .catch((error) => {
      console.log(error)
      res.json({ error })
    })
})

// new route

router.get("/new", (req, res) => {
  res.render("builds/new.liquid")
})

// delete route

router.delete("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id.toString().trim()
  // delete the fruit
  Fruit.findByIdAndRemove(id)
    .then((fruit) => {
      // redirect to main page after deleting
      res.redirect("/builds")
    })
    // send error as json
    .catch((error) => {
      console.log(error)
      res.json({ error })
    })
})

//update route

router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id.toString().trim()
  // check if the readyToEat property should be true or false
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false
  // update the fruit
  Fruit.findByIdAndUpdate(id, req.body, { new: true })
    .then((fruit) => {
      // redirect to main page after updating
      res.redirect("/builds")
    })
    // send error as json
    .catch((error) => {
      console.log(error)
      res.json({ error })
    })
})

// create route

router.post("/", (req, res) => {
  // check if the readyToEat property should be true or false
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false
  // add user to req.body to track related user
  req.body.username = req.session.username
  // create the new fruit
  Fruit.create(req.body)
    .then((builds) => {
      // redirect user to index page if successfully created item
      res.redirect("/builds")
    })
    // send error as json
    .catch((error) => {
      console.log(error)
      res.json({ error })
    })
})

// edit route

router.get("/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id
  // get the fruit from the database
  Fruit.findById(id)
    .then((fruit) => {
      // render edit page and send fruit data
      res.render("builds/edit.liquid", { fruit })
    })
    // send error as json
    .catch((error) => {
      console.log(error)
      res.json({ error })
    })
})

// show route

router.get("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id

  // find the particular fruit from the database
  Fruit.findById(id)
    .then((fruit) => {
      // render the template with the data from the database
      res.render("builds/show.liquid", { fruit })
    })
    .catch((error) => {
      console.log(error)
      res.json({ error })
    })
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////

module.exports = router
