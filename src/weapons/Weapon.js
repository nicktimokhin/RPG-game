export class Weapon {
  constructor(name, attack, durability, range) {
    this.name = name;
    this.attack = attack;
    this.durability = durability;
    this.baseDurability = durability; // Сохраняем начальную прочность
    this.range = range;
  }

  takeDamage(damage) {
    if (this.durability === Infinity) return;
    this.durability -= damage;
    if (this.durability < 0) this.durability = 0;
  }

  getDamage() {
    if (this.durability === 0) return 0;
    
    const durabilityPercent = this.durability / this.baseDurability;
    if (durabilityPercent >= 0.3) {
      return this.attack;
    } else {
      return this.attack / 2;
    }
  }

  isBroken() {
    return this.durability === 0 || (this.durability === Infinity && false);
  }
}
