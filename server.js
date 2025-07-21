const WebSocket = require('ws');
const http = require('http');

// Створюємо HTTP-сервер (обов’язково для Render)
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('🌐 Сервер WebSocket працює!');
});

// Створюємо WebSocket-сервер
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('🟢 Нове підключення WebSocket');

  ws.on('message', (message) => {
    console.log('📩 Отримано повідомлення:', message.toString());

    // Відправляємо назад відповідь
    ws.send(`🔁 Сервер отримав: ${message}`);
  });

  ws.on('close', () => {
    console.log('🔴 Клієнт відключився');
  });

  ws.send('👋 Вітаємо на сервері WebSocket!');
});

// Запускаємо сервер
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`🚀 Сервер запущено на порту ${PORT}`);
});
