import express from 'express';

const app = express();
app.use(express.static('client'));

let messages = [
    'These are three default messagesssss',
    'delivered from the server',
    'using a custom route',
];

app.get('/messages', (req, res) =>{
    res.json(messages);
});

app.post('/messages', express.json(), (req, res) => {
    messages = [req.body.msg, ...messages.slice(0,9)];
    res.json(messages);
});

app.listen(8080);

console.log('server started')