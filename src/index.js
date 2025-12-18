import { Warrior } from './characters/Warrior.js';
import { Archer } from './characters/Archer.js';
import { Mage } from './characters/Mage.js';
import { Dwarf } from './characters/Dwarf.js';
import { Crossbowman } from './characters/Crossbowman.js';
import { Demiurge } from './characters/Demiurge.js';
import { play } from './game.js';

// Перехват console.log для отображения в #app
const app = document.getElementById('app');
if (app) {
  const origLog = console.log.bind(console);
  console.log = (...args) => {
    origLog(...args);
    const line = document.createElement('pre');
    line.style.margin = '0 0 8px 0';
    line.textContent = args.map(a => {
      try { return typeof a === 'string' ? a : JSON.stringify(a, null, 2); } catch (e) { return String(a); }
    }).join(' ');
    app.appendChild(line);
  };
}

// Создаем персонажей
const players = [
  new Warrior(0, 'Алёша Попович'),
  new Archer(5, 'Леголас'),
  new Mage(10, 'Гендальф'),
  new Dwarf(15, 'Гимли'),
  new Crossbowman(20, 'Робин Гуд'),
  new Demiurge(25, 'Мерлин')
];

// Запускаем игру
play(players);
