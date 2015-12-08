//import 'babel-polyfill';

//import homeView from './views/home';
import * as liveReload from './lib/liveReload.js';

var tvosTest = require('./lib/jasmine.js')
var testSuite = require('../test/index.js')
var T = tvosTest.testInterface;
testSuite(T)

/*
var lockups = getActiveDocument().getElementsByTagName('lockup')  
var firstLockup = lockups.item(0)  
*/

App.onLaunch = function(launchOptions) {
  //homeView();
  liveReload.connect(launchOptions);
  tvosTest.connect(function(err) {
    console.debug('Jasmine Tester:  connected') 
    tvosTest.run()
  });

}
