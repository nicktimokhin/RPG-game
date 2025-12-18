import { Arm } from '../weapons/Arm.js';
import { Knife } from '../weapons/Knife.js';
import { Sword } from '../weapons/Sword.js';
import { Axe } from '../weapons/Axe.js';
import { Bow } from '../weapons/Bow.js';
import { LongBow } from '../weapons/LongBow.js';
import { Staff } from '../weapons/Staff.js';
import { StormStaff } from '../weapons/StormStaff.js';

export class Player {
	constructor(position, name) {
		this.life = 100;
		this.magic = 20;
		this.speed = 1;
		this.attack = 10;
		this.agility = 5;
		this.luck = 10;
		this.description = 'Игрок';
		this.weapon = new Arm();
		this.position = position;
		this.name = name;
		this.attackCount = 0; // Для подсчета количества ударов (нужно для Dwarf)
	}

	getLuck() {
		const randomNumber = Math.random() * 100;
		return (randomNumber + this.luck) / 100;
	}

	getDamage(distance) {
		if (distance > this.weapon.range) return 0;
    
		const weaponDamage = this.weapon.getDamage();
		return (this.attack + weaponDamage) * this.getLuck() / distance;
	}

	takeDamage(damage) {
		this.life -= damage;
		if (this.life < 0) this.life = 0;
	}

	isDead() {
		return this.life === 0;
	}

	moveLeft(distance) {
		const actualDistance = Math.min(distance, this.speed);
		this.position -= actualDistance;
	}

	moveRight(distance) {
		const actualDistance = Math.min(distance, this.speed);
		this.position += actualDistance;
	}

	move(distance) {
		if (distance < 0) {
			this.moveLeft(Math.abs(distance));
		} else {
			this.moveRight(distance);
		}
	}

	isAttackBlocked() {
		return this.getLuck() > (100 - this.luck) / 100;
	}

	dodged() {
		return this.getLuck() > (100 - this.agility - this.speed * 3) / 100;
	}

	takeAttack(damage) {
		if (this.isAttackBlocked()) {
			this.weapon.takeDamage(damage);
			this.checkWeapon();
			return;
		}
    
		if (this.dodged()) {
			return;
		}
    
		this.takeDamage(damage);
	}

	checkWeapon() {
		if (this.weapon.isBroken()) {
			// Меняем оружие в зависимости от класса
			if (this.constructor.name === 'Warrior' || this.constructor.name === 'Dwarf') {
				if (this.weapon instanceof Sword || this.weapon instanceof Axe) {
					this.weapon = new Knife();
				} else if (this.weapon instanceof Knife) {
					this.weapon = new Arm();
				}
			} else if (this.constructor.name === 'Archer' || this.constructor.name === 'Crossbowman') {
				if (this.weapon instanceof Bow || this.weapon instanceof LongBow) {
					this.weapon = new Knife();
				} else if (this.weapon instanceof Knife) {
					this.weapon = new Arm();
				}
			} else if (this.constructor.name === 'Mage' || this.constructor.name === 'Demiurge') {
				if (this.weapon instanceof Staff || this.weapon instanceof StormStaff) {
					this.weapon = new Knife();
				} else if (this.weapon instanceof Knife) {
					this.weapon = new Arm();
				}
			}
		}
	}

	tryAttack(enemy) {
		if (enemy.isDead()) return;
    
		const distance = Math.abs(this.position - enemy.position);
		if (distance > this.weapon.range) {
			return;
		}
    
		// Износ оружия
		const wear = 10 * this.getLuck();
		this.weapon.takeDamage(wear);
		this.checkWeapon();
    
		let damage = this.getDamage(distance);
		if (this.position === enemy.position) {
			enemy.moveRight(1); // Враг отскакивает
			damage *= 2; // Удвоенный урон
		}
    
		enemy.takeAttack(damage);
	}

	chooseEnemy(players) {
		let minLife = Infinity;
		let chosenEnemy = null;
    
		for (const player of players) {
			if (player !== this && !player.isDead() && player.life < minLife) {
				minLife = player.life;
				chosenEnemy = player;
			}
		}
    
		return chosenEnemy;
	}

	moveToEnemy(enemy) {
		if (!enemy) return;
    
		const distance = enemy.position - this.position;
		if (distance > 0) {
			this.moveRight(this.speed);
		} else if (distance < 0) {
			this.moveLeft(this.speed);
		}
	}

	turn(players) {
		const enemy = this.chooseEnemy(players);
		if (!enemy) return;
    
		this.moveToEnemy(enemy);
		this.tryAttack(enemy);
	}
}
