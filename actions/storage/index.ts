'use server'

import { v2 as cloudinary } from 'cloudinary';

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function getSignature() {
  const timestamp = Math.round(new Date().getTime() / 1000)

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: 'next' },
    cloudinaryConfig.api_secret!
  )

  return { timestamp, signature }
}


export async function saveToDatabase({ public_id, version, signature } : {
  public_id: string,
  version: string,
  signature: string
}) {
  const expectedSignature = cloudinary.utils.api_sign_request(
    { public_id, version },
    cloudinaryConfig.api_secret!
  )

  if (expectedSignature === signature) {
    console.log({ public_id })
  }
}