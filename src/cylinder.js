const Big = require('decimal.js');
const {TextInput, Slider, TextView, newPage, Color, Font, sizeMeasurement, NavigationView, Page, drawer, Button, Canvas} = require('tabris');
const fontSizes = require('./fontSizes.js');

loadPage = function(newPage){

	let radius = Big(0);
	let height = Big(0);
	const fullPi = "3.14159265358979323846264338327950288";
	let pi = Big(3.14);
	let percision = 4;
	const changing = false;
	const messageColorNew = new Color(120, 120, 120);

	let idG = null;
	let nG = null;

	changeFunctionCylinder = function(n, id) {
		if(n){
			idG = id;
			nG = n;
			switch(id) {
				case 1:
				radius = Big(n);
				break;
				case 2:
				radius = Big(n).sqrt().div(pi);
				break;
				case 3:
				height = Big(n);
				break;
			}
			if(id != 1){
				radiusTextinputCylinder.text = radius.toFixed(percision) * 1;
			}if(id != 2){
				baseTextinputCylinder.text = radius.pow(2).times(pi).toFixed(percision)* 1;
			}
			surfaceTextCylinder.text = radius.pow(2).times(pi).times(2).plus(radius.times(2).times(pi).times(height)).toFixed(percision)* 1;
			areaTextCylinder.text = radius.pow(2).times(pi).times(height).toFixed(percision)* 1;
		} else {
			areaTextCylinder.text = 0;
		}
	}

	changePiCylinder = function(n){
		if(n > 1) {
			n = Number(n) + 1
		}
		pi = Big(fullPi.substr(0, n));
		piText.text = `Pi: ${pi}`;
		if(nG){
			changeFunctionCylinder(nG, idG);
		}
	}

	changePercCylinder = function(n){
		percision = Number(n);
		percisionText.text = `Percision: ${percision}`;
		if(nG){
			changeFunctionCylinder(nG, idG);
		}
	}

	new TextView({
		centerX: true, top: '5%',
		font: fontSizes.textView,
		text: "Radius",
	}).appendTo(newPage);

	const radiusTextinputCylinder = new TextInput({
		top: '10%', left: '20%', right: '20%',
		font: fontSizes.textInput,
		message: 'Radius',
		keyboard: 'decimal',
		floatMessage: false,
		messageColor: messageColorNew,
	}).onInput(({text}) => changeFunctionCylinder(`${text}`, 1)).appendTo(newPage);

	new TextView({
		centerX: true, top: '18%',
		font: fontSizes.textView,
		text: "Base Area",
	}).appendTo(newPage);

	const baseTextinputCylinder = new TextInput({
		top: '23%', left: '20%', right: '20%',
		font: fontSizes.textInput,
		message: 'Base Area',
		keyboard: 'decimal',
		floatMessage: false,
		messageColor: messageColorNew,
	}).onInput(({text}) => changeFunctionCylinder(`${text}`, 2)).appendTo(newPage);

	new TextView({
		centerX: true, top: '31%',
		font: fontSizes.textView,
		text: "Height",
	}).appendTo(newPage);

	const heightInput = new TextInput({
		top: '36%', left: '20%', right: '20%',
		font: fontSizes.textInput,
		message: 'height',
		keyboard: 'decimal',
		floatMessage: false,
		messageColor: messageColorNew,
	}).onInput(({text}) => changeFunctionCylinder(`${text}`, 3)).appendTo(newPage);

	new TextView({
		centerX: true, top: '44%',
		font: fontSizes.textView,
		text: "Volume",
	}).appendTo(newPage);

	const areaTextCylinder = new TextView({
		centerX: true,
		top: '49%',
		font: fontSizes.textView,
		text: '0',
	}).appendTo(newPage);

	new TextView({
		centerX: true, top: '56%',
		font: fontSizes.textView,
		text: "Surface Area",
	}).appendTo(newPage);

	const surfaceTextCylinder = new TextView({
		centerX: true,
		top: '63%',
		font: fontSizes.textView,
		text: '0',
	}).appendTo(newPage);

	const piText = new TextView({
		centerX: true, top: '74%',
		font: fontSizes.textView,
		text: `Pi: ${pi}`,
	}).appendTo(newPage);

	new Slider({
		top: '79%',
		left: '15%', right: '15%',
		maximum: 15,
		minimum: 1,
		selection: 2,
	}).onSelect(({selection}) => changePiCylinder(`${selection}`)).appendTo(newPage);

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
	}).onSelect(({selection}) => changePercCylinder(`${selection}`)).appendTo(newPage);

}

module.exports = {
	loadPage: loadPage
};
