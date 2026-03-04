import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { OsService } from './os.service';
import { CreateOsDto } from './dto/create-os.dto';
import { UpdateOsDto } from './dto/update-os.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('os')
@UseGuards(JwtAuthGuard)
export class OsController {
  constructor(private readonly osService: OsService) {}

  @Post()
  create(@Body(ValidationPipe) createOsDto: CreateOsDto, @Request() req) {
    return this.osService.create(createOsDto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.osService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.osService.findOne(id);
  }

  @Get('sequential/:sequentialId')
  findBySequentialId(@Param('sequentialId') sequentialId: string) {
    return this.osService.findBySequentialId(parseInt(sequentialId));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateOsDto: UpdateOsDto,
  ) {
    return this.osService.update(id, updateOsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.osService.remove(id);
  }
}
