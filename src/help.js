const Big = require('big.js');
const {TextInput, Slider, TextView, contentView, Color, Font, sizeMeasurement, NavigationView, Page, drawer, Button, Canvas, Composite, app} = require('tabris');
const fontSizes = require('./fontSizes.js');

loadPage = function(newPage){
	new TextView({
		left: 16, right: 16, top: '1%',
		font: fontSizes.paragraph,
		text: "For any questions, concerns, or offers please email me at:",
	}).appendTo(newPage);
	new Button({
		text: "joshbeatty20@gmail.com",
		font: fontSizes.paragraph,
		top:'prev()', right:0, left:0,
		style:'text'
	}).onSelect(function(){
		app.launch('mailto:joshbeatty20@gmail.com')
	}).appendTo(newPage);
	new TextView({
		centerX: true, bottom: '50%',
		font: fontSizes.tiny,
		text: "V 1.0",
	}).appendTo(newPage);
}

module.exports = {
	loadPage: loadPage
};