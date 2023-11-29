import { GenerateLicenseParameters } from '@/pages/api/generateLicense'

async function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time * 1000))
}

function generateGenerateLicenseCommandString({ uid, licenseType, productType, expiryDate }: GenerateLicenseParameters) {
  return `/cicd run license_generate -expiredDate ${expiryDate} -licenseType ${licenseType} -productType ${productType} -uid ${uid}`
}



export { delay, generateGenerateLicenseCommandString }