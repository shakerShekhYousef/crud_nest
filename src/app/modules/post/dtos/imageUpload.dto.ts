import { IsNotEmpty, IsString } from 'class-validator';
import { IsImage } from '../../../decorators/isImage.decorator';

export class ImageUploadDto {
  @IsNotEmpty()
  @IsString()
  filename: string;

  @IsNotEmpty()
  @IsImage()
  mimetype: string;

  @IsNotEmpty()
  encoding: string;

  @IsNotEmpty()
  buffer: Buffer;
}