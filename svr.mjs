import express from 'express';

const app = express();
app.use(express.static('client'));

const messages = [
    'These are three default messagesssss',
    'delivered from the server',
    'using a custom route',
];

app.get('/messages', (req, res) =>{
    res.json(messages);
});

app.listen(8080);