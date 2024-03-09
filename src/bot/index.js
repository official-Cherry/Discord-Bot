/* 디스코드 봇 초기화 및 로그인 */
import dotenv from 'dotenv';
import { ChannelType, Client, GatewayIntentBits, } from 'discord.js';

import { registerCommands } from './commands/registerCommands.js'; // 명령어 등록
import { studyLogger } from './commands/studyLogger.js'; // 공부 로깅 명령어 처리 
import { studyChecker } from './commands/studyChecker.js'; // 공부 체크 명령어 처리
import { mentionNotStudied } from './commands/mentionNotStudied.js'; // 공부 안한 사람 멘션
import { mentionStudied } from './commands/mentionStudied.js'; // 공부 한 사람 멘션
import { userHandler } from './commands/userHandler.js';

import { setupScheduler } from '../scheduler/reminderScheduler.js'; // 10시 스케줄러 설정

dotenv.config();

const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;

// client 객체 초기화
const client = new Client({ intents: [Guilds, GuildMessages, MessageContent] });

// client ready 
client.once('ready', async() => {

    try {
        
        const channelMap = new Map();
    
        // 서버 ID 로 서버 가져오기
        const guild = client.guilds.cache.get(process.env.DISCORD_GUILD_ID);
        if(!guild) return console.log('No guild found!');
        
        console.log(client.user.tag + ' is ready! ');
    
        const waitingRoomId = process.env.DISCORD_WAITING_ROOM;
        
        // 서버의 채널을 순회, 채널 이름과 ID 매핑 
        guild.channels.cache.forEach(channel => {
            console.log(`Checking channel : ${channel.name}`);
            if(channel.type === ChannelType.GuildText && channel.id !== waitingRoomId) {
                // console.log(channel.name,channel.id);
                channelMap.set(channel.name.toUpperCase(), channel.id);
            }
        });

        // console.log(channelMap);
    
        // 명령어 등록
        await registerCommands();
    
        // 스케줄러 설정
        setupScheduler(client,channelMap); 
    }
    catch (error) {
        console.log(error);
    }

});

// client interaction create (/command)
client.on('interactionCreate', async interaction => {
    
    // 명령어가 아닌 경우 무시
    if(!interaction.isCommand()) return;
    
    const { commandName } = interaction;
    
    // studylog
    if(commandName === 'studylog') {    
        await studyLogger(interaction);
    }

    // studycheck
    if(commandName === 'studycheck') {
        await studyChecker(interaction);
    }

    // mentionStudied
    if(commandName === 'mentionstudied') {
        await mentionStudied(client,interaction);
    }

    // mentionNotStudied
    if(commandName === 'mentionnotstudied') {
        await mentionNotStudied(client,interaction);
    }

    // setnickname
    if(commandName === 'setnickname') {
        await userHandler(interaction);
    }

});

// client login
client.login(process.env.DISCORD_BOT_TOKEN);