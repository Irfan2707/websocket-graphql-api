
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GatewayModule } from '../gateway/gateway.module'; 
import { ApolloDriver } from '@nestjs/apollo';
import { UserResolver } from './user/user.resolver'; 
import { UserService } from './user/user.service';  

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,  
    }),
    GatewayModule, 

  ],
  providers: [UserResolver, UserService],  
})
export class AppGraphQLModule {}

