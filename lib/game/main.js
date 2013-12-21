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
	minCircleSpeed: -10,
	maxCircleSpeed: 10,
	difficulty: 1,
	minCircleQuantity: 0,
	maxCircleQuantity: 0,

	sequenceArr: [],
	highlightedCircle: 0,
	selectedArr: [],
	clickCount: 0,

	lives: 3,

	select0: new ig.Sound('media/audio/select0.*', false),
	select1: new ig.Sound('media/audio/select1.*', false),
	select2: new ig.Sound('media/audio/select2.*', false),
	select3: new ig.Sound('media/audio/select3.*', false),
	select4: new ig.Sound('media/audio/select4.*', false),
	soundsArr: [],

	fail: new ig.Sound('media/audio/fail.*', false),
	bigfail: new ig.Sound('media/audio/bigfail.*', false),

	mode: 'start',

	init: function() {
		this.sizeGame(window.innerWidth, window.innerHeight);
		this.ctx = ig.system.context;
		ig.input.bind( ig.KEY.MOUSE1, 'click' );
		this.spawnEntity(EntityPointer, 0, 0);
		this.soundsArr = [this.select0, this.select1, this.select2, this.select3, this.select4];

		this.startGame('start');

	},

	sizeGame: function(width, height) {
		this.sequenceArr.length = 0;
		this.clickCount = 0;
		this.highlightedCircle = 0;
		this.maxCircleSize = 20 * width / 100;
		if (this.maxCircleSize < 10) {
			this.maxCircleSize = 10;
		}
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

	restartGame: function() {
		var allCircles = this.getEntitiesByType(EntityCircle);
		for (var i = 0; i < allCircles.length; i++) {
			var circle = allCircles[i];
			circle.kill();
		}
		this.difficulty = 1;
		this.lives = 3;
		this.startGame('start');
	},

	increaseDifficulty: function() {
		this.clickCount = 0;
		this.highlightedCircle = 0;
		this.difficulty++;
		this.sequenceArr.length = 0;
		this.spawnEntity(EntityCircle, 0, 0);
		this.selectCircles(this.difficulty);
	},

	replaySequence: function() {
		this.clickCount = 0;
		this.highlightedCircle = 0;
		this.sequenceDisplayTimer = new ig.Timer(2);
        this.displayingSequence = true;
	},

	selectCircles: function(quantity) {
		var shuffledArr = this.controller.shuffleArr(this.getEntitiesByType(EntityCircle));
		for (var i = 0; i < quantity; i++) {
			this.sequenceArr.push(shuffledArr[i]);
		}
		this.displayingSequence = true;
		this.sequenceDisplayTimer = new ig.Timer(1);

	},
	
	update: function() {
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
	},

	drawMenu: function() {
		this.ctx.save();
		var x = ig.system.width / 2;
		var y =  100;
		this.ctx.font = "bold 100px Verdana";
		this.ctx.fillStyle = "rgba(255,255,255," + 0.5 + ")";
		this.ctx.textAlign = "center";
		this.ctx.fillText("SIMON SAYS", x, y);
		y += 100;
		this.ctx.font = "30px Verdana";
		this.ctx.fillText("Click the floating circles in the displayed order", x, y);
		y += 30;
		this.ctx.fillText("Difficulty: " + this.difficulty, x, y);
		y += 30;
		this.ctx.fillText("Lives: " + this.lives, x, y);
		this.ctx.restore();
	},
	
	draw: function() {
		this.parent();
		switch (this.mode) {
			case 'start':
				this.drawMenu();
				break;
		}
        this.ctx.save();
        if (this.pointer.active) {
            this.ctx.fillStyle = this.pointer.activeColor;
        }
        else {
            this.ctx.fillStyle = this.pointer.inactiveColor;
        }
        this.ctx.beginPath();
        this.ctx.arc(this.pointer.pos.x + this.pointer.size.x / 2,this.pointer.pos.y + this.pointer.size.y / 2,this.pointer.radius,0,2*Math.PI);
        this.ctx.fill();    
        this.ctx.restore();

		
	}
});

ig.main( '#canvas', SimonSays, 60, window.innerWidth, window.innerHeight, 1 );

function resizeCanvas() {
	console.log('resizing');
	ig.system.resize(window.innerWidth, window.innerHeight, 1);
}


});
