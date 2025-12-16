import { Axe } from '../../src/js/weapons/Axe.js';

test('Секира создаётся с правильными параметрами', () => {
  const axe = new Axe();
  expect(axe.name).toBe('Секира');
  expect(axe.attack).toBe(27);
  expect(axe.durability).toBe(800);
  expect(axe.range).toBe(1);
});
