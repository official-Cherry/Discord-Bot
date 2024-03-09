import { appendDataToSheet } from '../../sheets/sheetSetter.js';

// client 의 공부 로깅 명령어 처리
export async function studyLogger(interaction) {
    
    // 인터랙션에서 데이터 추출
    const channelName = interaction.channel.name.toUpperCase(); 
    
    // 일반 채널에서는 공부 기록을 남길 수 없도록 함
    if (channelName == '일반') {
        interaction.reply({ content: '일반 채널에서는 공부 기록을 남길 수 없습니다.', ephemeral: true });
        return;
    }

    const userName = interaction.options.getString('name');
    const studyDate = interaction.options.getString('date');
    const studyContent = interaction.options.getString('content');
    
    // 구글 시트에 로그 기록
    try {
        appendDataToSheet(channelName, userName, studyDate, studyContent);
        interaction.reply({ content: '공부 내용이 기록되었습니다.', ephemeral: true });
    } 
    catch (error) {
        console.error('Google Sheets API Error:', error);
        interaction.reply({ content: '공부 내용 기록 중 오류가 발생했습니다.', ephemeral: true });
    }
}