(function ($){
	$.widget("custom.MineSweeper", {
		config : {
			started : false,
			length : 10,
			width : 10,
			mines : 10,
		},
		
		_create : function() {
			console.log("create function");
			this.element.addClass("MineSweeper ui-widget");
			this._createMaze();
			this._plantMines();
		},

		_createMaze : function() {
			console.log("create maze function");
			button = [];
			for(var i=0; i<this.config.length; i++){
				button[i] = [];
				for(var j=0; j<this.config.width; j++){
					button[i][j] = {
						active : true,
						value : 0,
						bomb : false,
						flag : false
					}
				}
			}
		},

		_plantMines : function () {
			console.log("plant mines function");
		},

		_handleClick : function (e) {
			dx = [-1, -1, 0, 1, 1, 1, 0, -1];
			dy = [0, -1, -1, -1, 0, 1, 1, 1];

			vis = [];
			for(var i=0; i<this.config.lenght; i++){
				vis[i] = [];
				for(var j=0; j<this.config.width; j++){
					vis[i][j] = false;
				}
			}

			// BFS
			queue = [[0, 0]];
			while(queue.lenght()) {
				pos = queue.shift();
				x = pos[0], y = pos[1];
				for(var i=0; i<8; i++) {
					if((x+dx) >= 0 && (x+dx) < this.config.length 
						&& (y+dy) >= 0 && (y+dy) < this.config.width
						&& this.button[x+dx][y+dy].active && vis[x+dx][y+dy] == false){
						queue.push([x+dx, y+dy]);
						vis[i][j] = true;
					}
				}
			}
		},

		_resetMaze : function () {

		},

		
	})
})(jQuery);