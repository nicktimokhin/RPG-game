import { Bow } from './Bow.js';

export class LongBow extends Bow {
  constructor() {
    super();
    this.name = 'Длинный лук';
    this.attack = 15;
    this.durability = 200;
    this.range = 4;
    this.baseDurability = 200;
  }
}
