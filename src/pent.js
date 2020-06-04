const Big = require('decimal.js');
const {TextInput, Slider, TextView, contentView, Color, Font, sizeMeasurement, NavigationView, Page, drawer, Button, Canvas} = require('tabris');
const fontSizes = require('./fontSizes.js');

loadPage = function(newPage){
	let height = Big(0);
	let length = Big(0);
	const constant = Big(1/2).times(Big(5).times(Big(5).plus(Big(2).times(Big(5).sqrt()))).sqrt())
	let percision = 4;
	const changing = false;
	const messageColorNew = new Color(120, 120, 120);

	changeValuesPent = function(n, id) {
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
		changeAnswersPent()
	}

	changeAnswersPent = function(){
		surfaceAreaTextViewPent.text = length.times(5).times(height).plus(length.pow(2).times(constant))
		.toFixed(percision) * 1;
		volumeTextViewPent.text = length.pow(2).times(height).times(1/2).times(constant)
		.toFixed(percision) * 1;
	}
	changePercPent = function(n){
		percision = Number(n);
		percisionText.text = `Percision: ${percision}`;
		changeAnswersPent();
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
	}).onInput( ({text}) => changeValuesPent(`${text}`, 1) ).appendTo(newPage);


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
	}).onInput(({text}) => changeValuesPent(`${text}`, 2)).appendTo(newPage);

	new TextView({
		centerX: true, top: '47%',
		font: fontSizes.textView,
		text: "Volume",
	}).appendTo(newPage);

	volumeTextViewPent = new TextView({
		centerX: true, top: '57%',
		font: fontSizes.textView,
		text: "0",
	}).appendTo(newPage);

	new TextView({
		centerX: true, top: '66%',
		font: fontSizes.textView,
		text: "Surface Area",
	}).appendTo(newPage);

	surfaceAreaTextViewPent = new TextView({
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
	}).onSelect(({selection}) => changePercPent(`${selection}`)).appendTo(newPage);
}
module.exports = {
	loadPage: loadPage
};
