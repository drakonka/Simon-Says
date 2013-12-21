ig.module(
	'game.entities.circle'
)
.requires(
	'impact.entity'
)

.defines(function(){

EntityCircle = ig.Entity.extend({
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.B,
    collides: ig.Entity.COLLIDES.ACTIVE,
    clickable: true,
    size: {x:30, y:30},
    speed: 0.01, 
    color: '#ffffff',
    alpha: 0.5,
    highlightedTimer: new ig.Timer(1),
    sound: null,

	init: function(x, y, settings) {
		this.parent(x, y, settings);
        this.size.x = ig.game.controller.randomFromTo(ig.game.minCircleSize, ig.game.maxCircleSize);
        this.size.y = this.size.x;
        this.radius = this.size.x - (20 * this.size.x / 100);
        this.speed = ig.game.controller.randomFromTo(ig.game.minCircleSpeed, ig.game.maxCircleSpeed);
        this.pickPosition();
        this.color = ig.game.controller.pickRandomColor('rgb');
        this.ctx = ig.system.context;
        this.vel.x = this.speed;
        this.vel.y = this.speed;

        var rand = ig.game.controller.randomFromTo(0,ig.game.soundsArr.length-1);
        this.sound = ig.game.soundsArr[rand];


	},
	
    pickPosition: function() {
        this.pos.x = ig.game.controller.randomFromTo(0 + this.size.x, ig.system.width - this.size.x);
        this.pos.y = ig.game.controller.randomFromTo(0 + this.size.y, ig.system.height - this.size.y);
        var allCircles = ig.game.getEntitiesByType(EntityCircle);
        for (var i = 0; i < allCircles.length; i++) {
            var circle = allCircles[i];
            if (circle !== this) {
                if (this.touches(circle)) {
                    this.pickPosition();
                }
            }
        }
    },

    highlight: function(time) {
        this.highlightedTimer.set(time);
        this.sound.play();
        this.alpha = 1;
        this.highlighted = true;
    },

    update: function() {
        ig.game.controller.bounceBackOffScreen(this);
        if (this.highlighted && this.highlightedTimer.delta() > 0) {
            this.alpha = 0.5;
            this.highlighted = false;
        }
        this.parent();
    },

    kill: function() {
        this.parent();
    },

    clicked: function() {
        console.log('clicked');
        if (this === ig.game.sequenceArr[ig.game.clickCount - 1]) {
            console.log('right!');
            this.sound.play();
            if (ig.game.clickCount === ig.game.sequenceArr.length) {
                ig.game.increaseDifficulty();
            }
        }
        else {
            ig.game.lives--;
            if (ig.game.lives > 0) {
                ig.game.replaySequence();
                ig.game.fail.play();
            }
            else {
                ig.game.restartGame();
                ig.game.bigfail.play();
            }
        }
    },

    draw: function() {
        this.ctx.save();
        this.ctx.fillStyle = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + this.alpha + ')';
        this.ctx.beginPath();
        this.ctx.arc(this.pos.x + this.size.x / 2,this.pos.y + this.size.y / 2,this.radius,0,2*Math.PI);
        if (this.highlighted) {
            this.ctx.shadowBlur = 50;
            this.ctx.shadowColor = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + this.alpha + ')';
        }
        this.ctx.fill();    
        this.ctx.restore();
        this.parent();
    }
});
});