const el = {};

function removeContentFrom(what){
    what.textContent = '';
}

function showMessages(messages, where){
    for (const message of messages){
        const li = document.createElement('li');
        li.textContent = message;
        where.append(li);
    }
}


async function loadMessages(){
    const response = await fetch('messages');
    let messages;
    if (response.ok){
        messages = await response.json(); //parses the stringified json array to a js obkect
    } else{
        messages = ['failed to load messaegs :-('];
    }

    removeContentFrom(el.messageList);
    showMessages(messages, el.messageList);
}

function checkKeys(e){
    if(e.key === "Enter"){
        sendMessage();
    }
}

async function sendMessage(){
    const payload = { msg: el.message.value };
    console.log('Payload', payload);

    const response = await fetch('messages', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
    });

    if(response.ok){
        el.message.value = '';
        const updatedMessages = await response.json();
        removeContentFrom(el.messageList);
        showMessages(updatedMessages, el.messageList);
    } else{
        console.log('failed to send message', response);
    }
}

function prepareHandles(){
    el.messageList = document.querySelector('#messagelist');
    el.message = document.querySelector('#message');
    el.send = document.querySelector('#send');
}

function addEventListeners(){
    el.send.addEventListener('click', sendMessage);
    el.message.addEventListener('keyup', checkKeys);
}

function pageLoaded(){
    prepareHandles();
    addEventListeners();
    loadMessages();
}

window.addEventListener('load', pageLoaded)