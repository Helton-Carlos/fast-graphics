import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OS, ServiceType } from './entities/os.entity';
import { CreateOsDto } from './dto/create-os.dto';
import { UpdateOsDto } from './dto/update-os.dto';
import { UserService } from '../user/user.service';
import { ClientService } from '../client/client.service';

const PRICES = {
  [ServiceType.ADESIVO]: 35,
  [ServiceType.LONA]: 45,
};

@Injectable()
export class OsService {
  constructor(
    @InjectRepository(OS)
    private osRepository: Repository<OS>,
    private userService: UserService,
    private clientService: ClientService,
  ) {}

  async create(createOsDto: CreateOsDto, employeeId: string) {
    await this.userService.findOne(employeeId);
    await this.clientService.findOne(createOsDto.clientId);

    const squareMeters = (createOsDto.width * createOsDto.height) / 10000;
    const unitPrice = PRICES[createOsDto.serviceType];
    const totalValue = squareMeters * unitPrice;

    const os = this.osRepository.create({
      serviceType: createOsDto.serviceType,
      width: createOsDto.width,
      height: createOsDto.height,
      squareMeters,
      unitPrice,
      totalValue,
      vehicle: createOsDto.vehicle,
      arrivalTime: new Date(createOsDto.arrivalTime),
      pickupTime: new Date(createOsDto.pickupTime),
      employeeId,
      clientId: createOsDto.clientId,
    });

    return this.osRepository.save(os);
  }

  async findAll() {
    return this.osRepository.find({
      relations: ['employee', 'client'],
      select: {
        employee: {
          id: true,
          name: true,
          email: true,
        },
        client: {
          id: true,
          name: true,
          phone: true,
          email: true,
          address: true,
        },
      },
      order: { sequentialId: 'DESC' },
    });
  }

  async findOne(id: string) {
    const os = await this.osRepository.findOne({
      where: { id },
      relations: ['employee', 'client'],
      select: {
        employee: {
          id: true,
          name: true,
          email: true,
        },
        client: {
          id: true,
          name: true,
          phone: true,
          email: true,
          address: true,
        },
      },
    });

    if (!os) {
      throw new NotFoundException('Ordem de Serviço não encontrada');
    }

    return os;
  }

  async findBySequentialId(sequentialId: number) {
    const os = await this.osRepository.findOne({
      where: { sequentialId },
      relations: ['employee', 'client'],
      select: {
        employee: {
          id: true,
          name: true,
          email: true,
        },
        client: {
          id: true,
          name: true,
          phone: true,
          email: true,
          address: true,
        },
      },
    });

    if (!os) {
      throw new NotFoundException('Ordem de Serviço não encontrada');
    }

    return os;
  }

  async update(id: string, updateOsDto: UpdateOsDto) {
    const os = await this.findOne(id);
    const updateData: Record<string, any> = {};

    if (updateOsDto.width !== undefined || updateOsDto.height !== undefined) {
      const width =
        updateOsDto.width !== undefined ? updateOsDto.width : os.width;
      const height =
        updateOsDto.height !== undefined ? updateOsDto.height : os.height;
      const squareMeters = (width * height) / 10000;
      const unitPrice = updateOsDto.serviceType
        ? PRICES[updateOsDto.serviceType]
        : os.unitPrice;
      const totalValue = squareMeters * unitPrice;

      updateData.width = width;
      updateData.height = height;
      updateData.squareMeters = squareMeters;
      updateData.unitPrice = unitPrice;
      updateData.totalValue = totalValue;
    }

    if (updateOsDto.serviceType && !updateOsDto.width && !updateOsDto.height) {
      const unitPrice = PRICES[updateOsDto.serviceType];
      const totalValue = os.squareMeters * unitPrice;
      updateData.serviceType = updateOsDto.serviceType;
      updateData.unitPrice = unitPrice;
      updateData.totalValue = totalValue;
    } else if (updateOsDto.serviceType) {
      updateData.serviceType = updateOsDto.serviceType;
    }

    if (updateOsDto.vehicle) {
      updateData.vehicle = updateOsDto.vehicle;
    }

    if (updateOsDto.arrivalTime) {
      updateData.arrivalTime = new Date(updateOsDto.arrivalTime);
    }

    if (updateOsDto.pickupTime) {
      updateData.pickupTime = new Date(updateOsDto.pickupTime);
    }

    await this.osRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: string) {
    const os = await this.findOne(id);
    await this.osRepository.remove(os);
    return { message: 'Ordem de Serviço deletada com sucesso' };
  }
}
