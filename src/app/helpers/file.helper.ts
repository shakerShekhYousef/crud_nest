import * as path from "path";
import { Injectable } from "@nestjs/common";
import { createReadStream, createWriteStream } from "fs";

@Injectable()
export class FileHelper {
  public store(file: Express.Multer.File): string {
    const fileExtension = path.extname(file.originalname);
    const url = `public/uploads/${file.filename}${fileExtension}`;
    const writeStream = createWriteStream(url);
    createReadStream(file.path).pipe(writeStream);
    const url_store = `/uploads/${file.filename}${fileExtension}`;
    return url_store;
  }
}
