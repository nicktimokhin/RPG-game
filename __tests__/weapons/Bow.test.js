import { Bow } from '../../src/js/weapons/Bow.js';

test('Лук создаётся с правильными параметрами', () => {
  const bow = new Bow();
  expect(bow.name).toBe('Лук');
  expect(bow.attack).toBe(10);
  expect(bow.durability).toBe(200);
  expect(bow.range).toBe(3);
});
