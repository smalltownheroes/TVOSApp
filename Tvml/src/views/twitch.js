//var homeTemplate = require('../templates/twitch.jade')p
var Twitch = require('../js/Twitch.js')
module.exports = function() {

  var twitch = new Twitch()
  twitch.login("wickd", function(err,data) {
  //twitch.login("yogscast", function(err,data) {
    var VIDEO_URL=twitch.videoUrl()
    //var videoOverlay = Presenter.makeDocument(TVOSTemplates.video());
    var myVideo = new MediaItem('video', VIDEO_URL);
    var player = new Player();
    player.playlist = new Playlist();
    player.playlist.push(myVideo);
    //player.overlayDocument = videoOverlay
    player.present();
  })

}
