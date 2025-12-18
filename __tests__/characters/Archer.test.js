import { Archer } from '../../src/js/characters/Archer.js';

describe('Archer', () => {
  test('создание и базовые свойства', () => {
    const a = new Archer(0, 'Тест');
    expect(a.life).toBe(80);
    expect(a.magic).toBe(35);
    expect(a.attack).toBe(5);
    expect(a.weapon.range).toBeGreaterThan(0);
  });

  test('getDamage учитывает расстояние и range оружия', () => {
    const a = new Archer(0, 'Тест');
    // Подменяем getLuck чтобы контролировать значение
    a.getLuck = () => 1;
    a.weapon.getDamage = () => 10;
    const dmg = a.getDamage(3); // distance == weapon.range
    expect(typeof dmg).toBe('number');
    expect(dmg).toBeGreaterThan(0);
  });
});
