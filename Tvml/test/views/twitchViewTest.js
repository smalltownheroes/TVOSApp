import twitchView from '../../src/views/twitch';

var TestSuite = function(T) {
  T.describe('TwichView', function() {
    T.afterEach(function(done) {
      navigationDocument.clear()
      done()
    });

    T.it('opens up the first time', function(done) {
      twitchView()
      /*
      T.expect(navigationDocument.documents.length).toBe(1);
      var doc = navigationDocument.documents[0]
      T.expect(doc.getElementById('show1').textContent).toBe('titjes')
      */
      setTimeout(function(){
      done()
      },10000);
    },10000);

    T.xit('opens again the second time', function(done) {
      homeView()
      setTimeout(function(){
        T.expect(navigationDocument.documents.length).toBe(1);
        var doc = navigationDocument.documents[0]
        T.expect(doc.getElementById('show1').textContent).toBe('titjes')
        done()
      },1000);
    });
  })
}

module.exports = TestSuite
