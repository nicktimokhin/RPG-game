import { Player } from '../../src/js/characters/Player.js';
import { Warrior } from '../../src/js/characters/Warrior.js';
import { Archer } from '../../src/js/characters/Archer.js';
import { Arm } from '../../src/js/weapons/Arm.js';
import { Knife } from '../../src/js/weapons/Knife.js';

describe('Player actions', () => {
  test('move left/right and move()', () => {
    const p = new Player(5, 'P');
    p.speed = 2;
    p.moveLeft(5);
    expect(p.position).toBe(3);
    p.moveRight(1);
    expect(p.position).toBe(4);
    p.move(-1);
    expect(p.position).toBe(3);
    p.move(2);
    expect(p.position).toBe(5);
  });

  test('isAttackBlocked and dodged deterministic via getLuck', () => {
    const p = new Player(0, 'P');
    p.luck = 50; // makes threshold (100-50)/100 = 0.5
    p.agility = 10;
    p.speed = 1;
    // force getLuck values
    p.getLuck = () => 0.6;
    expect(p.isAttackBlocked()).toBe(true);
    p.getLuck = () => 0.1;
    expect(p.isAttackBlocked()).toBe(false);
    p.getLuck = () => 0.9;
    expect(p.dodged()).toBe(true);
  });

  test('takeAttack: blocked damages weapon, dodged ignores, else reduces life', () => {
    const attacker = new Warrior(0, 'A');
    const defender = new Player(0, 'D');
    defender.getLuck = () => 0.99; // will block
    defender.weapon = new Arm();
    defender.weapon.durability = 10;
    defender.takeAttack(5);
    expect(defender.weapon.durability).toBeLessThan(10);

    defender.getLuck = () => 0; // no block, but dodged threshold high
    defender.agility = 100;
    defender.getLuck = () => 1.0;
    expect(defender.dodged()).toBe(true);

    defender.getLuck = () => 0; // not dodged
    defender.agility = 0;
    const prev = defender.life;
    defender.takeAttack(10);
    expect(defender.life).toBe(prev - 10);
  });

  test('checkWeapon swaps broken weapon down to Knife then Arm', () => {
    const w = new Warrior(0, 'W');
    // simulate broken sword
    w.weapon.durability = 0;
    w.checkWeapon();
    expect(w.weapon).toBeInstanceOf(Knife);
    // break knife
    w.weapon.durability = 0;
    w.checkWeapon();
    expect(w.weapon).toBeInstanceOf(Arm);
  });
});
