function Twitch() {
	//nativeLog("intializing Twitch");
	this.BASE_URL="http://api.twitch.tv/api"
}

Twitch.prototype.jsonRequest = function(options,callback) {

  var url = options.url;
  var method = options.method || 'GET';
  var headers = options.headers || {} ;
  var body = options.body || '';
  /*
  if callback === null {
      console.error("options.callback was missing for this request");  	
  }

  */
  if (!url) {
    throw 'loadURL requires a url argument';
  }

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.onreadystatechange = function() {
    try {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
			//console.log(xhr.responseText);
          callback(null, JSON.parse(xhr.responseText));
        } else {
          callback(new Error("Error [" + xhr.status + "] making http request: " + url));
        }
      }
    } catch (err) {
      console.error('Aborting request ' + url + '. Error: ' + err);
	  console.error(xhr.responseText);
      xhr.abort();
      callback(new Error("Error making request to: " + url + " error: " + err));
    }
  };

  xhr.open(method, url, true);

  Object.keys(headers).forEach(function(key) {
    xhr.setRequestHeader(key, headers[key]);
  });

  xhr.send(body);

  return xhr;
}

Twitch.prototype.api = function(method,resource,body,callback) {
	var self = this;
	
	var xhr = self.jsonRequest({
		method: method,
		body: body,
		url: self.BASE_URL+resource
	},callback);
	
	return xhr;	
}

Twitch.prototype.login = function(channel, callback) {
	
	var self = this;
	var xhr = self.api("GET","/channels/"+channel+"/access_token",null,function(error, result){
    self.channel = channel
    self.token =result.token
    self.sig = result.sig
    console.log(result.sig)
    console.log(result)
    console.log(result.token)
    callback(error, result);
  });
	
	return xhr;
}

Twitch.prototype.videoUrl = function(callback) {
	
	var self = this;

  var random = Math.floor(Math.random() * 999999) + 1;
  var url = "http://usher.twitch.tv/api/channel/hls/"+self.channel+".m3u8?"+
            "player=twitchweb&token="+encodeURI(self.token) +
            "&sig="+encodeURI(self.sig)+
            "&allow_audio_only=true&allow_source=true&type=any&p="+random

  console.log(url)
	
	return url;
}

module.exports = Twitch
