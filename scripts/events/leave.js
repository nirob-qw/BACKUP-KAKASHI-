const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");
module.exports = {
	config: {
		name: "Out",
		aliases: ["l"],
		version: "1.0",
		author: "Sandy",
		countDown: 5,
		role: 2,
		shortDescription: "bot will leave gc",
		longDescription: "",
		category: "admin",
		guide: {
			vi: "{pn} [tid,blank]",
			en: "{pn} [tid,blank]"
		}
	},

	onStart: async function ({ api,event,args, message }) {
 var id;
 if (!args.join(" ")) {
 id = event.threadID;
 } else {
 id = parseInt(args.join(" "));
 }
 return api.sendMessage('▣𝐊𝐚𝐤𝐚𝐬𝐡𝐢 𝐁𝐨𝐭  𝗟𝗘𝗔𝗩𝗘:\n》Group chhara mane relation sesh na just connection weak
Jara mone rakhbe, tara rakhbe anyway

Logging out Stay chill stay real\n\n➤𝑶𝒀 𝑴𝑨𝑴𝑴𝑰 𝑹𝑬', id, () => api.removeUserFromGroup(api.getCurrentUserID(), id))
		}
	}
