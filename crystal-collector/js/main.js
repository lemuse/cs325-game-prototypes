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
        //game.load.image( 'collector', 'assets/cursor.jpeg' );
        game.load.image( 'green crystal', 'assets/greencrystal.png' );
        game.load.image( 'blue crystal', 'assets/bluecrystal.png' );
        game.load.image( 'rock', 'assets/rock.png' );
    }
    
    var crystals;
    var rocks;
    //var collector;
    
    function create() {

    	game.physics.startSystem(Phaser.Physics.ARCADE);

    	crystals = game.add.group();
    	crystals.enableBody = true;
    	crystals.body.collideWorldBounds = true;

    	rocks = game.add.group();
    	rocks.enableBody = true;
    	rocks.body.immovable = true;

    	for (var j = 0; j < 15; j++)
    	{
    		var obstacle = rocks.create(game.world.randomX, game.world.randomY, 'rock');
    		//obstacle.body.immovable = true;
    	}

    	for (var i = 0; i < 5; i++)
    	{
    		var bcrys = crystals.create(game.world.randomX, game.world.randomY, 'blue crystal');
    		var gcrys = crystals.create(game.world.randomX, game.world.randomY, 'green crystal');
    		// game.physics.enable( bcrys, Phaser.Physics.ARCADE);
    		// game.physics.enable( gcrys, Phaser.Physics.ARCADE);
    	}

        // Create a sprite at the center of the screen using the 'logo' image.
        //collector = game.add.sprite( game.world.centerX, game.world.centerY, 'collector' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        //collector.anchor.setTo( 0.5, 0.5 );

        //game.physics.enable( collector, Phaser.Physics.ARCADE);
        
        // Make it bounce off of the world bounds.
        //collector.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Hold down the mouse to gather the crystals.", style );
        text.anchor.setTo( 0.5, 0.0 );
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //collector.rotation = game.physics.arcade.accelerateToPointer( collector, game.input.activePointer, 500, 500, 500 );

        if(game.input.mousePointer.isDown)
        {
        	crystals.forEach(game.physics.arcade.moveToPointer, game.physics.arcade, false, 200);
        }
        else
        {
        	crystals.setAll('body.velocity.x',0);
        	crystals.setAll('body.velocity.y',0);
        }

        var hitRock = game.physics.arcade.collide(crystals, rocks);
    }
};
