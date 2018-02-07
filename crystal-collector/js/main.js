"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'curosr', 'assets/cursor.jpeg' ); //source: 123rf.com
        game.load.image( 'crystal1', 'assets/greencrystal.png' ); //source: pixabay.com
        game.load.image( 'crystal2', 'assets/bluecrystal.png' ); //source: pixabay.com
        game.load.image( 'rock', 'assets/rock.png' ); //source: dreamstime.com
    }
    
    var bouncy;
    var crys1, crys2, rock1, rock2, rock3;
    var rocks;
    
    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Create a sprite at the center of the screen using the 'logo' image.
        bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'cursor' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        bouncy.anchor.setTo( 0.5, 0.5 );

        rocks = game.add.group();
        rocks.enableBody = true;

        crys1 = game.add.sprite( game.world.centerX + 100, game.world.centerY + 350, 'crystal1' );
        crys2 = game.add.sprite( game.world.centerX - 210, game.world.centerY - 166, 'crystal2' );
        rock1 = rocks.create(5, 30, 'rock1');
        rock2 = rocks.create(30, game.world.height - 23, 'rock2');
        rock3 = rocks.create(40, 33, 'rock3');
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        game.physics.enable( rocks, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "You're a geologist-in-training; find the crystals.", style );
        text.anchor.setTo( 0.5, 0.0 );
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 300, 300, 300 );

        var hitRock = game.physics.arcade.colide( bouncy, rocks );

    }
};
