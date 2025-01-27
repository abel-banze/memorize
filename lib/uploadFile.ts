'use server'

import { getSignature } from "@/actions/storage";

// Maximum file sizes in bytes
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;  // 10MB

export async function uploadFile({form} : {
    form: FormData,
}) {
    try {
        const { signature, timestamp } = await getSignature();
        const file = form.get('file') as unknown as File;
        
        // Check file type and size
        const isVideo = file.type.startsWith('video/');
        const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
        
        if (file.size > maxSize) {
            throw new Error(
                `File size (${(file.size / (1024 * 1024)).toFixed(2)}MB) exceeds maximum allowed size of ${(maxSize / (1024 * 1024))}MB`
            );
        }

        // For large videos, we might want to use chunk upload
        const uploadURL = isVideo 
            ? "https://api.cloudinary.com/v1_1/dwczfh58t/video/upload"
            : "https://api.cloudinary.com/v1_1/dwczfh58t/image/upload";

        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', process.env.CLOUDINARY_API!);
        formData.append('signature', signature);
        formData.append('timestamp', timestamp.toString());
        formData.append('folder', 'next');

        // Add chunked upload parameters for large files
        if (isVideo) {
            formData.append('chunk_size', '6000000'); // 6MB chunks
            formData.append('resource_type', 'video');
        }

        const response = await fetch(uploadURL, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Upload error:', errorText);
            throw new Error(`Upload failed: ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        return data.secure_url;

    } catch (error: any) {
        console.error('Upload error:', error.message);
        throw error;
    }
}