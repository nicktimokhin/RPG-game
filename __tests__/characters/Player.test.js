import { Player } from '../../src/js/characters/Player.js';
import { Arm } from '../../src/js/weapons/Arm.js';

describe('Player', () => {
  let player;
  
  beforeEach(() => {
    player = new Player(10, 'Тестовый игрок');
  });
  
  test('constructor устанавливает правильные значения по умолчанию', () => {
    expect(player.life).toBe(100);
    expect(player.magic).toBe(20);
    expect(player.speed).toBe(1);
    expect(player.attack).toBe(10);
    expect(player.agility).toBe(5);
    expect(player.luck).toBe(10);
    expect(player.description).toBe('Игрок');
    expect(player.weapon).toBeInstanceOf(Arm);
    expect(player.position).toBe(10);
    expect(player.name).toBe('Тестовый игрок');
  });
  
  test('getLuck возвращает значение между 0 и 2', () => {
    const luck = player.getLuck();
    expect(luck).toBeGreaterThanOrEqual(0);
    expect(luck).toBeLessThanOrEqual(2);
  });
  
  test('takeDamage уменьшает здоровье', () => {
    player.takeDamage(20);
    expect(player.life).toBe(80);
  });
  
  test('takeDamage не уменьшает здоровье ниже 0', () => {
    player.takeDamage(150);
    expect(player.life).toBe(0);
  });
  
  test('isDead возвращает true при нулевом здоровье', () => {
    expect(player.isDead()).toBe(false);
    player.takeDamage(100);
    expect(player.isDead()).toBe(true);
  });
});
