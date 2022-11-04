import Ship from "./ship.js";

const gameBoard = () => {
    let player = Ship('player')
    let aibot = Ship('aibot')
    function update_coordinates(player_id,ship_dom_pieces){
        if (player_id === player.id){
            player.update_ship_array(ship_dom_pieces)
        } else{
            aibot.update_ship_array(ship_dom_pieces)
        }
        
    }

    function check_if_ship_hit(coords){
        let [id,x_coord,y_coord] = coords
        console.log('HERE IS THE ID ', id)
        console.log('HERE IS THE x ', x_coord)
        console.log('HERE IS THE y ', y_coord)
        if (id === player.id){
            console.log('Player cell was clicked on.')
            aibot.hit(player,[x_coord,y_coord])
            console.log('Player ships after everything was updated/deleted', player.get_ships())
        } else if (id === aibot.id){
            console.log('Ai bot cell was clicked on.')
            player.hit(aibot, [x_coord,y_coord])
            console.log('AI bot ships after everything was updated/deleted', aibot.get_ships())
        }
        check_winner(player,aibot)
        return;
        
    }

    function check_winner(player_id,bot_id){
        const player = player_id;
        const bot = bot_id
        let player_ships = player.get_ships()
        let bot_ships = bot.get_ships()
        let player_counter = 0;
        let bot_counter = 0;
        for (const property in player_ships){
            if(property){
                player_counter++
            }
        }
        for (const property in bot_ships){
            if(property){
                bot_counter++
            }
        }
        if (player_counter < 1 && bot_counter > 1 ){
            console.log(`We have a winner. Its ${bot.id}`)
            return bot.id;
        }
        if (player_counter > 1 && bot_counter < 1 ){
            console.log(`We have a winner. Its ${player.id}`)
            return player.id;
        }
        return false;
    }


    return {  player, aibot, update_coordinates, check_if_ship_hit, check_winner  }
}

export default gameBoard;