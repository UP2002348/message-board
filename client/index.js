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

    const messageList = document.querySelector('#messagelist');
    removeContentFrom(messageList);
    showMessages(messages, messageList);
}

function pageLoaded(){
    loadMessages();
}

window.addEventListener('load', pageLoaded)