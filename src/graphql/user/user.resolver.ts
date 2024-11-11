import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput, GetUserTokenInput } from './user.dto';
import { User } from './user.entity';
import { GatewayService } from '../../gateway/gateway.service'; 

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private gatewayService: GatewayService, 
  ) {}

  @Query(() => String)
  async getUserToken(@Args('input') input: GetUserTokenInput) {
    try {
      const token = await this.userService.getUserToken(input);
      return token;
    } catch (error) {
      throw new Error('Authentication failed');
    }
  }

  @Query(() => User)
  async getCurrentLoggedInUser(@Context() context: any) {
    const user = context.req.user; 
    if (!user) {
      throw new Error('Authentication required');
    }
    try {
      return await this.userService.getUserById(user.id);
    } catch (error) {
      throw new Error('User not found');
    }
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput) {
    const newUser = await this.userService.createUser(input);
    this.gatewayService.server.emit('userCreated', newUser); 
    return newUser;
  }
}
