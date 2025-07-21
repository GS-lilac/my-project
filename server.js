const WebSocket = require('ws');
const PORT = process.env.PORT || 3000;

const server = new WebSocket.Server({ port: PORT });

let players = [];

server.on('connection', (socket) => {
  console.log('Гравець підключився');
  players.push(socket);

  socket.on('message', (message) => {
    for (let player of players) {
      if (player !== socket && player.readyState === WebSocket.OPEN) {
        player.send(message);
      }
    }
  });

  socket.on('close', () => {
    players = players.filter(p => p !== socket);
    console.log('Гравець відключився');
  });
});

console.log(`Сервер працює на порті ${PORT}`);
