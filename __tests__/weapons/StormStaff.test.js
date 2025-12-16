import { StormStaff } from '../../src/js/weapons/StormStaff.js';

test('Посох Бури создаётся с правильными параметрами', () => {
  const stormStaff = new StormStaff();
  expect(stormStaff.name).toBe('Посох Бури');
  expect(stormStaff.attack).toBe(10);
  expect(stormStaff.durability).toBe(300);
  expect(stormStaff.range).toBe(3);
});
