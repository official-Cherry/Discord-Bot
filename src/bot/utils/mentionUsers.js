import dotenv from 'dotenv';
dotenv.config();

// export async function mentionUsers(client, users, message) {

//     const channel = await client.channels.fetch(process.env.SAA_CHANNEL_ID);
//     const mentionText = users.map(([_, discordId]) => `<@!${discordId}>`).join(' ');
//     await channel.send(`${message} \n${mentionText}`);
//     console.log('mentionUsers done');

// }

export async function mention_Users(client, channelId, users, message) {

    try {
        const channel = await client.channels.fetch(channelId);
        const mentionText = users.map(([_, discordId]) => `<@!${discordId}>`).join(' ');
        await channel.send(`${message} \n${mentionText}`);
        console.log('mentionUsers done');
    }
    catch (error) {
        console.error('Error at mentionUsers', error);
    }

}

