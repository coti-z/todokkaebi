import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import sharp from 'sharp';

/**
 * Image Upload Service
 *
 * @description
 * Application Layer - image upload
 */

@Controller('images')
export class ImageUploadController {
  // 방법 1: base64 업로드
  @Post('upload/base64')
  async uploadBase64(@Body('image') base64Image: string) {
    // base64 → Buffer 변환
    const buffer = Buffer.from(
      base64Image.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );

    return this.processImage(buffer);
  }

  // 방법 2: Multipart 업로드
  @Post('upload/file')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.processImage(file.buffer);
  }

  // 통합 이미지 처리 메서드
  private async processImage(buffer: Buffer) {
    const processed = await sharp(buffer)
      .resize(800, 600, { fit: 'inside' })
      .webp({ quality: 80 })
      .toBuffer();

    // S3/로컬 저장 로직
    const filename = `${Date.now()}.webp`;
    await this.saveToStorage(filename, processed);

    return { url: `/images/${filename}` };
  }

  private async saveToLocalStorage(
    filename: string,
    buffer: Buffer,
  ): Promise<string> {
    const uploadDir = join(process.cwd(), 'uploads', 'images');

    // 디렉토리 생성 (없으면)
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    return `/uploads/images/${filename}`; // 접근 가능한 URL 반환
  }

  private async saveToS3(filename: string, buffer: Buffer): Promise<string> {
    const s3Client = new S3Client({ region: 'ap-northeast-2' });

    const command = new PutObjectCommand({
      Bucket: 'your-bucket-name',
      Key: `images/${filename}`,
      Body: buffer,
      ContentType: 'image/webp', // Sharp에서 변환한 포맷
      ACL: 'public-read', // 또는 CloudFront 사용
    });

    await s3Client.send(command);

    return `https://your-bucket.s3.amazonaws.com/images/${filename}`;
  }
}
