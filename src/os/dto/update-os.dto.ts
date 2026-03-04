import { PartialType } from '@nestjs/mapped-types';
import { CreateOsDto } from './create-os.dto';

export class UpdateOsDto extends PartialType(CreateOsDto) {}
