const Big = require('big.js');
const {TextInput, Slider, TextView, contentView, Color, Font, sizeMeasurement, NavigationView, Page, drawer, Button, Canvas} = require('tabris');
const fontSizes = require('./fontSizes.js');

loadPage = function(newPage){
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

	new TextView({
		centerX: true, top: '1%',
		font: fontSizes.textView,
		text: "Width",
	}).appendTo(newPage);

	const widthTextinput = new TextInput({
		top: '8%', left: '20%', right: '20%',
		font: fontSizes.textInput,
		message: 'Width',
		keyboard: 'decimal',
		floatMessage: false,
		messageColor: messageColorNew,
	}).onInput( ({text}) => changeValues(`${text}`, 1) ).appendTo(newPage);


	new TextView({
		centerX: true, top: '15%',
		font: fontSizes.textView,
		text: "Height",
	}).appendTo(newPage);

	const heightTextinput = new TextInput({
		top: '22%', left: '20%', right: '20%',
		font: fontSizes.textInput,
		message: 'Height',
		keyboard: 'decimal',
		floatMessage: false,
		messageColor: messageColorNew,
	}).onInput(({text}) => changeValues(`${text}`, 2)).appendTo(newPage);

	new TextView({
		centerX: true, top: '29%',
		font: fontSizes.textView,
		text: "Length",
	}).appendTo(newPage);

	const lengthTextinput = new TextInput({
		top: '36%', left: '20%', right: '20%',
		font: fontSizes.textInput,
		message: 'Length',
		keyboard: 'decimal',
		floatMessage: false,
		messageColor: messageColorNew,
	}).onInput(({text}) => changeValues(`${text}`, 3)).appendTo(newPage);


	new TextView({
		centerX: true, top: '45.7%',
		font: fontSizes.textView,
		text: "Volume",
	}).appendTo(newPage);

	volumeTextView = new TextView({
		centerX: true, top: '51.42%',
		font: fontSizes.textView,
		text: "0",
	}).appendTo(newPage);

	new TextView({
		centerX: true, top: '59.1%',
		font: fontSizes.textView,
		text: "Surface Area",
	}).appendTo(newPage);

	surfaceAreaTextView = new TextView({
		centerX: true, top: '64.9%',
		font: fontSizes.textView,
		text: "0",
	}).appendTo(newPage);

	new TextView({
		centerX: true, top: '72.6%',
		font: fontSizes.textView,
		text: "Diagonal Length",
	}).appendTo(newPage);

	diagonalTextView = new TextView({
		centerX: true, top: '78.3%',
		font: fontSizes.textView,
		text: "0",
	}).appendTo(newPage);


	const percisionText = new TextView({
		centerX: true, top: '85%',
		font: fontSizes.textView,
		text: `Percision: ${percision}`,
	}).appendTo(newPage);

	new Slider({
		top: '90%',
		left: '15%', right: '15%',
		maximum: 15,
		minimum: 0,
		selection: percision,
	}).onSelect(({selection}) => changePerc(`${selection}`)).appendTo(newPage);
}
module.exports = {
	loadPage: loadPage
};