// https://fchatiavi.herokuapp.com/get/darkick/?offset=0&limit=10
let messages = document.getElementById('messages')
let roomNameInput = document.getElementById('roomname-input')
let sendButton = document.getElementById('send-btn')
sendButton.addEventListener('click', sendUserMessage);
function start() {
    getMessagesFromServer();
    setInterval(getMessagesFromServer, 2000)
    
}
let lastMessages = [];
getMessagesFromServer()
async function getMessagesFromServer() {
    let roomname = roomNameInput.value 
    let response = await fetch(`https://fchatiavi.herokuapp.com/get/${roomname}/?offset=0&limit=1000000`)
    response = await response.json();
    if (response == null) {
        messages.innerHTML = 'No messages'
        return
    }
    let messagesHTML = fromMessagesHTML(response);
    messages.innerHTML = messagesHTML
    if (lastMessages.length < response.length) {
        scrollTopEnd()
    }
    lastMessages = response
}
async function sendUserMessage() {
    let roomname = roomNameInput.value
    let userNickname = document.getElementById('nickname-input').value
    let userMessage = document.getElementById('message-input').value
    if (userNickname.length === 0) {
        alert("Нужно ввести имя!")
        return;
    }
    if (userMessage.length === 0) {
        alert("Нужно ввести сообщение!")
        return;
    }
    await fetch(`https://fchatiavi.herokuapp.com/send/${roomname}/`, {
        method: 'POST',
        
        body: JSON.stringify({
            Name: userNickname,
            Message: userMessage
        })
    })
    getMessagesFromServer()
}
function fromMessagesHTML(messages) {
    let allMessagesHTML = ''
    for (let i = 0; i < messages.length; i++) {
        let messageData = messages[i];
        let message = `            
    <div class="message">
        <div class="message-nickname"> ${messageData.Name} </div>
        <div class="message-text"> ${messageData.Message} </div>
    </div>
    `
        allMessagesHTML = allMessagesHTML + message
    }
    return allMessagesHTML;
}
function scrollTopEnd() {
    messages.scrollTop = messages.scrollHeight
}