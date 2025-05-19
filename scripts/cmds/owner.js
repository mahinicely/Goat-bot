const { GoatWrapper } = require('fca-liane-utils');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
	config: {
		name: "Owner",
		author: "MAHIN",
		role: 0,
		shortDescription: " ",
		longDescription: "",
		category: "admin",
		guide: "{pn}"
	},

	onStart: async function ({ api, event }) {
		try {
			const ownerInfo = {
				name: '𝐌𝐀𝐇𝐈𝐍',
				gender: '𝗠𝗮𝗹𝗲',
				Birthday: '1𝟐-12-2009',
				religion: '𝙄𝙨𝙡𝙖𝙢',
				hobby: '𝐏𝐋𝐀𝐘𝐈𝐍𝐆 𝐆𝐀𝐌𝐄 𝐀𝐋𝐒𝐎 𝐏𝐋𝐀𝐘𝐈𝐍𝐆 𝐆𝐀𝐌𝐄 𝐖𝐈𝐓𝐇 𝐆𝐈𝐑𝐋𝐒',
				Fb: 'https://www.facebook.com/mdmahin.2026cr7wc
				Relationship: '𝙎𝙞𝙣𝙜𝙡𝙚',
				Height: '5"10'
			};

			const bold = 'https://imgur.com/PA1SJH9.mp4';
			const tmpFolderPath = path.join(__dirname, 'tmp');

			if (!fs.existsSync(tmpFolderPath)) {
				fs.mkdirSync(tmpFolderPath);
			}

			const videoResponse = await axios.get(bold, { responseType: 'arraybuffer' });
			const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

			fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

			const response = `
◈ 𝖮𝖶𝖭𝖤𝖱 𝖨𝖭𝖥𝖮𝖱𝖬𝖠𝖳𝖨𝖮𝖭:\n
 ~Name: ${ownerInfo.name}
 ~Gender: ${ownerInfo.gender}
 ~Birthday: ${ownerInfo.Birthday}
 ~Religion: ${ownerInfo.religion}
 ~Relationship: ${ownerInfo.Relationship}
 ~Hobby: ${ownerInfo.hobby}
 ~Fb: ${ownerInfo.Fb}
 ~Height: ${ownerInfo.Height}
			`;

			await api.sendMessage({
				body: response,
				attachment: fs.createReadStream(videoPath)
			}, event.threadID, event.messageID);

			fs.unlinkSync(videoPath);

			api.setMessageReaction('😘', event.messageID, (err) => {}, true);
		} catch (error) {
			console.error('Error in ownerinfo command:', error);
			return api.sendMessage('An error occurred while processing the command.', event.threadID);
		}
	}
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
