function Cell(data){
    data = (data === 'undefined')? {} : data;
    //$.extend(this, data);
    if(data){
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        this.ctx = data.ctx;
        this.canvas = data.ctx;
        this.empty = true;
        this.player = "";
    }else{
        //should not construct the object
    }
}

Cell.prototype.clearCell = function(){
    
    this.ctx.clearRect(this.x+this.width/2+2, this.y+this.height/2+2, this.width-5, this.height-5);
    this.empty = true;
    this.player = "";
    //should clear the array that represents the board
};

Cell.prototype.drawX = function(){
    
    if(this.empty){
        var x = this.x+(2*this.width/3);
        var y = this.y+(2*this.height/3);

        //begin drawing the path for the x
        this.ctx.beginPath();

        //first line from the left
        this.ctx.moveTo(x, y);
        this.ctx.lineTo((x+(2*this.width/3)), (y+(2*this.height/3)));

        //second line from the right
        this.ctx.moveTo((x+(2*this.width/3)), y);
        this.ctx.lineTo(x, (y+(2*this.height/3)));

        //begin stroking the path then release it
        this.ctx.stroke();
        this.ctx.closePath();

        this.empty = false;
        this.player = "x";
    }
    
};

Cell.prototype.drawO = function(){    
    if(this.empty){
        var x = this.x+(this.width);
        var y = this.y+(this.height);
        var radius = this.width/3;

        //begin setting the path to stroke
        this.ctx.beginPath();

        //set the path for the arc 
        this.ctx.arc(x, y, radius, 0, 180);

        //begin stroking the path then release it
        this.ctx.stroke();
        this.ctx.closePath();

        this.empty = false;
        this.player = "o";
    }
};