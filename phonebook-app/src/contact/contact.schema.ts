import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Contact {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'Contact first name' })
  firstName: string;

  @Prop()
  @Field(() => String, { description: 'Contact last name' })
  lastName: string;

  @Prop()
  @Field(() => String, { description: 'Contact phone number' })
  phoneNumber: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
