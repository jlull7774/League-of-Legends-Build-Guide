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
    {
      name: "ADC JINX",
      item1: "Galeforce",
      boots: "Berserker's Greaves",
      item3: "Rapid Firecannon",
      item4: "Infinity Edge",
      item5: "Lord Dominik's Regards",
      item6: "Mercurial Scimitar",
    },
    {
      name: "AD Bard",
      item1: "Kraken Slayer",
      boots: "Berserkers-greaves",
      item3: "Rapid Fire Cannon",
      item4: "Infinity Edge",
      item5: "Blood Thirster",
      item6: "Phantom Dancer",
    },
    {
      name: "Lane Stomper Aurelion Sol",
      item1: "Kraken Slayer",
      boots: "Berserker's Greaves",
      item3: "Serylda's Grudge",
      item4: "Muramana",
      item5: "Maw of Malmortius",
      item6: "Guardian Angel",
    },
    {
      name: "AD Crit Ekko",
      item1: "Trinity Force",
      boots: "Sorcerer's Shoes",
      item3: "Statikk Shiv",
      item4: "Infinity Edge",
      item5: "Essence Reaver",
      item6: "Hextech Gunblade",
    },
    {
      name: "Top Teemo",
      item1: "Nashor's Tooth",
      boots: "Sorcerer's Shoes",
      item3: "Demonic Embrace",
      item4: "Morellonomicon",
      item5: "Rabadon's Deathcap",
      item6: "Zhonya's Hourglass",
    },
    {
      name: "Support Vladimir",
      item1: "Demonic Embrace",
      boots: "Plated Steelcaps",
      item3: "Frostfire Gauntlet",
      item4: "Cosmic Drive",
      item5: "Spirit Visage",
      item6: "Warmog's Armor",
    },
    {
      name: "Lethality Yorick",
      item1: "Eclipse",
      boots: "Ionian Boots of Lucidity",
      item3: "The Collector",
      item4: "Edge of Night",
      item5: "Serpent's Feng",
      item6: "Ravenous Hydra",
    },
    {
      name: "Critz-Crank",
      item1: "Galeforce",
      boots: "Berserkers Greaves",
      item3: "Essence Reaver",
      item4: "Infinity Edge",
      item5: "The Collector",
      item6: "Lord Dominik's Regards",
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
