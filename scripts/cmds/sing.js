const axios = require("axios");

const baseApiUrl = () => 'https://mahmud-sing.onrender.com';

module.exports = {
    config: {
        name: "xing",
        version: "1.7",
        author: "MahMUD",
        countDown: 10,
        role: 0,
        category: "music",
        guide: "{p}sing [query]"
    },

    onStart: async function ({ api, event, args, message }) {
        if (args.length === 0) {
            return message.reply("❌ | Please provide a song name, janu.");
        }

        try {
            const query = encodeURIComponent(args.join(" "));
            const apiUrl = `${baseApiUrl()}/sing?query=${query}`;

            await message.reply("𝐖𝐚𝐢𝐭 𝐤𝐨𝐫𝐨 𝐣𝐚𝐧 <😘");

            const response = await axios.get(apiUrl, {
                responseType: "stream",
                headers: { "author": module.exports.config.author }
            });

            // Check if it's actually a stream or an error message
            if (response.headers['content-type'].includes('application/json')) {
                let errorData = '';
                response.data.on('data', chunk => errorData += chunk);
                response.data.on('end', () => {
                    try {
                        const parsed = JSON.parse(errorData);
                        message.reply(`❌ Error: ${parsed.error || "Unknown error occurred."}`);
                    } catch (err) {
                        message.reply("❌ Error parsing response.");
                    }
                });
                return;
            }

            message.reply({
                body: `✅ Here's your song: ${args.join(" ")}`,
                attachment: response.data
            });

        } catch (error) {
            console.error("Error:", error.message);

            if (error.response) {
                const errMsg = error.response.data?.error || error.response.statusText || error.message;
                return message.reply(`❌ API Error: ${errMsg}`);
            }

            message.reply("❌ An error occurred while processing your request.");
        }
    }
};
