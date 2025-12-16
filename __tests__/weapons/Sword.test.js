import { Sword } from '../../src/js/weapons/Sword.js';

test('Меч создаётся с правильными параметрами', () => {
  const sword = new Sword();
  expect(sword.name).toBe('Меч');
  expect(sword.attack).toBe(25);
  expect(sword.durability).toBe(500);
  expect(sword.range).toBe(1);
});
