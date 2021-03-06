const el = {};

function removeContentFrom(what){
    what.textContent = '';
}

function showMessages(messages, where){
    for (const message of messages){
        const li = document.createElement('li');
        li.textContent = message.msg;
        li.dataset.id = message.id;

        const edit = document.createElement('a');
        edit.textContent = 'edit me';
        edit.href = `/message#${message.id}`;
        li.append('(', edit, ')');

        const ava = document.createElement('img');
        ava.className = 'avatar';
        ava.src = message.avatar || '/images/user.png';
        li.prepend(ava);
        
        where.append(li);

        li.addEventListener('mouseenter', showDetail);
    }
}

async function showDetail(e){
    const response = await fetch('messages/'+e.target.dataset.id);
    if (response.ok){
        const detail = await response.json();
        const p = document.createElement('p');
        p.textContent = `Message received on server at ${detail.time}`;
        removeContentFrom(el.detail);
        el.detail.append(p);
    }
}

async function loadMessages(){
    const response = await fetch('messages'); //goes to the currentpath/messages url
    let messages;
    if (response.ok){
        messages = await response.json(); //gets the json in the fetch and parses the stringified json array to a js object
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
    const payload = new FormData();
    payload.append('msg', el.message.value);
    if(el.avatarfile.files.length){
        payload.append('avatar', el.avatarfile.files[0]);
    }

    const response = await fetch('messages', {
        method: 'POST',
        body: payload,
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
    el.detail = document.querySelector('#detail');
    el.avatarfile = document.querySelector('#avatarfile');
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