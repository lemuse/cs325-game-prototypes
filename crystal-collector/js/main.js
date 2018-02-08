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
    	//load the images to use in the game, give them names and provide a filepath
        game.load.image( 'green crystal', 'assets/greencrystal.png' );
        game.load.image( 'blue crystal', 'assets/bluecrystal.png' );
        game.load.image( 'rock', 'assets/rock.png' );
    }
    
    //initialize group variables
    var crystals;
    var rocks;
    
    function create() {

    	//account for the use of physics in the game
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //create group "crystals" and enableBody
        crystals = game.add.group();
        crystals.enableBody = true;

        //do same for rocks
        rocks = game.add.group();
        rocks.enableBody = true;

        //populate the game screen with crystals and rocks
        for (var i = 0; i < 5; i++)
        {
            var bcrys = crystals.create(game.world.randomX, game.world.randomY, 'blue crystal');
            var gcrys = crystals.create(game.world.randomX, game.world.randomY, 'green crystal');

            //specify that the crystals cannot go out of frame
            bcrys.body.collideWorldBounds = true;
            gcrys.body.collideWorldBounds = true;
        }

        for (var j = 0; j < 15; j++)
        {
            var obstacle = rocks.create(game.world.randomX, game.world.randomY, 'rock');
            //specify that rocks do not move; they are obstacles
            obstacle.body.immovable = true;
        }

        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Hold down the mouse to gather the crystals to you.", style );
        text.anchor.setTo( 0.5, 0.0 );
    }
    
    function update() {
    	//checks game state for if the mouse is clicked
        if(game.input.mousePointer.isDown)
        {
        	//moves crystals towards the cursor at a speed of 200 pixels per second
            crystals.forEach(game.physics.arcade.moveToPointer, game.physics.arcade, false, 200);
        }
        else
        {
        	//crystals do not move in either x or y direction
            crystals.setAll('body.velocity.x',0);
            crystals.setAll('body.velocity.y',0);
        }

        //establish that crystals can collide with rocks
        var hitRock = game.physics.arcade.collide(crystals, rocks);
    }
};