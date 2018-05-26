// Ekplixi
// By JacksonFovero
// BEGIN VARIABLES
const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require("./settings.json");
const pack = require("./package.json");
const prefix = settings.prefix;
var testing = settings.testing;
const colors = require("colors");
const cmds = new Discord.RichEmbed()
	.setTitle("Command List")
	.setColor(settings.color)
	.setDescription("***" + settings.botName + "***")
	.setFooter("Under Construction")
	.setTimestamp()
	.addField("Help", "***All of these show this message.***\n.h/.help\n." + settings.botName.toLowerCase() + "\n.cmds\n.invite");
// END VARIABLES
// BEGIN STARTUP
client.on("ready", () => {
	console.log("    ________         ___      _ ".rainbow.bold);
	console.log("   / ____/ /______  / (_)  __(_)".rainbow.bold);
	console.log("  / __/ / //_/ __ |/ / / |/_/ / ".rainbow.bold);
	console.log(" / /___/ ,< / /_/ / / />  </ /  ".rainbow.bold);
	console.log("/_____/_/|_/ .___/_/_/_/|_/_/   ".rainbow.bold);
	console.log("          /_/                   ".rainbow.bold);
	console.log("████████████████████████████████".rainbow.bold);
	console.log("By JacksonFovero.".cyan.bold.trap);
	console.warn("Ekplixi is in its alpha phase. The console has not been set up as of " + pack.version + ".");
	console.log(" ");
	console.log("--Command Handler Enabled--");
	console.log(" ");
	if (settings.token === "NDQ5NzMwNzMyOTE5NjE5NTg0.Deo75w.LWG7FjVVhbe3aYjF1-xd4RpxXL8") {
		console.log("OOF: ".bold.red + "You have not set up settings.json. You are currently using the test bot account, which is in no servers and is not public. The bot will shut down in 15 seconds.")
		setTimeout(function() {client.destroy();}, 15000);
	}
	if (testing == "true") {
		client.user.setStatus("idle");
		client.user.setActivity("on a test build.");
		console.warn("! You have indicated you are on a test build, you are the only person that can run commands!".bold.yellow);
		console.warn("! You can change this in settings.json.".bold.yellow.underline);
	}
	else if (testing == "false") {
		client.user.setStatus("Online");
		client.user.setActivity("on a stable build!");
		console.log("You have indicated you are on a " + "stable".green.bold + " build.");
	}
	else {
		console.log("settings.testing is neither true or false. The bot has shut down.".red.bold.underline);
		client.destroy();
		setTimeout(function() {
			process.exit();
		}, 60000);
	}
});
// END STARTUP
client.on("message", message => {
	if(settings.testing === "true") {
		if(message.author.id !== settings.ownerID) return;
	}
	if(message.author.bot) return;
	if(message.content.indexOf(prefix) !== 0) return;
	const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	const noperms = new Discord.RichEmbed()
		.setTitle("No Permissions")
		.setColor(settings.errorColor)
		.setDescription("Hey, " + message.author + "you don't have the permissions to run that command!")
		.setTimestamp();
	function information() {
		const info = new Discord.RichEmbed()
			.setAuthor(settings.botName, settings.avatar)
			.setTitle(settings.botName + " Information")
			.setColor(settings.color)
			.setDescription(settings.botName + " is a collaboration between JacksonFovero and " + settings.botOwner + ". It is open source, and can be found at https://github.com/JacksonFovero/Ekplixi.")
			.setFooter(settings.botName)
			.setTimestamp();
		const infoMain = new Discord.RichEmbed()
			.setAuthor(settings.botName, settings.avatar)
			.setTitle("Information")
			.setColor(settings.color)
			.setDescription("Ekplixi is a multipurpose Discord bot with insane customization. It is also open source, which can be found here: https://github.com/JacksonFovero/Ekplixi.")
			.setFooter("Build status: https://travis-ci.com/JacksonFovero/Ekplixi")
			.setTimestamp();
		if (settings.botID === "419563862132785163") {
			message.channel.send(infoMain);
		}
		else {
			message.channel.send(info);
		}
	}
	// Begin actual command area.
	if (command === "ping") {
		message.channel.send("🏓 Pong!");
		message.channel.send(new Date().getTime() - message.createdTimestamp + "ms");
		console.log("Ping-pong!".white);
	}
	if (command === "die") {
		if(message.author.id !== settings.ownerID) {
			message.channel.send(noperms);
			console.log("Warning: A user without permissions tried to kill the bot.".yellow.bold);
			return;
		}
		message.channel.send("Goodbye! 👋");
		client.user.setActivity("shutting down...");
		client.user.setStatus("dnd");
		setTimeout(function() {
			client.destroy();
		}, 1000);
	}
	if (command === "h") {
		message.channel.send(cmds);
		console.log("Help ran.".white);
	}
	if (command === "help") {
		message.channel.send(cmds);
		console.log("Help ran.".white);
	}
	if (command === settings.botShortName.toLowerCase()) {
		message.channel.send(cmds);
		console.log("Help ran.".white);
	}
	if (command === "cmds") {
		message.channel.send(cmds);
		console.log("Help ran.".white);
	}
	if (command === "invite") {
		const invite = new Discord.RichEmbed()
			.setTitle("Invite " + settings.botName)
			.setColor(settings.color)
			.setURL("https://discordapp.com/oauth2/authorize?client_id=" + settings.botID + "&permissions=2146958583&scope=bot")
			.setDescription("Requested by " + message.author)
			.setTimestamp();
		message.channel.send(invite);
		console.log(settings.botName + " had it's invite requested!".cyan);
	}
	if (command === "credits") {
		const credits = new Discord.RichEmbed()
			.setTitle("Ekplixi System Credits")
			.setColor("#500bff")
			.setURL("https://discord.gg/E8MGgYe")
			.setDescription("Alexis is a system created by JacksonFovero that has insane customization, creative commands, and awesome functionality.")
			.addField("GitHub", "https://github.com/JacksonFovero/Ekplixi")
			.setTimestamp();
		message.channel.send(credits);
	}
	if (command === "setname") {
		if (message.author.id !== settings.ownerID) {
			message.channel.send(noperms);
			return;
		}
		client.user.setUsername(settings.botName);
		console.log("Your bot name has been set to " + settings.botName.cyan + ".");
		message.react("✅");
	}
	if (command === "setavatar") {
		if (message.author.id !== settings.ownerID) {
			message.channel.send(noperms);
			return;
		}
		client.user.setAvatar(settings.avatar);
		console.log("Your avatar has been set to ".zebra + settings.avatar + ".".zebra);
		message.channel.send("✅");
	}
	// The Info command is also required to stay.
	if (command === "info") {
		information();
	}
	if (command === "information") {
		information();
	}
});
client.login(settings.token);
