
var game = new Phaser.Game(800 600, Phaser.CANVAS, 'squarejim', { preload: preload, create: create, update: update, render : render });

function preload() {

    game.stage.backgroundColor = '#007236';

    // game.load.image('mushroom', 'assets/sprites/mushroom2.png');
    // game.load.image('sonic', 'assets/sprites/sonic_havok_sanity.png');
    // game.load.image('phaser', 'assets/sprites/phaser1.png');
    game.load.tilemap('tilemap', 'assets/background.json');
    game.load.image('ocean', 'assets/ocean.png');
    game.load.image('square', 'assets/square.png');
    game.load.image('squarejim', 'assets/squarejim.png');
    game.load.image('s','assets/letter_s.png');
    game.load.image('q', 'assets/letter_q.png');
    game.load.image('u','assets/letter_u.png');
    game.load.image('a','assets/letter_a.png');
    game.load.image('r','assets/letter_r.png');
    game.load.image('e','assets/letter_e.png');
    game.load.image('j','assets/letter_j.png');
    game.load.image('i','assets/letter_i.png');
    game.load.image('m','assets/letter_m.png');

}

//cursor setup
var cursors;

//player variable
var squarejim;

//collectible variables
var TOTAL_LETTERS = 0;
var MAX_LETTERS = 9;
var total_letters;

var letters; //group variable

//text-based variables
var MESSAGE = 'YOU LOST YOUR NAME\nFIND THE LETTERS TO GET IT BACK!';
var stats;
var messagetxt;

//map-related variables
var map;
var backgroundlayer;
var groundlayer;


function create() {

    //  Modify the world and camera bounds
    game.world.resize(128000, 640);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    letters = game.add.group();
    letters.enableBody = true;

    //create collectibles to set loose on the world
    var s = letters.create(game.world.randomX, game.world.randomY, 's');
    var q = letters.create(game.world.randomX, game.world.randomY, 'q');
    var u = letters.create(game.world.randomX, game.world.randomY, 'u');
    var a = letters.create(game.world.randomX, game.world.randomY, 'a');
    var r = letters.create(game.world.randomX, game.world.randomY, 'r');
    var e = letters.create(game.world.randomX, game.world.randomY, 'e');
    var j = letters.create(game.world.randomX, game.world.randomY, 'j');
    var i = letters.create(game.world.randomX, game.world.randomY, 'i');
    var m = letters.create(game.world.randomX, game.world.randomY, 'm');

    //this section courtesy of Josh Morony's "Create a Running Platformer Game in Phaser with Tilemaps"
    //link in index.html file
    //* * * * * * * * * * *

    map = game.add.tilemap('tilemap');
    map.addTilesetImage('square','square');
    map.addTilesetImage('ocean','ocean');
    backgroundlayer = map.createLayer('BackgroundLayer');
    groundlayer = map.createLayer('GroundLayer');
    map.setCollisionBetween(1,100,true,'GroundLayer');
    groundlayer.resizeWorld();

    squarejim = game.add.sprite(50, game.world.centerY, 'squarejim');

    //give SquareJim some body mechanics, i.e. gravity, and a bounce in his step
    game.physics.enable(squarejim);
    squarejim.body.bounce.y = 0.2;
    squarejim.body.gravity.y = 2000;
    squarejim.body.gravity.x = 20;
    squarejim.body.velocity.x = 100;

    game.camera.follow(sqaurejim);

    //end Josh Morony tutorial section
    //* * * * * * * * * * * *

    cursors = game.input.keyboard.createCursorKeys();

     var font = { font: "24px Arial", fill: "#ffffff", align: "center" };
     stats = game.add.text(50,50,'Letters Collected',font);
     messagetxt = game.add.text(50,50, MESSAGE, font);
     total_letters = TOTAL_LETTERS;
     stats.fixedToCamera = true;

     game.camera.onFadeComplete.add(resetGame, this);


}

function gameReset() {
    game.camera.resetFX();
}

function update() {

    game.physics.ARCADE.collide(squarejim,groundlayer);

    //calls collectLetters function whenever SquareJim runs into letters
    game.physics.ARCADE.collide(squarejim, letters, collectLetters, null, this);

    stats.text = "Letters: " + total_letters;
    if(total_letters === MAX_LETTERS)
    {
        game.camera.fade(0x000000, 3600);
        messagetxt.text = "Congratulations, S Q U A R E J I M";

    }

    if (cursors.left.isDown)
    {
        squarejim.body.velocity.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        squarejim.body.velocity.x += 4;
    }
    //give enough y velocity to clear highest section
    else if (cursors.up.isDown)
    {
        squarejim.body.velocity.y -= 300;
    }

}

//function which removes letters from play when collided with and increments letter tally
function collectLetters(squarejim,letter) {

    letter.kill();
    total_letters++;

}

//essentially "recreate" the game
function resetGame() {

    //get rid of all letters left on the screen (if any)
    letters.destroy('true','true');
    //reset starting tally to 0
    total_letters = TOTAL_LETTERS;
    //display instructions
    messagetxt.text = MESSAGE;

    //repopulate all letters
    var s = letters.create(game.world.randomX, game.world.randomY, 's');
    var q = letters.create(game.world.randomX, game.world.randomY, 'q');
    var u = letters.create(game.world.randomX, game.world.randomY, 'u');
    var a = letters.create(game.world.randomX, game.world.randomY, 'a');
    var r = letters.create(game.world.randomX, game.world.randomY, 'r');
    var e = letters.create(game.world.randomX, game.world.randomY, 'e');
    var j = letters.create(game.world.randomX, game.world.randomY, 'j');
    var i = letters.create(game.world.randomX, game.world.randomY, 'i');
    var m = letters.create(game.world.randomX, game.world.randomY, 'm');

    game.camera.resetFX();
}