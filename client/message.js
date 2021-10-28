const el = {};

function showMessage(message){
    el.message.value = message.msg;
}

function getMessageId(){
    return window.location.hash.substring(1); //hash part returns the values after and including # and the substring(1) returns the values without the #
}


async function loadMessage(){
    const id = getMessageId();
    const response = await fetch(`messages/${id}`);
    let message;
    if (response.ok){
        message = await response.json();
    } else{
        message = {msg: 'failed to load messages :-('};
    }
    showMessage(message);
}

function checkKeys(e){
    if (e.key === 'Enter'){
        sendMessage();
    }
}

async function sendMessage(){
    const id = getMessageId();
    const payload = {id, msg: el.message.value};
    console.log(payload);
    
    const response = await fetch(`messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

    if (response.ok) {
        const updatedMessages = await response.json();
        showMessage(updatedMessages);
      } else {
        console.log('failed to send message', response);
      }
    
}

function prepareHandles(){
    el.send = document.querySelector('#send');
    el.message = document.querySelector('#message-box');
}

function addEventListeners(){
    el.send.addEventListener('click', sendMessage);
    el.message.addEventListener('keyup', checkKeys)
}

function pageLoaded(){
    prepareHandles();
    addEventListeners();
    loadMessage();
}

window.addEventListener('load', pageLoaded)