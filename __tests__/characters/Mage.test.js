import { Mage } from '../../src/js/characters/Mage.js';

describe('Mage', () => {
  test('создание и базовые свойства', () => {
    const m = new Mage(0, 'Тест');
    expect(m.life).toBe(70);
    expect(m.magic).toBe(100);
    expect(m.attack).toBe(5);
  });

  test('takeDamage уменьшает ману при достаточном уровне маны', () => {
    const m = new Mage(0, 'Тест');
    m.getLuck = () => 0; // чтобы deterministic
    m.takeDamage(20);
    expect(m.magic).toBe(88); // уменьшилось на 12
    expect(m.life).toBeLessThan(70);
  });
});
