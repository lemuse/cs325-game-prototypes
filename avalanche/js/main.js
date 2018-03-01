"use strict";


window.onload = function(){

    var game = new Phaser.Game(800,600,Phaser.AUTO,'game',{create: create});

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        var introText = game.add.text(140, 80, 'Welcome, Adventurer!', {font: '50px Arial', fill: '#ffffff', align: 'center'});
        var directionText = game.add.text(100, 200, 'Click the link below to begin', {font: '30px Arial', fill: '#ffffff', align: 'center'});

        this.keyboard = game.input.keyboard;
        //var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    }

    function update() {
        if(this.keyboard.isdown(Phaser.Keyboard.ONE))
            game.state.start('start');
     }
};