ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

	'impact.debug.debug',

	'game.misc.controller',

	'game.entities.circle',
	'game.entities.pointer'
)
.defines(function(){

SimonSays = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	controller: new ig.Controller(),
	maxCircleSize: 10,
	minCircleSize: 0,
	minCircleSpeed: -10,
	maxCircleSpeed: 10,
	difficulty: 1,
	minCircleQuantity: 0,
	maxCircleQuantity: 0,

	sequenceArr: [],
	highlightedCircle: 0,
	selectedArr: [],


	mode: 'start',

	init: function() {
		this.sizeGame(window.innerWidth, window.innerHeight);
		this.ctx = ig.system.context;
		ig.input.bind( ig.KEY.MOUSE1, 'click' );
		ig.game.spawnEntity(EntityPointer, 0, 0);
		this.startGame('start');
	},

	sizeGame: function(width, height) {
		this.maxCircleSize = 20 * width / 100;
		if (this.maxCircleSize < 10) {
			this.maxCircleSize = 10;
		}
		// this.maxCircleSpeed = 10;
		this.minCircleQuantity = this.difficulty + 1;
		this.maxCircleQuantity = this.difficulty + 3;
	},

	startGame: function(mode) {
		this.mode = mode;
		var circleQuantity = this.controller.randomFromTo(this.minCircleQuantity, this.maxCircleQuantity);
		for (var i = 0; i < circleQuantity; i++) {
			this.spawnEntity(EntityCircle, 0, 0);
		}
		switch (mode) {
			case 'start':
				this.selectCircles(this.difficulty);
				break;
		}
	},

	selectCircles: function(quantity) {
		var shuffledArr = this.controller.shuffleArr(ig.game.getEntitiesByType(EntityCircle));
		for (var i = 0; i < quantity; i++) {
			this.sequenceArr.push(shuffledArr[i]);
		}
		this.displayingSequence = true;
		this.sequenceDisplayTimer = new ig.Timer(2);

	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		if (this.displayingSequence) {
			if (this.sequenceDisplayTimer.delta() > 0) {
				var circle = this.sequenceArr[this.highlightedCircle];
				this.sequenceDisplayTimer.reset();
				circle.highlight(1.5);
				if (circle === this.sequenceArr[this.sequenceArr.length - 1]) {
					this.displayingSequence = false;
					this.sequenceDisplayTimer = null;
				}
				this.highlightedCircle += 1;
			}
		}
		// Add your own, additional update code here
	},

	drawMenu: function() {
		this.ctx.save();
		var x = ig.system.width / 2;
		var y =  100;
		this.ctx.font = "bold 100px Verdana";
		this.ctx.fillStyle = "#555";
		this.ctx.textAlign = "center";
		this.ctx.fillText("SIMON SAYS", x, y);
		y += 100;
		this.ctx.font = "30px Verdana";
		this.ctx.fillText("Click the floating circles in the displayed order", x, y);
		this.ctx.restore();
	},
	
	draw: function() {
		this.parent();
		switch (this.mode) {
			case 'start':
				this.drawMenu();
				break;
		}
		
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', SimonSays, 60, window.innerWidth, window.innerHeight, 1 );

function resizeCanvas() {
	console.log('resizing');
	ig.system.resize(window.innerWidth,window.innerHeight, 1);
}


});
