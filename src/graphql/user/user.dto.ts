import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class GetUserTokenInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
