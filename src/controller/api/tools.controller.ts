import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveFile } from '../../utils';
import { join } from 'path';
import { ErrorModel, SuccessModel } from '../../model/ResModel';
import { uploadFileError } from 'src/model/errorInfo';

@Controller('tools')
export class ToolsController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    try {
      const src = join(__dirname, '..', '..', '..', 'assets');
      const result = await saveFile(src, file);
      return new SuccessModel(result);
    } catch {
      return new ErrorModel(uploadFileError.status, uploadFileError.msg);
    }
  }
}
