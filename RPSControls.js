module.exports = class RPSControls {
    constructor(rooms_par) {
        this.rooms = rooms_par
    }

    createPlayer(player_id,player_name,player_room_id,is_ready,player_decision){
        return ({
            id:player_id,
            name:player_name,
            roomID:player_room_id,
            is_ready:is_ready,
            decision:player_decision
        });
    }
    
    addPlayerToRoomID(player_obj,room_id){
        let sel_rooms = this.rooms.filter(room => {return room.id === room_id});
        let sel_room = sel_rooms[0];
        sel_room.players.push(player_obj);
    }
    


    logRooms(){
        console.log("Rooms : ");
        console.table(this.rooms);
    }

    logRoom(room_id){
        let sel_rooms = this.rooms.filter(room => {return room.id === room_id});
        let sel_room = sel_rooms[0]
        console.log(sel_room);
    }

    getRoom(room_id) {
        let sel_rooms = this.rooms.filter(room => {return room.id === room_id});
        let sel_room = sel_rooms[0]
        return sel_room;
    }
    
    getRoomSize(room_id){
        let sel_rooms = this.rooms.filter(room => {return room.id === room_id});
        let sel_room = sel_rooms[0].players;
        return sel_room.length;
    }
    
    setDecision(room_id,player_id,decision){
        let sel_room = this.getRoom(room_id);

        let players_in_room = sel_room.players;
        console.log(players_in_room);

        let fil_player_s = players_in_room.filter(player => {return player.id === player_id});
        let fil_player = fil_player_s[0];

        console.log(fil_player)
        fil_player.decision = decision;
        console.log(fil_player)

    }
    
    getPlayersInRoom(room_id){
        let cur_players = [];
        this.rooms.forEach(room => {
            if(room.id == room_id) {
                cur_players = room.players;
            }
        })
        return cur_players;
    }

    getIdByPlayerName(room_id,player_name){
        // Return Player Name From PlayerId in Room
        let names = []
        this.rooms.forEach(room => {
            if(room.id === room_id){
                room.players.forEach(player => {
                    if(player.name === player_name){
                        names.push(player.name);
                    }
                })
            }
        })
        return names
    }

    getPlayerNameById(room_id,player_id){
        // Return Player Id From PlayerName in Room
        let ids = []
        this.rooms.forEach(room => {
            if(room.id === room_id){
                room.players.forEach(player => {
                    if(player.id === player_id){
                        names.push(player.id);
                    }
                })
            }
        })
        return ids
    }

    getPlayerNamesInRoom(room_id){
        // Return All PlayerNames in Room
        let names = [];
        this.rooms.forEach(room => {
            if(room.id === room_id){
                room.players.forEach(player => {
                    names.push(player.name);
                })
            }
        })
        return names;
    }

    isRoomReadyToRound(room_id) {
        let is_ready = false;
        this.rooms.forEach(room => {
            if (room.id == room_id && room.players.length == 2) {
                is_ready = true;
            }
        })
        return is_ready;
    }
}
