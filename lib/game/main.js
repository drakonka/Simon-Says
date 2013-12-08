ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

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
	maxCircleSpeed: 0,
	difficulty: 1,
	minCircleQuantity: 0,
	maxCircleQuantity: 0,
	
	init: function() {
		this.sizeGame(window.innerWidth, window.innerHeight);
		ig.input.bind( ig.KEY.MOUSE1, 'click' );
		ig.game.spawnEntity(EntityPointer, 0, 0);
		this.startGame();
	},

	sizeGame: function(width, height) {
		this.maxCircleSize = 20 * width / 100;
		if (this.maxCircleSize < 10) {
			this.maxCircleSize = 10;
		}
		this.maxCircleSpeed = this.maxCircleSize * 2;
		this.minCircleQuantity = 5 * width / 100;
		this.maxCircleQuantity = 10 * width / 100;
	},

	startGame: function() {
		var circleQuantity = this.controller.randomFromTo(this.minCircleQuantity, this.maxCircleQuantity);
		for (var i = 0; i < circleQuantity; i++) {
			this.spawnEntity(EntityCircle, 0, 0);
		}
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
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
