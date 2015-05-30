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
            height : 300,
            playerX: "Abdulaziz",
            playerY: "salmaaa"
        };
    
    var board = new Board(data);
    board.drawBoard();

    $("#canvas").click({board: board, canvasId: "canvas"}, board.click);
    
    
});
