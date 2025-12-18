export function play(players) {
  let round = 1;
  console.log('=== Начало битвы ===');
  
  while (true) {
    console.log(`\n--- Раунд ${round} ---`);
    
    // Проверяем, остался ли один живой игрок
    const alivePlayers = players.filter(player => !player.isDead());
    if (alivePlayers.length <= 1) {
      break;
    }
    
    // Каждый игрок делает ход
    for (const player of players) {
      if (!player.isDead()) {
        player.turn(players);
        
        // Выводим состояние игрока для наблюдения
        console.log(`${player.name} (${player.description}): Позиция: ${player.position}, Жизнь: ${player.life}, Мана: ${player.magic}, Оружие: ${player.weapon.name}`);
      }
    }
    
    round++;
  }
  
  console.log('\n=== Конец битвы ===');
  
  const alivePlayers = players.filter(player => !player.isDead());
  if (alivePlayers.length === 0) {
    console.log('Нет победителя! Все погибли.');
    return null;
  } else if (alivePlayers.length === 1) {
    console.log(`Победитель: ${alivePlayers[0].name} (${alivePlayers[0].description})`);
    return alivePlayers[0];
  } else {
    console.log('Ничья! Осталось несколько живых игроков:');
    alivePlayers.forEach(player => {
      console.log(`- ${player.name} (${player.description})`);
    });
    return alivePlayers;
  }
}
