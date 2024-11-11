// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppGraphQLModule } from './graphql/graphql.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [AppGraphQLModule, GatewayModule], 
})
export class AppModule {}
