import { readGoogleSheetRecord } from '.'
import { getGoogleSheetRow } from './googleSheet'
import delay from './util'

async function getLicenseString(uid: string, googleSheetSheetName: string) {
  while (true) {
    const googleSheetTable = await readGoogleSheetRecord(googleSheetSheetName)
    await delay(20)
    const matchRow = getGoogleSheetRow(googleSheetTable, uid)

    // check if matchRow is found
    if (!matchRow) throw new Error("UID record not found, please check the google sheet record")

    const licenseString = matchRow.licenseString || ""
    if (licenseString.length > 0) {
      return licenseString
    }
  }
}

export default getLicenseString