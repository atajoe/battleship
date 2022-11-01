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
        return;
        
    }

    return {  player, aibot, update_coordinates, check_if_ship_hit  }
}

export default gameBoard;