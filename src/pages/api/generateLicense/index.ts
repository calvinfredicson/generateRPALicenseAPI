import { writeGoogleSheetRecord } from '@/utils'
import { generateGenerateLicenseCommandString } from '@/utils/util'
import type { NextApiRequest, NextApiResponse } from 'next'

export interface GenerateLicenseParameters {
  uid: string,
  licenseType: string,
  productType: string,
  expiryDate: string,
  licenseString?: string
}

interface Response {
  licenseString?: string,
  message?: string
}

interface _NextApiRequest extends NextApiRequest {
  body: GenerateLicenseParameters
}

export default async function handler(req: _NextApiRequest, res: NextApiResponse<Response>
) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
  const licenseParameter = req.body
  const googleSheetSheetName = "Record"
  try {
    writeGoogleSheetRecord(googleSheetSheetName, licenseParameter)
    const generateLicenseCommandString = generateGenerateLicenseCommandString(licenseParameter)
    res.status(200).json({ licenseString: generateLicenseCommandString })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "internal server error" })
  }
}
