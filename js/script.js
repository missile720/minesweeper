let board = [];
let level = "easy";
let seconds = 0;
let myInterval;
let initialClick = false;

//calls function boardGenerator based on level
boardGenerator(level);

buttonEvent();

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
                document.getElementById(`row${i}`).innerHTML += `<button class="cell" row = "${i}" col = "${j}"><span class="hidden" value = "${board[i][j]}">${board[i][j]}</span></button>`;
            }
        }
    }
    else if(level === 'medium'){
        for(let i = 0; i < 16; i++){
            document.getElementById("minesweeperBoard").innerHTML += `<div class="row medium" id="row${i}"></div>`;
            for(let j = 0; j < 16; j++){
                document.getElementById(`row${i}`).innerHTML += `<button class="cell" row = "${i}" col = "${j}"><span class="hidden" value = "${board[i][j]}">${board[i][j]}</span></button>`;
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
                document.getElementById(`row${i}`).innerHTML += `<button class="cell" row = "${i}" col = "${j}"><span class="hidden" value = "${board[i][j]}">${board[i][j]}</span></button>`;
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
        //adds flags based on number of initial bombs
        document.getElementById('flags').innerHTML=bombs;
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
    else if(level === 'medium'){
        //initial number of bombs
        bombs = 40;
        //adds flags based on number of initial bombs
        document.getElementById('flags').innerHTML=bombs;
        //create template board
        template = new Array(16).fill("").map(() => new Array(16).fill(""));
        
        //runs while bombs still need to be placed
        while(bombs){
            //randomizes the row and col for the bomb
            let row = Math.floor(Math.random()*(16));
            let col = Math.floor(Math.random()*(16));
            
            //sets bomb
            template[row][col] = 9;

            bombs--;
        }
    }
    else if(level === 'expert'){
        //initial number of bombs
        bombs = 99;
        //adds flags based on number of initial bombs
        document.getElementById('flags').innerHTML=bombs;
        //create template board
        template = new Array(16).fill("").map(() => new Array(30).fill(""));
        
        //runs while bombs still need to be placed
        while(bombs){
            //randomizes the row and col for the bomb
            let row = Math.floor(Math.random()*(16));
            let col = Math.floor(Math.random()*(30));
            
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
                        if(!(x === i && y === j) && x >= 0 && y >= 0 && x < template.length && y < template[0].length){
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

function buttonEvent(){
    document.getElementById("level").addEventListener("change", levelChange);
    document.getElementById("bottom").addEventListener("click", reset);

    //select all cells in grid
    let cells = document.querySelectorAll(".cell");

    //loops through cells and adds event listeners for mouseclick 
    cells.forEach(cell => {
        cell.addEventListener("click", function() {cellClick(cell)});
        cell.addEventListener("mouseenter", enterCell);
    });
}

function levelChange(event){
    level = event.target.value;
    reset();
}

function enterCell(cell){
    cell.target.focus();
    cell.target.addEventListener("keyup", spaceBar);
}

function spaceBar(cell){
    cell.preventDefault();
    if ((cell.key == " " || cell.code == "Space" || cell.keyCode == 32)){
        if(!cell.target.classList.contains("revealed")){
            if(cell.target.classList.contains("flag")){
                let flagNumber = Number(document.getElementById('flags').innerHTML);

                document.getElementById('flags').innerHTML = flagNumber + 1;

                cell.target.style.removeProperty("background");
                cell.target.classList.remove("flag");
            }
            else{ 
                let flagNumber = Number(document.getElementById('flags').innerHTML);

                document.getElementById('flags').innerHTML = flagNumber - 1;

                cell.target.style.background = "pink";
                cell.target.classList.add("flag");
            }
        }
    }
}

//function executes when cell is clicked
function cellClick(cell){
    if(!initialClick){
        myInterval = setInterval(myTimer, 1000);
        initialClick = true;
    }

    //reveals clicked cell
    cell.style.background = "yellow";
    cell.classList.add("revealed");
    cell.firstChild.classList.remove("hidden");
    
    if(cell.firstChild.getAttribute('value') === '9'){
        gameOver();
    }


    if(cell.firstChild.innerHTML === ""){
        let currentCol = cell.getAttribute('col');
        let currentRow = cell.getAttribute('row');

        let cells = document.querySelectorAll(".cell");

        cells.forEach(element => {
            let testCol = element.getAttribute('col');
            let testRow = element.getAttribute('row');

            //check to see if element is surrounding current cell
            if(Math.abs(testRow - currentRow) <= 1){
                if(Math.abs(testCol - currentCol) <= 1){
                    //exclude the cell itself
                    if(!(testRow === currentRow && testCol === currentCol)){
                        //makes sure its not already revealed
                        if(element.firstChild.classList.contains("hidden")){
                            cellClick(element);
                        }
                    }
                }
            }
        });
    }
}

function myTimer(){
    if(seconds < 10){
        document.getElementById("time").innerHTML = "0" + "0" + seconds;
        seconds++;
    }
    else if(seconds < 100){
        document.getElementById("time").innerHTML = "0" + seconds;
        seconds++;
    }
    else{
        document.getElementById("time").innerHTML = seconds;
        seconds++;
    }
}

function reset(){
    board = [];
    seconds = 0;
    //clears interval
    clearInterval(myInterval);
    initialClick = false;
    document.getElementById("time").innerHTML = '000';
    document.getElementById("minesweeperBoard").innerHTML = "";
    document.getElementById("minesweeperBoard").classList.remove("expert");
    document.getElementById("bottom").classList.add("hidden");

    document.getElementById("level").removeEventListener("change", levelChange);

    //I believe the event listners bellow dont need to be removed since the element themselves are removed from the html
    //Also cant remove anonymous function event listeners
    //select all cells in grid
    let cells = document.querySelectorAll(".cell");

    //loops through cells and adds event listeners for mouseclick
    cells.forEach(cell => {
        cell.removeEventListener("click", function() {cellClick(cell)});
    });

    boardGenerator(level);

    buttonEvent();
}

function gameOver(){
    //stops timer
    clearInterval(myInterval);

    let cells = document.querySelectorAll(".cell");

    //reveals all bombs
    cells.forEach(cell => {
        if(cell.firstChild.getAttribute('value') === '9'){
            cell.style.background = "red";
            cell.classList.add("revealed");
            cell.firstChild.classList.remove("hidden");
        }
        else{
            cell.style.background = "yellow";
            cell.classList.add("revealed");
            cell.firstChild.classList.remove("hidden");
        }
    });

    document.getElementById("bottom").classList.remove("hidden");
}