let board = [];
let level = "easy";

//calls function boardGenerator based on level
boardGenerator(level);

//executes board generation
function boardGenerator(level){
    if(level === 'easy'){
        for(let i = 0; i < 9; i++){
            document.getElementById("minesweeperBoard").innerHTML += `<div class="row easy" id="row${i}"></div>`;
            for(let j = 0; j < 9; j++){
                document.getElementById(`row${i}`).innerHTML += `<button row = "${i}" col = "${j}"></button>`;
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
    else if(level === 'expert'){
        document.getElementById("minesweeperBoard").classList.add("expert")

        for(let i = 0; i < 16; i++){
            document.getElementById("minesweeperBoard").innerHTML += `<div class="row medium" id="row${i}"></div>`;
            for(let j = 0; j < 30; j++){
                document.getElementById(`row${i}`).innerHTML += `<button row = "${i}" col = "${j}"></button>`;
            }
        }
    }
}