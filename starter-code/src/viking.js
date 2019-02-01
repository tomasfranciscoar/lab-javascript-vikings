// Soldier
function Soldier(health, strength) {
  this.health = health;
  this.strength = strength;
  this.attack = function() {
    return this.strength;
  };
  this.receiveDamage = function(damage) {
    this.health = health - damage;
  }
}

// Viking
function Viking(name, health, strength) {
  this.name = name;
  Soldier.call(this, health, strength);
  this.receiveDamage = function(damage) {
    this.health -= damage;
    if(this.health > 0) return name + " has received " + damage + " points of damage";
        if(this.health === 0) return name + " has died in act of combat";
    };
    this.battleCry = function() {
      return 'Odin Owns You All!'
    }
  }

Viking.prototype = Object.create(Soldier.prototype);

// Saxon
function Saxon(health, strength) {
  Soldier.call(this, health, strength);
  this.receiveDamage = function(damage) {
    this.health -= damage;
    if (this.health > 0) return 'A Saxon has received ' + damage + ' points of damage';
    if (this.health == 0) return 'A Saxon has died in combat';
  }
}

Saxon.prototype = Object.create(Soldier.prototype);

// War
function War() {
  this.vikingArmy = [];
  this.saxonArmy = [];
  this.addViking = function(viking) {
    this.vikingArmy.push(viking);
  };
  this.addSaxon = function(saxon) {
    this.saxonArmy.push(saxon);
  };
  this.vikingAttack = function() {
    let vikingIndex = Math.floor(Math.random() * this.vikingArmy.length)
    let viking = this.vikingArmy[vikingIndex];

    let saxonIndex = Math.floor(Math.random() * this.saxonArmy.length)
    let saxon = this.saxonArmy[saxonIndex];

    let finalDamageViking = saxon.receiveDamage(viking.strength);
    this.saxonArmy.forEach( (saxon, index) => {
      if (saxon.health <=0) this.saxonArmy.splice(index, 1);
    });
    return finalDamageViking;
  };
  this.saxonAttack = function() {
    let vikingIndex = Math.floor(Math.random() * this.vikingArmy.length)
    let viking = this.vikingArmy[vikingIndex];

    let saxonIndex = Math.floor(Math.random() * this.saxonArmy.length)
    let saxon = this.saxonArmy[saxonIndex];

    let finalDamageSaxon = viking.receiveDamage(saxon.strength);
    this.vikingArmy.forEach( (viking, index) => {
      if (viking.health <=0) this.vikingArmy.splice(index, 1);
    });
    return finalDamageSaxon;
  };
  this.showStatus = function() {
    if (this.saxonArmy.length == 0) return 'Vikings have won the war of the century!';
    if (this.vikingArmy.length == 0) return 'Saxons have fought for their lives and survive another day...';
    if (this.vikingArmy.length >= 1 && this.saxonArmy.length >= 1) return 'Vikings and Saxons are still in the thick of battle.';
  }
}