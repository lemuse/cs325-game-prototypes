//Choice 1: Do you stay where you are?"use strict";

//starting state
var oneStayState = function(){

	var content = [
    	"You resolve to stay where you are for a minute or two.",
    	"Get your bearings.",
    	"The sky appears almost to be spinning above you, it's so big.",
    	"Turning your head, you see nothing but empty grass until the darkness of night swallows it up.",
    	"You try to get comfortable, but it feels like there's a rock poking into your kidneys.",
    	"",
    	"",
    	"1. It doesn't take long before you decide to sit up..."
	];

	var line = [];

	var wordIndex = 0;
	var lineIndex = 0;

	var wordDelay = 100;
	var lineDelay = 400;


	function create() {

    	text = game.add.text(32, 32, '', { font: "25px Arial", fill: "#ffffff" });
    	this.keyboard = game.input.keyboard;

    	nextLine();
	}

	function nextLine() {
    	if (lineIndex === content.length)
    	{
        	//  We're finished
        	update();
    	}
    	//  Split the current line on spaces, so one word per array element
    	line = content[lineIndex].split(' ');
    	//  Reset the word index to zero (the first word in the line)
    	wordIndex = 0;
    	//  Call the 'nextWord' function once for each word in the line (line.length)
    	game.time.events.repeat(wordDelay, line.length, nextWord, this);
    	//  Advance to the next line
    	lineIndex++;

	}

	function nextWord() {
    	//  Add the next word onto the text string, followed by a space
    	text.text = text.text.concat(line[wordIndex] + " ");
    	//  Advance the word index to the next word in the line
    	wordIndex++;
    	//  Last word?
    	if (wordIndex === line.length)
    	{
        	//  Add a carriage return
        	text.text = text.text.concat("\n");

        	//  Get the next line after the lineDelay amount of ms has elapsed
        	game.time.events.add(lineDelay, nextLine, this);
    	}
	}

	function update() {
		if(this.keyboard.isDown(Phaser.Keyboard.ONE)) {
			game.state.start('1move');
		}
	}
};
