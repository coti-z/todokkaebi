import { promises as fs } from 'fs';
import { join } from 'path';

import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import sharp from 'sharp';

/**
 * Image Upload Controller
 *
 * @description
 * Handles image upload, processing (Sharp), and local storage.
 * Minimal implementation without Domain/Application layers.
 */

@Controller('images')
export class ImageUploadController {
  private readonly uploadDir = join(process.cwd(), 'uploads', 'images');
  private readonly maxFileSizeMB = 10;
  private readonly allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

  /**
   * Multipart file upload endpoint
   *
   * @example
   * curl -X POST http://localhost:3000/images/upload \
   *   -F "image=@photo.jpg"
   */
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    // Validation
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Allowed: ${this.allowedMimeTypes.join(', ')}`,
      );
    }

    // Process with Sharp: resize + convert to WebP
    const processedBuffer = await sharp(file.buffer)
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true, // Don't upscale small images
      })
      .webp({ quality: 85 })
      .toBuffer();

    // Generate unique filename
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;

    // Save to local storage
    await this.saveToLocal(filename, processedBuffer);

    return {
      success: true,
      url: `/uploads/images/${filename}`,
      size: processedBuffer.length,
      originalSize: file.size,
    };
  }

  /**
   * Save buffer to local filesystem
   */
  private async saveToLocal(filename: string, buffer: Buffer): Promise<void> {
    // Ensure upload directory exists
    await fs.mkdir(this.uploadDir, { recursive: true });

    const filePath = join(this.uploadDir, filename);
    await fs.writeFile(filePath, buffer);
  }
}
