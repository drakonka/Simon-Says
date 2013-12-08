ig.module(
	'game.entities.circle'
)
.requires(
	'impact.entity'
)

.defines(function(){

EntityCircle = ig.Entity.extend({
    type: ig.Entity.TYPE.B,
   // checkAgainst: ig.Entity.TYPE.B,
    size: {x:30, y:30},
    speed: 50, 
    color: '#ffffff',

	init: function(x, y, settings) {
		this.parent(x, y, settings);
        this.size.x = ig.game.controller.randomFromTo(ig.game.minCircleSize, ig.game.maxCircleSize);
        this.size.y = this.size.x;
        this.radius = this.size.x + 10;
        this.speed = ig.game.controller.randomFromTo(ig.game.minCircleSpeed, ig.game.maxCircleSpeed);
        this.pos.x = ig.game.controller.randomFromTo(0 + this.size.x, ig.system.width - this.size.x);
        this.pos.y = ig.game.controller.randomFromTo(0 + this.size.y, ig.system.height - this.size.y);
        this.color = ig.game.controller.pickRandomColor();
        this.ctx = ig.system.context;
	},
	
    update: function() {
        this.parent();
    },

    kill: function() {
        this.parent();
    },

    clicked: function() {
        console.log('clicked')
    },

    draw: function() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
        this.ctx.fill();    
    }
});
});