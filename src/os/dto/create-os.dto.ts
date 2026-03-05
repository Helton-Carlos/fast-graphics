import {
  IsEnum,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsDateString,
  IsUUID,
  Min,
} from 'class-validator';
import { ServiceType } from '../enums/service-type.enum';

export class CreateOsDto {
  @IsEnum(ServiceType)
  @IsNotEmpty()
  serviceType: ServiceType;

  @IsNumber()
  @Min(0.01)
  @IsNotEmpty()
  width: number;

  @IsNumber()
  @Min(0.01)
  @IsNotEmpty()
  height: number;

  @IsString()
  @IsNotEmpty()
  vehicle: string;

  @IsDateString()
  @IsNotEmpty()
  arrivalTime: string;

  @IsDateString()
  @IsNotEmpty()
  pickupTime: string;

  @IsUUID()
  @IsNotEmpty()
  clientId: string;
}
