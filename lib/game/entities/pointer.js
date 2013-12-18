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
    zIndex: 100,
    size: {x:1, y:1},
    radius: 5,
    mousePressed: {x: 0, y: 0},
    holdingEntity: null,
    touchingEntity: null,
    activeColor: 'green',
    inactiveColor: 'red',
    active: false,


	init: function(x, y, settings) {
		this.parent(x, y, settings);
        this.ctx = ig.system.context;
        ig.game.pointer = this;
	},
	
    update: function() {
        this.pos.x = ig.input.mouse.x;
        this.pos.y = ig.input.mouse.y;
        if (ig.game.sequenceDisplayTimer && this.active) {
            this.active = false;
            if (ig.game.clickCount > 0) {
                ig.game.clickCount = 0;
            }
        }
        else if (!ig.game.sequenceDisplayTimer && !this.active) {
            this.active = true;
        }

        this.parent();
    },

    kill: function() {
        this.parent();
    },

    check: function( other ) {
        if (this.active && ig.input.released('click') && other.clickable ) {
            ig.game.clickCount++;
            other.clicked();
        }
    },

    draw: function() {
        this.parent();
    }
});
});