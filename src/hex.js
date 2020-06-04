const Big = require('decimal.js');
const {TextInput, Slider, TextView, contentView, Color, Font, sizeMeasurement, NavigationView, Page, drawer, Button, Canvas} = require('tabris');
const fontSizes = require('./fontSizes.js');

loadPage = function(newPage){
	let height = Big(0);
	let length = Big(0);
	let percision = 4;
	const changing = false;
	const messageColorNew = new Color(120, 120, 120);

	changeValuesHex = function(n, id) {
		if(!n){
			n = 0;
		}
		switch(id) {
			case 1:
			length = Big(n);
			break;
			case 2:
			height = Big(n);
			break;
		}
		changeAnswersHex()
	}

	changeAnswersHex = function(){
		surfaceAreaTextViewHex.text = length.times(6).times(height).plus(length.pow(2).times(3).times(Big(3).sqrt()))
		.toFixed(percision) * 1;
		volumeTextViewHex.text = length.pow(2).times(height).times(3/2).times(Big(3).sqrt())
		.toFixed(percision) * 1;
	}
	changePercHex = function(n){
		percision = Number(n);
		percisionText.text = `Percision: ${percision}`;
		changeAnswersHex();
	}

	new TextView({
		centerX: true, top: '6%',
		font: fontSizes.textView,
		text: "Base Edge Length",
	}).appendTo(newPage);

	const widthTextinput = new TextInput({
		top: '16%', left: '20%', right: '20%',
		font: fontSizes.textInput,
		message: 'Base Edge Length',
		keyboard: 'decimal',
		floatMessage: false,
		messageColor: messageColorNew,
	}).onInput( ({text}) => changeValuesHex(`${text}`, 1) ).appendTo(newPage);


	new TextView({
		centerX: true, top: '26%',
		font: fontSizes.textView,
		text: "Height",
	}).appendTo(newPage);

	const heightTextinput = new TextInput({
		top: '36%', left: '20%', right: '20%',
		font: fontSizes.textInput,
		message: 'Height',
		keyboard: 'decimal',
		floatMessage: false,
		messageColor: messageColorNew,
	}).onInput(({text}) => changeValuesHex(`${text}`, 2)).appendTo(newPage);

	new TextView({
		centerX: true, top: '47%',
		font: fontSizes.textView,
		text: "Volume",
	}).appendTo(newPage);

	volumeTextViewHex = new TextView({
		centerX: true, top: '57%',
		font: fontSizes.textView,
		text: "0",
	}).appendTo(newPage);

	new TextView({
		centerX: true, top: '66%',
		font: fontSizes.textView,
		text: "Surface Area",
	}).appendTo(newPage);

	surfaceAreaTextViewHex = new TextView({
		centerX: true, top: '76%',
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
	}).onSelect(({selection}) => changePercHex(`${selection}`)).appendTo(newPage);
}
module.exports = {
	loadPage: loadPage
};
