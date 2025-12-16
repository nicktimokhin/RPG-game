export class Weapon {
  constructor(name, attack, durability, range) {
    this.name = name;
    this.attack = attack;
    this.durability = durability;
    this.range = range;
    this.baseDurability = durability;
  }

  takeDamage(damage) {
    this.durability -= damage;
    if (this.durability < 0) this.durability = 0;
  }

  getDamage() {
    if (this.durability === 0) return 0;
    if (this.durability >= 0.3 * this.baseDurability) {
      return this.attack;
    }
    if (this.durability >= 0.1 * this.baseDurability) {
      return this.attack * 0.7;
    }
    return this.attack * 0.5;
  }

  isBroken() {
    return this.durability === 0;
  }
}
