import { GenerateLicenseParameters } from '@/pages/api/generateLicense'
import { getGoogleSheetRow, getSpreadsheet, initializeAuth } from './googleSheet'
import readGoogleSheetRecord from './readGoogleSheetRecord'


async function writeGoogleSheetRecord(sheetName: string, licenseParameter: GenerateLicenseParameters) {
  const doc = initializeAuth()

  // loads document properties and worksheets
  await doc.loadInfo()

  const sheet = getSpreadsheet(doc)[sheetName]
  await sheet.addRow(licenseParameter as unknown as Record<string, string>)
  const googleSheetTable = await readGoogleSheetRecord(sheetName)

  // check record updated
  while (true) {
    const newRecordFound = getGoogleSheetRow(googleSheetTable, licenseParameter["uid"])
    if (newRecordFound !== undefined) return
  }
}

export default writeGoogleSheetRecord