
 // var arr =["","","","","","","","",""];

class Game {
    constructor(){
        console.log("game started!");
        this.turn = "X";
        this.board = new Array(9).fill(null);
    }
     nextTurn()
    {
        if(this.turn == "X")
        {
            this.turn = "O"
        }else
        {
            this.turn = "X"
        }
    }

    makeMove(i){
        if(!this.endOfGame())
        {
        if(this.board[i] == null)
        {
        this.board[i]= this.turn;
        
       let winComb = this.findWinner();
      if(winComb == null)
      {
    this.nextTurn();
    }else
    {

    }
    }
}  
    }

    findWinner()
    {
        const combinations =[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]];
        for(const c of combinations)
        {
            if(this.board[c[0]] == this.board[c[1]] && this.board[c[1]] == this.board[c[2]] && this.board[c[2]]!= null && this.board[c[1]]!= null && this.board[c[0]]!= null)
            {
                return c;
            }
        }
        return null;
    }

    endOfGame(){
        let winComb =  this.findWinner();
        if(winComb)
        {
            return true;
        }
        return false;
    }
}

class GameView{
    constructor()
    {
        console.log("game view!");
    }
   updateBoard(game)
   {
       this.updateTurn(game);
       const comb =  game.findWinner();

     for(let i=0;i<game.board.length;i++)
     {
        
       const tile = document.querySelector(`.board-tile[data-index='${i}']`);
       tile.textContent = game.board[i];
       tile.classList.remove("tile-winner");
       let t = game.board[i] == 'X'? "tile-x": "tile-o";
    
        tile.innerHTML = `<span class="${t}"> ${game.board[i] ? game.board[i] : ""} </span>`;
        if(comb && comb.includes(i))
        {
            tile.classList.add("tile-winner");
        } 
    }
   }

   updateTurn(game)
   {
    let playerX = document.querySelector(`.playerX`);
    let playerO = document.querySelector(`.playerO`);

       if(game.turn == "X")
       {
        playerX.classList.add('active');
        playerO.classList.remove('active');
       }else
       {
        playerO.classList.add('active');
        playerX.classList.remove('active');
       }
   }

 } 

let game = new Game();
let gameView = new GameView();


let tiles = document.querySelectorAll(".board-tile");

tiles.forEach((tile)=> {
    tile.addEventListener("click",() => {
        onTileClick(tile.dataset.index);
    });
})
function newGame(){
    game = new Game();
    gameView.updateBoard(game);
    }
function onTileClick(i)
{
    
game.makeMove(i);
gameView.updateBoard(game);

}
let btn = document.querySelector(`.restart`).addEventListener("click",() => {
    newGame();
});

