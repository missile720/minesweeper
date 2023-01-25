let board = [];
let level = "easy";

//calls function boardGenerator based on level
boardGenerator(level);

//executes board generation
function boardGenerator(level){
    board = bombGenerator(level);
    
    //checks level for size of board
    if(level === 'easy'){
        //loops through rows
        for(let i = 0; i < 9; i++){
            document.getElementById("minesweeperBoard").innerHTML += `<div class="row easy" id="row${i}"></div>`;
            //loops through columns
            for(let j = 0; j < 9; j++){
                document.getElementById(`row${i}`).innerHTML += `<button row = "${i}" col = "${j}">${board[i][j]}</button>`;
            }
        }
    }
    else if(level === 'medium'){
        for(let i = 0; i < 16; i++){
            document.getElementById("minesweeperBoard").innerHTML += `<div class="row medium" id="row${i}"></div>`;
            for(let j = 0; j < 16; j++){
                document.getElementById(`row${i}`).innerHTML += `<button row = "${i}" col = "${j}"></button>`;
            }
        }
    }
    //size might be too big for mobile devices need to test when done
    else if(level === 'expert'){
        //changes CSS for the width of the board
        document.getElementById("minesweeperBoard").classList.add("expert")

        for(let i = 0; i < 16; i++){
            document.getElementById("minesweeperBoard").innerHTML += `<div class="row medium" id="row${i}"></div>`;
            for(let j = 0; j < 30; j++){
                document.getElementById(`row${i}`).innerHTML += `<button row = "${i}" col = "${j}"></button>`;
            }
        }
    }
}

//adds bombs to board
function bombGenerator(level){
    let bombs = 0;
    let template = [];

    if(level === 'easy'){
        //initial number of bombs
        bombs = 10;

        //create template board
        template = new Array(9).fill("").map(() => new Array(9).fill(""));
        
        //runs while bombs still need to be placed
        while(bombs){
            //randomizes the row and col for the bomb
            let row = Math.floor(Math.random()*(9));
            let col = Math.floor(Math.random()*(9));
            
            //sets bomb
            template[row][col] = 9;

            bombs--;
        }
    }
    
    //runs function that generates the nearby number of bombs
    template = numberGenerator(template);
    
    return template;
}

function numberGenerator(template){
    //loop through template
    for(let i = 0; i < template.length; i++){
        for(let j = 0; j < template[i].length; j++){
            if(template[i][j] === ""){
                let countNearBombs = 0;

                //loops through the immediate surrounding cells
                for(let x = i - 1; x <= i + 1; x++){
                    for(let y = j - 1; y <= j + 1; y++){
                        //checks for all surrounding cells except itself as well as check for grid out of bounds
                        if(!(x === i && y === i) && x >= 0 && y >= 0 && x < template.length && y < template.length){
                            //checks for bomb
                            if(template[x][y] === 9){
                                countNearBombs++;
                            }
                        }
                    }
                }
                
                if(countNearBombs > 0){
                    template[i][j] = countNearBombs;
                }
            }
        }
    }

    return template;
}