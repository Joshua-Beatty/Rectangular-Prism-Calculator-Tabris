const Big = require('decimal.js');
const {TextInput, Slider, TextView, Color,} = require('tabris');
const fontSizes = require('./fontSizes.js');

const loadPage = function(newPage){
	let sideA = Big(0);
	let sideB = Big(0);
	let sideC = Big(0);
	let height = Big(0);
	let percision = 4;
	const messageColorNew = new Color(120, 120, 120);

	const changeValuesTriangle = function(n, id) {
		if(!n){
			n = 0;
		}
		switch(id) {
			case 1:
			sideA = Big(n);
			break;
			case 2:
			sideB = Big(n);
			break;
			case 3:
			sideC = Big(n);
			break;
			case 4:
			height = Big(n);
			break;
		}
		changeAnswersTriangle()
	}

	const changeAnswersTriangle = function(){
		if(!height.isZero() && !sideA.isZero() && !sideB.isZero() && !sideC.isZero()){
			volumeTextViewTriangle.text = height.times(1/4).times((
				sideA.pow(4).times(-1)
				.plus((sideA.times(sideB)).pow(2).times(2))
				.plus((sideA.times(sideC)).pow(2).times(2))
				.plus(sideB.pow(4).times(-1))
				.plus((sideB.times(sideC)).pow(2).times(2))
				.plus(sideC.pow(4).times(-1))
				).sqrt()).toFixed(percision) * 1;

			const p = sideA.plus(sideB).plus(sideC).times(.5);
			surfaceAreaTextViewTriangle.text = p.times(p.minus(sideA)).times(p.minus(sideB)).times(p.minus(sideC)).sqrt().times(2).plus(sideA.times(height)).plus(sideB.times(height)).plus(sideC.times(height))
			.toFixed(percision) * 1;
		} else {
			surfaceAreaTextViewTriangle.text = '0';
			volumeTextViewTriangle.text = '0';
		}
	}
	const changePercTriangle = function(n){
		percision = Number(n);
		percisionText.text = `Percision: ${percision}`;
		changeAnswersTriangle();
	}

	new TextView({
		centerX: true, top: '1%',
		font: fontSizes.textView,
		text: "Side A",
	}).appendTo(newPage);

	new TextInput({
		top: '7%', left: '20%', right: '20%',
		font: fontSizes.textInput,
		message: 'Side A',
		keyboard: 'decimal',
		floatMessage: false,
		messageColor: messageColorNew,
	}).onInput( ({text}) => changeValuesTriangle(`${text}`, 1) ).appendTo(newPage);


	new TextView({
		centerX: true, top: '15%',
		font: fontSizes.textView,
		text: "Side B",
	}).appendTo(newPage);

	new TextInput({
		top: '21%', left: '20%', right: '20%',
		font: fontSizes.textInput,
		message: 'Side B',
		keyboard: 'decimal',
		floatMessage: false,
		messageColor: messageColorNew,
	}).onInput(({text}) => changeValuesTriangle(`${text}`, 2)).appendTo(newPage);

	new TextView({
		centerX: true, top: '29%',
		font: fontSizes.textView,
		text: "Side C",
	}).appendTo(newPage);

	new TextInput({
		top: '35%', left: '20%', right: '20%',
		font: fontSizes.textInput,
		message: 'Side C',
		keyboard: 'decimal',
		floatMessage: false,
		messageColor: messageColorNew,
	}).onInput(({text}) => changeValuesTriangle(`${text}`, 3)).appendTo(newPage);

	new TextView({
		centerX: true, top: '43%',
		font: fontSizes.textView,
		text: "Height",
	}).appendTo(newPage);

	new TextInput({
		top: '49%', left: '20%', right: '20%',
		font: fontSizes.textInput,
		message: 'Height',
		keyboard: 'decimal',
		floatMessage: false,
		messageColor: messageColorNew,
	}).onInput(({text}) => changeValuesTriangle(`${text}`, 4)).appendTo(newPage);


	new TextView({
		centerX: true, top: '57%',
		font: fontSizes.textView,
		text: "Volume",
	}).appendTo(newPage);

	const volumeTextViewTriangle = new TextView({
		centerX: true, top: '63%',
		font: fontSizes.textView,
		text: "0",
	}).appendTo(newPage);

	new TextView({
		centerX: true, top: '71%',
		font: fontSizes.textView,
		text: "Surface Area",
	}).appendTo(newPage);

	const surfaceAreaTextViewTriangle = new TextView({
		centerX: true, top: '77%',
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
	}).onSelect(({selection}) => changePercTriangle(`${selection}`)).appendTo(newPage);
}
module.exports = {
	loadPage: loadPage
};
