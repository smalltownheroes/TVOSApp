import '../src/templates/home.jade'
import 'page'
chai = require('expose?chai!chai')

var TestSuite = function(T) {
  require('./views/homeViewTest.js')(T)
  require('./views/twitchViewTest.js')(T)
}

module.exports = TestSuite
