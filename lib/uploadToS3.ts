import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";

export async function uploadFileS3(file: File): Promise<{ file_key: string; file_name: string; file_url: string }> {
    try {
        const s3 = new S3({
            region: process.env.NEXT_PUBLIC_AWS_REGION,                 
            credentials: {
                accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!
            },
        });
        
        const file_key = 'uploads/' + Date.now().toString() + '-' + file.name.replace(/\s/g, '-');

        // Convert File to ArrayBuffer
        const fileBuffer = await file.arrayBuffer();

        const params = {
            Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME!,
            Key: file_key,
            Body: Buffer.from(fileBuffer),
            ContentType: file.type,
        };

        // Use the modern command pattern
        const command = new PutObjectCommand(params);
        await s3.send(command);

        return {
            file_key,
            file_name: file.name,
            file_url: getS3Url(file_key)
        };

    } catch(error) {
        console.error('Error uploading file to S3:', error);
        throw error;
    }
}

export function getS3Url(file_key: string) {
    const url = `https://${process.env.NEXT_PUBLIC_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${file_key}`;
    return url;
}