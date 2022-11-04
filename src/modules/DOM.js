import gameBoard from "./gameboard" ;



function DOM(){
    let player_turn = true;
    const game = gameBoard();
    let ship_pieces_DOM = {}
    let ship_pieces_DOM_bot = {}
    function create_grid_boxes(id){
        const board = document.querySelector(`.${id}`)
        for (let i = 1; i <= 100; i++){
            const div = document.createElement('div');
            div.className = `grid-cell-${id}`
            div.id = `${i}`
            div.setAttribute('data-x', i)
            div.setAttribute('data-y', i+1)
            div.style.border = `1px solid black`
            div.addEventListener('click', (e) => console.log(e.target))
            board.appendChild(div)
        }
        return;
    }
    
    function put_in_ships(player_id,player_ships_objects){
        let player_ships = player_ships_objects
        console.log(`This is ${player_id} ships`, player_ships)
        console.log('This is the carrier array: ', player_ships['carrier'])
        console.log('This is the battleship array: ', player_ships['battleship'])
        console.log('This is the cruiser array: ', player_ships['cruiser'])
        console.log('This is the submarine array: ', player_ships['submarine'])
        console.log('This is the destroyer array: ', player_ships['destroyer'])
        render_ship_new(player_id,'carrier',5,player_ships['carrier'])
        render_ship_new(player_id,'battleship',4,player_ships['battleship'])
        render_ship_new(player_id,'cruiser',3,player_ships['cruiser'])
        render_ship_new(player_id,'submarine',3,player_ships['submarine'])
        render_ship_new(player_id,'destroyer',2,player_ships['destroyer'])
    }
    
    
    function render_ship_new(player_id,ship_id, ship_length, ship_array){
        let ship = ship_array
        const game_cells = Array.from(document.querySelectorAll(`.grid-cell-${player_id}-board`));
        let x_coord = ship[0][0]
        let splitted = render_ship_position()
        game_cells.forEach((cell) => {
            console.log(x_coord == cell.dataset.x)
        })
        let found_array = game_cells.filter((cell) => {
            return cell.dataset.x == x_coord
        })
        console.log(found_array)
        let half = Math.ceil(found_array.length / 2);
        console.log('This is found array before split', found_array)
        if (splitted === 0){
            let firstHalf = found_array.slice(0,half)
            .slice(0,half)
            .slice(0,ship_length)
            console.log('This is the found array now first half', firstHalf)
            firstHalf.forEach((cell) => cell.className = `grid-cell-${player_id}-board ${ship_id}`)
        } else{
            let secondHalf = found_array
            .slice(half)
            .slice(`-${ship_length}`)
            console.log('This is the found array now second half', secondHalf)
            secondHalf.forEach((cell) => cell.className = `grid-cell-${player_id}-board ${ship_id}`)   
        }
        console.log('Grab ship coords function', grab_ship_coordinates(player_id,`${ship_id}`))
        if (player_id === game.aibot.id){
            ship_pieces_DOM_bot[`${ship_id}`] = grab_ship_coordinates(player_id,`${ship_id}`)
            console.log('This is the SHIPS from bot DOM now', ship_pieces_DOM_bot)
        }else{
            ship_pieces_DOM[`${ship_id}`] = grab_ship_coordinates(player_id,`${ship_id}`)
            console.log('This is the SHIPS from DOM now', ship_pieces_DOM)
        }  
    }
    
    const render_ship_position = () => {
        let number = Math.floor(Math.random() * 2)
        return number
    }
    
    const grab_ship_coordinates = (player_id,ship_id) =>{
        let coords_array = [];
        const game_cells = Array.from(document.querySelectorAll(`.grid-cell-${player_id}-board`));
        game_cells.forEach((cell)=> {
            if (cell.classList.contains(ship_id)){
                coords_array.push([cell.dataset.x,cell.dataset.y])
            }
        })
        return coords_array
    }
    
    // Render the grid boards for player and AI
    function create_grid(id){
        const board = document.querySelector(`.${id}`)
        for (let i = 0; i < 10; i++){
            let row = i;
            for (let i = 0; i < 10; i++){
                const div = document.createElement('div');
                div.className = `grid-cell-${id}`
                div.id = `${id.split('-')[0]}`
                div.setAttribute('data-x', row)
                div.setAttribute('data-y', i)
                div.style.border = `1px solid black`
                div.addEventListener('click', (e) => {
                    div.textContent = `X`;
                    if(div.classList.contains('cruiser') && div.textContent == 'X' || div.classList.contains('battleship') && div.textContent == 'X' || div.classList.contains('submarine') && div.textContent == 'X' || div.classList.contains('destroyer') && div.textContent == 'X' || div.classList.contains('carrier') && div.textContent == 'X'){
                        addhitListener([e.target.id,e.target.dataset.x,e.target.dataset.y]);
                        div.className = `grid-cell-${id.split('-')[0]}-board hit`
                        render_winner()
                    }
                    check_turn()
                })
                div.addEventListener('input', (e) => {
                    console.log('Input is fired here!')
                    if(div.classList.contains('cruiser') && div.textContent == 'X' || div.classList.contains('battleship') && div.textContent == 'X' || div.classList.contains('submarine') && div.textContent == 'X' || div.classList.contains('destroyer') && div.textContent == 'X' || div.classList.contains('carrier') && div.textContent == 'X'){
                        addhitListener([e.target.id,e.target.dataset.x,e.target.dataset.y]);
                        div.className = `grid-cell-${id.split('-')[0]}-board hit`
                        render_winner()
                    }
                })
                board.appendChild(div)
            }
        }
        return;
    }

    //DOM render hit function
    function addhitListener(array){
        let [id,x_coord,y_coord] = array;
        return game.check_if_ship_hit([id,x_coord,y_coord])
    }

    function render_grid_turns(){
        let master_aibot_board = document.querySelector('.aibot-board')
        if (player_turn === false && master_aibot_board.style["pointer-events"] === "visible"){
            master_aibot_board.style["pointer-events"] = "none";
            return;
        }
        else if (player_turn === true && master_aibot_board.style["pointer-events"] === "none"){
            master_aibot_board.style["pointer-events"] = "visible";
            return;
        }
    }

    function check_turn(){
        const winner = document.querySelector('.winner');
        if (player_turn === true){
            console.log('PLAYERS TURN SINCE THIS IS PLAYER TURN: ', player_turn)
            winner.textContent = `Players turn!`
            render_grid_turns()
            player_turn = false;
            return;
        }
        else{
            console.log('BOTS TURN SINCE THIS IS PLAYER_TURN: ', player_turn)
            winner.textContent = `Bots turn!`
            setTimeout(() => bot_hit(),1000)
            render_grid_turns()
            return; 
        }
    }

    function render_bot_hit(){
        let master_player_board = document.querySelector('.player-board');
        let children_cells = Array.from(master_player_board.children);
        console.log('Executing render bot hit function')
        children_cells.forEach((child) => {
            if (child.classList.contains('cruiser') && child.textContent == 'X' || child.classList.contains('battleship') && child.textContent == 'X' || child.classList.contains('submarine') && child.textContent == 'X' || child.classList.contains('destroyer') && child.textContent == 'X' || child.classList.contains('carrier') && child.textContent == 'X'){
                console.log('Bot actually hit a ship!')
                addhitListener([child.id,child.dataset.x,child.dataset.y]);
                child.className = `grid-cell-${child.id.split('-')[0]}-board hit`
                render_winner()
            }
            else{
                return;
            }
        })

    }   

    function bot_hit(){
        let randomNum = Math.floor(Math.random() * 99)
        let master_player_board = document.querySelector('.player-board');
        let random_cell = master_player_board.children[randomNum]
        while (random_cell.textContent === "X"){
            console.log('Spot was already taken. Retrying for another empty cell.')
            randomNum = Math.floor(Math.random() * 100)
            random_cell = master_player_board.children[randomNum]
        }
        random_cell.textContent = 'X'
        player_turn = true;
        render_bot_hit()
        return check_turn();
    }

    function render_winner(){
        let winner = document.querySelector('.winner');
        let declare_winner = document.querySelector('.declare-winner');
        let master_player_board = document.querySelector('.player-board')
        let master_aibot_board = document.querySelector('.aibot-board')
        let master_aibot_board_children = master_aibot_board.children
        let decided_winner = game.check_winner(game.player,game.aibot)
        if (decided_winner === 'player'){
            winner.textContent = ""
            winner.style.display = "flex";
            declare_winner.textContent = "Player wins!"
            master_player_board.style["pointer-events"] = "none";
            master_aibot_board.style["pointer-events"] = "none";
            master_aibot_board_children.forEach((child) => child.style["pointer-events"] = "none;")
        }
        else if (decided_winner === 'aibot'){
            winner.textContent = ""
            winner.style.display = "flex";
            declare_winner.textContent = "Player wins!"
            master_player_board.style["pointer-events"] = "none";
            master_aibot_board.style["pointer-events"] = "none";
            master_aibot_board_children.forEach((child) => child.style["pointer-events"] = "none;")
        }
        return;
    }
    create_grid(`${game.player.id}-board`);
    create_grid(`${game.aibot.id}-board`);
    put_in_ships(game.player.id,game.player.get_ships());
    put_in_ships(game.aibot.id,game.aibot.get_ships());
    check_turn()
    game.update_coordinates(game.player.id,ship_pieces_DOM)
    game.update_coordinates(game.aibot.id,ship_pieces_DOM_bot)

    return { create_grid_boxes, create_grid, put_in_ships }
}

export default DOM;

