import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
    ListObjectsV2Command,
    HeadObjectCommand,
    CopyObjectCommand,
    ObjectCannedACL,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";
import path from "path";

dotenv.config();

// Types and interfaces
interface S3Config {
    bucketName: string;
    region: string;
    accessKey: string;
    secretAccessKey: string;
}
interface UploadOptions {
    metadata?: Record<string, string>;
    acl?: ObjectCannedACL;
    cacheControl?: string;
}

interface UploadResult {
    success: boolean;
    key?: string;
    location?: string;
    etag?: string;
    message?: string;
    error?: string;
}

interface DownloadResult {
    success: boolean;
    localPath?: string;
    contentType?: string;
    lastModified?: Date;
    contentLength?: number;
    message?: string;
    error?: string;
}

interface BufferResult {
    success: boolean;
    buffer?: Buffer;
    contentType?: string;
    lastModified?: Date;
    contentLength?: number;
    error?: string;
}

interface PresignedUrlResult {
    success: boolean;
    url?: string;
    expiresIn?: number;
    message?: string;
    error?: string;
}

interface DeleteResult {
    success: boolean;
    key?: string;
    message?: string;
    error?: string;
}

interface ExistsResult {
    success: boolean;
    exists?: boolean;
    contentType?: string;
    lastModified?: Date;
    contentLength?: number;
    etag?: string;
    message?: string;
    error?: string;
}

interface ImageInfo {
    key: string;
    lastModified: Date;
    size: number;
    etag: string;
    url: string;
}

interface ListResult {
    success: boolean;
    images?: ImageInfo[];
    count?: number;
    isTruncated?: boolean;
    nextContinuationToken?: string;
    error?: string;
}

interface CopyResult {
    success: boolean;
    sourceKey?: string;
    destinationKey?: string;
    etag?: string;
    message?: string;
    error?: string;
}

interface BatchDeleteResult {
    success: boolean;
    totalProcessed?: number;
    successCount?: number;
    failureCount?: number;
    successful?: DeleteResult[];
    failed?: (string | DeleteResult)[];
    error?: string;
}

// Environment variables
const bucketName: string = process.env.BUCKET_NAME!;
const region: string = process.env.BUCKET_REGION!;
const accessKey: string = process.env.ACCESS_KEY!;
const secretAccessKey: string = process.env.SECRET_ACCESS_KEY!;

// S3 Client configuration
const s3Client = new S3Client({
    region: region,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
});

// Helper function to get file extension
const getExtension = (filePath: string): string => {
    return path.extname(filePath).toLowerCase();
};

// Helper function to get content type based on file extension
const getContentType = (filePath: string): string => {
    const ext = path.extname(filePath).toLowerCase();
    const contentTypes: Record<string, string> = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
        ".webp": "image/webp",
        ".bmp": "image/bmp",
        ".svg": "image/svg+xml",
        ".ico": "image/x-icon",
    };
    return contentTypes[ext] || "application/octet-stream";
};

// Upload image to S3
export const uploadImage = async (
    localFilePath: string,
    s3Key: string,
    options: UploadOptions = {}
): Promise<UploadResult> => {
    try {
        // Check if file exists
        if (!fs.existsSync(localFilePath)) {
            throw new Error(`File not found: ${localFilePath}`);
        }

        // Read file
        const fileContent = fs.readFileSync(localFilePath);
        const contentType = getContentType(localFilePath);

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: s3Key,
            Body: fileContent,
            ContentType: contentType,
            ACL: options.acl || ObjectCannedACL.private, // ObjectCannedACL.public_read for public access
            CacheControl: options.cacheControl || "max-age=31536000",
        });

        const result = await s3Client.send(command);

        return {
            success: true,
            key: s3Key,
            location: `https://${bucketName}.s3.${region}.amazonaws.com/${s3Key}`,
            etag: result.ETag,
            message: "Image uploaded successfully",
        };
    } catch (error) {
        console.error("Error uploading image:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};

// Upload image from buffer (useful for handling multipart uploads)
export const uploadImageFromBuffer = async (
    buffer: Buffer,
    s3Key: string,
    originalName: string,
    options: UploadOptions = {}
): Promise<UploadResult> => {
    try {
        const contentType = getContentType(originalName);
        const extension = getExtension(originalName);
        const finalKey = `${s3Key}${extension}`;

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: finalKey,
            Body: buffer,
            ContentType: contentType,
            ACL: options.acl || ObjectCannedACL.private,
            CacheControl: options.cacheControl || "max-age=31536000",
        });

        const result = await s3Client.send(command);

        return {
            success: true,
            key: finalKey,
            location: `https://${bucketName}.s3.${region}.amazonaws.com/${finalKey}`,
            etag: result.ETag,
            message: "Image uploaded successfully",
        };
    } catch (error) {
        console.error("Error uploading image from buffer:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};

// Download image from S3
export const downloadImage = async (
    s3Key: string,
    localFilePath: string
): Promise<DownloadResult> => {
    try {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: s3Key,
        });

        const result = await s3Client.send(command);

        if (!result.Body) {
            throw new Error("No body in response");
        }

        // Convert stream to buffer
        const chunks: Uint8Array[] = [];
        for await (const chunk of result.Body as any) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);

        // Write to local file
        fs.writeFileSync(localFilePath, buffer);

        return {
            success: true,
            localPath: localFilePath,
            contentType: result.ContentType,
            lastModified: result.LastModified,
            contentLength: result.ContentLength,
            message: "Image downloaded successfully",
        };
    } catch (error) {
        console.error("Error downloading image:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};

// Get image as buffer (useful for processing without saving to disk)
export const getImageBuffer = async (s3Key: string): Promise<BufferResult> => {
    try {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: s3Key,
        });

        const result = await s3Client.send(command);

        if (!result.Body) {
            throw new Error("No body in response");
        }

        // Convert stream to buffer
        const chunks: Uint8Array[] = [];
        for await (const chunk of result.Body as any) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);

        return {
            success: true,
            buffer: buffer,
            contentType: result.ContentType,
            lastModified: result.LastModified,
            contentLength: result.ContentLength,
        };
    } catch (error) {
        console.error("Error getting image buffer:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};

// Generate presigned URL for image access
export const getPresignedUrl = async (
    s3Key: string,
    operation: "getObject" | "putObject" = "getObject",
    expiresIn: number = 3600
): Promise<PresignedUrlResult> => {
    try {
        let command;

        if (operation === "getObject") {
            command = new GetObjectCommand({
                Bucket: bucketName,
                Key: s3Key,
            });
        } else if (operation === "putObject") {
            command = new PutObjectCommand({
                Bucket: bucketName,
                Key: s3Key,
            });
        } else {
            throw new Error(
                'Invalid operation. Use "getObject" or "putObject"'
            );
        }

        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });

        return {
            success: true,
            url: signedUrl,
            expiresIn: expiresIn,
            message: "Presigned URL generated successfully",
        };
    } catch (error) {
        console.error("Error generating presigned URL:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};

// Delete image from S3
export const deleteImage = async (s3Key: string): Promise<DeleteResult> => {
    try {
        const command = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: s3Key,
        });

        await s3Client.send(command);

        return {
            success: true,
            key: s3Key,
            message: "Image deleted successfully",
        };
    } catch (error) {
        console.error("Error deleting image:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};

// Check if image exists in S3
export const imageExists = async (s3Key: string): Promise<ExistsResult> => {
    try {
        const command = new HeadObjectCommand({
            Bucket: bucketName,
            Key: s3Key,
        });

        const result = await s3Client.send(command);

        return {
            success: true,
            exists: true,
            contentType: result.ContentType,
            lastModified: result.LastModified,
            contentLength: result.ContentLength,
            etag: result.ETag,
        };
    } catch (error: any) {
        if (error.name === "NotFound") {
            return {
                success: true,
                exists: false,
                message: "Image not found",
            };
        }

        console.error("Error checking image existence:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};

// List images in a specific folder/prefix
export const listImages = async (
    prefix: string = "",
    maxKeys: number = 100
): Promise<ListResult> => {
    try {
        const command = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: prefix,
            MaxKeys: maxKeys,
        });

        const result = await s3Client.send(command);

        const images: ImageInfo[] =
            result.Contents?.map((obj) => ({
                key: obj.Key!,
                lastModified: obj.LastModified!,
                size: obj.Size!,
                etag: obj.ETag!,
                url: `https://${bucketName}.s3.${region}.amazonaws.com/${obj.Key}`,
            })) || [];

        return {
            success: true,
            images: images,
            count: images.length,
            isTruncated: result.IsTruncated,
            nextContinuationToken: result.NextContinuationToken,
        };
    } catch (error) {
        console.error("Error listing images:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};
// Copy image within S3 (useful for creating thumbnails or backups)
export const copyImage = async (
    sourceKey: string,
    destinationKey: string
): Promise<CopyResult> => {
    try {
        const command = new CopyObjectCommand({
            Bucket: bucketName,
            Key: destinationKey,
            CopySource: `${bucketName}/${sourceKey}`,
        });

        const result = await s3Client.send(command);

        return {
            success: true,
            sourceKey: sourceKey,
            destinationKey: destinationKey,
            message: "Image copied successfully",
        };
    } catch (error) {
        console.error("Error copying image:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};

// Batch delete images
export const deleteImages = async (
    s3Keys: string[]
): Promise<BatchDeleteResult> => {
    try {
        const results = await Promise.allSettled(
            s3Keys.map((key) => deleteImage(key))
        );

        const successful = results.filter(
            (r): r is PromiseFulfilledResult<DeleteResult> =>
                r.status === "fulfilled" && r.value.success
        );
        const failed = results.filter(
            (
                r
            ): r is
                | PromiseRejectedResult
                | PromiseFulfilledResult<DeleteResult> =>
                r.status === "rejected" ||
                (r.status === "fulfilled" && !r.value.success)
        );

        return {
            success: true,
            totalProcessed: s3Keys.length,
            successCount: successful.length,
            failureCount: failed.length,
            successful: successful.map((r) => r.value),
            failed: failed.map((r) =>
                r.status === "rejected" ? r.reason : r.value
            ),
        };
    } catch (error) {
        console.error("Error batch deleting images:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};

// Generate a unique filename for uploads
export const generateUniqueFileName = (originalName: string): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const ext = path.extname(originalName);
    const nameWithoutExt = path.basename(originalName, ext);

    return `${nameWithoutExt}_${timestamp}_${random}${ext}`;
};

// Example usage functions
export const exampleUsage = (): void => {
    console.log(`
Example Usage:

// Upload an image
const uploadResult = await uploadImage('/path/to/local/image.jpg', 'uploads/image.jpg');

// Download an image
const downloadResult = await downloadImage('uploads/image.jpg', '/path/to/save/image.jpg');

// Generate presigned URL (for direct browser uploads)
const urlResult = await getPresignedUrl('uploads/image.jpg', 'getObject', 3600);

// Delete an image
const deleteResult = await deleteImage('uploads/image.jpg');

// Check if image exists
const existsResult = await imageExists('uploads/image.jpg');

// List images in folder
const listResult = await listImages('uploads/', 50);

// Upload from buffer (useful with Express multer)
const bufferResult = await uploadImageFromBuffer(buffer, 'uploads/image.jpg', 'original.jpg');
    `);
};
