//create our random number generator:

const shuffle = (num) => {

  let randomNumbers = [...Array(num).keys()]
  for (let i = randomNumbers.length - 1; i > 0; i--) {

    // pickup a random element
    const j = Math.floor(Math.random() * i);
    const temp = randomNumbers[i];

    // swap it with the current element
    randomNumbers[i] = randomNumbers[j];
    randomNumbers[j] = temp;
  }
  //return the result
  return randomNumbers[0]
}

//create our Matsi hero object:

const matsi = {
  name: "Matsi",
  xp: 0,
  health: 100,
  energy: 100,
  inventory: {
    berries: 8,
    elderberry: 0,
    blackberry: 0,
    calendula: 0,
  },

  weapon: {
    name: "slingshot",
    strength: 10,
    ammo: {
      pebbles: 10,
      tangleballs: 0,
      thornfruits: 0,
      toxabombs: 0,
    }
  },

  status() {
    console.log(`${matsi.name} has ${matsi.health} health, ${matsi.energy} energy, and ${matsi.xp} current xp.`)
  },

  rest() {
    if (matsi.energy < 100) {
      console.log("You lay down in a comfy spot to take a nap")
      if (matsi.energy > 75) {
        matsi.energy = 100
        console.log("You awake refreshed and full of energy!")
      } else {
        matsi.energy +=25
        console.log("You're still a little tired, but that was nice.")
      }
    } else {
      console.log("You found a cozy spot to nap but you're not tired enough to sleep! Let's keep going.")
    }
  },

  forage() {
    if (lastAction != "forage") {
      console.log("You stop to look around.")
      let chance = shuffle(6)
      if (chance === 1) {
        console.log("You found some berries.")
        let addBerries = shuffle(6)
        matsi.inventory.berries += addBerries
        console.log(`You added ${addBerries} berry(ies) to your inventory.`)
      } else if (chance === 2) {
        console.log("You found some pebbles for your slingshot.")
        let addPebbles = shuffle(6)
        matsi.weapon.ammo.pebbles += addPebbles
        console.log(`You added ${addPebbles} pebble(s) to your inventory.`)
      } else if (chance === 3) {
        console.log("You found an elderberry plant!")
        if (matsi.inventory.elderberry < 10) {
          console.log("You add the plant to  your inventory.")
          matsi.inventory.elderberry += 1
          if (matsi.inventory.elderberry === 10) {
            console.log("You found all the elderberry plants you need!")
          }
        }
      } else {
        console.log("You found nothing...")
      }
      lastAction = "forage"
    } else {
      console.log("You already looked here! There's nothing else...")
    }
  },

  explore() {
    lastAction = "explore"
    if (matsi.energy > 0) {
      console.log("You travel further into the forest.")
      matsi.energy -=10
      let chance = shuffle(6)
      if (chance < 4) {
        console.log("As you are walking you run into an ominous looking plant. It attacks!")
        startFight()
        disableMainBtns()
      } else if (chance === 4) {
        console.log("You see nothing dangerous in this area, maybe you should forage a little?")
      } else if (chance === 5) {
        console.log("Enjoying the calming forest atmosphere as you travel, you come upon a sparkling stream, and stop to take a refreshing drink. The water invigorates you.")
        if (matsi.energy < 85) {
          matsi.energy += 15
        } else {
          matsi.energy = 100
        }
        if (matsi.health < 85) {
          matsi.health += 15
        } else {
          matsi.health = 100
        }
      }
    } else {
      console.log("Your legs are too tired to walk anymore, maybe you should rest.")
    }
  },

  attack() {
    lastAction = "fight"


    if (enemy.health > 0) {
      const damage = matsi.weapon.strength;

      console.log(`${matsi.name} attacks ${enemy.name} and causes ${damage} damage points`);

      enemy.health -= damage;
      
      if (enemy.health > 0) {
        console.log(`${enemy.name} has ${enemy.health} health points left`);
        enemyTurn()
      } else {
        enemy.health = 0;

        const bonusXP = 10;

        console.log(`${matsi.name} eliminated ${enemy.name} and wins ${bonusXP} experience points`);
        
        matsi.xp += bonusXP;

        generateDrops()

        enableMainBtns()

      }
    } else {
      console.log(`${matsi.name} can't attack (they've been eliminated)`);
      }
  },

  // Eat method is for outside of battle

  eat() {
    if (matsi.health < 100) {
      console.log("You eat a berry.")
      matsi.inventory.berries -= 1
      if (matsi.health > 90) {
        matsi.health = 100
        console.log("The berry heals you to full health")
      } else {
        matsi.health += 10
        console.log("The berry heals 10 health points.")
      }
    } else {
      console.log("You aren't hungry right now...")
    }
  },

  // Heal method is for during a battle
  
  heal() {
    if (matsi.health < 100) {
      console.log("You eat a berry.")
      matsi.inventory.berries -= 1
      if (matsi.health > 90) {
        matsi.health = 100
        console.log("The berry heals you to full health")
      } else {
        matsi.health += 10
        console.log("The berry heals 10 health points.")
      }
      enemyTurn()
    } else {
      console.log("You aren't hungry right now...")
    }
  },

  //Run method for during fight to attempt to escape fight

  runAway() {
    if (matsi.energy > 50) {
      runChance = shuffle(4)
      if (runChance = 1) {
        console.log(`You run from the angry ${enemy.name}! You escape into the forest.`)
        enableMainBtns()
      }
    } else {
      console.log("You are too tired to run away! You must stay and fight.")
      enemyTurn()
    }
  }
}

// Create plant Baddie factory:

let plantBaddieTypes = ["Tangle Vine", "Thorn Spitter", "Poison Puff"]

class plantBaddie  {
    constructor(name){
        this.name = name
        this.health = 25
        this.strength = 5
    }

    attack() {
      if (this.health > 0) {
        const baddieDamage = this.strength;

        console.log(`${this.name} attacks ${matsi.name} and causes ${baddieDamage} damage`);

        matsi.health -= baddieDamage;
        
        if (matsi.health > 0) {
          console.log(`${matsi.name} has ${matsi.health} health points left`);
        } else {
          matsi.health = 0;
          console.log(`${this.name} has eliminated ${matsi.name}`);
        }
      } else {
        console.log(`${this.name} can't attack (they've been eliminated)`);
        }
    }
}

//Interactive functions:

function startFight() {
  if (matsi.inventory.elderberry >= 5 && matsi.inventory.blackberry >= 5) {
    enemy = new plantBaddie("Big Boss Baddie")
  } else {
    let randomEnemy = shuffle(4)
    if (randomEnemy === 1) {
      enemy = new plantBaddie("Tangle Vine")
    } else if (randomEnemy === 2) {
      enemy = new plantBaddie("Thorn Spitter")
    } else {
      enemy = new plantBaddie("Poison Puff")
    }
  }
}

function enemyTurn() {
  enemy.attack()
}

function disableMainBtns() {
  document.querySelector('#forageBtn').disabled = true
  document.querySelector('#exploreBtn').disabled = true
  document.querySelector('#restBtn').disabled = true
  document.querySelector('#eatBtn').disabled = true
  document.querySelector('#healBtn').disabled = false
  document.querySelector('#runBtn').disabled = false
  document.querySelector('#pebbleBtn').disabled = false
  document.querySelector('#tangleballBtn').disabled = false
  document.querySelector('#thornfruitBtn').disabled = false
  document.querySelector('#toxabombBtn').disabled = false
}

function enableMainBtns() {
  document.querySelector('#forageBtn').disabled = false
  document.querySelector('#exploreBtn').disabled = false
  document.querySelector('#restBtn').disabled = false
  document.querySelector('#eatBtn').disabled = false
  document.querySelector('#healBtn').disabled = true
  document.querySelector('#runBtn').disabled = true
  document.querySelector('#pebbleBtn').disabled = true
  document.querySelector('#tangleballBtn').disabled = true
  document.querySelector('#thornfruitBtn').disabled = true
  document.querySelector('#toxabombBtn').disabled = true
}

function generateDrops() {

  if (enemy.name === "Big Boss Baddie") {

    console.log(`The ${enemy.name} dropped a rare Calendula plant!`)
    matsi.inventory.calendula +=1

  } else {

    let dropChance = shuffle (4)

    if (dropChance < 3) {
      let dropNum = shuffle(4)
      if (enemy.name === "Tangle Vine") {
        console.log(`The ${enemy.name} dropped ${dropNum} Tangleball(s).`)
        matsi.weapon.ammo.tangleballs += dropNum
      } else if (enemy.name === "Thorn Spitter") {
        console.log(`The ${enemy.name} dropped ${dropNum} Thornfruit(s).`)
        matsi.weapon.ammo.thornfruits += dropNum
      } else {
        console.log(`The ${enemy.name} dropped ${dropNum} Toxabomb(s).`)
        matsi.weapon.ammo.toxabombs += dropNum
      }

    let plantChance = shuffle(4)

    if (plantChance === 3) {
      console.log(`${enemy.name} dropped a rare Blackberry plant!`)
      matsi.inventory.blackberry +=1
    } else {
      console.log(`The ${enemy.name} didn't drop anything...`)
    }
    }
  }
}

// Set up story and lastAction var which keeps track of what was just done to determine what can be done next.

let lastAction = ""

//set main BG image:

//document.body.style.backgroundImage = "url(images/pathToFern.jpg)"

//events:

document.getElementById("forageBtn").addEventListener("click", matsi.forage)
document.getElementById("exploreBtn").addEventListener("click", matsi.explore)
document.getElementById("eatBtn").addEventListener("click", matsi.eat)
document.getElementById("restBtn").addEventListener("click", matsi.rest)

document.getElementById("healBtn").addEventListener("click", matsi.heal)
document.getElementById("runBtn").addEventListener("click", matsi.runAway)
document.getElementById("pebbleBtn").addEventListener("click", matsi.attack)
document.getElementById("tangleballBtn").addEventListener("click", matsi.attack)
document.getElementById("thornfruitBtn").addEventListener("click", matsi.attack)
document.getElementById("toxabombBtn").addEventListener("click", matsi.attack)

//attack buttons disabled until fight

enableMainBtns()

// Let's begin:

console.log("Welcome to the story traveller! Today we are following the young wolfling Matsi. Matsi is on the way to see a good friend, Fern the rabbit. But when Matsi gets to Fern's house, they find that poor Fern is horribly sick. Matsi is quick to take care of their feverish friend. 'Fern please, is there any way I can help you feel better?' Fern tells them that there is a special medicine that can be made with 3 herbs. 'Oh thank you Matsi, if you bring me these three herbs I'll be better in no time!' Fern needs 5 elderberry plants, 5 blackberry plants and 1 calendula plant. Lets head out to the forest to find them! But be cautious, the plants may not be so easy to gather as you'd think...")

matsi.status()
