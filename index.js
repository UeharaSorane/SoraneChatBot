const express = require('express');
const Line = require('linebot');
var {Wit, log} = require("node-wit");

var WitClient = new Wit({
  	accessToken: "EF2SSQO7WOU5TPC2PSDAIJOBW36YLW7L"
});

var bot = Line({
  	channelSecret: process.env.LINE_CHANNEL_SECRET, //這裡是讓系統抓在Heroku設定的數據
  	channelAccessToken: process.env.LINE_CHANNEL_ACCESSTOKEN // 同上
});

var app = express();
app.post('/', bot.parser());

var server = app.listen(process.env.PORT || 8080, function() {
	var port = server.address().port;
	console.log("App now running on port", port);
	console.log("好，沒事");
});

bot.on('message', function(event) {
	event.source.profile().then(function (profile) {
		WitClient.message(event.message.text, {}).then((data) => {
				/////以下是擷取下來的資源/////
				var src = event.source;
				var msg = event.message.text;
				////////////////////////////

				event.reply(msg).then(function (data) {
					}).catch(function (error) {
				});
		}).catch(console.error);
	});
});
