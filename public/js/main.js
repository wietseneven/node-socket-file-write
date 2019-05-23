var socket = io();

function buttonPress(message, filename = 'result') {
  socket.emit('button_press', { message, filename });
}