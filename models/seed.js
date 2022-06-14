///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require("./connection")
const Build = require("./build")

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

// save the connection in a variable
const db = mongoose.connection

// Make sure code is not run till connected
db.on("open", () => {
  ///////////////////////////////////////////////
  // Write your Seed Code Below
  //////////////////////////////////////////////

  // Run any database queries in this function
  const startBuilds = [
    {
      name: "Tank Graves",
      item1: "Goredrinker",
      boots: "Merc Treads",
      item3: "Black Cleaver",
      item4: "Death's Dance",
      item5: "Maw of Malmortius",
      item6: "Frozen Heart",
    },
  ]

  // Delete all builds
  Build.deleteMany({})
    .then((deletedBuilds) => {
      // add the starter builds
      Build.create(startBuilds)
        .then((newBuilds) => {
          // log the new builds to confirm their creation
          console.log(newBuilds)
          db.close()
        })
        .catch((error) => {
          console.log(error)
          db.close()
        })
    })
    .catch((error) => {
      console.log(error)
      db.close()
    })
})
