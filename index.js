const { create } = require('domain');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

console.log("Starting....")
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/public/index.html');
});

let players = [];

function createPlayer(player_id,player_name,player_room_id,player_decision){
    return ({id:player_id,name:player_name,roomID:player_room_id,decision:player_decision});
}


let player1 = createPlayer(1,"Player1",1,"Rock");
players.push(player1);

let player2 = createPlayer(2,"Player2",1,"Scissor");
players.push(player2);

let rooms = [
    {
        id:1,
        players: []
    },
    {
        id:2,
        players: []
    },
];


function addPlayerToRoom(player_id,room_id){
    players.forEach(player =>{
        if (player.id == player_id){
            rooms.forEach(room =>{
                if(room.id == room_id){
                    room.players.push(player);
                    console.log(player.name + " is Added to room: "+room_id);
                }
            })
        }
    });
}

function getPlayersInRoom(room_id){
    let cur_players = [];
    rooms.forEach(room => {
        if(room.id == room_id) {
            cur_players = room.players;
        }
    })
    return cur_players;
}
function getRoomSize(room_id){
    let size = 0;
    rooms.forEach(room => {
        if(room.id==room_id){
            size = room.players.length;
        }
    })
    return size;
}

function setDecision(room_id,player_id,decision){
    rooms.forEach(room => {
        if(room.id == room_id){
            room.players.forEach(player => {
                if (player.id == player_id) {
                    player.decision = decision;
                }
            })
        }
    })
}

function isRoomReadyToRound(room_id) {
    let is_ready = false;
    rooms.forEach(room => {
        if (room.id == room_id && room.players.length == 2) {
            is_ready = true;
        }
    })
    return is_ready;
}

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("create-player", (join) => {

        if (getRoomSize(join.room_id) < 2) {
            let rand_num = Math.floor(Math.random() * 100);
            let new_player = createPlayer(rand_num,join.player_name,join.room_id,"");
            players.push(new_player);
            console.log(new_player);
            addPlayerToRoom(new_player.id,join.room_id);
            console.log(rooms);
        }
        else {
            console.log("ROOM IS FULL")
        }
    })
    socket.on('set-decision',decision => {
        let new_decision = decision.local_decision;
        rooms.forEach(room =>{
            if (room.id == decision.roomID) {
                room.players.forEach(player =>{
                    if (player.name == decision.playerName){
                        player.decision = new_decision;
                        console.log(player.name+"'s decision is set to : "+new_decision);
                    }
                })
            }
        })
    })

    socket.on('disconnect', () => {
    });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});
