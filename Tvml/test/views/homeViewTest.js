import homeView from '../../src/views/home';

var TestSuite = function(T) {
  T.xdescribe('HomeView', function() {
    T.afterEach(function(done) {
      navigationDocument.clear()
      //socket.emit('jasmine',{ data: 'beforememem'})
      console.log('beforeme')
      done()
    });

    T.it('opens up the first time', function(done) {
      homeView()
      T.expect(navigationDocument.documents.length).toBe(1);
      var doc = navigationDocument.documents[0]
      T.expect(doc.getElementById('show1').textContent).toBe('titjes')
      done()
    });

    T.it('opens again the second time', function(done) {
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
