const {TextInput, Slider, TextView, contentView, Color, Font, sizeMeasurement, NavigationView, Page, drawer, Button, Canvas, Composite} = require('tabris');
const fontSizes = require('./fontSizes.js');

loadPage = function(newPage){
	new TextView({
		left: 16, right: 16, top: '1%',
		font: fontSizes.paragraph,
		text: "For any questions, concerns, or offers please email me at:",
	}).appendTo(newPage);
	new TextView({
		centerX: true, top: 'prev() 23',
		text: "joshbeatty20@gmail.com",
		font: fontSizes.paragraph,
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
