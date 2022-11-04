import Ship from "../modules/ship";
import gameBoard from "../modules/gameboard";
const player = Ship('player');
const enemy = Ship('enemy');


it('Gets the ID of the ship correctly after being instantiated', () => {
    expect(player.id).toBe('player')
})

it('Enemy gets ships back correctly', () => {
    let enemy_ships = enemy.get_ships()
    let ships = Object.keys(enemy_ships)
    expect(ships).toEqual(["carrier","battleship","cruiser","submarine","destroyer"])
})

it('After player ships get sunk, it deletes the ship array correctly', () => {
    let player_ships = player.get_ships()
    delete player_ships["carrier"]
    let ships = Object.keys(player_ships)
    expect(ships).toEqual(["battleship","cruiser","submarine","destroyer"])
})

it('Starts the game session and renders player and aibot correctly', () => {
    const game = gameBoard();
    expect(game.player.id).toBe("player")
})

it('Checks the winner after all ships been sunk', () => {
    const game = gameBoard();
    const player_ = game.player;
    const enemy_ = game.aibot;
    const player_ships_ = player_.get_ships();
    delete player_ships_["carrier"]
    delete player_ships_["battleship"]
    delete player_ships_["cruiser"]
    delete player_ships_["submarine"]
    delete player_ships_["destroyer"]
    expect(game.check_winner(player_,enemy_)).toBe(enemy_.id)
})


// it('Player ship hits another ship', () => {
//     const omar_ship = Ship('Player')
//     const enemy_ship = Ship('enemy')
//     omar_ship.hit(enemy_ship,'carrier')
//     expect(enemy_ship.get_ships()).toEqual({
//         carrier: [ 2, 3, 4, 5 ],
//         battleship: [ 1, 2, 3, 4 ],
//         cruiser: [ 1, 2, 3 ],
//         submarine: [ 1, 2, 3 ],
//         destroyer: [ 1, 2 ]
//       })
// })

// it('Gets number of hits', () => {
//     const omar_ship = Ship('Battleship', 4)
//     omar_ship.hit(1)
//     expect(omar_ship.get_num_of_hits()).toBe(1)
// })

// it('Gets id of ship', () => {
//     const omar_ship = Ship('Battleship', 4)
//     expect(omar_ship.id).toBe('Battleship')
// })



