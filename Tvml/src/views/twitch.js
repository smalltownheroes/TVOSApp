//var homeTemplate = require('../templates/twitch.jade')
var Twitch = require('../js/Twitch.js')
module.exports = function() {

  var twitch = new Twitch()
  //twitch.login("wickd", function(err,data) {
  twitch.login("yogscast", function(err,data) {
    var VIDEO_URL=twitch.videoUrl()
    //var videoOverlay = Presenter.makeDocument(TVOSTemplates.video());
    var myVideo = new MediaItem('video', VIDEO_URL);
    var player = new Player();
    player.addEventListener('mediaItemDidChange',function(event) {
    console.log(event)
    })
    player.addEventListener('mediaItemWillChange',function(event) {
    console.log(event)
    })
    player.addEventListener('shouldHandleStateChange',function(event) {
    console.log(event)
    })
    player.addEventListener('stateDidChange',function(event) {
    console.log(event)
    })
    player.addEventListener('stateWillChange',function(event) {
    console.log(event)
    })
    player.addEventListener('requestSeekToTime',function(event) {
    console.log(event)
    })
    // timeBoundaryDidCross
    // timeDidChange
    // timedMetadata  

    player.playlist = new Playlist();
    player.playlist.push(myVideo);
    //player.overlayDocument = videoOverlay
    player.play();
  })

}
