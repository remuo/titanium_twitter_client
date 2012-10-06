Ti.include('sha1.js');

var consumer_key = 'VVXyB058XzC0XTpYnOcAw';
var consumer_secret = 'ydB6sZRKgFYMoQ2fej2aTggC5qlksIS3W2LJPNqa84';
var access_token = '856356996-K7MFEJvjXCG4AMvIrY2Nw9mSw0BwKQoNBGkfCFxR';
var access_token_secret = 'Ub9dv17MxL6tNElvnta8oI2jeks7Uz8W1M6Aes01MCU';

// OAuth用のheaderを作る
function createHeader(method, api, omake) {
	var d = parseInt((new Date)/1000);
	var nonce = hex_sha1(parseInt(d + Math.random() * 100));
	
	var base_string = method + '&' + encodeURIComponent(api) + '&' + encodeURIComponent('oauth_consumer_key=' +　consumer_key + '&oauth_nonce=' + nonce + '&oauth_signature_method=HMAC-SHA1&oauth_timestamp=' + d + '&oauth_token=' + access_token + '&oauth_version=1.0' + omake);
	b64pad = '=';
	var signature = encodeURIComponent(b64_hmac_sha1(consumer_secret + '&' + access_token_secret, base_string));
	var header = 'OAuth oauth_consumer_key="' + consumer_key + '", oauth_nonce="' + nonce + '", oauth_signature="' + signature + '", oauth_signature_method="HMAC-SHA1", oauth_timestamp="' + d + '", oauth_token="' + access_token + '", oauth_version="1.0"';
	Ti.API.info(base_string);
	Ti.API.info(header);
	return header;
}

function getTimeline(tableView) {
	var method = 'GET';
	var api = 'https://api.twitter.com/1.1/statuses/home_timeline.json';	
	
	var http = Titanium.Network.createHTTPClient();
	var header = createHeader(method, api, '');
	http.open(method, api);
	http.setRequestHeader('Authorization', header);
	http.onload = function() {
	    var json = JSON.parse(http.responseText);
	    if (http.status == 200) {
		    data = json.map(function(tweet) {
		        return({title: tweet.text});
		    });
		    tableView.data = data;
	    } else {
	    	httpError(http);
	    }
	};
    http.onerror = function(error) {
        httpError(http);
    };
	http.send();
}

function tweet(status, tableView) {
    var method = 'POST';
    var api = 'https://api.twitter.com/1.1/statuses/update.json';
    var param = {
        'status': status
    };
	var http = Titanium.Network.createHTTPClient();
    var header = createHeader(method, api, '&status=' + status);
    http.open(method, api);
    http.setRequestHeader('Authorization', header);
    http.onload = function() {
	    if (http.status == 200) {
	    	// var rows = tableView.data[0].rows;
	    	// rows.unshift({title: status});
	    	// tableView.data = rows; 
	    	tableView.insertRowBefore(0, {
	    		title: status,
	    		animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN
	    	});
	    } else {
	        httpError(http);
	    }
    };
    http.onerror = function(error) {
        httpError(http);
    };
    http.send(param);
}

// twitterのAPIがエラーを返したらダイアログ表示
function httpError(http) {
    Titanium.API.info(http.status);
    var json = JSON.parse(http.responseText);
	Ti.UI.createAlertDialog({
		title: String.format('http status is %d', http.status),
		message: json.errors[0].message
    }).show();	
}

function sleep(t){ 
   var d1 = new Date().getTime(); 
   var d2 = new Date().getTime(); 
   while( d2 < d1 + 1000 * t){
       d2 = new Date().getTime(); 
   } 
   return; 
} 

function addZero (i) {
	if (i < 10) {
		return '0' + String(i);
	}
	return String(i);
}
