import { Player } from './Player.js';
import { Staff } from '../weapons/Staff.js';

export class Mage extends Player {
	constructor(position, name) {
		super(position, name);
		this.life = 70;
		this.magic = 100;
		this.attack = 5;
		this.agility = 8;
		this.description = 'Маг';
		this.weapon = new Staff();
	}

	takeDamage(damage) {
		// При уровне маны более 50%, маг получает урон в 2 раза меньше и уменьшает ману на 12
		if (this.magic > 50) {
			super.takeDamage(damage / 2);
			this.magic -= 12;
			if (this.magic < 0) this.magic = 0;
		} else {
			super.takeDamage(damage);
		}
	}
}
