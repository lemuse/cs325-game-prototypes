"use strict";


window.onload = function(){

    var game = new Phaser.Game(800,600,Phaser.AUTO,'game',{create: create});

    // function preload(){
         game.state.add('menu',menuState, false);
         game.state.add('start',startState, false);
         game.state.add('1stay',oneStayState, false);
         game.state.add('1move',oneMoveState, false);
         //game.state.add('2stay', twoStayState);
         //game.state.add('2move', twoMoveState);
    // }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        var introText = game.add.text(140, 80, 'Welcome, Stargazer', {font: '50px Arial', fill: '#ffffff', align: 'center'});
        var directionText = game.add.text(100, 200, 'Use number keys 1-4 to make a selection', {font: '30px Arial', fill: '#ffffff', align: 'center'});
        var beginText = game.add.text(280,250, 'Press "1" to continue', {font: '20px Arial', fill: '#ffffff', align: 'center'});
        var helpText = game.add.text(130,450, '(Alternatively, click the link below to play a functioning version of the game)', {font: '15px Arial', fill: '#ffffff', align: 'center'});

        this.keyboard = game.input.keyboard;
        //var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    }

    function update() {
        if(this.keyboard.isdown(Phaser.Keyboard.ONE))
            game.state.start('start');
     }
};