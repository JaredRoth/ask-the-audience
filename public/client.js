var socket = io();

var connectionCount = document.getElementById('connection-count');
var statusMessage = document.getElementById('status-message');
var buttons = document.querySelectorAll('#choices button');
var confirm = document.getElementById('confirm');
var aCount = document.getElementById('a-count');
var bCount = document.getElementById('b-count');
var cCount = document.getElementById('c-count');
var dCount = document.getElementById('d-count');

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

socket.on('voteCount', function (votes) {
  aCount.innerText = votes['A'] || 0;
  bCount.innerText = votes['B'] || 0;
  cCount.innerText = votes['C'] || 0;
  dCount.innerText = votes['D'] || 0;
});

socket.on('confirm', function (message) {
  confirm.innerText = "Congratulations, your vote for " + message + " has been recieved."
});

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}
