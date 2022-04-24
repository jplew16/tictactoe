const gameboard = (() => {
    let board = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];
    let blankSpaces = [];
    let player1 = {};
    let playerCom = {};

    const playerPlace = function(pos) {
        board[pos] = gameboard.player1.marker;
        blankSpaces.push(pos);
        console.log(board);
        console.log(blankSpaces);
    }
    const comPlace = function() {

    }
    return {
        player1,
        playerPlace
    }
})();

const displayController = (() =>{
    const placeMarker = (e) => {
        let playerPos = e['target']['dataset']['pos'];
        let posEl = displayBoard.querySelector(`[data-pos='${playerPos}']`);

            if (e.target.tagName == 'TD' && posEl.textContent != gameboard.player1.marker){
                
                gameboard.playerPlace(playerPos);
                posEl.textContent = gameboard.player1.marker;
            }    
} 
return {
    placeMarker
}
})();

const makePlayer = function(name, marker) {
    return {name, marker};
}
window.addEventListener('load', function() {
    gameboard.player1 = makePlayer('John', 'O');
    gameboard.playerCom = makePlayer('CPU', 'X');
});

let displayBoard = document.querySelector('div.gameboard');
displayBoard.addEventListener('click', displayController.placeMarker);

