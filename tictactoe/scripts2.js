class TTT {
    constructor() {
        this.player = "0";
        this.Xplaying = false;
        this.winner = null;
        this.squares = Array(9).fill(null);
        this.winningLine = Array();
        this.lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        this.init = this.init.bind(this);
        this.calculateWinner = this.calculateWinner.bind(this);
        this.highlightWinner = this.highlightWinner.bind(this);
        this.disableOne = this.disableOne.bind(this);
        this.disableAll = this.disableAll.bind(this);
        this.init();

        
    }

    init() {
        let htmlSquares = document.getElementsByName("square");
        for (let i = 0; i < htmlSquares.length; i++) {
            htmlSquares[i].onclick = this.handleClick.bind(this, i);
            htmlSquares[i].style.cursor = 'pointer';
        }
    }

    handleClick(index){
        (this.Xplaying == false) ? (this.player = '0', this.Xplaying = true) : (this.player = "X", this.Xplaying = false);
        this.squares[index] = this.player;
        document.getElementById(index).innerHTML = this.player;
        this.disableOne(index);

        let restart = true;

        if (this.calculateWinner()) {
            this.highlightWinner();
        }
        else {
            for(let i = 0; i < this.squares.length; i++){
                if(this.squares[i] != '0' && this.squares[i] != 'X'){
                    restart = false;
                }
            }
            if(restart)
                document.getElementById("status").innerHTML = 'No one wins!';
            else
                document.getElementById("status").innerHTML = "The next player is " + (this.player == "X" ? "0" : "X");
        }
        //if game is over, ask to play again
        if(this.winner || restart)
            this.playAgain();
    }



    calculateWinner(){
        for (let i = 0; i < this.lines.length; i++) {
            let a = this.lines[i][0];
            let b = this.lines[i][1];
            let c = this.lines[i][2];
            if (this.squares[a] &&
                this.squares[a] === this.squares[b] &&
                this.squares[a] === this.squares[c]) {
                this.winner = this.squares[a];
                this.winningLine = this.lines[i];
                return true;
            }
        }
        this.winner = null;
        this.winningLine = Array();
        return false;
    }

    highlightWinner() {
        document.getElementById("status").innerHTML = "THE WINNER IS " + this.winner + " !!";
        for (let i = 0; i < this.winningLine.length; i++){
            let toBeRed = document.getElementById(this.winningLine[i]);
            toBeRed.classList.add('red');
        }
        this.disableAll();
    }

    disableOne(index){
        let square = document.getElementById(index);
        square.onclick = () => { };
        square.style.cursor = 'none';
    }
    
    disableAll() {
        let htmlSquares = document.getElementsByName("square");
        for (let i = 0; i < htmlSquares.length; i++){
            htmlSquares[i].onclick = () => {};
            htmlSquares[i].style.cursor = 'none';
        }
    }

    playAgain(){
        document.getElementById("status").innerHTML = '<p>Would you like to play again?</p><button id="yes" class="btn bg-success">Yes</button><button id="no" class="btn bg-danger">No</button>';
        let yes = document.getElementById("yes");
        let no = document.getElementById("no");
        yes.onclick = () => {   
            //remove red class from winningLine
            for (let i = 0; i < this.squares.length; i++){
                document.getElementById(i).innerHTML = '&nbsp';
                document.getElementById(i).classList.remove('red');
            }

            //reset the board
            document.getElementById('status').innerHTML = 'Next Player: 0';
            this.player = "0";
            this.Xplaying = false;
            this.winner = null;
            this.squares = Array(9).fill(null);
            this.winningLine = Array();
            this.init();
        }
        no.onclick = () => {
            document.getElementById('status').innerHTML = null;
        }
    }
}

window.onload = () => { new TTT(); }
