import { Mage } from './Mage.js';
import { StormStaff } from '../weapons/StormStaff.js';

export class Demiurge extends Mage {
  constructor(position, name) {
    super(position, name);
    this.life = 80;
    this.magic = 120;
    this.attack = 6;
    this.luck = 12;
    this.description = 'Демиург';
    this.weapon = new StormStaff();
  }

  getDamage(distance) {
    const baseDamage = super.getDamage(distance);
    
    // При уровне маны > 0 и getLuck() > 0.6 наносимый урон в 1.5 раза выше
    if (this.magic > 0 && this.getLuck() > 0.6) {
      return baseDamage * 1.5;
    }
    
    return baseDamage;
  }
}
