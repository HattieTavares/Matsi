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

class mainCharacter {
    constructor(name) {
      this.name = name
      this.xp = 0
      this.level = 1
      this.health = 100
      this.energy = 100
      this.inventory = {
        berries: 8,
        elderberry:0,
        blackberry: 0,
        calendula: 0,
      }

      this.weapon = {
        name: "slingshot",
        strength: 10,
        ammo: {
          pebbles: 10,
          tangleballs: 0,
          thornfruits: 0,
        }
      }
    }

    status() {
      console.log(`${this.name} is level ${this.level}, has ${this.health} health, and ${this.xp} current xp.`)
    }

    rest() {
      if (this.energy < 100) {
        console.log("You lay down in a comfy spot to take a nap")
        if (this.energy > 75) {
          this.energy = 100
          console.log("You awake refreshed and full of energy!")
        } else {
          this.energy +=25
          console.log("You're still a little tired, but that was nice.")
        }
      } else {
        console.log("You found a cozy spot to nap but you're not tired enough to sleep! Let's keep going.")
      }
    }

    forage() {
      if (lastAction != "forage") {
        console.log("You stop to look around.")
        let chance = randomNum(5)
        if (chance === 1) {
          console.log("You found some berries.")
          let addBerries = randomNum(5)
          this.inventory.berries += addBerries
          console.log(`You added ${addBerries} berry(ies) to your inventory.`)
        } else if (chance === 2) {
          console.log("You found some pebbles for your slingshot.")
          let addPebbles = randomNum(5)
          this.weapon.ammo.pebbles += addPebbles
          console.log(`You added ${addPebbles} pebble(s) to your inventory.`)
        } else if (chance === 3) {
          console.log("You found an elderberry plant!")
          if (this.inventory.elderberry < 10) {
            console.log("You add the plant to  your inventory.")
            this.inventory.elderberry += 1
            if (this.inventory.elderberry === 10) {
              console.log("You found all the elderberry plants you need!")
            }
          }
        } else {
          console.log("You found nothing...")
        }
        lastAction = "forage"
      } else {
        console.log("You already looked here and found nothing...")
      }
    }

    explore() {
      if (this.energy > 0) {
        console.log("You travel further into the forest.")
        this.energy -=10
        let chance = randomNum(5)
        if (chance === 1) {
          console.log("As you are walking you run into an ominous looking plant. It attacks!")
          startFight()
        } else if (chance === 2) {
          console.log("You see nothing dangerous in this area, maybe you should forage a little?")
        } else {

        }
      } else {
        console.log("Your legs are too tired to walk anymore, maybe you should rest.")
      }
    }

    attack(enemy) {
      if (this.health > 0) {
        const damage = this.weapon.strength;

        console.log(`${this.name} attacks ${enemy.name} and causes ${damage} damage points`);

        enemy.health -= damage;
        
        if (enemy.health > 0) {
          console.log(`${enemy.name} has ${enemy.health} health points left`);
        } else {
          enemy.health = 0;

          const bonusXP = 10;

          console.log(`${this.name} eliminated ${enemy.name} and wins ${bonusXP} experience points`);
          
          this.xp += bonusXP;

          lastAction = "fight"
        }
      } else {
        console.log(`${this.name} can't attack (they've been eliminated)`);
        }
    }
}

class plantBaddie {
    constructor(name){
        this.name = name
        this.health = 25
        this.attack = 5
    }

    attack() {
      if (this.health > 0) {
        const baddieDamage = this.attack;

        console.log(`${this.name} attacks ${matsi} and causes ${baddieDamage} damage`);

        matsi.health -= baddieDamage;
        
        if (matsi.health > 0) {
          console.log(`${matsi} has ${matsi} health points left`);
        } else {
          hero.health = 0;
          console.log(`${this.name} has eliminated ${matsi}`);
        }
      } else {
        console.log(`${this.name} can't attack (they've been eliminated)`);
        }
    }
}

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

}

function heroTurn() {

}

const matsi = new mainCharacter("Matsi")

let lastAction = ""

console.log("Welcome to the story traveller! Today we are following the young wolfling Matsi. Matsi is on the way to see a good friend, Fern the rabbit. But when Matsi gets to Fern's house, they find that poor Fern is horribly sick. Matsi is quick to take care of their feverish friend. 'Fern please, is there any way I can help you feel better?' Fern tells them that there is a special medicine that can be made with 3 herbs. 'Oh thank you Matsi, if you bring me these three herbs I'll be better in no time!' Fern needs 10 elderberry plants, 10 blackberry plants and 1 calendula plant. Lets head out to the forest to find them! But be cautious, the plants may not be so easy to gather as you'd think...")

matsi.status()
