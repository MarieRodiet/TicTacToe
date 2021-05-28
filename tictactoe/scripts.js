var player = "0";
var Xplaying = false;
var winner = null;
var squares = Array(9).fill(null);
var winningLine = Array();
var lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    ];

function init()
{
    var htmlSquares = document.getElementsByName("square");
    for(var i = 0; i < htmlSquares.length; i++){
        htmlSquares[i].onclick = handleClick;
        htmlSquares[i].style.cursor = 'pointer';
    }
}

function handleClick() {

    var index = this.id;
    // Get the id from the square and put it in a variable
    // Remember that the id is an integer 0 - 8
    if(Xplaying == false){
        player = "0";
        Xplaying = true;
    }
    else{
        player = "X";
        Xplaying = false;
    }
    squares[index] = player;
    document.getElementById(index).innerHTML = player;
    disableOne(index);

    if (calculateWinner() == true){
        disableAll();
        highlightWinner();
    }
    else {
        document.getElementById("status").innerHTML = "The next player is " + (player == "X" ? "0" : "X");
    }
}

function calculateWinner() {
    for (var i = 0; i < lines.length; i++) {
        var a = lines[i][0];
        var b = lines[i][1];
        var c = lines[i][2];       
        if (squares[a] && 
        squares[a] === squares[b] && 
        squares[a] === squares[c]) {
            winner = squares[a];
            winningLine = lines[i];
            return true;
        }
    }
    winner = null;
    winningLine = Array();
    return false;
}

//
function highlightWinner() {
    document.getElementById("status").innerHTML = "THE WINNER IS " + winner + " !!";
    for (var i = 0; i < winningLine.length; i++){
        var toBeRed = document.getElementById(winningLine[i]);
        toBeRed.classList.add('red');
    }
    disableAll();
}

function disableOne(index){
    let square = document.getElementById(index);
    square.onclick = () => { };
    square.style.cursor = 'none';
}

function disableAll() {
    var htmlSquares = document.getElementsByName("square");
    for (var i = 0; i < htmlSquares.length; i++){
        htmlSquares[i].onclick = () => {};
        htmlSquares[i].style.cursor = 'none';
    }
}

window.onload = init;
