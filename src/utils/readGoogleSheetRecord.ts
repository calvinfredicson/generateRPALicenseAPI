import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet'
import { getSpreadsheet, initializeAuth } from './googleSheet'
import { GenerateLicenseParameters } from '@/pages/api/generateLicense'

function convertSpreadsheetToList(spreadsheet: GoogleSpreadsheetRow<Record<string, any>>[]) {
    const rowList: GenerateLicenseParameters[] = []
    spreadsheet.forEach(row => {
        rowList.push(row.toObject() as GenerateLicenseParameters)
    })
    return rowList
}

async function readGoogleSheetRecord(sheetName: string) {
    const doc = initializeAuth()

    // loads document properties and worksheets
    await doc.loadInfo()

    const sheet = getSpreadsheet(doc)[sheetName]
    const rows = await sheet.getRows()
    const googleSheetRowList = convertSpreadsheetToList(rows)
    return googleSheetRowList
}

export default readGoogleSheetRecord
