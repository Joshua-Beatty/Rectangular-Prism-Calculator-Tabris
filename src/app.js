const {TextInput, Slider, TextView, contentView, Color, Font, sizeMeasurement, NavigationView, Page, drawer, Button, Canvas, statusBar, devTools} = require('tabris');

const fontSizeNavigation = '25px';
const fontSizeNavigationTitle = '35px';


newRect = function(attributes, color){
	return new Canvas(attributes)
	.onResize(({target: canvas, width, height}) => {
		const context = canvas.getContext('2d', width, height);
		context.fillStyle = color;
		context.fillRect(0, 0, width, height);
	})
}

//statusBar.background = new Color(255, 160, 0);
statusBar.background = new Color(0, 0, 0, 0);
statusBar.displayMode = 'float';
statusBar.theme = 'light';
devTools.hideUi();

rectangularPrismPage = new Page({title: 'Rectangular Prism'});
const rect = require('./rect.js');
rect.loadPage(rectangularPrismPage);

helpPage = new Page({title: 'Support'});
const help = require('./help.js');
help.loadPage(helpPage);

let pages = [rectangularPrismPage, helpPage] 

navigation = new NavigationView({
	layoutData: 'stretch', 
	top: statusBar.height,
	drawerActionVisible: true,
	titleTextColor: new Color(0, 0, 0),
	toolbarColor: new Color(255, 160, 0),
	actionColor: new Color(0, 0, 0)
}).appendTo(contentView);
navigation.append(pages[0]);

newRect({top:0, height:statusBar.height, right:0, left:0}, new Color(255, 160, 0)).appendTo(contentView);

drawer.append(
	new TextView({
		centerX: true, top: statusBar.height,
		font: fontSizeNavigationTitle,
		text: "Navigation",
	})
);


hLAttributes = {top:statusBar.height+navigation.toolbarHeight-1, height:1, right:0, left:0};
hLColor = new Color(200,200,200);

newRect(hLAttributes, hLColor).appendTo(drawer);

hLAttributes = {top:'prev()', height:1, right:0, left:0};
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

