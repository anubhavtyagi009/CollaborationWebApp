app.service("ChatForumService" , function($q, $timeout) {
	console.log()
	var service = {} 
	var listener = $q.defer()
	var socket = {
		 client: null,
		 stomp: null
	}
	var messageIds = [];
	
	service.RECONNECT_TIMEOUT = 30000;
	service.SOCKET_URL = "/CollaborationBackEnd/chat_forum";
	service.CHAT_TOPIC = "/topic/message";
	service.CHAT_BROKER = "/app/chat_forum";
	
	service.recieve = function() {
		console.log("recieve")
	return listener.promise; 
	};
	
	service.send = function(message) {
		console.log("send")
	var id = Math.floor(Math.random() * 1000000);
	socket.stomp.send(service.CHAT_BROKER, {        //send(destination, {}->header, body)
		priority: 9
	}, JSON.stringify({
		message: message,
		id: id
	}));
	messageIds.push(id);
	};
	
	var reconnect = function() {
		console.log("reconnect")                   
	$timeout(function() {                              //wrapper window.setTimeout  :: $timeout([fn],[delay],[invokeApply],[pass]);
		initialize();                                          
	}, this.RECONNECT_TIMEOUT);	
	};
	
	var getMessage = function(data) {
		console.log("getMessage")
	var message = JSON.parse(data), out = {};        
		out.message = message.message;
		out.time = new Date(message.time);
		
		return out;
	};
	
	var startListener = function() {
		console.log("recieve")
	socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {  //subscribe(destination, Callback, {id: mysubid});
		listener.notify(getMessage(data.body));
	});	
	};
	
	var initialize = function() {
		console.log("initialize")
	socket.client = new SockJS(service.SOCKET_URL);
		socket.stomp = stomp.over(socket.client);
		socket.stomp.connect({}, startListener);    //connect(headers, connectCallback, errorCallback);
		socket.stomp.onclose = reconnect;
	};
	initialize();
	return service;
});