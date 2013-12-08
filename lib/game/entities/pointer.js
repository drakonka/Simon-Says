ig.module(
	'game.entities.pointer'
)
.requires(
	'impact.entity'
)

.defines(function(){

EntityPointer = ig.Entity.extend({
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.B,
    size: {x:5, y:5},
    mousePressed: {x: 0, y: 0},
    holdingEntity: null,
    touchingEntity: null,

	init: function(x, y, settings) {
		this.parent(x, y, settings);
        ig.game.pointer = this;
	},
	
    update: function() {
        this.pos.x = ig.input.mouse.x;
        this.pos.y = ig.input.mouse.y;
        this.parent();
    },

    kill: function() {
        this.parent();
    },

    check: function( other ) {
        if (ig.input.released('click') && other.clickable ) {
            other.clicked();
        }
    }
});
});