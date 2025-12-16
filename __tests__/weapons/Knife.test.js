import { Knife } from '../../src/js/weapons/Knife.js';

test('Нож создаётся с правильными параметрами', () => {
  const knife = new Knife();
  expect(knife.name).toBe('Нож');
  expect(knife.attack).toBe(5);
  expect(knife.durability).toBe(300);
  expect(knife.range).toBe(1);
});
