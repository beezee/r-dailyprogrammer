(function() {

    var Square = function(index, board) {
        var self = this;
        this.index = index;
        var value = 0;
        
        this.hasMine = function(){
            return value === -1;
        };
        
        this.placeMine = function() {
            value = -1;
            board.mines--;
            var neighbors = this.neighbors();
            for(var i=0;i<neighbors.length;i++){
                if (!neighbors[i].hasMine())
                    neighbors[i].increment();
            }
        };
        
        this.count = function() {
            return (value === -1) ? '*' : value;
        };
        
        this.increment = function(){
            if (value !== -1) value++;
        };
        
        var neighbor_indexes = [
                -1, -(board.width-1),
                -board.width, -(board.width+1),
                1,(board.width+1), board.width,
                (board.width-1)
            ];
        
        var isAdjacent = function(compareIndex) {
            return Math.abs((self.index % board.width) - (compareIndex % board.width)) < 2;
        };
        
        this.neighbors = function() {
            var neighbor_squares = [];
            for(var i=0;i<neighbor_indexes.length;i++){
                var neighbor_index = this.index+neighbor_indexes[i];
                if (board.space(neighbor_index) && isAdjacent(neighbor_index))
                    neighbor_squares.push(board.space(neighbor_index)); 
            };
            return neighbor_squares;
        };
    };
    
    var Board = function(width, height, mines) {
        this.mines = mines;
        this.width = width;
        this.height = height;
        this.area = this.width*this.height;
        var spaces = [];
        
        this.initialize = function() {
            for(var i=0;i<this.area;i++){
                spaces[i] = new Square(i, this);
            }
            this.placeMines();
        };
        
        this.placeMines = function() {
            while(this.mines>0){
                var randomSpace = this.space(Math.floor(Math.random() * spaces.length));
                if (!randomSpace.hasMine())
                   randomSpace.placeMine();
            }
        };
        
        this.space = function(index) {
            return spaces[index];
        };
        
        this.render = function() {
            var output = '';
            for(var i=1;i<=spaces.length;i++){
                output += this.space(i-1).count() + ' | ';
                if (i % this.width === 0) output += "\n";
            }
            console.log(output);
        };
    };
    
    var board = new Board(15, 15, 20);
    board.initialize();
    board.render();

}())