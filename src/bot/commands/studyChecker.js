import { findUsers } from '../utils/findUsers.js';

export async function studyChecker(interaction) {
    
    const channelName = interaction.channel.name.toUpperCase(); 
    const date = interaction.options.getString('date'); // 사용자가 입력한 날짜
    const { loggedUsers, unloggedUsers } = await findUsers(channelName,date);

    if(loggedUsers.length === 0 && unloggedUsers.length === 0) {
        interaction.reply({ content: `${channelName} 을 준비하는 사람이 없습니다.`, ephemeral: true});
    }
    else if(unloggedUsers.length > 0) {
        const nameList = unloggedUsers.map(([name,_]) => name).join(', ');
        interaction.reply(`다음 스터디원들(${unloggedUsers.length}명)은 ${date}에 공부 기록이 없습니다:\n\n${nameList}`);
    }
    else{
        interaction.reply(`${date}에는 모두 공부를 했어요!`);
    }
    
}
