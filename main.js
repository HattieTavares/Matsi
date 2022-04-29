//create our random number generator:

const randomNumbers = [...Array(5).keys()]

const shuffle = (randomNumbers) => {
  // loop all elements
  for (let i = randomNumbers.length - 1; i > 0; i--) {

    // pickup a random element
    const j = Math.floor(Math.random() * i);
    const temp = randomNumbers[i];

    // swap it with the current element
    randomNumbers[i] = randomNumbers[j];
    randomNumbers[j] = temp;
  }
    // return the result
    return randomNumbers[0]
}

function randomNum(max) {
  return Math.floor(Math.random() * max) +1;
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
      toxabomb: 0,
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
      let chance = randomNum(5)
      if (chance === 1) {
        console.log("You found some berries.")
        let addBerries = randomNum(5)
        matsi.inventory.berries += addBerries
        console.log(`You added ${addBerries} berry(ies) to your inventory.`)
      } else if (chance === 2) {
        console.log("You found some pebbles for your slingshot.")
        let addPebbles = randomNum(5)
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
      let chance = randomNum(5)
      if (chance < 4) {
        console.log("As you are walking you run into an ominous looking plant. It attacks!")
        startFight()
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
        
        this.xp += bonusXP;

        lastAction = "fight"
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
  }
}

// Create plant Baddie factory:

let plantBaddieTypes = ["Tangle Vine", "Thorn Spitter", "Poison Puff"]

class plantBaddie {
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
  let randomEnemy = randomNum(3) 
  if (randomEnemy === 1) {
    enemy = new plantBaddie("Tangle Vine")
  } else if (randomEnemy === 2) {
    enemy = new plantBaddie("Thorn Spitter")
  } else {
    enemy = new plantBaddie("Poison Puff")
  }
}

function enemyTurn() {
  enemy.attack()
}

// Set up story and lastAction var which keeps track of what was just done to determine what can be done next.

let lastAction = ""

// Let's begin:

console.log("Welcome to the story traveller! Today we are following the young wolfling Matsi. Matsi is on the way to see a good friend, Fern the rabbit. But when Matsi gets to Fern's house, they find that poor Fern is horribly sick. Matsi is quick to take care of their feverish friend. 'Fern please, is there any way I can help you feel better?' Fern tells them that there is a special medicine that can be made with 3 herbs. 'Oh thank you Matsi, if you bring me these three herbs I'll be better in no time!' Fern needs 10 elderberry plants, 10 blackberry plants and 1 calendula plant. Lets head out to the forest to find them! But be cautious, the plants may not be so easy to gather as you'd think...")

matsi.status()
