function Board(data){
    data = (data === 'undefined') ? {} : data;
    if(data){
        this.canvas = data.canvas;
        this.ctx = data.ctx;
        this.cell = [];
        this.isXTurn = true;
        this.gameStatus = "turn";
        this.moves = 0;
        this.winningCombinations = 
                           [
                            [{x:0,y:0},{x:1,y:0},{x:2,y:0}],[{x:0,y:1},{x:1,y:1},{x:2,y:1}],[{x:0,y:2},{x:1,y:2},{x:2,y:2}],
                            [{x:0,y:0},{x:0,y:1},{x:0,y:2}],[{x:1,y:0},{x:1,y:1},{x:1,y:2}],[{x:1,y:0},{x:1,y:1},{x:1,y:2}],
                            [{x:0,y:0},{x:1,y:1},{x:2,y:2}],[{x:2,y:0},{x:1,y:1},{x:0,y:2}]
                           ];
        if(data.x){
            this.x = data.x;
            this.y = data.y;
            this.width = data.width;
            this.height = data.height;
            this.cellWidth = this.width/3;
            this.cellHeight = this.height/3;
            this.playerX = data.playerX;
            this.playerY = data.playerY;
        }else{
            this.width = 300;
            this.height = 300;
            this.x = this.canvas.width/2-this.width/2;
            this.y = this.canvas.height/2-this.height/2;
            this.cellWidth = this.width/3;
            this.cellHeight = this.height/3;
            this.playerX = "Player X";
            this.playerY = "Player Y";
        }
        for(var i=0 ; i<3 ; i++){
            this.cell.push([]);
            for(var j=0 ; j<3 ; j++){
                var data = {
                    x: j*this.cellWidth,
                    y: i*this.cellHeight,
                    width: this.cellWidth,
                    height: this.cellHeight,
                    canvas: this.canvas,
                    ctx: this.ctx
                };
                var cell = new Cell(data);
                this.cell[i].push(cell);
            }
        }        
    }else{
        //undefined data object
    }
}

Board.prototype.drawBoard = function(){
    //clear area to be drawn upon
    this.ctx.clearRect(this.x, this.y, this.width, this.height);
    //choose color of the stroke of the board and then drawing it
    this.ctx.fillStyle = "#000000";
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    //draw the lines that defines the cells of the board
    this.ctx.beginPath();
    
    //left verticale line
    this.ctx.moveTo((this.x+this.width/3), this.y);
    this.ctx.lineTo((this.x+this.width/3), (this.y+this.height));
    
    //right verticale line
    this.ctx.moveTo((this.x+2*this.width/3), this.y);
    this.ctx.lineTo((this.x+2*this.width/3), (this.y+this.height));
    
    //upper horizontal line
    this.ctx.moveTo(this.x, (this.y+this.height/3));
    this.ctx.lineTo((this.x+this.width), (this.y+this.height/3));
    
    //bottom horizontal line
    this.ctx.moveTo(this.x, (this.y+2*this.height/3));
    this.ctx.lineTo((this.x+this.width), (this.y+2*this.height/3));
    
    //begin stroking the path then release it
    this.ctx.stroke();
    this.ctx.closePath();
};

Board.prototype.getCell = function(coord){
    var cHor = (coord.mouseX - coord.boardX)/this.cell[0][0].width;
    var cVer = (coord.mouseY - coord.boardY)/this.cell[0][0].height;
    
    return {h : parseInt(cHor), v: parseInt(cVer)};
};

Board.prototype.getCellCoord = function(cHor, cVer){
    var cX = cHor * this.width/3;
    var cY = cVer * this.height/3;
    
    return {x : cX, y: cY};
};

Board.isInBounds = function(coord){
    return  (coord.mouseX > coord.boardX && coord.mouseX < coord.boardX+coord.width) && 
            (coord.mouseY > coord.boardY && coord.mouseY < coord.boardY+coord.height);
};

Board.isWinCombo = function(combo, board){
    return  (board.cell[combo[0].x][combo[0].y].player === board.cell[combo[1].x][combo[1].y].player) &&
            (board.cell[combo[1].x][combo[1].y].player === board.cell[combo[2].x][combo[2].y].player) &&
            (board.cell[combo[0].x][combo[0].y].player !== "");
};

Board.prototype.checkStatus = function(board){
    if(board.moves === 9) return "tie";
    for(var i=0 ; i<this.winningCombinations.length ; i++){
        var combo = this.winningCombinations[i];
        if(Board.isWinCombo(combo, board)) return "win";
    }
    return "turn";
};

Board.prototype.drawStatusBar = function(board, message){
    board.ctx.clearRect(board.x, board.y+board.height+10, board.width, board.height/10);
    board.ctx.strokeRect(board.x, board.y+board.height+10, board.width, board.height/10);
    board.ctx.font = "20px serif";
    board.ctx.fillText(message, board.x+5, board.y+board.height+30);
};

Board.prototype.click = function(e){
    //this a callback function so this identifier refers to 
    //the canvas object that the event listener is attached to
    //not the board object
    var board = e.data.board;
    //e.originalEvent.layerX returns the position of the mouse relative to the canvas not the page or the screen
    //board.x returns the position of the board inside the canvas
    var coord = {
        mouseX: e.originalEvent.layerX,
        mouseY: e.originalEvent.layerY,
        boardX: board.x,
        boardY: board.y,
        width: board.width,
        height: board.height        
    };
    if(Board.isInBounds(coord) && board.gameStatus == "turn"){
        var cell = board.getCell(coord);
        if(board.cell[cell.v][cell.h].player == ""){
            board.moves++;
            if(board.isXTurn){
                board.cell[cell.v][cell.h].drawX();
                board.isXTurn = !board.isXTurn;
            }else{
                board.cell[cell.v][cell.h].drawO();
                board.isXTurn = !board.isXTurn;
            }
            board.gameStatus = board.checkStatus(board);
            if(board.gameStatus == "turn"){
                board.drawStatusBar(board, "Player "+((board.isXTurn)?"X":"O")+" Turn!!");
            }else if(board.gameStatus == "win"){
                board.drawStatusBar(board, "Player "+((board.isXTurn)?"O":"X")+" Won!!");
            }else if(board.gameStatus == "tie"){
                board.drawStatusBar(board, "It is a Tie :D");
            }    
        }
    }
    
};