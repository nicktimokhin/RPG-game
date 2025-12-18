import { Player } from './Player.js';
import { Sword } from '../weapons/Sword.js';

export class Warrior extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 120;
    this.speed = 2;
    this.attack = 10;
    this.description = 'Воин';
    this.weapon = new Sword();
  }

  takeDamage(damage) {
    // При уровне здоровья менее 50% и getLuck() > 0.8, урон вычитается из маны
    if (this.life < 60 && this.getLuck() > 0.8 && this.magic > 0) {
      this.magic -= damage;
      if (this.magic < 0) {
        this.life += this.magic; // Добавляем оставшийся урон к жизни
        this.magic = 0;
        if (this.life < 0) this.life = 0;
      }
    } else {
      super.takeDamage(damage);
    }
  }
}
