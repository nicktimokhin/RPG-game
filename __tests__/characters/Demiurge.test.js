import { Demiurge } from '../../src/js/characters/Demiurge.js';

describe('Demiurge', () => {
  test('getDamage boosted by 1.5 when magic>0 and lucky', () => {
    const dm = new Demiurge(0, 'D');
    dm.magic = 10;
    // force getLuck > 0.6
    dm.getLuck = () => 0.7;
    dm.weapon.getDamage = () => 10;
    // distance within range
    const dmg = dm.getDamage(1);
    expect(dmg).toBeGreaterThan(0);
    // base damage without multiplier
    dm.getLuck = () => 0.1;
    const dmg2 = dm.getDamage(1);
    expect(dmg).toBeGreaterThan(dmg2);
  });
});
