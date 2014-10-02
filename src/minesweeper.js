(function ($){
	$.widget("custom.MineSweeper", {
		config : {
			started : false,
			elapsed : 0,
			length : 10,
			width : 10,
			mines : 10,
		},
		
		_create : function() {
			console.log("create function");
			this.element.addClass("MineSweeper ui-widget");
			this._createMaze();
			this._plantMines();
			this._renderMaze();

			console.log(this.button);
		},

		_createMaze : function() {
			console.log("create maze function");
			button = [];
			for(var i=0; i<this.config.length; i++){
				button[i] = [];
				for(var j=0; j<this.config.width; j++){
					button[i][j] = {
						active : true,
						mine : false,
						flag : false,
						value : 0
					}
				}
			}
			this.button = button;
		},

		_plantMines : function () {
			console.log("plant mines function");
			var mines = this.config.mines;

			while(mines !== 0) {
				var x = Math.floor(this.config.length * Math.random());
				var y = Math.floor(this.config.width * Math.random());
				if(this.button[x][y].mine === false) {
					this.button[x][y].mine = true;
					this._updateNeighbours(x, y);
					mines--;
				}
			}
		},

		_updateNeighbours : function (x, y) {
			var dxa = [-1, -1, 0, 1, 1, 1, 0, -1];
			var dya = [0, -1, -1, -1, 0, 1, 1, 1];
			for(var i=0; i<8; i++) {
				var dx = dxa[i], dy = dya[i];
				if((x+dx) >= 0 && (x+dx) < this.config.length 
					&& (y+dy) >= 0 && (y+dy) < this.config.width) {
					this.button[x+dx][y+dy].value++;
				}
			}
		},

		_handleClick : function (e) {
			var x = e, y = e;
			this._startGame();
			if(this.button[x][y].active === false){
				return;
			}
			if(this.button[x][y].flag === true){
				this._removeFlag(x, y);
				return;
			}
			if(this.button[x][y].mine === true) {
				// End of game
				this._endGame(x, y);
				return;
			}
			
			var dx = [-1, -1, 0, 1, 1, 1, 0, -1];
			var dy = [0, -1, -1, -1, 0, 1, 1, 1];

			var vis = [];
			for(var i=0; i<this.config.length; i++){
				vis[i] = [];
				for(var j=0; j<this.config.width; j++){
					vis[i][j] = false;
				}
			}

			// BFS
			var queue = [[x, y]];
			while(queue.length()) {
				pos = queue.shift();
				x = pos[0], y = pos[1];

				if(this.button[x][y].active === false 
					|| this.button[x][y].mine === true 
					|| this.button[x][y].flag === true) {
					break;
				}

				if(this.button[x][y].value !== 0) {
					// Add neighbours to the queue
					for(var i=0; i<8; i++) {
						if((x+dx) >= 0 && (x+dx) < this.config.length 
							&& (y+dy) >= 0 && (y+dy) < this.config.width
							&& this.button[x+dx][y+dy].active === true && vis[x+dx][y+dy] === false
							&& this.button[x+dx][y+dy].flag === false){
							queue.push([x+dx, y+dy]);
							vis[i][j] = true;
						}
					}
				}

				this.button[x][y].active = false;

				// Update this button view
				this._updateButton(x, y);

			}
		},

		_startGame : function () {
			if(this.config.started === false) {
				this.config.started = true;
				
				// Start timer
				// this.timer = $.timer()
			}
		},

		_updateTimer : function () {
			this.config.elapsed++;

			// Render Timer
		},

		_plantFlag : function (e) {
			var x = e, y = e;
			this._startGame();
			if(this.button[x][y].flag === true){
				this._removeFlag(x, y);
			} else {
				this.button[x][y].flag = true;
			}
		},

		_removeFlag : function (x, y) {
			this.button[x][y].flag = false;
		},

		_renderMaze : function () {
			for(var i=0; i<this.config.length; i++) {
				for(var j=0; j<this.config.width; j++) {

				}
			}
		},

		_updateButton : function (x, y) {
			if(this.button[x][y].active === true) {
				if(this.button[x][y].flag === true) {

				} else {

				}
			} else {
				if(this.button[x][y].value !== 0){

				} else {

				}
			}
		},

		_resetMaze : function () {

		},


	})
})(jQuery);