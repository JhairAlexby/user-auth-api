import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<User> {
    const { firstName, lastName, paternalLastName, maternalLastName, email, password } = createAuthDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = this.userRepository.create({
      firstName,
      lastName,
      paternalLastName,
      maternalLastName,
      email,
      password: passwordHash,
      isActive: true,
    });

    try {
      await this.userRepository.save(newUser);
      const { password: _, ...userWithoutPassword } = newUser;
      return userWithoutPassword as User;
    } catch (error) {
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.find();
    return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
  }

  async findOne(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
