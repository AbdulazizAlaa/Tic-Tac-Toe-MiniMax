function Board(data){
    data = (data === 'undefined') ? {} : data;
    if(data){
        this.canvas = data.canvas;
        this.ctx = data.ctx;
        if(data.x){
            this.x = data.x;
            this.y = data.y;
            this.width = data.width;
            this.height = data.height;
        }else{
            this.width = 300;
            this.height = 300;
            this.x = this.canvas.width/2-this.width/2;
            this.y = this.canvas.height/2-this.height/2;
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
    
    //left verticale line 
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

Board.prototype.getCell = function(cX, cY){
    var rect = this.canvas.getBoundingClientRect();
    
    var cHor = (cX - (this.x+rect.left))/(this.width/3);
    var cVer = (cY - (this.y+rect.top))/(this.height/3)-2;
    
    return {h : parseInt(cHor), v: parseInt(cVer)};
};

Board.prototype.getCellCoord = function(cHor, cVer){
    var cX = cHor * this.width/3;
    var cY = cVer * this.height/3;
    
    return {x : cX, y: cY};
};

Board.prototype.clearCell = function(cHor, cVer){
    
    var coord = this.getCellCoord(cHor, cVer);
    this.ctx.clearRect(coord.x+this.width/6+2, coord.y+this.height/6+2, this.width/3-5, this.height/3-5);
    //should clear the array that represents the board
};

Board.prototype.drawX = function(cHor, cVer){
    var coord = this.getCellCoord(cHor, cVer);
    
    var x = coord.x+(2*this.width/9);
    var y = coord.y+(2*this.height/9);
    
    //begin drawing the path for the x
    this.ctx.beginPath();
    
    //first line from the left
    this.ctx.moveTo(x, y);
    this.ctx.lineTo((x+(2*this.width/9)), (y+(2*this.height/9)));

    //second line from the right
    this.ctx.moveTo((x+(2*this.width/9)), y);
    this.ctx.lineTo(x, (y+(2*this.height/9)));
    
    //begin stroking the path then release it
    this.ctx.stroke();
    this.ctx.closePath();
    
};

Board.prototype.drawO = function(cHor, cVer){
    var coord = this.getCellCoord(cHor, cVer);
    
    var x = coord.x+(this.width/3);
    var y = coord.y+(this.height/3);
    var radius = this.width/9;
    
    //begin setting the path to stroke
    this.ctx.beginPath();
    
    //set the path for the arc 
    this.ctx.arc(x, y, radius, 0, 180);
    
    //begin stroking the path then release it
    this.ctx.stroke();
    this.ctx.closePath();
};

Board.prototype.handleClick = function(canvasId){
    $("#"+canvasId).click({board: this}, function(e){
        
        var board = e.data.board;
        var canvasRect = board.canvas.getBoundingClientRect();
        
        if((e.pageX > canvasRect.left+board.x && e.pageX < canvasRect.left+board.x+board.width) && 
           (e.pageY > canvasRect.top+board.y && e.pageY < canvasRect.top+board.y+board.height)){
            var cell = board.getCell(e.pageX, e.pageY);

            //should handle player turn to draw the right symbol
            board.drawX(cell.h, cell.v);
        }
        
    });
};


$(document).ready(function(){
    var canvas = $("#canvas").get(0);
    var ctx = canvas.getContext('2d');
    
    var data = 
        {
            canvas : canvas,
            ctx : ctx,
            x : canvas.width/2-150,
            y : canvas.height/2-150,
            width : 300,
            height : 300
        };
    
    var board = new Board(data);
    board.drawBoard();
    board.handleClick("canvas");
            console.log(board.canvas);

    
});