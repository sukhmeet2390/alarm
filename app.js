var notificationOptions = {
	"button" : {
		type : "basic", // template type
		title : "Anne",
		message : "Lorem ispum",
		iconUrl  : chrome.runtime.getURL("images/1.png"), // check if we need it locally
		buttons : [{
				title: "Reply",
				iconUrl : chrome.runtime.getURL("images/reply.png")
			},
			{
				title: "Reply2",
				iconUrl : chrome.runtime.getURL("images/3.png")
			}
		] 
	}
}
var notID = 0;
function getNextId(){
	return String(notID++);
}
var app = {};
app.init = function(delay){
		this.setAlarm(delay);
		this.addListener();	
};
app.setAlarm = function(delay) {
		chrome.alarms.create('user-alarm', 
			{
			delayInMinutes : delay
			});	
};
app.addListener = function(){
	var self = this;
	chrome.alarms.onAlarm.addListener(function (alarm) {
    	self.showNotification();
	});
}
app.showNotification = function(){
	var id = getNextId(),
	options = notificationOptions['button'],
	creationCallback = function (notificationId){ console.log("Notification created " , notificationId)}

	chrome.notifications.create(id, options, creationCallback);
}