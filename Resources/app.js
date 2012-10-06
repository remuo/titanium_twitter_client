Ti.include('sha1.js');

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var tableView = Titanium.UI.createTableView({
});

win1.add(tableView);

// 
var consumer_key = 'VVXyB058XzC0XTpYnOcAw';
var consumer_secret = 'ydB6sZRKgFYMoQ2fej2aTggC5qlksIS3W2LJPNqa84';
var access_token = '856356996-K7MFEJvjXCG4AMvIrY2Nw9mSw0BwKQoNBGkfCFxR';
var access_token_secret = 'Ub9dv17MxL6tNElvnta8oI2jeks7Uz8W1M6Aes01MCU';
//

var data = {};

var method = 'GET';
var api = 'https://api.twitter.com/1.1/statuses/home_timeline.json';	

var http = Titanium.Network.createHTTPClient();
var header = createHeader(method, api, '');
http.open(method, api);
http.setRequestHeader('Authorization', header);
http.onload = function() {
    var json = JSON.parse(http.responseText);
    Titanium.API.info(http.status);
    Titanium.API.info(http.responseText);
    if (http.status == 200) {
	    data = json.map(function(tweet) {
	    	Titanium.API.info(tweet.text);
	        return({title: tweet.text});
	    });
	    tableView.data = data;
    } else {
    	httpError(http);
    }
};
http.send();

// tableViewがクリックされたら日付をtweetしてtableViewに追加する
tableView.addEventListener('click', function (ev) {
    var method = 'POST';
    var api = 'https://api.twitter.com/1.1/statuses/update.json';
    var d = new Date();
    var status = String.format('%s%s%s', addZero(d.getHours()), addZero(d.getMinutes()), addZero(d.getSeconds()));
    var param = {
        'status': status
    };
    var header = createHeader(method, api, '&status=' + status);
    http.open(method, api);
    http.setRequestHeader('Authorization', header);
    http.onload = function() {
	    Titanium.API.info(http.status);
	    if (http.status == 200) {
	        Ti.API.info(status);
	        data.unshift({title: status});
	        tableView.data = data;
	    } else {
	        httpError(http);
	    }
    };
    http.send(param);
});

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

// twitterのAPIがエラーを返したらダイアログ表示
function httpError(http) {
    var json = JSON.parse(http.responseText);
	Ti.UI.createAlertDialog({
		title: String.format('http status is %d', http.status),
		message: json.errors[0].message
    }).show();	
}

function addZero (i) {
	if (i < 10) {
		return '0' + String(i);
	}
	return String(i);
}

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);


//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
