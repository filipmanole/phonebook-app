import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './contact.schema';
import { ContactResolver } from './contact.resolver';
import { ContactService } from './contact.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Contact.name,
        schema: ContactSchema,
      },
    ]),
  ],
  providers: [ContactResolver, ContactService],
})
export class ContactModule {}
