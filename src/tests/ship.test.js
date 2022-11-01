
// const Ship = require('../modules/ship')

// it('Instantiates ship correctly', () => {
//     const omar_ship = Ship('Player')
//     expect(omar_ship.get_ships()).toEqual({
//         carrier: [ 1, 2, 3, 4, 5 ],
//         battleship: [ 1, 2, 3, 4 ],
//         cruiser: [ 1, 2, 3 ],
//         submarine: [ 1, 2, 3 ],
//         destroyer: [ 1, 2 ]
//       });
// })

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



