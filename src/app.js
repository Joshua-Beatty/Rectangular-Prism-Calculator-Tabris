const {TextInput, Slider, TextView, contentView, Color, Font, sizeMeasurement, NavigationView, Page, drawer, Button, Canvas, statusBar, Action, AlertDialog, devTools} = require('tabris');

const fontSizeNavigation = '25px';
const fontSizeNavigationTitle = '35px';
navBarColor = new Color(255, 160, 0)
newRect = function(attributes, color){
	return new Canvas(attributes)
	.onResize(({target: canvas, width, height}) => {
		const context = canvas.getContext('2d', width, height);
		context.fillStyle = color;
		context.fillRect(0, 0, width, height);
	})
}

statusBar.background =  Color.transparent;
statusBar.displayMode = 'float';
statusBar.theme = 'light';
devTools.hideUi();

var text = "Hello World!";

cordova.plugins.clipboard.copy(text);

//loading pages--------------

rectangularPrismPage = new Page({title: 'Rectangular Prism'});
const rect = require('./rect.js');
rect.loadPage(rectangularPrismPage);

triangularPrismPage = new Page({title: 'Trianglular Prism'});
const triangle = require('./triangle.js');
triangle.loadPage(triangularPrismPage);

hexPrismPage = new Page({title: 'Hexagonal Prism'});
const hex = require('./hex.js');
hex.loadPage(hexPrismPage);

pentPrismPage = new Page({title: 'Pentagonal Prism'});
const pent = require('./pent.js');
pent.loadPage(pentPrismPage);

cylinderPage = new Page({title: 'Cylinder'});
const cylinder = require('./cylinder.js');
cylinder.loadPage(cylinderPage);

spherePage = new Page({title: 'Sphere'});
const sphere = require('./sphere.js');
sphere.loadPage(spherePage);

helpPage = new Page({title: 'Support'});
const helpthing = require('./help.js');
helpthing.loadPage(helpPage);

let pages = [rectangularPrismPage, triangularPrismPage, hexPrismPage, pentPrismPage, cylinderPage, spherePage, helpPage]

//--------------------------
navigation = new NavigationView({
	layoutData: 'stretch',
	top: statusBar.height,
	drawerActionVisible: true,
	titleTextColor: Color.black,
	toolbarColor: navBarColor,
	actionColor: Color.black
}).appendTo(contentView);
navigation.append(pages[0]);

newRect({top:0, height:statusBar.height, right:0, left:0}, navBarColor).appendTo(contentView);

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
pages.forEach((item, index) => {
	if(index == 2){
		new Button({
			text: item.title,
			font: fontSizeNavigation,
			top:'prev()', right:0, left:0,
			style:'text'
		}).onSelect(() => {
			navigation.pages().detach();
			navigation.append(pages[index]);
			drawer.close();
			info.appendTo(navigation);
			alert = function(){
				new AlertDialog({
					title: 'Right REGULAR Hexagonal Prism Only',
					buttons: {ok: 'OK'}
				}).open();
			}
		}).appendTo(drawer);
	}else if(index == 3){
		new Button({
			text: item.title,
			font: fontSizeNavigation,
			top:'prev()', right:0, left:0,
			style:'text'
		}).onSelect(() => {
			navigation.pages().detach();
			navigation.append(pages[index]);
			drawer.close();
			info.appendTo(navigation);
			alert = function(){
				new AlertDialog({
					title: 'Right REGULAR Pentagonal Prism Only',
					buttons: {ok: 'OK'}
				}).open();
			}
		}).appendTo(drawer);
	}
	else{
		new Button({
			text: item.title,
			font: fontSizeNavigation,
			top:'prev()', right:0, left:0,
			style:'text'
		}).onSelect(() => {
			navigation.pages().detach();
			navigation.append(pages[index]);
			drawer.close();
			info.detach();
		}).appendTo(drawer);
	}

	newRect(hLAttributes, hLColor).appendTo(drawer);
});

const infoText = ''
info = new Action({
	title: 'Settings',
	image: './info.png'
}).onSelect(() => alert());

let alert = function(){
	new AlertDialog({
		title: 'Document saved',
		buttons: {ok: 'OK'}
	}).open();
}

