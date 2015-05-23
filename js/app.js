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

Board.prototype.clearCell = function(cell){
    
    this.ctx.clearRect();  
};

Board.prototype.drawX = function(cell){
    
};

Board.prototype.drawY = function(cell){
    
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
    
    
});