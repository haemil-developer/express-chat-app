const socket = io();

const query = new URLSearchParams(location.search);
const username = query.get('username');
const room = query.get('room');
socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error);
        location.href = '/';
    }
});

// template
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;
const messageTemplate = document.querySelector('#message-template').innerHTML;
// elements
const messageForm = document.querySelector('#message-form');
const messageFormInput = messageForm.querySelector('input');
const messageFormButton = messageForm.querySelector('button');
const messages = document.querySelector('#messages');

//sidbar
socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
})

// message
function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
}

socket.on('message', (message) => {
    console.log(message)
    //Mustache to render dynamic templates or messages
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    messages.insertAdjacentHTML('beforeend', html);
    scrollToBottom();
})

messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageFormButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error) => {
        messageFormButton.removeAttribute('disabled')
        messageFormInput.value = ''
        messageFormInput.focus()

        if (error) {
            return console.log(error)
        }
    })
})
