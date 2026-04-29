import * as fs from 'fs';
import * as path from 'path';
import { expect } from '@playwright/test';

export class ImageStorageService {
  private static readonly IMAGES_DIR = path.join(__dirname, '../../../test-images');

  static async saveImage(buffer: Buffer, imageUrl: string): Promise<string> {
    if (!fs.existsSync(this.IMAGES_DIR)) {
      fs.mkdirSync(this.IMAGES_DIR, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const ext = imageUrl.split('.').pop()?.split('?')[0] || 'jpg';
    const fileName = `dog-image-${timestamp}.${ext}`;
    const filePath = path.join(this.IMAGES_DIR, fileName);

    fs.writeFileSync(filePath, buffer);
    expect(fs.existsSync(filePath)).toBeTruthy();

    return fileName;
  }
}
