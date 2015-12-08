var homeTemplate = require('../templates/home.jade')
module.exports = function() {
  var home = homeTemplate({
    results : [
      { data: { id:'show1', title: 'title 1', preview: { url: 'lalalal' } } },
      { data: { id:'show2', title: 'titte 2', preview: { url: 'lalalal' } } }
    ]
  })

  var parser = new DOMParser();
  var doc = parser.parseFromString(home, "application/xml");
  doc.addEventListener('select',function(event) {
    //console.log('select')
    var target = event.target
    console.log("gogogo"+target.nodeName)
    //console.log(target.getAttribute("id"))
    //navigationDocument.removeDocument(doc)
  })
  doc.addEventListener('play',function(event) {
    console.log('play')
    console.log(event)
  })
  doc.addEventListener('highlight',function(event) {
    console.log('highlight')
    var target = event.target
    console.log(target.getAttribute("id"))
  })
  doc.addEventListener('load',function(event) {
    console.log('load')
    console.log(event)
  })
  doc.addEventListener('unload',function(event) {
    console.log('unload')
    console.log(event)
  })
  doc.addEventListener('appear',function(event) {
    console.log('appear')
    console.log(event)
  })
  doc.addEventListener('disappear',function(event) {
    console.log('disappear')
    console.log(event)
  })
  doc.addEventListener('update',function(event) {
    console.log('update')
    console.log(event)
  })
  doc.addEventListener('didupdate',function(event) {
    console.log('didupdate')
    console.log(event)
  })
  doc.addEventListener('holdselect',function(event) {
    console.log('holdselect')
    console.log(event)
  })
  doc.addEventListener('change',function(event) {
    console.log('change')
    console.log(event)
  })
  doc.addEventListener('appear',function(event) {
    var el1=navigationDocument.documents[0].getElementById('show1')
    var el2=navigationDocument.documents[0].getElementById('show2')
    var event = new Event('highlight',{ bubbles: true})
    console.log('dispatching highlight')
    el2.dispatchEvent(event)
  });
  navigationDocument.pushDocument(doc)
  /*
  */
}
