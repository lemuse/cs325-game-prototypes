"use strict";

//starting state
class startState extends Phaser.State{

	preload(){
	var content = [
    	"You're laying on your back, sprawled out across the ground.",
    	"Your body is sore, and it feels like you've been in this position for... a while.",
    	"You open your eyes. Blink slowly - once... twice...",
    	"The darkness above you resolves itself into stars.",
    	"The sky looks almost infinite.",
    	"",
    	"",
    	"1. Do you stay where you are?",
    	"2. Or do you get up?"
	];

	var line = [];

	var wordIndex = 0;
	var lineIndex = 0;

	var wordDelay = 100;
	var lineDelay = 400;
}

	create() {

    	text = game.add.text(32, 32, '', { font: "25px Arial", fill: "#ffffff" });
    	this.keyboard = game.input.keyboard;

    	nextLine();
	}

	nextLine() {
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

	nextWord() {
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

	update() {
		if(this.keyboard.isDown(Phaser.Keyboard.ONE)) {
			game.state.start('1stay');
		}
		if(this.keyboard.isDown(Phaser.Keyboard.TWO)) {
			game.state.start('1move');
		}
	}
}
