import dotenv from 'dotenv';
import schedule from 'node-schedule';
import { findUsers } from '../bot/utils/findUsers.js';
import { mention_Users } from '../bot/utils/mentionUsers.js';

dotenv.config();

export function setupScheduler(client,channelMap) {

    schedule.scheduleJob('00 21 * * *', async () => { // minute hour day month dayOfWeek

        const now = new Date();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const date = `${month}/${day}`; 

        console.log('Scheduler is running at', now);

        for(let [channelName, channelId] of channelMap) {
            try {
                const channel = client.channels.cache.get(channelId);
                //console.log(channelName,channel);
                if(!channel) {
                    console.log(`${channelName} 채널을 찾을 수 없습니다.`);
                    continue;
                }

                const { unloggedUsers } = await findUsers(channelName, date);
                //console.log(unloggedUsers);

                if(unloggedUsers.length > 0) {
                    await mention_Users(client, channelId, unloggedUsers, '오늘의 공부 기록을 잊지 마세요!');
                }
            }
            catch (error) {
                console.error(`Error processing channel ${channelName}:`, error);
            }
        };
    });
}
