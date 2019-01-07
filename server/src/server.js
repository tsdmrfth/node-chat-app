const path = require('path')
const express = require('express')

const app = express()
app.use(express.static(path.join(__dirname, '../../client/build')));

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
app.listen(port, () => {
    console.log('App is listening on port ' + port);
});