import express from 'express';
import uuid from 'uuid-random'

const app = express();
app.use(express.static('client'));

let messages = [
    {id: 'abeoirjfkmal', msg: 'These are three default messagesssss', time: 'a minute ago'},
    {id: 'peufjkglsmne', msg: 'delivered from the server', time: 'last week'},
    {id: 'poeifpaytlmk', msg: 'using a custom route', time: 'last month'},
];

app.get('/messages', (req, res) =>{
    res.json(messages);
});

app.get('/messages/:id', (req, res) =>{
    for (const message of messages){
        if (message.id === req.params.id){
            res.json(message);
            return;
        }
    }

    res.status(404).send('No match for that ID.');
});

app.post('/messages', express.json(), (req, res) => {
    const newMessage = {
        id: uuid(),
        msg: req.body.msg,
        time: Date(),
    };

    messages = [newMessage, ...messages.slice(0,9)];
    res.json(messages);
});

app.listen(8080);

console.log('server started')