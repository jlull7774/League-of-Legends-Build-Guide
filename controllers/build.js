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
  // find all the build
  Build.find({ username: req.session.username })
    // render the template after they are found
    .then((build) => {
      console.log(build)
      res.render("builds/index.liquid", { build })
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
  // delete the build
  Build.findByIdAndRemove(id)
    .then((build) => {
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
  
  // update the build
  Build.findByIdAndUpdate(id, req.body, { new: true })
    .then((build) => {
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
  // add user to req.body to track related user
  req.body.username = req.session.username
  // create the new build
  Build.create(req.body)
    .then((build) => {
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
  // get the build from the database
  Build.findById(id)
    .then((build) => {
      // render edit page and send build data
      res.render("builds/edit.liquid", { build })
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

  // find the particular build from the database
  Build.findById(id)
    .then((build) => {
      // render the template with the data from the database
      res.render("builds/show.liquid", { build })
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
