import { google } from 'googleapis';
import { authenticateSheets } from './sheetAuth.js';
import  dotenv  from 'dotenv';

dotenv.config();

// 자격증별 명단을 가져오는 함수
export async function getFullList(certification) {

    try {
      const authClient = await authenticateSheets();
      const sheets = google.sheets({ version: 'v4', auth: authClient });
  
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
        range: `명단!A:C`, 
      });
  
      let fullList = response.data.values || [];

      if(certification == '일반') {
        fullList = fullList.filter(row => row[2] != '대기');
      }
      else {
        fullList = fullList.filter(row => row[2] == certification);
      }

      return fullList;
    } 
    catch (error) {
      console.error('The API returned an error: ' + error);
      throw error;
    }
  }