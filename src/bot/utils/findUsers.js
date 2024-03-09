import { google } from 'googleapis';  
import { authenticateSheets } from '../../sheets/sheetAuth.js';
import { getFullList } from '../../sheets/sheetGetter.js';
import  dotenv  from 'dotenv';

dotenv.config();

export async function findUsers(certification,date) {
    
    const authClient = await authenticateSheets();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    const fullList = await getFullList(certification);

    if(fullList.length === 0) {
      return {unloggedUsers: [], loggedUsers: []};
    }

    const unloggedUsers = [];
    const loggedUsers = [];
  
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
        range: `공부체크!A:C`,
      });
  
      // 일반 채널 (null) 과 자격증 채널 (certification) 의 데이터를 구분하여 가져옴
      const entries = certification !== '일반' ?
        response.data.values.filter(row => row[1] == date && row[2] == certification) :
        response.data.values.filter(row => row[1] == date);
      
      fullList.forEach(([name,discordID]) => {

        if(!entries.some(entry => entry[0] == name)) {
          unloggedUsers.push([name,discordID]);
        }

        else {
          loggedUsers.push([name,discordID]);
        }

      });

      return {unloggedUsers, loggedUsers};
    } 
    catch (error) {
      console.error('Error at find Users', error);
      return { unloggedUsers: [], loggedUsers: [] };
    }
  }

