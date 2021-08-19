import * as AWS from 'aws-sdk';
import { Injectable } from '@nestjs/common';
@Injectable()
export class AwsS3 {
    AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
    s3 = new AWS.S3
    ({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_KEY_SECRET,
    });

    async uploadFile(file) {
        const response= await this.s3_upload(file.buffer, this.AWS_S3_BUCKET, file.originalname, file.mimetype);
        return response.Location
    }

    // eslint-disable-next-line @typescript-eslint/camelcase
    async s3_upload(file, bucket, name, mimetype) {
        const randomName= Math.random()*1000000*Math.random()*10000+1
        const params =
            {
                Bucket: bucket,
                Key: String(randomName),
                Body: file,
                ACL: "public-read",
                ContentType: mimetype,
                ContentDisposition: "inline",
                CreateBucketConfiguration:
                    {
                        LocationConstraint: "ap-south-1"
                    }
            };
        try {
            return await this.s3.upload(params).promise();
        }
        catch (e) {
            return e
        }
    }
}
