const {TextInput, Slider, TextView, contentView, Color, Font, sizeMeasurement, NavigationView, Page, drawer, Button, Canvas, Composite, AlertDialog} = require('tabris');
const fontSizes = require('./fontSizes.js');

loadPage = function(newPage){
	var text = "joshbeatty20@gmail.com";

	

	new TextView({
		left: 16, right: 16, top: '1%',
		font: fontSizes.paragraph,
		text: "For any questions, concerns, or offers please email me at:",
	}).appendTo(newPage);
	new Button({
		centerX: true, top: 'prev() 23',
		text: "joshbeatty20@gmail.com",
		font: fontSizes.paragraph,
		style:'text'
	}).onSelect(() => {
		try {
			cordova.plugins.clipboard.copy(text);
	new AlertDialog({
		title: 'Email coppied to clipboard',
		buttons: {ok: 'OK'}
	}).open();

		}
		catch(err) {
	new AlertDialog({
		title: 'Email could not be coppied to clipboard',
		buttons: {ok: 'OK'}
	}).open();

		}
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
