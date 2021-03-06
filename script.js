const gameboard = (() => {
    let board = ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'];
    let emptySpaces = [0,1,2,3,4,5,6,7,8];
    let player1 = {};
    let playerCom = {};
    
    const makePlayer = function(name, marker) {
        return {name, marker};
    }
    let checkHLines = function() {
        for (let i=-1; i<3; i++) {
            if (board[++cycle] == board[++cycle] && board[cycle] == board[++cycle]) {
                return cycle;
            }
        }
    }
    const check3InRow = function(player) {
        switch(player.marker) {
            case board[checkHLines()]:
                dom.displayWinner(cycle - 1, 'h');
            break;
            default:
                console.log('Its a tie!');
                break;
        }
        //vertical 3 in a row check
        for (let i=0; i<3; i++) {
            if (board[cycle] == board[cycle += 3] && board[cycle] == board[cycle =+ 3]) {
                //winner
            }
    }
        cycle = 2
        //diagonal 3 in a row check
        for (let i=0; i<2; i++) {
            if (board[cycle] == board[++cycle] && board[cycle] == board[++cycle]) {
                //winner
            }
    }
}


    //Roll a random number out of available empty spots
    let rollChoice = function() { 
        return Math.floor(Math.random() * emptySpaces.length);
    }
    let findPosIndex = function(number) {
            return number === +this;
        }
    const playerPlace = function(e) {
        let playerPos = e['target']['dataset']['pos'];
            
            //Checks if clicked board spot is taken
        if (board[playerPos] !== gameboard.player1.marker && 
            board[playerPos] !== gameboard.playerCom.marker) {

            board[playerPos] = gameboard.player1.marker; 

            //Removes claimed spot index from empty spot list    
            emptySpaces.splice(emptySpaces
                .findIndex(findPosIndex.bind(playerPos))
                , 1);
            console.log(emptySpaces);
            displayController.playerPlace(playerPos, gameboard.player1.marker)
            comPlace();
            if (emptySpaces.length < 5)
            //Check if at least two turns passed to check for 3 in a row
                check3InRow(gameboard.player1);
            }
        }
    const comPlace = function() {
        if (emptySpaces.length == 0) { 
            //end game function here
            check3InRow(gameboard.playerCom);
        }
        
        let comPos = rollChoice();
        console.log(comPos);
        board[emptySpaces[comPos]] = gameboard.playerCom.marker;
        
        
        displayController.playerPlace(emptySpaces[comPos], gameboard.playerCom.marker);
        emptySpaces.splice(comPos, 1);
        
        if (emptySpaces.length < 5) {
            //Check if at least two turns passed to check for 3 in a row
            check3InRow(gameboard.player1);
        }
        
        console.log(board);
        console.log(emptySpaces);

    }
    return {
        playerPlace,
        makePlayer, 
        player1,
        playerCom
    }
})();

const displayController = (() =>{
    let getPosEl = function(pos) {
        let board = dom.displayBoard.querySelectorAll('td');
        let boardSpots = Array.from(board);

        return boardSpots.find(function(spot) {
            return spot['dataset']['pos'] == pos;
        });
    }
    const playerPlace = (pos, marker) => {
        let posEl = getPosEl(pos);
            dom.addMarker(posEl, marker);
    } 
    return {
        playerPlace
    }
})();

const dom = (function(global) {
    let displayBoard = global.document.querySelector('div.gameboard>table');
    displayBoard.addEventListener('click', gameboard.playerPlace);
    
    global.addEventListener('load', function() {
        gameboard.player1 = gameboard.makePlayer('User', 'O');
        gameboard.playerCom = gameboard.makePlayer('CPU', 'X');
    });
    const addHLine = function() {

    }
    const addVLine = function() {
        
    }
    const addDLine = function() {

    }
    let displayWinner = function(player) {
        //toggle class for element showing winner
        console.log(player);

    }
    let addMarker = function(posEl, marker) {
        if (marker == gameboard.player1.marker) {
            const circle = global.document.createElement('div');
            circle.classList.add('circle');
            posEl.appendChild(circle);
        } else {
            const crossRight = global.document.createElement('div');
            const crossLeft = global.document.createElement('div');
            
            crossLeft.classList.add('cross-left');
            crossRight.classList.add('cross-right');
            posEl.append(crossLeft, crossRight);
        }
    }
    return {
        displayBoard,
        displayWinner,
        addMarker
    }
})(window);


