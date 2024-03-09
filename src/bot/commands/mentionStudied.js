import { findUsers } from "../utils/findUsers.js";
import { mention_Users } from "../utils/mentionUsers.js";

export async function mentionStudied(client,interaction) {
    
    const channelName = interaction.channel.name.toUpperCase();
    const channelID = interaction.channel.id;
    const date = interaction.options.getString('date');
    const { loggedUsers, unloggedUsers } = await findUsers(channelName,date);

    if(loggedUsers.length === 0 && unloggedUsers.length === 0) {
        interaction.reply({ content: `${channelName} 을 준비하는 사람이 없습니다.`, ephemeral: true});
    }
    else if (loggedUsers.length > 0) {
        await mention_Users(client, channelID, loggedUsers, `${loggedUsers.length}명, ${date}에 공부를 했습니다!`);
        interaction.reply({ content: '멘션완료', ephemeral: true });
    } else {
        interaction.reply(`${date}에 공부한 사람이 없습니다.`);
    }
}