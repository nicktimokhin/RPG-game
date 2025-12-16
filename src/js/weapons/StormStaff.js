import { Staff } from './Staff.js';

export class StormStaff extends Staff {
  constructor() {
    super();
    this.name = 'Посох Бури';
    this.attack = 10;
    this.durability = 300;
    this.range = 3;
    this.baseDurability = 300;
  }
}
