const express = require("express");
const mongoose = require("mongoose");
const app = express();
const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
const { User } = require("./database/mongo");

const uri = "mongodb+srv://dimi:dimi@cluster0.ivghiah.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(uri).then(
    console.log("Povezan sa MongoDB")
).catch(
    (err) => {console.log(err)}
)

app.use(express.static("public"));

app.get("/getall", async (req, res) => {
    const userArray = await User.find({});
    res.status(200).json(userArray);
});

io.on('connection', (socket) => {
    console.log("a user connected");
    socket.on('chat message', async (message) => {
        try{
            const user = await User.create({
                username: message.username,
                messages: {
                    text: message.text,
                    date: message.date
                }
            });
            await user.save();
            io.emit('chat message', message);
        }
        catch(err){
            console.log(err);
        }
    });
    socket.on('disconnect', () => {
        console.log("a user disconnected");
    })
});

server.listen(5000, () => console.log("Server slusa na portu 5000..."));