import { Dwarf } from '../../src/js/characters/Dwarf.js';

describe('Dwarf', () => {
  test('every sixth hit may be halved when lucky', () => {
    const d = new Dwarf(0, 'G');
    // force getLuck to > 0.5
    d.getLuck = () => 0.6;
    // hit 5 times normally
    for (let i = 0; i < 5; i++) d.takeDamage(10);
    const lifeBefore = d.life;
    // sixth hit should be halved
    d.takeDamage(10);
    expect(d.life).toBeGreaterThan(lifeBefore - 10);
  });
});
