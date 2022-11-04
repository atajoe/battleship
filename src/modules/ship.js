const Ship = (id) => {
    const generate_unique_coordinates = (count) => {
        const ship = [];
        while (ship.length < count){
            const randomNum = Math.floor(Math.random() * 10)
            if (ship.indexOf(randomNum) === -1){
                ship.push(randomNum)
            }
        }
        return ship
    }
    let unique_numbers = generate_unique_coordinates(5);
    function generate_ship_coordinates(x_coord){
        let ship_array = [];
        for (let i = 0; i < 10; i++){
            ship_array.push([x_coord,i])
        }

        return ship_array
    }
    function create_ship_pieces(){
        let carrier = generate_ship_coordinates(unique_numbers[0]);
        let battleship = generate_ship_coordinates(unique_numbers[1]);
        let cruiser = generate_ship_coordinates(unique_numbers[2]);
        let submarine = generate_ship_coordinates(unique_numbers[3]);
        let destroyer = generate_ship_coordinates(unique_numbers[4]);
        return {carrier,battleship,cruiser,submarine,destroyer}
    }

    let ship_pieces = create_ship_pieces();
    

    const remove_piece = (id,position) => {
        if (ship_pieces[id].length <= 1){
            return isSunk(id);
        }
        const position_reference = ship_pieces[id].findIndex((cell) => JSON.stringify(cell) == JSON.stringify(position))
        console.log('Here is the position reference, ', position_reference)
        ship_pieces[id].splice(position_reference,1)
        console.log('Here is the updated ship_pieces afterwards:', ship_pieces)
        
        return;
    }
    
    const get_ships = () => {
        return ship_pieces
    }

    const hit = (id,position) => {
        let player = id;
        console.log('Here is the player fgrom hit function', player)
        let [ship_name, ship_position] = player.grab_position(player,position)
        if (ship_name == null || ship_position == null){
            console.log('Doesnt exist!')
            return false;
        }
        player.remove_piece(ship_name,ship_position)
        return true;
    }

    const isSunk = (ship) => {
        delete ship_pieces[ship];
        console.log(`Ship has been deleted since its array is empty.`)
        return;
    }

    const grab_position = (id,position) => {
        let player = id;
        console.log('From grab position function, this is the position ', position)
        
        for (const property in ship_pieces) {
            let object_array = ship_pieces[property]
            let coords_result = object_array.find((cell) => JSON.stringify(cell) == JSON.stringify(position))
            if (coords_result != undefined){
                console.log(`${player.id} was hit!`)
                console.log('Here is the property: ', property)
                return [property,coords_result];
            }
        }
        return [null,null]
        
    }

    const update_ship_array = (ship_pieces_dom) => {
        ship_pieces = null;
        return ship_pieces = ship_pieces_dom;
    }

    return { id, get_ships, hit, remove_piece, grab_position, update_ship_array }
}


export default Ship;