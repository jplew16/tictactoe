const gameboard = (() => {
    let board = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];
    let emptySpaces = [0,1,2,3,4,5,6,7,8];
    let player1 = {};
    let playerCom = {};
    
    const playerPlace = function(pos) {
        board[pos] = gameboard.player1.marker;
        emptySpaces.splice(pos, 1);
        console.log(board);
        console.log(emptySpaces);
    }
    const makePlayer = function(name, marker) {
        return {name, marker};
    }
    const comPlace = function() {
        let choice = Math.floor(Math.random() * emptySpaces.length);
        board[choice] = gameboard.playerCom.marker;
        emptySpaces.splice(choice, 1);
        console.log(board);
        console.log(emptySpaces);

    }
    return {
        player1,
        playerCom,
        playerPlace,
        makePlayer
    }
})();

const displayController = (() =>{
    const placeMarker = (e) => {
        let playerPos = e['target']['dataset']['pos'];
        let posEl = dom.displayBoard.querySelector(`[data-pos='${playerPos}']`);
        
        if (e.target.tagName == 'TD' && posEl.textContent != gameboard.player1.marker){
            
            gameboard.playerPlace(playerPos);
            posEl.textContent = gameboard.player1.marker;
        }    
    } 
    return {
        placeMarker
    }
})();

const dom = (function(global) {
    let displayBoard = global.document.querySelector('div.gameboard');
    displayBoard.addEventListener('click', displayController.placeMarker);
    
    global.addEventListener('load', function() {
        gameboard.player1 = gameboard.makePlayer('User', 'O');
        gameboard.playerCom = gameboard.makePlayer('CPU', 'X');
    });
    return {
        displayBoard
    }
})(window);


