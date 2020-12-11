const socket = io();
document.getElementById('join-chat-button').addEventListener('click', function () {
    const input = document.getElementById('user-name-input');
    const userName = input.value;
    const color = document.getElementById('text-color').value;
    if (userName.length > 0) {
        console.log(userName);
        document.getElementById('user-name-missing').classList.add('display-none');
        socket.emit('join-chat', { name: userName, color: color });
    }
    else {
        document.getElementById('user-name-missing').classList.remove('display-none');
    }
})

socket.on('joined-chat', function () {
    console.log('You joined chat!');
    document.getElementById('menu').classList.add('display-none');
    document.getElementById('chat-container').classList.remove('display-none');
})

document.getElementById('send-message-button').addEventListener('click', function () {
    const input = document.getElementById('message');
    const message = input.value;
    input.value = '';
    socket.emit('send-message', message);
})

socket.on('new-message', function (message) {
    const messagesContainer = document.getElementById('chat-messages');
    const nameElement = document.createElement('p');
    const messageColor = document.createElement('span');
    var mess = message.name.split(":");
    nameElement.innerHTML = mess[0] + ": ";
    messageColor.style.cssText = 'color:' + message.userColor + ';';
    messageColor.innerHTML = mess[1];
    nameElement.appendChild(messageColor);
    messagesContainer.appendChild(nameElement);
})

document.getElementById('leave-chat-button').addEventListener('click', function () {
    socket.emit('leave-chat');
})
socket.on('menu', function () {
    console.log('You left chat!');
    document.getElementById('menu').classList.remove('display-none');
    document.getElementById('chat-container').classList.add('display-none');
})

socket.on('nrOfFriends', function (nrOfFriends, obj) {
    console.log("NR OF FRIENDS ", nrOfFriends);
    var friends = parseInt(nrOfFriends) - 1;
    document.getElementById('nrOfFriends').innerHTML = 'You have ' + friends + ' active friends';

    const messagesContainer = document.getElementById('chat-messages');
    const nameElement = document.createElement('p');

    nameElement.innerText = obj.name + ' ' + obj.action;
    messagesContainer.appendChild(nameElement);
})