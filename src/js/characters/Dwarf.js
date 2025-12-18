import { Warrior } from './Warrior.js';
import { Axe } from '../weapons/Axe.js';

export class Dwarf extends Warrior {
	constructor(position, name) {
		super(position, name);
		this.life = 130;
		this.attack = 15;
		this.luck = 20;
		this.description = 'Гном';
		this.weapon = new Axe();
	}

	takeDamage(damage) {
		this.attackCount++;
    
		// Каждый шестой удар при getLuck() > 0.5 наносит в 2 раза меньше урона
		if (this.attackCount % 6 === 0 && this.getLuck() > 0.5) {
			super.takeDamage(damage / 2);
		} else {
			super.takeDamage(damage);
		}
	}
}
