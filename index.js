const { create } = require('domain');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const RPSController = require('./RPSControls')


console.log("Starting....")

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/public/index.html');
});

let rooms = [
    {
        id:1,
        players: []
    },
    {
        id:2,
        players: []
    }
];
const Contorls = new RPSController(rooms);

let new_player = Contorls.createPlayer(69,"Keko",1,false,"");
Contorls.addPlayerToRoomID(new_player,new_player.roomID);

let new_player2 = Contorls.createPlayer(45,"Test",1,false,"");
Contorls.addPlayerToRoomID(new_player2,new_player2.roomID);

Contorls.setDecision(1,69,"Paper");

Contorls.logRoom(1);


console.log(Contorls.setDecision(1,69,"Rock"))
/*

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("create-player", (join) => {
        console.log(join.room_id)

        if (1 < 2) {
            let new_player_id = Math.floor(Math.random() * 100);
            let new_player = Contorls.createPlayer(new_player_id,join.player_name,parseInt(join.room_id),false,"");

            console.log(new_player);
            console.log("|New Player is Created ")
            Contorls.addPlayerToRoomID(new_player,parseInt(join.room_id));
            console.log(join.player_name+" is Added to Room: "+join.room_id);
            Contorls.logRoom(parseInt(join.room_id));

        }
        else {
            console.log("ROOM IS FULL");
        }

            //socket.emit('update-names',Contorls.getPlayersInRoom(join.roomID));
            //console.log("Msg Sent");

    })

    socket.on('set-decision',decision => {
        let new_decision = decision.local_decision;
        Contorls.setDecision(decision.roomID,Contorls.getIdByPlayerName(decision.playerName),new_decision);
        console.log(`${decision.playerName}'s Decision is Set to : `+ new_decision );
    })
    socket.on('set-ready',req => {
        let player_id = Contorls.getIdByPlayerName(req.playerName);
        //{ roomID: '2', playerName: 'Bora', player_ready: true }
        Contorls.setReadyByPlayerID(req.roomID,player_id,req.player_ready);
        console.log("Room: "+req.roomID+" -> Name: "+req.playerName+"'s Ready State is "+req.player_ready);


    })

    socket.on('disconnect', () => {

    });





  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});


*/