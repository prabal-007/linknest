// pages/api/upload.js


import { Upload } from '@aws-sdk/lib-storage';
import { S3 } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

// Configure AWS SDK
const s3 = new S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION,
    requestTimeout: 300000,
});

// Function to handle file upload
export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req) {
    if (req.method !== 'POST') {
        return NextResponse.json(
            { success: false, error: true, message: 'Method not allowed' },
            { status: 405 }
        );
    }

    try {
        const formData = await req.formData();
        
        const file = formData.get('pic');

        if (!file) {
            return NextResponse.json(
                { success: false, error: true, message: 'No file provided' },
                { status: 400 }
            );
        }

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/svg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { success: false, error: true, message: 'Invalid file type. Only JPEG, PNG and WebP are allowed.' },
                { status: 400 }
            );
        }

        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            return NextResponse.json(
                { success: false, error: true, message: 'File too large. Maximum size is 5MB.' },
                { status: 400 }
            );
        }

        const fileExtension = file.name.split('.').pop().toLowerCase();
        const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `profile-pics/${uniqueFilename}`,
            Body: buffer,
            ContentType: file.type,
        };

        try {
            const s3Response = await new Upload({
                client: s3,
                params: uploadParams,
                queueSize: 4,
            }).done();

            const imageUrl = `https://${process.env.CLOUDFRONT_DOMAIN}/profile-pics/${uniqueFilename}`;
            return NextResponse.json(
                { success: true, error: false, message: 'File uploaded successfully', imageUrl },
                { status: 200 }
            );
        } catch (error) {
            console.error('Error uploading to S3:', error);

            return NextResponse.json(
                { success: false, error: true, message: 'Error uploading to S3' },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Error parsing form:', error);
        return NextResponse.json(
            { success: false, error: true, message: 'Error parsing form' },
            { status: 500 }
        );
    }
}