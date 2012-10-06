Ti.include('lib/functions.js');

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Twitter Client',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Twitter Client',
    window:win1
});

var tableView = Titanium.UI.createTableView({
});

win1.add(tableView);

var messageButton = Ti.UI.createButton(
    {
        systemButton: Titanium.UI.iPhone.SystemButton.ADD
    }
);

messageButton.addEventListener(
    'click',
    function () {
        var messageWindow = Ti.UI.createWindow(
            {
                url: 'message_window.js',
                title: 'message',
                backgroundColor: '#fff'
            }
        );
        messageWindow.tableView = tableView;
        messageWindow.open();
    }
);
win1.rightNavButton = messageButton;

getTimeline(tableView);

// tableViewがクリックされたら日付をtweetしてtableViewに追加する
tableView.addEventListener('click', function (ev) {
    var d = new Date();
    var status = String.format('%s%s%s', addZero(d.getHours()), addZero(d.getMinutes()), addZero(d.getSeconds()));
	tweet(status, tableView);
});

//
//  add tabs
//
tabGroup.addTab(tab1);  


// open tab group
tabGroup.open();
