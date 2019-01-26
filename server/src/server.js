const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)
app.use(express.static(path.join(__dirname, '../../client/build')));

io.on("connection", socket => {
    console.log("New client connected")
    setInterval(
        () => getApiAndEmit(socket),
        100000
    );
    socket.on("disconnect", () => console.log("Client disconnected"));
});

const getApiAndEmit = async socket => {
    try {
        socket.emit("FromAPI", 'Naber bababab');
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build'));
});

app.get('/api/getList', (req, res) => {
    var list = ["item2", "baba", "item3"];
    res.json(list);
});

app.get('/list', (req, res) => {
    var list = ["item2", "baba", "item3"];
    res.json(list);
});

const port = process.env.PORT || 3400;
server.listen(port, () => {
    console.log('App is listening on port ' + port);
});