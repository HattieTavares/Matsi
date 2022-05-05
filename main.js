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
    berries: 5,
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
    document.getElementById("story").innerText += `\n${matsi.name} has ${matsi.health} health, ${matsi.energy} energy, and ${matsi.xp} current xp.` + "\n"
  },

  rest() {
    if (matsi.energy < 100) {
      document.getElementById("story").innerText += "\nYou lay down in a comfy spot to take a nap" + "\n"
      if (matsi.energy > 75) {
        matsi.energy = 100
        document.getElementById("story").innerText += "\nYou awake refreshed and full of energy!" + "\n"
      } else {
        matsi.energy +=25
        document.getElementById("story").innerText += "\nYou're still a little tired, but that was nice." + "\n"
      }
    } else {
      document.getElementById("story").innerText += "\nYou found a cozy spot to nap but you're not tired enough to sleep! Let's keep going." + "\n"
    }
    document.getElementById("energy").innerText = matsi.energy
  },

  forage() {
    if (lastAction != "forage") {
      document.getElementById("story").innerText += "\nYou stop to look around." + "\n"
      let chance = shuffle(6)
      if (chance === 1) {
        document.getElementById("story").innerText += "\nYou found some berries." + "\n"
        let addBerries = shuffle(6)
        matsi.inventory.berries += addBerries
        document.getElementById("berry").innerText = matsi.inventory.berries
        document.getElementById("story").innerText += `\nYou added ${addBerries} berry(ies) to your inventory.` + "\n"
      } else if (chance === 2) {
        document.getElementById("story").innerText += "\nYou found some pebbles for your slingshot." + "\n"
        let addPebbles = shuffle(6)
        matsi.weapon.ammo.pebbles += addPebbles
        document.getElementById("ammo1").innerText = matsi.weapon.ammo.pebbles
        document.getElementById("story").innerText += `\nYou added ${addPebbles} pebble(s) to your inventory.` + "\n"
      } else if (chance === 3) {
        document.getElementById("story").innerText += "\nYou found an elderberry plant!" + "\n"
        if (matsi.inventory.elderberry < 10) {
          document.getElementById("story").innerText += "\nYou add the plant to  your inventory." + "\n"
          matsi.inventory.elderberry += 1
          if (matsi.inventory.elderberry === 10) {
            document.getElementById("story").innerText += "\nYou found all the elderberry plants you need!" + "\n"
          }
        }
      } else {
        document.getElementById("story").innerText += "\nYou found nothing..." + "\n"
      }
      lastAction = "forage"
    } else {
      document.getElementById("story").innerText += "\nYou already looked here! There's nothing else..." + "\n"
    }
  },

  explore() {
    lastAction = "explore"
    if (matsi.energy > 0) {
      document.getElementById("story").innerText += "\nYou travel further into the forest." + "\n"
      matsi.energy -=10
      document.getElementById("energy").innerText = matsi.energy
      let chance = shuffle(6)
      if (chance < 4) {
        document.getElementById("story").innerText += "\nAs you are walking you run into an ominous looking plant. It attacks!" + "\n"
        startFight()
        disableMainBtns()
      } else if (chance === 4) {
        document.getElementById("story").innerText += "\nYou see nothing dangerous in this area, maybe you should forage a little?" + "\n"
      } else if (chance === 5) {
        document.getElementById("story").innerText += "\nEnjoying the calming forest atmosphere as you travel, you come upon a sparkling stream, and stop to take a refreshing drink. The water invigorates you." + "\n"
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
        document.getElementById("health").innerText = matsi.health
        document.getElementById("energy").innerText = matsi.energy
      }
    } else {
      document.getElementById("story").innerText += "\nYour legs are too tired to walk anymore, maybe you should rest." + "\n"
    }
  },

  attack() {
    lastAction = "fight"


    if (enemy.health > 0) {
      const damage = matsi.weapon.strength;

      document.getElementById("story").innerText += `\n${matsi.name} attacks ${enemy.name} and causes ${damage} damage points.` + "\n";

      enemy.health -= damage;
      
      if (enemy.health > 0) {
        document.getElementById("story").innerText += `\n${enemy.name} has ${enemy.health} health points left.` + "\n";
        enemyTurn()
      } else {
        enemy.health = 0;

        const bonusXP = 10;

        document.getElementById("story").innerText += `\n${matsi.name} eliminated ${enemy.name} and wins ${bonusXP} experience points.` + "\n";
        
        matsi.xp += bonusXP;
        document.getElementById("exp").innerText = matsi.xp

        generateDrops()

        enableMainBtns()

      }
    } else {
      document.getElementById("story").innerText += `\n${matsi.name} can't attack (they've been eliminated).` + "\n";
      }
  },

  // Eat method is for outside of battle

  eat() {
    if (matsi.health < 100) {
      document.getElementById("story").innerText += "\nYou eat a berry." + "\n"
      matsi.inventory.berries -= 1
      document.getElementById("berry").innerText = matsi.inventory.berries
      if (matsi.health > 90) {
        matsi.health = 100
        document.getElementById("health").innerText = matsi.health
        document.getElementById("story").innerText += "\nThe berry heals you to full health" + "\n"
      } else {
        matsi.health += 10
        document.getElementById("health").innerText = matsi.health
        document.getElementById("story").innerText += "\nThe berry heals 10 health points." + "\n"
      }
    } else {
      document.getElementById("story").innerText += "\nYou aren't hungry right now..." + "\n"
    }
  },

  // Heal method is for during a battle
  
  heal() {
    if (matsi.health < 100) {
      document.getElementById("story").innerText += "\nYou eat a berry." + "\n"
      matsi.inventory.berries -= 1
      document.getElementById("berry").innerText = matsi.inventory.berries
      if (matsi.health > 90) {
        matsi.health = 100
        document.getElementById("health").innerText = matsi.healthberries
        document.getElementById("story").innerText += "\nThe berry heals you to full health" + "\n"
      } else {
        matsi.health += 10
        document.getElementById("health").innerText = matsi.healthberries
        document.getElementById("story").innerText += "\nThe berry heals 10 health points." + "\n"
      }
      enemyTurn()
    } else {
      document.getElementById("story").innerText += "\nYou aren't hungry right now..." + "\n"
    }
  },

  //Run method for during fight to attempt to escape fight

  runAway() {
    if (matsi.energy > 50) {
      runChance = shuffle(4)
      if (runChance = 1) {
        document.getElementById("story").innerText += `\nYou run from the angry ${enemy.name}! You escape into the forest.` + "\n"
        enableMainBtns()
      }
    } else {
      document.getElementById("story").innerText += "\nYou are too tired to run away! You must stay and fight." + "\n"
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

        document.getElementById("story").innerText += `\n${this.name} attacks ${matsi.name} and causes ${baddieDamage} damage.` + "\n";

        matsi.health -= baddieDamage;
        
        
        
        if (matsi.health > 0) {
          document.getElementById("story").innerText += `\n${matsi.name} has ${matsi.health} health points left.` + "\n";
        } else {
          matsi.health = 0;
          document.getElementById("health").innerText = matsi.health
          document.getElementById("story").innerText += `\n${this.name} has eliminated ${matsi.name}.` + "\n";
        }
      } else {
        document.getElementById("story").innerText += `\n${this.name} can't attack (they've been eliminated).` + "\n";
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
  document.querySelector('#forageBtn').classList.add("hidden")
  document.querySelector('#exploreBtn').classList.add("hidden")
  document.querySelector('#restBtn').classList.add("hidden")
  document.querySelector('#eatBtn').classList.add("hidden")
  document.querySelector('#yesBtn').classList.add("hidden")
  document.querySelector('#noBtn').classList.add("hidden")
  document.querySelector('#pebbleBtn').classList.toggle("hidden")
  document.querySelector('#tangleballBtn').classList.toggle("hidden")
  document.querySelector('#thornfruitBtn').classList.toggle("hidden")
  document.querySelector('#toxabombBtn').classList.toggle("hidden")
  document.querySelector('#healBtn').classList.toggle("hidden")
  document.querySelector('#runBtn').classList.toggle("hidden")
}

function enableMainBtns() {
  document.querySelector('#forageBtn').classList.toggle("hidden")
  document.querySelector('#exploreBtn').classList.toggle("hidden")
  document.querySelector('#restBtn').classList.toggle("hidden")
  document.querySelector('#eatBtn').classList.toggle("hidden")
  document.querySelector('#yesBtn').classList.toggle("hidden")
  document.querySelector('#noBtn').classList.toggle("hidden")
  document.querySelector('#pebbleBtn').classList.add("hidden")
  document.querySelector('#tangleballBtn').classList.add("hidden")
  document.querySelector('#thornfruitBtn').classList.add("hidden")
  document.querySelector('#toxabombBtn').classList.add("hidden")
  document.querySelector('#healBtn').classList.add("hidden")
  document.querySelector('#runBtn').classList.add("hidden")
}

// function disableMainBtns() {
//   document.querySelector('#forageBtn').disabled = true
//   document.querySelector('#exploreBtn').disabled = true
//   document.querySelector('#restBtn').disabled = true
//   document.querySelector('#eatBtn').disabled = true
//   document.querySelector('#yesBtn').disabled = true
//   document.querySelector('#noBtn').disabled = true
//   document.querySelector('#healBtn').disabled = false
//   document.querySelector('#runBtn').disabled = false
//   document.querySelector('#pebbleBtn').disabled = false
//   document.querySelector('#tangleballBtn').disabled = false
//   document.querySelector('#thornfruitBtn').disabled = false
//   document.querySelector('#toxabombBtn').disabled = false
// }

// function enableMainBtns() {
//   document.querySelector('#forageBtn').disabled = false
//   document.querySelector('#exploreBtn').disabled = false
//   document.querySelector('#restBtn').disabled = false
//   document.querySelector('#eatBtn').disabled = false
//   document.querySelector('#yesBtn').disabled = false
//   document.querySelector('#noBtn').disabled = false
//   document.querySelector('#healBtn').disabled = true
//   document.querySelector('#runBtn').disabled = true
//   document.querySelector('#pebbleBtn').disabled = true
//   document.querySelector('#tangleballBtn').disabled = true
//   document.querySelector('#thornfruitBtn').disabled = true
//   document.querySelector('#toxabombBtn').disabled = true
// }

function generateDrops() {

  if (enemy.name === "Big Boss Baddie") {

    document.getElementById("story").innerText += `The ${enemy.name} dropped a rare Calendula plant!` + "\n"
    matsi.inventory.calendula +=1
    document.getElementById("calendula").innerText = matsi.inventory.calendula

  } else {

    let dropChance = shuffle (4)

    if (dropChance < 3) {
      let dropNum = shuffle(4)
      if (enemy.name === "Tangle Vine") {
        document.getElementById("story").innerText += `\nThe ${enemy.name} dropped ${dropNum} Tangleball(s).` + "\n"
        matsi.weapon.ammo.tangleballs += dropNum
        document.getElementById("ammo2").innerText = matsi.weapon.ammo.tangleballs
      } else if (enemy.name === "Thorn Spitter") {
        document.getElementById("story").innerText += `\nThe ${enemy.name} dropped ${dropNum} Thornfruit(s).` + "\n"
        matsi.weapon.ammo.thornfruits += dropNum
        document.getElementById("ammo3").innerText = matsi.weapon.ammo.thornfruits
      } else {
        document.getElementById("story").innerText += `\nThe ${enemy.name} dropped ${dropNum} Toxabomb(s).` + "\n"
        matsi.weapon.ammo.toxabombs += dropNum
        document.getElementById("ammo4").innerText = matsi.weapon.ammo.toxabombs
      }

    let plantChance = shuffle(4)

    if (plantChance === 3) {
      document.getElementById("story").innerText += `\n${enemy.name} dropped a rare Blackberry plant!` + "\n"
      matsi.inventory.blackberry +=1
      document.getElementById("bBerry").innerText = matsi.inventory.blackberry
    } else {
      document.getElementById("story").innerText += `\nThe ${enemy.name} didn't drop anything...` + "\n"
    }
    }
  }
}

// Set up story and lastAction var which keeps track of what was just done to determine what can be done next.

let lastAction = ""

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

//stats load

document.getElementById("health").innerText = matsi.health
document.getElementById("energy").innerText = matsi.energy
document.getElementById("exp").innerText = matsi.xp

document.getElementById("berry").innerText = matsi.inventory.berries
document.getElementById("eBerry").innerText = matsi.inventory.elderberry
document.getElementById("bBerry").innerText = matsi.inventory.blackberry
document.getElementById("calendula").innerText = matsi.inventory.calendula

document.getElementById("ammo1").innerText = matsi.weapon.ammo.pebbles
document.getElementById("ammo2").innerText = matsi.weapon.ammo.tangleballs
document.getElementById("ammo3").innerText = matsi.weapon.ammo.thornfruits
document.getElementById("ammo4").innerText = matsi.weapon.ammo.toxabombs

// Let's begin:

document.getElementById("story").innerText = "Welcome to the story traveller! \n\nToday we are following the young wolfling Matsi. Matsi is on the way to see a good friend, Fern the rabbit. But when Matsi gets to Fern's house, they find that poor Fern is horribly sick. Matsi is quick to take care of their feverish friend. \n\n'Fern please, is there any way I can help you feel better?' \n\nFern tells Matsi that there is a special medicine that can be made with 3 herbs. \n\n'Oh thank you Matsi, if you bring me these three herbs I'll be better in no time!' \n\nFern needs 5 elderberry plants, 5 blackberry plants and 1 calendula plant. Lets head out to the forest to find them! But be cautious, the plants may not be so easy to gather as you'd think..." + "\n"
