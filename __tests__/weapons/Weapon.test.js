import { Weapon } from '../../src/js/weapons/Weapon.js';

describe('Weapon', () => {
  let weapon;

  beforeEach(() => {
    weapon = new Weapon('Тестовое', 20, 100, 2);
  });

  test('создаётся с правильными свойствами', () => {
    expect(weapon.name).toBe('Тестовое');
    expect(weapon.attack).toBe(20);
    expect(weapon.durability).toBe(100);
    expect(weapon.range).toBe(2);
  });

  test('takeDamage уменьшает прочность, но не ниже 0', () => {
    weapon.takeDamage(30);
    expect(weapon.durability).toBe(70);
    weapon.takeDamage(80);
    expect(weapon.durability).toBe(0);
  });

  test('getDamage возвращает полный урон при durability >= 30%', () => {
    expect(weapon.getDamage()).toBe(20);
    weapon.takeDamage(60); // 40 осталось → 40% → всё ещё полный урон
    expect(weapon.getDamage()).toBe(20);
  });

  test('getDamage возвращает 70% урона при 10% <= durability < 30%', () => {
    weapon.takeDamage(75); // 25 осталось → 25%
    expect(weapon.getDamage()).toBeCloseTo(14); // 20 * 0.7
  });

  test('getDamage возвращает 50% урона при durability < 10%', () => {
    weapon.takeDamage(95); // 5 осталось → 5%
    expect(weapon.getDamage()).toBe(10); // 20 * 0.5
  });

  test('getDamage возвращает 0, если сломано', () => {
    weapon.takeDamage(100);
    expect(weapon.getDamage()).toBe(0);
  });

  test('isBroken возвращает true, если durability = 0', () => {
    expect(weapon.isBroken()).toBe(false);
    weapon.takeDamage(100);
    expect(weapon.isBroken()).toBe(true);
  });
});
