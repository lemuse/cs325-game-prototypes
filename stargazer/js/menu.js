"use strict";
//menu state
class menuState extends Phaser.State {

	 create() {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		var introText = game.add.text(game.world.center.X, 80, 'Welcome, Stargazer', {font: '50px Arial', fill: '#ffffff'});
		var directionText = game.add.text(game.world.center.X,game.world.center.Y, 'Directions: Use number keys 1-4 to make a selection', {font: '30px Arial', fill: '#ffffff'});
		var beginText = game.add.text(game.world.center.X,400, 'Press "space" to continue', {font: '20px Arial', fill: '#ffffff'});

		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		spaceKey.onDown.addOnce(this.start,this);
		
	}

	 start() {
		game.state.start('start');
	}

};