import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const existingClient = await this.clientRepository.findOne({
      where: [
        { email: createClientDto.email },
        { phone: createClientDto.phone },
      ],
    });

    if (existingClient) {
      throw new ConflictException('Email ou telefone já cadastrado');
    }

    const client = this.clientRepository.create(createClientDto);
    return this.clientRepository.save(client);
  }

  async findAll() {
    return this.clientRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const client = await this.clientRepository.findOne({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.findOne(id);

    if (updateClientDto.email && updateClientDto.email !== client.email) {
      const existingClient = await this.clientRepository.findOne({
        where: { email: updateClientDto.email },
      });
      if (existingClient) {
        throw new ConflictException('Email já cadastrado');
      }
    }

    if (updateClientDto.phone && updateClientDto.phone !== client.phone) {
      const existingClient = await this.clientRepository.findOne({
        where: { phone: updateClientDto.phone },
      });
      if (existingClient) {
        throw new ConflictException('Telefone já cadastrado');
      }
    }

    await this.clientRepository.update(id, updateClientDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const client = await this.findOne(id);
    await this.clientRepository.remove(client);
    return { message: 'Cliente deletado com sucesso' };
  }
}
