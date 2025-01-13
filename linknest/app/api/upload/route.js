// pages/api/upload.js
import AWS from 'aws-sdk';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Configure AWS SDK
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Function to handle file upload
export const config = {
    api: {
        bodyParser: false, // Disable the default body parser
    },
};

// export default async function handler(req, res) {
export async function POST(request) {
    // if (request.method === 'POST') {
    try {
        const form = new formidable.IncomingForm({
            uploadDir: path.join(process.cwd(), 'tmp'),
            keepExtensions: true,
        });

        form.parse(request, async (err, fields, files) => {
            if (err) {
                console.error('Error parsing form:', err);
                return res.status(500).json({ message: 'Error parsing form' });
            }

            const file = files.pic?.[0];
            if (!file) {
                return res.status(400).json({ message: 'No file provided' });
            }

            const fileStream = fs.createReadStream(file.filepath);
            const uploadParams = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: `profile-pics/${file.originalFilename}`,
                Body: fileStream,
                ContentType: file.mimetype,
            };

            try {
                const s3Response = await s3.upload(uploadParams).promise();
                fs.unlinkSync(file.filepath); // Clean up the temporary file
                const imageUrl = `https://${process.env.CLOUDFRONT_DOMAIN}/profile-pics/${file.originalFilename}`;
                res.status(200).json({ message: 'File uploaded successfully', imageUrl: imageUrl });
                // res.status(200).json({ message: 'File uploaded successfully', imageUrl: s3Response.Location });
            } catch (error) {
                console.error('Error uploading to S3:', error);
                res.status(500).json({ message: 'Error uploading to S3' });
            }
        });
    } catch (e) {
        res.status(405).json({ message: 'Method not allowed', e });
    }
}

