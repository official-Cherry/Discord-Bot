/* google sheet API 연동 */ 
import { google } from 'googleapis';

// 구글 시트 API 인증
export async function authenticateSheets() {
    const auth = new google.auth.GoogleAuth({
        keyFile: '/home/cert/Discord-Bot/discord_bot_key.json', // 구글 서비스 계정 키 파일의 경로
        // keyFile: '../discord_bot_key.json', // 구글 서비스 계정 키 파일의 경로 (채리가 테스트할 때 필요)
        scopes: ['https://www.googleapis.com/auth/spreadsheets'], 
    });

    const authClient = await auth.getClient();
    return authClient;
};
