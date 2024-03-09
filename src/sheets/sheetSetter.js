/* input data 를 sheet 에 추가 */
import { google } from 'googleapis';    
import { authenticateSheets } from './sheetAuth.js';

// "공부체크" Google Sheets 에 데이터 추가
export async function appendDataToSheet(certification,userName,date,content) {
    
    const authClient = await authenticateSheets();
    const sheets = google.sheets({ version: 'v4', auth: authClient });
    
    const range = `공부체크!A:D`

    sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
        range: range,
        valueInputOption: 'USER_ENTERED',   
        resource: {
            values: [
                [userName, date, certification, content]
            ],
        },
    });
}

// Google Sheets 에 이름과 ID 자격증 추가 
export async function appendUserToSheet(certification, userId, name) {
    const authClient = await authenticateSheets();
    const sheets = google.sheets({ version : 'v4', auth: authClient });

    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    const range = `명단`;

    try {
        const existingList = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const rows = existingList.data.values;
        const rowIndex = rows.findIndex(row => row[1] == userId);

        // 이미 있는 경우 - update
        if(rowIndex !== -1) {
            sheets.spreadsheets.values.update({
                spreadsheetId,
                range: `${range}!C${rowIndex + 1}`,
                valueInputOption: 'USER_ENTERED',
                resource: {
                    values: [
                        [certification],
                    ],
                },
            });
        }
        // 없는 경우 - append
        else {
            sheets.spreadsheets.values.append({
                spreadsheetId,
                range: range,
                valueInputOption: 'USER_ENTERED',
                resource:{
                    values: [
                        [name, userId, certification],
                    ],
                },
            });
        }

    }
    catch (error) {
        console.error('Error updating the sheet: ', error);
    }
}