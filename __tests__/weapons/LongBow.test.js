import { LongBow } from '../../src/js/weapons/LongBow.js';

test('Длинный лук создаётся с правильными параметрами', () => {
  const longBow = new LongBow();
  expect(longBow.name).toBe('Длинный лук');
  expect(longBow.attack).toBe(15);
  expect(longBow.durability).toBe(200);
  expect(longBow.range).toBe(4);
});
