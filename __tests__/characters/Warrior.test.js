import { Warrior } from '../../src/js/characters/Warrior.js';

describe('Warrior', () => {
  test('создание и базовые свойства', () => {
    const w = new Warrior(0, 'Тест');
    expect(w.life).toBe(120);
    expect(w.speed).toBe(2);
    expect(w.description).toBe('Воин');
  });

  test('takeDamage использует ману при малом здоровье и удаче', () => {
    const w = new Warrior(0, 'Тест');
    w.magic = 50;
    w.life = 50; // меньше 50% от 120
    // Подменяем getLuck чтобы вернуть > 0.8
    w.getLuck = () => 0.9;
    w.takeDamage(10);
    expect(w.magic).toBe(40);
  });
});
