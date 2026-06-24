import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // Injeta a string com os desvios de chave RSA antes de instanciar a classe pai
    process.env.DATABASE_URL = "mysql://prisma_user:senacrs@127.0.0.1:3306/projeto_db?allowPublicKeyRetrieval=true&sslmode=no-verify";
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
