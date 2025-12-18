import { Player } from '../../src/js/characters/Player.js';
import { Warrior } from '../../src/js/characters/Warrior.js';
import { Dwarf } from '../../src/js/characters/Dwarf.js';
import { Archer } from '../../src/js/characters/Archer.js';
import { Sword } from '../../src/js/weapons/Sword.js';
import { Knife } from '../../src/js/weapons/Knife.js';

describe('Branch coverage tests', () => {
  function makeSpy() {
    const fn = (...args) => { fn.calls.push(args); };
    fn.calls = [];
    return fn;
  }
  test('isAttackBlocked damages weapon instead of life', () => {
    const attacker = new Player(0, 'att');
    const defender = new Player(0, 'def');
    defender.getLuck = () => 0.99; // force block
    defender.weapon = new Sword();
    const origLife = defender.life;
    const origDur = defender.weapon.durability;

    attacker.getLuck = () => 1;
    attacker.weapon = new Sword();
    attacker.position = 0;
    defender.position = 1; // in range 1

    attacker.tryAttack(defender);

    expect(defender.life).toBe(origLife);
    expect(defender.weapon.durability).toBeLessThan(origDur);
  });

  test('dodged prevents damage', () => {
    const attacker = new Player(0, 'att');
    const defender = new Player(0, 'def');
    defender.getLuck = () => 0; // no block
    defender.dodged = () => true; // force dodge

    attacker.getLuck = () => 1;
    attacker.weapon = new Sword();
    attacker.position = 0;
    defender.position = 1;

    attacker.tryAttack(defender);

    expect(defender.life).toBe(100);
  });

  test('Warrior mana branch uses magic before life', () => {
    const w = new Warrior(0, 'W');
    w.life = 50; // < 60
    w.magic = 30;
    w.getLuck = () => 0.9; // > 0.8
    w.takeDamage(10);
    expect(w.magic).toBeLessThan(30);
    expect(w.life).toBeGreaterThanOrEqual(0);
  });

  test('Dwarf sixth hit halves damage', () => {
    const d = new Dwarf(0, 'D');
    d.getLuck = () => 0.9; // > 0.5
    for (let i = 0; i < 5; i++) d.takeDamage(10);
    const before = d.life;
    d.takeDamage(10); // 6th
    expect(d.life).toBe(before - 5);
  });

  test('checkWeapon fallback chain for Warrior', () => {
    const w = new Warrior(0, 'W');
    w.weapon = new Sword();
    w.weapon.durability = 0;
    w.checkWeapon();
    expect(w.weapon).toBeInstanceOf(Knife);
    w.weapon.durability = 0;
    w.checkWeapon();
    expect(w.weapon.name).toBe('Рука');
  });

  test('tryAttack: out-of-range does nothing', () => {
    const a = new Archer(0, 'A');
    const enemy = { position: 10, isDead: () => false, takeAttack: makeSpy(), moveRight: makeSpy() };
    a.position = 0;
    a.tryAttack(enemy);
    expect(enemy.takeAttack.calls.length).toBe(0);
  });

  test('tryAttack: same position doubles damage and enemy moved', () => {
    const a = new Archer(0, 'A');
    const enemy = { position: 0, isDead: () => false, takeAttack: makeSpy(), moveRight: makeSpy() };
    a.weapon = new Sword();
    a.getLuck = () => 1;
    a.attack = 10;
    a.tryAttack(enemy);
    expect(enemy.moveRight.calls.length).toBeGreaterThan(0);
    expect(enemy.moveRight.calls[0][0]).toBe(1);
    expect(enemy.takeAttack.calls.length).toBeGreaterThan(0);
  });
});
