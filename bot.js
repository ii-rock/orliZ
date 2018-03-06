const SteamUser = require('steam-user');
const Steam = require('steam')
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const config = require('./config.json')

const client = new SteamUser();
const community = new SteamCommunity();
var Cleverbot = require('cleverbot-node');
    cleverbot = new Cleverbot;
    cleverbot.configure({botapi: process.env.API_KEY});

const logOnOptions = {
	accountName: process.env.romero,
	password: process.env.helium,
	twoFactorCode: SteamTotp.generateAuthCode(process.env.tFC)
};

client.logOn(logOnOptions);

let prefix = '!';


client.on('loggedOn', function(details) {
	client.chatMessage(process.env.ID, "Connected to steam servers.");
	
	client.gamesPlayed(570);
});



client.on('friendMessage', function(steamID, message) {
	
	function makeid() {
  
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
	if (!message.startsWith(prefix)) return;
	var args = message.substring(prefix.length).split(" ");
	let WholeMsg = message.split(" ").slice(1)
    let theMsg = WholeMsg.join(" ")
     
	
	switch (args[0].toLowerCase()) {
		case "setname":
			if (!theMsg) return client.chatMessage(steamID, 'Cannot set my username to empty!')
			client.setPersona(SteamUser.Steam.EPersonaState.Online, theMsg);
			client.chatMessage(steamID, `My username has been successfully changed to ${theMsg}`)
			break;
		case "play":
			if (!theMsg) return client.chatMessage(steamID, "Usage: !play <dota / tf>")
			if (!theMsg === 'dota' || !theMsg === 'tf') return client.chatMessage(steamID, "Usage: !play <dota / tf>")
			if (theMsg === 'dota') {
				client.gamesPlayed(570) 
				client.chatMessage(steamID, 'I am now playing Dota 2')
			}
			if (theMsg === 'tf') {
				client.gamesPlayed(440) 
				client.chatMessage(steamID, 'I am now playing Team Fortress 2')
			}
	       break;
		case "generate":
                       
			client.chatMessage(steamID, `Generated code: ${makeid()}`)
               
		break;
		case "eval":
			try {
				eval(theMsg)
			} catch (err) {
				client.chatMessage(steamID, err.message)
			}
		break;
	}
});



client.setOption("autoRelogin", true);
client.setOption("promptSteamGuardCode", false);
