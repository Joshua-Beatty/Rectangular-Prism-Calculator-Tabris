const {TextInput, Slider, TextView, contentView, Color, Font, sizeMeasurement} = require('tabris');
const Big = require('big.js');
                     
const fontSize = Math.round(window.screen.height / 28) +  "px";
const fontSizeSlider = '20px';
console.log(Math.round(window.screen.height / 28) + "px");

let width = Big(0);
let height = Big(0);
let length = Big(0);
let percision = 4;
let changing = false;
let messageColorNew = new Color(120, 120, 120);



changeValues = function(n, id) {
	if(!n){
		n = 0;
	}
	switch(id) {
		case 1:
			width = Big(n);
		break;
		case 2:
			height = Big(n);
		break;
		case 3:
			length = Big(n);
		break;
   	} 
	changeAnswers()
}

changeAnswers = function(){
	
	volumeTextView.text = width.times(height).times(length).toFixed(percision) * 1
	surfaceAreaTextView.text = width.times(height).plus(width.times(length).plus(height.times(length))).times(2).toFixed(percision) * 1
	diagonalTextView.text = width.pow(2).plus(height.pow(2).plus(length.pow(2))).sqrt().toFixed(percision) * 1
}
changePerc = function(n){
	percision = Number(n);
	percisionText.text = `Percision: ${percision}`;
	changeAnswers();
}

async function handleDrawing({target: canvas, width, height}) {
  	const measureConfigs = createMeasureConfigs(width);
	const measurements = await sizeMeasurement.measureTexts(diagonalTextView);
	console.log(measurements);
}
//contentView.append(<Canvas stretch onResize={handleDrawing}/>);

new TextView({
	centerX: true, top: '3%',
	font: fontSize,
	text: "Width",
}).appendTo(contentView);

const widthTextinput = new TextInput({
	top: '10%', left: '20%', right: '20%',
	font: fontSizeSlider,
	message: 'Width',
	keyboard: 'decimal',
	floatMessage: false,
	messageColor: messageColorNew,
}).onInput( ({text}) => changeValues(`${text}`, 1) ).appendTo(contentView);


new TextView({
	centerX: true, top: '17%',
	font: fontSize,
	text: "Height",
}).appendTo(contentView);

const heightTextinput = new TextInput({
	top: '24%', left: '20%', right: '20%',
	font: fontSizeSlider,
	message: 'Height',
	keyboard: 'decimal',
	floatMessage: false,
	messageColor: messageColorNew,
}).onInput(({text}) => changeValues(`${text}`, 2)).appendTo(contentView);

new TextView({
	centerX: true, top: '31%',
	font: fontSize,
	text: "Length",
}).appendTo(contentView);

const lengthTextinput = new TextInput({
	top: '38%', left: '20%', right: '20%',
	font: fontSizeSlider,
	message: 'Length',
	keyboard: 'decimal',
	floatMessage: false,
	messageColor: messageColorNew,
}).onInput(({text}) => changeValues(`${text}`, 3)).appendTo(contentView);


new TextView({
	centerX: true, top: '45.7%',
	font: fontSize,
	text: "Volume",
}).appendTo(contentView);

volumeTextView = new TextView({
	centerX: true, top: '51.42%',
	font: fontSize,
	text: "0",
}).appendTo(contentView);

new TextView({
	centerX: true, top: '59.1%',
	font: fontSize,
	text: "Surface Area",
}).appendTo(contentView);

surfaceAreaTextView = new TextView({
	centerX: true, top: '64.9%',
	font: fontSize,
	text: "0",
}).appendTo(contentView);

new TextView({
	centerX: true, top: '72.6%',
	font: fontSize,
	text: "Diagonal Length",
}).appendTo(contentView);

diagonalTextView = new TextView({
	centerX: true, top: '78.3%',
	font: fontSize,
	text: "0",
}).appendTo(contentView);


const percisionText = new TextView({
	centerX: true, top: '85%',
	font: fontSize,
	text: `Percision: ${percision}`,
}).appendTo(contentView);

new Slider({
	top: '90%',
	left: '15%', right: '15%',
	maximum: 15,
	minimum: 0,
	selection: percision,
}).onSelect(({selection}) => changePerc(`${selection}`)).appendTo(contentView);
