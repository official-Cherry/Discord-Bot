import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

export async function registerCommands() {

    /* command list */
    const commands = [
        // Command #1 
        // /studylog - name, date, content
        {
            name: 'studylog',
            description: '공부 내용 기록하기',
            options: [
                {
                    name: 'name',
                    type: 3,
                    description: '이름을 입력하세요 예시) 정태환',
                    required: true,
                },
                {
                    name: 'date',
                    type: 3,
                    description: '날짜를 입력하세요 예시) 1/29',
                    required: true,
                },
                {
                    name: 'content',
                    type: 3,
                    description: '공부한 내용을 입력하세요 예시) aws lambda 에 대해 공부',
                    required: true,
                },
            ],
        },
        // Command #2
        // /studycheck - 'List up who did not log their study on a specific date
        {
            name: 'studycheck',
            description: '공부를 기록하지 않은 사람들 보기',
            options: [
                {
                    name: 'date',
                    type: 3,
                    description: '확인하고 싶은 날짜 예시) 1/29',
                    required: true,
                },
            ]
        },
        // Command #3
        // /mentionstudied
        {
            name: 'mentionstudied',
            description: '공부한 사람 멘션하기',
            options: [
                {
                    name: 'date',
                    type: 3,
                    description: '확인하고 싶은 날짜 예시) 1/29',
                    required: true,
                },
            ]
        },
        // Command #4
        // /mentionnotstudied
        {
            name: 'mentionnotstudied',
            description: '공부 안 한 사람 멘션하기',
            options: [
                {
                    name: 'date',
                    type: 3,
                    description: '확인하고 싶은 날짜 예시) 1/29',
                    required: true,
                },
            ]
        },
        // Command #5
        // /setnickname
        {
            name: 'setnickname',
            description: '자격증종류/이름/날짜 순으로 닉네임을 지정',
            options: [
                {
                    name: 'certification',
                    type: 3,
                    description: '자격증 종류 - 대문자 입력 예시) SAA ; 대기 상태일 경우 예시) 대기',
                    required: true,
                },
                {
                    name: 'name',
                    type: 3,
                    description: '이름 예시) 이채리',
                    required: true,
                },
                {
                    name: 'exam_date',
                    type: 3,
                    description: '시험날짜 예시) 0227 ; 대기 상태일 경우 예시) 0000',
                    required: true,
                },
            ]
        } 
        // Add more commands here
    ];
    
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);
    
    /* register */
    try {
        console.log('Started refreshing application (/) commands.');
    
        await rest.put(
          Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID),
          { body: commands }
        );
    
        console.log('Successfully reloaded application (/) commands.');
    } 
    catch (error) {
        console.error(error);
    }

}


