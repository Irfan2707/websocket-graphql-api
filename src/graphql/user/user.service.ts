import { Injectable } from '@nestjs/common';
import { prismaClient } from '../../lib/db';
import { CreateUserInput, GetUserTokenInput } from './user.dto';
import { createHmac, randomBytes } from 'node:crypto';
import * as JWT from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretKey';

@Injectable()
export class UserService {
  private static generateHash(salt: string, password: string) {
    const hashedPassword = createHmac('sha256', salt)
      .update(password)
      .digest('hex');
    return hashedPassword;
  }

  async getUserById(id: string) {
    return prismaClient.user.findUnique({ where: { id } });
  }

  async createUser(payload: CreateUserInput) {
    const { email, password } = payload;
    const salt = randomBytes(32).toString('hex');
    const hashedPassword = UserService.generateHash(salt, password);

    return prismaClient.user.create({
      data: {
        email,
        salt,
        password: hashedPassword,
      },
    });
  }

  private async getUserByEmail(email: string) {
    return prismaClient.user.findUnique({ where: { email } });
  }

  async getUserToken(payload: GetUserTokenInput) {
    const { email, password } = payload;
    const user = await this.getUserByEmail(email);
    if (!user) throw new Error('User not found');

    const userSalt = user.salt;
    const usersHashPassword = UserService.generateHash(userSalt, password);

    if (usersHashPassword !== user.password) throw new Error('Incorrect Password');

    const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);
    return token;
  }

  decodeJWTToken(token: string) {
    return JWT.verify(token, JWT_SECRET);
  }
}
