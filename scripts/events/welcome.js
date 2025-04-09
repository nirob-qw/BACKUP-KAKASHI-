const { getTime, drive } = global.utils;
if (!global.temp.welcomeEvent)
	global.temp.welcomeEvent = {};

module.exports = {
	config: {
		name: "welcome",
		version: "1.7",
		author: "NTKhang",
		category: "events"
	},

	langs: {
		vi: {
			session1: "sáng",
			session2: "trưa",
			session3: "chiều",
			session4: "tối",
			welcomeMessage: "Cảm ơn bạn đã mời tôi vào nhóm!\nPrefix bot: %1\nĐể xem danh sách lệnh hãy nhập: %1help",
			multiple1: "bạn",
			multiple2: "các bạn",
			defaultWelcomeMessage: "Xin chào {userName}.\nChào mừng bạn đến với {boxName}.\nChúc bạn có buổi {session} vui vẻ!"
		},
		en: {
			session1: "𝗺𝗼𝗿𝗻𝗶𝗻𝗴",
			session2: "𝗻𝗼𝗼𝗻",
			session3: "𝗮𝗳𝘁𝗲𝗿𝗻𝗼𝗼𝗻",
			session4: "𝗲𝘃𝗲𝗻𝗶𝗻𝗴",
			welcomeMessage: " ---

╔════════════════════╗
𝗔𝘀𝘀𝗮𝗹𝗮𝗺𝘂𝗮𝗹𝗮𝗶𝗸𝘂𝗺!
 \n\n 𝗔𝗺𝗮𝗸𝗲 𝗶𝗻𝘃𝗶𝘁𝗲 𝗸𝗼𝗿𝗮𝗿 𝗷𝗼𝗻𝗻𝗼 𝗼𝗻𝗲𝗸 𝗼𝗻𝗲𝗸 𝗗𝗵𝗼𝗻𝗼𝗯𝗮𝗱!!\n 𝐊𝐀𝐊𝐀𝐒𝐇𝐈 𝐁𝐎𝐓  𝗽𝗿𝗲𝗳𝗶𝘅: %1\n𝗧𝗼 𝘃𝗶𝗲𝘄 𝘁𝗵𝗲 𝗹𝗶𝘀𝘁 𝗼𝗳 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀, 𝗽𝗹𝗲𝗮𝗰𝗲 𝗲𝗻𝘁𝗲𝗿: %1𝗵𝗲𝗹𝗽\n\n𝙎𝙩𝙖𝙮 𝙘𝙤𝙤𝙡, 𝙨𝙩𝙖𝙮 𝙧𝙚𝙨𝙥𝙚𝙘𝙩𝙛𝙪𝙡.
╚════════════════════╝


---
",
			multiple1: "𝘆𝗼𝘂",
			multiple2: "𝘆𝗼𝘂 𝗴𝘂𝘆𝘀",
			defaultWelcomeMessage: `---

╔══•✦•❖•✦•══╗
  ᴀꜱꜱᴀʟᴀᴍᴜ ᴀʟᴀɪᴋᴜᴍ\n\n{userName}.\n ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ ᴛʜᴇ ɢʀᴏᴜᴘ!
╚══•✦•❖•✦•══╝ {multiple} : {boxName}\n{session} \n\n𝑅𝑒𝑠𝑝𝑒𝑐𝑡 𝑟 𝑐ℎ𝑖𝑙𝑙 𝑣𝑖𝑏𝑒 𝑚𝑎𝑖𝑛𝑡𝑎𝑖𝑛 𝑘𝑜𝑟𝑢𝑛
➤ 𝐴𝑐𝑡𝑖𝑣𝑒 𝑡ℎ𝑎𝑘𝑢𝑛, 𝑣𝑎𝑙𝑜 𝑘𝑖𝑐ℎ𝑢 𝑠ℎ𝑎𝑟𝑒 𝑘𝑜𝑟𝑢𝑛
➤ 𝑁𝑜 𝑠𝑝𝑎𝑚, 𝑗𝑢𝑠𝑡 𝑔𝑜𝑜𝑑 𝑡𝑖𝑚𝑒𝑠!\n\n𝑆ℎ𝑜𝑏𝑎𝑟 𝑠ℎ𝑎𝑡ℎ𝑒 𝑏ℎ𝑎𝑙𝑜 𝑒𝑘𝑡𝑎 𝑗𝑜𝑢𝑟𝑛𝑒𝑦 ℎ𝑜𝑘, 𝐼𝑛 𝑆ℎ𝑎 𝐴𝑙𝑙𝑎ℎ!


---`
		}
	},

	onStart: async ({ threadsData, message, event, api, getLang }) => {
		if (event.logMessageType == "log:subscribe")
			return async function () {
				const hours = getTime("HH");
				const { threadID } = event;
				const { nickNameBot } = global.GoatBot.config;
				const prefix = global.utils.getPrefix(threadID);
				const dataAddedParticipants = event.logMessageData.addedParticipants;
				// if new member is bot
				if (dataAddedParticipants.some((item) => item.userFbId == api.getCurrentUserID())) {
					if (nickNameBot)
						api.changeNickname(nickNameBot, threadID, api.getCurrentUserID());
					return message.send(getLang("welcomeMessage", prefix));
				}
				// if new member:
				if (!global.temp.welcomeEvent[threadID])
					global.temp.welcomeEvent[threadID] = {
						joinTimeout: null,
						dataAddedParticipants: []
					};

				// push new member to array
				global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...dataAddedParticipants);
				// if timeout is set, clear it
				clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

				// set new timeout
				global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async function () {
					const threadData = await threadsData.get(threadID);
					if (threadData.settings.sendWelcomeMessage == false)
						return;
					const dataAddedParticipants = global.temp.welcomeEvent[threadID].dataAddedParticipants;
					const dataBanned = threadData.data.banned_ban || [];
					const threadName = threadData.threadName;
					const userName = [],
						mentions = [];
					let multiple = false;

					if (dataAddedParticipants.length > 1)
						multiple = true;

					for (const user of dataAddedParticipants) {
						if (dataBanned.some((item) => item.id == user.userFbId))
							continue;
						userName.push(user.fullName);
						mentions.push({
							tag: user.fullName,
							id: user.userFbId
						});
					}
					// {userName}:   name of new member
					// {multiple}:
					// {boxName}:    name of group
					// {threadName}: name of group
					// {session}:    session of day
					if (userName.length == 0) return;
					let { welcomeMessage = getLang("defaultWelcomeMessage") } =
						threadData.data;
					const form = {
						mentions: welcomeMessage.match(/\{userNameTag\}/g) ? mentions : null
					};
					welcomeMessage = welcomeMessage
						.replace(/\{userName\}|\{userNameTag\}/g, userName.join(", "))
						.replace(/\{boxName\}|\{threadName\}/g, threadName)
						.replace(
							/\{multiple\}/g,
							multiple ? getLang("multiple2") : getLang("multiple1")
						)
						.replace(
							/\{session\}/g,
							hours <= 10
								? getLang("session1")
								: hours <= 12
									? getLang("session2")
									: hours <= 18
										? getLang("session3")
										: getLang("session4")
						);

					form.body = welcomeMessage;

					if (threadData.data.welcomeAttachment) {
						const files = threadData.data.welcomeAttachment;
						const attachments = files.reduce((acc, file) => {
							acc.push(drive.getFile(file, "stream"));
							return acc;
						}, []);
						form.attachment = (await Promise.allSettled(attachments))
							.filter(({ status }) => status == "fulfilled")
							.map(({ value }) => value);
					}
					message.send(form);
					delete global.temp.welcomeEvent[threadID];
				}, 1500);
			};
	}
};
	
