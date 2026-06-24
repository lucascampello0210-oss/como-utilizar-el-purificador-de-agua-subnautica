import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Torna o PrismaService disponível em todo o projeto automaticamente
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Permite que outros serviços usem o banco
})
export class PrismaModule {}
