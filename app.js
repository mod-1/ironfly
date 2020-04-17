const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const server = require('http').Server(app);
const io = require("socket.io")(server);

const fs = require("fs");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }))

const tickData = JSON.parse(fs.readFileSync('tickData.json', 'UTF-8'));
let compNames={};
let ticker={};
// store stock names and ticker for quick access later.
for(let attr in tickData) {
    compNames[tickData[attr].companyName]=attr;
    ticker[tickData[attr].companyName]= tickData[attr].ticker;
}

//use delay while reading in ticks
const delay = (seconds) => new Promise((resolves, rejects) => {
    setTimeout(f => f, seconds);
});

const stocks=[];//store user subscriptions
let STORED_SOCKET = [] ;

//use socket to display updated data
io.on('connection', (socket) => {
    socket.emit('news', { hello: 'world' });
    STORED_SOCKET.push(socket) ;
    console.log(STORED_SOCKET);
});

app.get("/subscribe", (req,res) =>{
    res.sendFile(path.join(__dirname, "./subscribe.html"))
});

app.post("/subscribe", (req, res) => {
    stocks.push(req.body.stocks);
    res.send("200 OK");
});

server.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);