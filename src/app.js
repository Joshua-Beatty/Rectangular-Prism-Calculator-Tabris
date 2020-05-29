const {TextInput, Slider, TextView, contentView, Color, Font, sizeMeasurement, NavigationView, Page, drawer, Button, Canvas} = require('tabris');

const fontSizeNavigation = '25px';
const fontSizeNavigationTitle = '35px';

rectangularPrismPage = new Page({title: 'Rectangular Prism'});
const rect = require('./rect.js');
rect.loadPage(rectangularPrismPage);

helpPage = new Page({title: 'Support'});
const help = require('./help.js');
help.loadPage(helpPage);

let pages = [rectangularPrismPage, helpPage] 

navigation = new NavigationView({
	layoutData: 'stretch', 
	drawerActionVisible: true,
	titleTextColor: new Color(255, 255, 255),
	toolbarColor: new Color(255, 160, 0),
	actionColor: new Color(255, 255, 255)
}).appendTo(contentView);
navigation.append(pages[0]);

drawer.append(
	new TextView({
		centerX: true, top: '1%',
		font: fontSizeNavigationTitle,
		text: "Navigation",
	})
);

newRect = function(attributes, color){
	return new Canvas(attributes)
	.onResize(({target: canvas, width, height}) => {
		const context = canvas.getContext('2d', width, height);
		context.fillStyle = color;
		context.fillRect(0, 0, width, height);
	})
}

hLAttributes = {top:'prev()', height:1, right:0, left:0};
hLColor = new Color(200,200,200);

newRect(hLAttributes, hLColor).appendTo(drawer);

pages.forEach(function (item, index) {
	new Button({
		text: item.title,
		font: fontSizeNavigation,
		top:'prev()', right:0, left:0,
		style:'text'
	}).onSelect(function(){
		navigation.pages().detach();
		navigation.append(pages[index]);
		drawer.close();
	}).appendTo(drawer);

	newRect(hLAttributes, hLColor).appendTo(drawer);
});

