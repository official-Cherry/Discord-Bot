import { appendUserToSheet } from '../../sheets/sheetSetter.js';
import dotenv from 'dotenv';

dotenv.config();

export async function userHandler(interaction) {

    const certification = interaction.options.getString('certification');   
    const name = interaction.options.getString('name');
    const examDate = interaction.options.getString('exam_date');

    const member = interaction.member;
    const newNickname = certification == '대기' ? 
                        `${certification} | ${name}` : `${certification} | ${name} | ${examDate}`;


    try {
        // Discord 서버에서 해당 자격증 이름과 일치하는 역할 찾기
        const newRole = interaction.guild.roles.cache.find(role => role.name === certification);
        if (!newRole) {
            throw new Error('해당 자격증 역할이 존재하지 않습니다.');
        }

        // 대기 역할 찾기
        const waitingRole = interaction.guild.roles.cache.find(role => role.name === '대기');
        
        // 역할 조작
        const roleOperation = [];

        // 대기역할 부여
        if(certification === '대기') {
            roleOperation.push(member.roles.add(waitingRole));
        }

        else {
            // 대기역할 제거
            if(member.roles.cache.has(waitingRole.id)) {
                roleOperation.push(member.roles.remove(waitingRole));
            }

            // 새로운 자격증 역할 부여
            roleOperation.push(member.roles.add(newRole));
        }

        // 역할 부여, 시트 데이터 업데이트, 닉네임 설정
        await Promise.all([
            ...roleOperation,
            appendUserToSheet(certification, member.user.id, name),
            member.setNickname(newNickname)
        ]);

        interaction.reply({ content: `역할 부여, 시트 데이터 추가, 닉네임 설정을 완료했습니다: ${newNickname}`, ephemeral: true });
    } 
    catch (error) {
        console.error('Error in handleSetNicknameCommand:', error);
        interaction.reply({ content: `에러가 발생했습니다: ${error.message}` });
    }
}
