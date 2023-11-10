// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getLicenseString, writeGoogleSheetRecord } from '@/utils'
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
  const { uid, ...licenseParameter } = req.body
  const googleSheetSheetName = "Record"
  try {
    writeGoogleSheetRecord(googleSheetSheetName, { uid, ...licenseParameter })
    const licenseString = await getLicenseString(uid, googleSheetSheetName)
    res.status(200).json({ licenseString: licenseString })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "internal server error" })
  }
}
