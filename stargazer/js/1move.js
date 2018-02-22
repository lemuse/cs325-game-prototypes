//Choice 1: Or do you get up?
"use strict";

//starting state
var oneMoveState = function(){

	var content = [
    	"You slowly sit up.",
    	"Your spine seems all but unwilling to curl, but it feels good to move.",
    	"You run your hands over the grass: cold and sticky beneath your fingers.",
    	"",
    	"You find that you can't remember how you got here.",
    	"You... can't remember a lot of things.",
    	"Who are you? What is your name? How did you come to be here?",
    	"",
    	"Questions, questions... And no answers.",
    	"Amid the sea of questions, you hear a noise off to your left, hidden in the darkness.",
    	"Do you...",
    	"",
    	"",
    	"1. Investigate.",
    	"2. Stay where you are."
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
			//game.state.start('2move');
			return;
		}
		if(this.keyboard.isDown(Phaser.Keyboard.TWO)) {
			//game.state.start('2stay');
			return;
		}
	}
};
