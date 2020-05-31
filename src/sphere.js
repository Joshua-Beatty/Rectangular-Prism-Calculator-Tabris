const Big = require('decimal.js');
const {TextInput, Slider, TextView, newPage, Color, Font, sizeMeasurement, NavigationView, Page, drawer, Button, Canvas} = require('tabris');
const fontSizes = require('./fontSizes.js');

loadPage = function(newPage){
	
	let radius = Big(0);
	let diameter = Big(0);
	let area = Big(0);
	let circumference = Big(0);
	let fullPi = "3.14159265358979323846264338327950288";
	let pi = Big(3.14);
	let percision = 4;
	let changing = false;
	let messageColorNew = new Color(120, 120, 120);

	let idG = null;
	let nG = null;

	changeFunctionSphere = function(n, id) {
		if(n != ""){
			idG = id;
			nG = n;
			switch(id) {
				case 1:
				radius = Big(n);
				break;
				case 2:
				radius = Big(n).div(2);
				break;
				case 3:
				radius = Big(n).div(pi).div(Big(4).div(3)).pow(1/3);
				break;
				case 4:
				radius = Big(n).div(pi.times(4)).sqrt();
				break;
			}
			if(id != 1){
				radiusTextinput.text = radius.toFixed(percision) * 1;
			}if(id != 2){
				diameterTextinput.text = radius.times(2).toFixed(percision)* 1;
			}if(id != 3){
				areaTextinput.text = radius.pow(3).times(pi).times(Big(4).div(3)).toFixed(percision)* 1;
			}if(id != 4){
				circumferenceTextinput.text = radius.pow(2).times(4).times(pi).toFixed(percision)* 1;
			}
		} else {
			idG = null;
			nG = null;
			radiusTextinput.text = "";
			diameterTextinput.text = "";
			areaTextinput.text = "";
			circumferenceTextinput.text = "";

		}
	}

	changePiSphere = function(n){
		if(n > 1) {
			n = Number(n) + 1
		}
		pi = Big(fullPi.substr(0, n));
		piText.text = `Pi: ${pi}`;
		if(nG){
			changeFunctionSphere(nG, idG);
		}
	}

	changePercSphere = function(n){
		percision = Number(n);
		percisionText.text = `Percision: ${percision}`;
		if(nG){
			changeFunctionSphere(nG, idG);
		}
	}
	new TextView({
		centerX: true, top: '5%',
		font: fontSizes.textView,
		text: "Radius",
	}).appendTo(newPage);

	const radiusTextinput = new TextInput({
		top: '12%', left: '20%', right: '20%',
		font: fontSizes.textInput,
		message: 'Radius',
		keyboard: 'decimal',
		floatMessage: false,
		messageColor: messageColorNew,
	}).onInput( ({text}) => changeFunctionSphere(`${text}`, 1) ).appendTo(newPage);


	new TextView({
		centerX: true, top: '22%',
		font: fontSizes.textView,
		text: "Diameter",
	}).appendTo(newPage);

	const diameterTextinput = new TextInput({
		top: '29%', left: '20%', right: '20%',
		font: fontSizes.textInput,
		message: 'Diameter',
		keyboard: 'decimal',
		floatMessage: false,
		messageColor: messageColorNew,
	}).onInput(({text}) => changeFunctionSphere(`${text}`, 2)).appendTo(newPage);

	new TextView({
		centerX: true, top: '39%',
		font: fontSizes.textView,
		text: "Volume",
	}).appendTo(newPage);

	const areaTextinput = new TextInput({
		top: '46%', left: '20%', right: '20%',
		font: fontSizes.textInput,
		message: 'Volume',
		keyboard: 'decimal',
		floatMessage: false,
		messageColor: messageColorNew,
	}).onInput(({text}) => changeFunctionSphere(`${text}`, 3)).appendTo(newPage);

	new TextView({
		centerX: true, top: '56%',
		font: fontSizes.textView,
		text: "Surface Area",
	}).appendTo(newPage);

	const circumferenceTextinput = new TextInput({
		top: '63%', left: '20%', right: '20%',
		font: fontSizes.textInput,
		message: 'Surface Area',
		keyboard: 'decimal',
		floatMessage: false,
		messageColor: messageColorNew,
	}).onInput(({text}) => changeFunctionSphere(`${text}`, 4)).appendTo(newPage);

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
	}).onSelect(({selection}) => changePiSphere(`${selection}`)).appendTo(newPage);

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
	}).onSelect(({selection}) => changePercSphere(`${selection}`)).appendTo(newPage);
}
module.exports = {
	loadPage: loadPage
};