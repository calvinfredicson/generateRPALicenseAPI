import { JWT } from 'google-auth-library'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import readGoogleSheetRecord from '../readGoogleSheetRecord'
import { GenerateLicenseParameters } from '@/pages/api/generateLicense'

function initializeAuth() {
  // Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
  const serviceAccountAuth = new JWT({
    // env var values here are copied from service account credentials generated by google
    // see "Authentication" section in docs for more info
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  })
  const googleSheetId = "10KMr8bbUyMig7rXGE5b03DmDD7BOxGRVkdKJA6PzbNg"
  const doc = new GoogleSpreadsheet(googleSheetId, serviceAccountAuth)
  return doc
}

function getSpreadsheet(doc: GoogleSpreadsheet) {
  return doc.sheetsByTitle
}

function getGoogleSheetRow(rowList: GenerateLicenseParameters[], uid: GenerateLicenseParameters["uid"]) {
  const foundRow = rowList.find(row => row.uid == uid)
  return foundRow
}

export { initializeAuth, getSpreadsheet, getGoogleSheetRow }