const socket = io('http://localhost:8000');

const form = document.getElementById('send-container')

const messinput = document.getElementById('messageinp')
const messagecontainer = document.querySelector(".container")

var audio = new Audio('mm.mp3');

const append = (message, position) => {
    const messageelement = document.createElement('div');
    messageelement.innerText = message;
    messageelement.classList.add('message')
    messageelement.classList.add(position)
    messagecontainer.append(messageelement)
    if (position == 'left') {
        audio.play();
    }

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messinput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message)
    messinput.value = ''
})

const name = prompt("enter your name")

socket.emit('new-user-joined', name)


socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
})


socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})
socket.on('left', data => {
    append(`${name}: left the chat`, 'right ')
})